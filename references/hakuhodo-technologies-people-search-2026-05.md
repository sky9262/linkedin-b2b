# Hakuhodo Technologies LinkedIn People Search — 2026-05

Session-specific learning for future B2B LinkedIn contact research.

## Context

Target: `hakuhodo-technologies.co.jp` / 株式会社博報堂テクノロジーズ / HAKUHODO TECHNOLOGIES INC.

The operator corrected the workflow: LinkedIn was already logged in in the local browser, so the right method was to use the logged-in LinkedIn UI directly rather than Google/Bing snippet harvesting.

## What worked

1. Resolve company via LinkedIn company search:
   - `https://www.linkedin.com/search/results/companies/?keywords=Hakuhodo%20Technologies`
   - Exact result: `https://www.linkedin.com/company/hakuhodo-technologies/`

2. Open People page:
   - `https://www.linkedin.com/company/hakuhodo-technologies/people/`
   - Visible state: 57 associated members.

3. Search People page with role/function keywords using URL query:
   - `/people/?keywords=Head`
   - `/people/?keywords=Manager`
   - `/people/?keywords=Director`
   - `/people/?keywords=CTO`
   - `/people/?keywords=DX`
   - `/people/?keywords=Engineering`
   - `/people/?keywords=Infrastructure`
   - `/people/?keywords=Security`
   - `/people/?keywords=%22Information%20Technology%22`

4. Scroll down after each keyword search before extracting text/links. The results are not visible at top of page.

5. Extract visible page text and profile links from browser DOM:
   - `document.body.innerText`
   - `Array.from(document.querySelectorAll('a')).map(a=>({text:a.innerText.trim(),href:a.href.split('?')[0]})).filter(x=>x.href.includes('/in/')&&x.text)`

6. Open high-confidence candidate profiles to confirm company/title before accepting.

## Validation examples

Accepted when visible profile showed both LinkedIn URL and target-company evidence:

- `https://www.linkedin.com/in/namikawa/` — headline: CTO at SO Technologies, Inc. & Corporate Officer at Hakuhodo Technologies inc.; company button: 株式会社博報堂テクノロジーズ.
- `https://www.linkedin.com/in/konno-hayato/` — headline: Deputy Head of Corporate Strategy - 株式会社博報堂テクノロジーズ.
- `https://www.linkedin.com/in/ktezuka/` — headline: Hakuhodo DY ONE / HAKUHODO Technologies; cross-reference official site for executive data/infrastructure role.
- `https://www.linkedin.com/in/sugiyamatakuya/` — headline: Hakuhodo Technologies, Inc -Executive Manager.
- `https://www.linkedin.com/in/%E6%B5%A9%E5%B9%B3-%E6%B0%B8%E5%B0%BE-8b5a6433b/` — headline: 株式会社博報堂テクノロジーズ - Site Reliability Engineering Executive Manager.

## Pitfalls

- Google produced a sorry/CAPTCHA page; Bing produced a Cloudflare challenge. Do not spend time there if LinkedIn local browser is logged in.
- LinkedIn People search may show promising candidates whose visible headline does not prove current Hakuhodo Technologies employment. Put these under `needs manual review`, not accepted.
- Japanese group/subsidiary ambiguity matters: Hakuhodo Inc., Hakuhodo DY ONE, and Hakuhodo Technologies are distinct. Reject or mark weak unless the exact target entity is visible.
- Some People-page search counts (e.g. `1 associated member`) do not map cleanly to all visible cards because LinkedIn also shows adjacent/recommended cards. Validate from profile pages before accepting.

## Output style that matched user preference

User prefers concise pipe-delimited contact output:

`Name | Title / relevance | LinkedIn URL | Evidence`

Use a separate `needs manual review` table for weaker candidates and a short rejected section for entity mismatches.
