import { useEffect, useMemo, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FirecrawlService } from '@/utils/FirecrawlService';

interface CrawlResultData {
  success: boolean;
  status?: string;
  completed?: number;
  total?: number;
  creditsUsed?: number;
  expiresAt?: string;
  data?: any[];
}

export const CrawlForm = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [crawlResult, setCrawlResult] = useState<CrawlResultData | null>(null);
  const [apiKey, setApiKey] = useState<string>(FirecrawlService.getApiKey() || '');
  const [promptText, setPromptText] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const presetUrl = params.get('url');
    if (presetUrl) setUrl(presetUrl);
  }, []);

  const handleSaveKey = async () => {
    if (!apiKey) {
      toast({ title: 'API Key required', description: 'Enter your Firecrawl API key', variant: 'destructive' });
      return;
    }
    FirecrawlService.saveApiKey(apiKey);
    toast({ title: 'Saved', description: 'Firecrawl API key saved locally.' });
  };

  const handleTestKey = async () => {
    if (!apiKey) {
      toast({ title: 'API Key required', description: 'Enter your Firecrawl API key', variant: 'destructive' });
      return;
    }
    const ok = await FirecrawlService.testApiKey(apiKey);
    toast({ title: ok ? 'Valid API key' : 'Invalid API key', variant: ok ? 'default' : 'destructive' });
  };

  const buildPrompt = useMemo(() => (siteUrl: string, result?: CrawlResultData) => {
    const lines: string[] = [];
    lines.push('You are ChatGPT. Carefully crawl and summarize this website, then generate precise prompts for updating the site.');
    lines.push(`Target URL: ${siteUrl}`);
    lines.push('Instructions:');
    lines.push('- Follow internal links up to depth 2.');
    lines.push('- Extract page titles, H1s, meta descriptions, key sections, and primary CTAs.');
    lines.push('- Identify design/UX opportunities and content gaps.');
    lines.push('- Propose exact, copy-pastable prompts in Hebrew for my editor to implement.');
    lines.push('Deliverables:');
    lines.push('1) Site map outline');
    lines.push('2) Key findings (bulleted)');
    lines.push('3) 10+ “exact prompts” with clear targets (file/component/section) and desired outcome');
    if (result?.data) {
      lines.push('\nNote: A preliminary crawl was performed for context. Use it as a hint but still browse the live site.');
    }
    return lines.join('\n');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(10);
    setCrawlResult(null);

    try {
      const storedKey = FirecrawlService.getApiKey();
      if (!storedKey) {
        toast({ title: 'Missing API key', description: 'Please save your Firecrawl API key first', variant: 'destructive' });
        return;
      }

      const result = await FirecrawlService.crawlWebsite(url);
      setProgress(80);

      if (result.success) {
        setCrawlResult(result.data);
        setPromptText(buildPrompt(url, result.data));
        toast({ title: 'Success', description: 'Website crawled successfully' });
      } else {
        toast({ title: 'Error', description: result.error || 'Failed to crawl website', variant: 'destructive' });
      }
    } catch (error) {
      console.error('Error crawling website:', error);
      toast({ title: 'Error', description: 'Failed to crawl website', variant: 'destructive' });
    } finally {
      setProgress(100);
      setIsLoading(false);
    }
  };

  const copyPrompt = async () => {
    if (!promptText) {
      toast({ title: 'Nothing to copy', description: 'Run a crawl first' });
      return;
    }
    await navigator.clipboard.writeText(promptText);
    toast({ title: 'Copied', description: 'Prompt copied to clipboard' });
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto] items-end">
          <div>
            <Label htmlFor="apiKey">Firecrawl API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="fc_live_..."
            />
            <p className="text-xs opacity-70 mt-1">Tip: בפרויקט זה מומלץ לשמור את המפתח ב-Supabase Secrets; כרגע נשמר מקומית לצורך בדיקות.</p>
          </div>
          <Button type="button" onClick={handleSaveKey} variant="secondary">Save Key</Button>
          <Button type="button" onClick={handleTestKey} variant="outline">Test Key</Button>
        </div>
      </Card>

      <Card className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="url">Website URL</Label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-domain.com"
              required
            />
          </div>

          {isLoading && <Progress value={progress} className="w-full" />}

          <div className="flex gap-3">
            <Button type="submit" disabled={isLoading} className="min-w-32">
              {isLoading ? 'Crawling…' : 'Start Crawl'}
            </Button>
            <Button type="button" variant="outline" onClick={() => setPromptText(buildPrompt(url))}>Generate Prompt (without crawl)</Button>
          </div>
        </form>
      </Card>

      {promptText && (
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">ChatGPT Prompt</h3>
            <Button size="sm" onClick={copyPrompt}>Copy</Button>
          </div>
          <Textarea value={promptText} onChange={(e) => setPromptText(e.target.value)} rows={10} />
        </Card>
      )}

      {crawlResult && (
        <Card className="p-4">
          <h3 className="text-base font-semibold mb-2">Crawl Summary</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Status: {crawlResult.status}</div>
            <div>Completed: {crawlResult.completed}</div>
            <div>Total: {crawlResult.total}</div>
            <div>Credits Used: {crawlResult.creditsUsed}</div>
            <div className="col-span-2">Expires: {crawlResult.expiresAt ? new Date(crawlResult.expiresAt).toLocaleString() : '-'}</div>
          </div>
        </Card>
      )}
    </div>
  );
};
