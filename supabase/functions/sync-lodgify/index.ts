import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";
import ical from "npm:node-ical";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function assertEnv(name: string): string {
  const v = Deno.env.get(name);
  if (!v) throw new Error(`Missing ${name} secret in Supabase Edge Functions`);
  return v;
}

function parseYYYYMMDDToUTC(dateStr: string): Date {
  // Ensures "YYYY-MM-DD" is interpreted as UTC, avoiding timezone off-by-one.
  return new Date(`${dateStr}T00:00:00Z`);
}

function toYYYYMMDDUTC(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function* enumerateDatesUTC(startInclusive: Date, endExclusive: Date): Generator<string> {
  // Normalize to UTC midnight
  let cur = new Date(Date.UTC(startInclusive.getUTCFullYear(), startInclusive.getUTCMonth(), startInclusive.getUTCDate()));
  const end = new Date(Date.UTC(endExclusive.getUTCFullYear(), endExclusive.getUTCMonth(), endExclusive.getUTCDate()));

  while (cur < end) {
    yield toYYYYMMDDUTC(cur);
    cur = new Date(cur.getTime() + 24 * 60 * 60 * 1000);
  }
}

function isCancelled(event: any): boolean {
  const status = (event?.status ?? event?.['STATUS']) as string | undefined;
  return typeof status === "string" && status.toUpperCase().includes("CANCEL");
}

serve(async (req) => {
  // Preflight for browsers.
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  try {
    const { from, to } = await req.json().catch(() => ({}));

    const supabaseUrl = assertEnv("SUPABASE_URL");
    const supabaseServiceRoleKey = assertEnv("SUPABASE_SERVICE_ROLE_KEY");
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const propertyId = assertEnv("LODGIFY_PROPERTY_ID");
    const icsUrl = `https://www.lodgify.com/${propertyId}.ics`;

    const fromDate = from ? parseYYYYMMDDToUTC(from) : new Date();
    const toDate = to
      ? parseYYYYMMDDToUTC(to)
      : new Date(fromDate.getTime() + 180 * 24 * 60 * 60 * 1000);

    const fromStr = toYYYYMMDDUTC(fromDate);
    const toStr = toYYYYMMDDUTC(toDate);

    // 1) Fetch iCal and parse
    const res = await fetch(icsUrl);
    if (!res.ok) {
      const bodyText = await res.text().catch(() => "");
      throw new Error(`Failed to fetch Lodgify iCal (${res.status}): ${bodyText || res.statusText}`);
    }

    const icsText = await res.text();
    const parsed = (ical as any).parseICS(icsText);
    const events = Object.values(parsed ?? {});

    // 3) Convert VEVENT booking periods into booked dates
    const bookedDates = new Set<string>();

    for (const ev of events) {
      if (!ev) continue;
      if (ev.type && ev.type !== "VEVENT") continue;
      if (!ev.start) continue;
      if (isCancelled(ev)) continue;

      const start = ev.start instanceof Date ? ev.start : new Date(ev.start);
      const end = ev.end ? (ev.end instanceof Date ? ev.end : new Date(ev.end)) : new Date(start.getTime() + 24 * 60 * 60 * 1000);

      // If Lodgify returns end before start, skip.
      if (end <= start) continue;

      for (const dateStr of enumerateDatesUTC(start, end)) {
        if (dateStr < fromStr || dateStr >= toStr) continue;
        bookedDates.add(dateStr);
      }
    }

    const rows = Array.from(bookedDates).map((date) => ({
      date,
      status: "booked",
      note: null,
    }));

    if (rows.length === 0) {
      return new Response(JSON.stringify({ updated: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // 2) Refresh only "booked" within the requested window.
    // We keep existing "blocked" rows and only replace booked.
    const { error: delBookedError } = await supabase
      .from("availability")
      .delete()
      .eq("status", "booked")
      .gte("date", fromStr)
      .lt("date", toStr);
    if (delBookedError) throw delBookedError;

    // 3) Insert/update booked dates back
    // upsert prevents unique-date conflicts and ensures blocked->booked transitions.
    const { error: insError } = await supabase
      .from("availability")
      .upsert(rows as any, { onConflict: "date" });
    if (insError) throw insError;

    return new Response(JSON.stringify({ updated: rows.length }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (e) {
    const err: any = e;
    // Force plain string so the frontend doesn't display [object Object]
    const message =
      err?.message ??
      err?.error ??
      err?.reason ??
      (typeof err === "string" ? err : JSON.stringify(err));
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});

