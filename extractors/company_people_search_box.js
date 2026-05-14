// extractors/company_people_search_box.js
// Hermes usage: inject this function with the desired query.
// Purpose: set the LinkedIn company People tab keyword search box.
// It does not bypass access controls and does not submit hidden/private API calls.

((query) => {
  const selectors = [
    'textarea#people-search-keywords',
    'textarea.org-people__search-input',
    'input[id*="people-search"]',
    'textarea[placeholder*="Search employees"]',
    'input[placeholder*="Search employees"]',
    'textarea[placeholder*="title"]',
    'input[placeholder*="title"]',
    'textarea[placeholder*="社員"]',
    'input[placeholder*="社員"]'
  ];

  const input = selectors.map((sel) => document.querySelector(sel)).find(Boolean);

  if (!input) {
    return {
      ok: false,
      reason: 'people_search_box_not_found',
      url: location.href,
      availableInputs: Array.from(document.querySelectorAll('input, textarea')).slice(0, 20).map((el) => ({
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        className: el.className || null,
        placeholder: el.getAttribute('placeholder') || null,
        ariaLabel: el.getAttribute('aria-label') || null
      }))
    };
  }

  input.focus();

  const proto = input.tagName.toLowerCase() === 'textarea'
    ? window.HTMLTextAreaElement.prototype
    : window.HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;

  if (setter) setter.call(input, query);
  else input.value = query;

  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));

  // Some LinkedIn builds submit on Enter; others update live.
  input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
  input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', bubbles: true }));

  return {
    ok: true,
    query,
    selector: selectors.find((sel) => document.querySelector(sel) === input) || null,
    url: location.href
  };
})(typeof QUERY !== 'undefined' ? QUERY : 'CTO');
