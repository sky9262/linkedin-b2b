// extractors/company_people_visible_cards.js
// Run only on a visible LinkedIn company /people/ page.
// Returns visible cards only. It must not guess URLs.

(() => {
  const text = (el) => (el ? (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim() : null);
  const abs = (href) => {
    try { return href ? new URL(href, location.origin).toString().split('?')[0] : null; }
    catch (_) { return null; }
  };
  const isPeoplePage = /\/company\/[^/]+\/people\/?/.test(location.pathname);

  const cardSelectors = [
    'ul.org-people-profiles-module__profile-list > li',
    'div.org-people-profile-card',
    'li.grid.grid__col--lg-8',
    'li.reusable-search__result-container',
    'div.entity-result__item'
  ];

  const cards = Array.from(document.querySelectorAll(cardSelectors.join(',')));
  const out = [];
  const seen = new Set();

  for (const card of cards) {
    const link = Array.from(card.querySelectorAll('a[href*="/in/"]'))
      .find((a) => /\/in\/[^/?#]+/.test(a.getAttribute('href') || ''));
    if (!link) continue;

    const profileUrl = abs(link.getAttribute('href'));
    if (!profileUrl || seen.has(profileUrl)) continue;
    seen.add(profileUrl);

    const nameEl =
      card.querySelector('.org-people-profile-card__profile-title') ||
      card.querySelector('.artdeco-entity-lockup__title') ||
      card.querySelector('.entity-result__title-text') ||
      link;

    const headlineEl =
      card.querySelector('.lt-line-clamp__line') ||
      card.querySelector('.artdeco-entity-lockup__subtitle') ||
      card.querySelector('.entity-result__primary-subtitle') ||
      card.querySelector('p.t-14');

    const locationEl =
      card.querySelector('.artdeco-entity-lockup__caption') ||
      card.querySelector('.entity-result__secondary-subtitle');

    const fullName = text(nameEl);
    const headline = text(headlineEl);
    const locationName = text(locationEl);
    const publicIdentifierMatch = profileUrl.match(/\/in\/([^/?#]+)/);

    out.push({
      fullName,
      headline,
      locationName,
      profileUrl,
      publicIdentifier: publicIdentifierMatch ? publicIdentifierMatch[1] : null,
      sourcePage: location.href.split('?')[0],
      sourceKind: isPeoplePage ? 'linkedin_company_people_visible_card' : 'visible_linkedin_card',
      extractedFromVisiblePage: true,
      extractedAt: new Date().toISOString(),
      rawCardText: text(card)?.slice(0, 1000) || null
    });
  }

  return {
    ok: true,
    isPeoplePage,
    url: location.href,
    count: out.length,
    cards: out
  };
})();
