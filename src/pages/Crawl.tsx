import { useEffect } from 'react';
import { CrawlForm } from '@/components/CrawlForm';

const Crawl = () => {
  useEffect(() => {
    // Basic SEO for internal tool page
    document.title = 'Website Crawler | Now We Land';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Internal crawler to scan the site and generate precise prompts for ChatGPT.'
      );
    } else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = 'Internal crawler to scan the site and generate precise prompts for ChatGPT.';
      document.head.appendChild(m);
    }
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    const href = window.location.href;
    if (existingCanonical) existingCanonical.setAttribute('href', href);
    else {
      const link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', href);
      document.head.appendChild(link);
    }
  }, []);

  return (
    <main className="min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">Site Crawl & Prompt Generator</h1>
          <p className="text-sm opacity-80 mt-1">
            Scan your site and instantly generate a ready-to-paste ChatGPT prompt.
          </p>
        </header>
        <CrawlForm />
      </div>
    </main>
  );
};

export default Crawl;
