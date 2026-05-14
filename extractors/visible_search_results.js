// extractors/visible_search_results.js
// Generic visible search-result extractor. Use to record evidence URLs/snippets.
// Does not create or guess URLs.

(() => {
  const text = (el) => (el ? (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim() : null);
  const links = Array.from(document.querySelectorAll('a[href]'));
  const results = [];
  const seen = new Set();

  for (const a of links) {
    const href = a.href;
    if (!href || seen.has(href)) continue;
    const label = text(a);
    if (!label || label.length < 2) continue;
    const container = a.closest('li, article, div');
    const snippet = text(container)?.slice(0, 1000) || null;
    seen.add(href);
    results.push({
      title: label.slice(0, 300),
      url: href.split('?')[0],
      snippet,
      extractedFromVisiblePage: true,
      extractedAt: new Date().toISOString()
    });
    if (results.length >= 30) break;
  }

  return { ok: true, url: location.href, count: results.length, results };
})();
