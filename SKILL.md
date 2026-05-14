---
name: linkedin-b2b
version: 2.2.0
kind: hermes-native-skill
description: LinkedIn B2B prospecting workflow for company/domain-based decision-maker research. Outputs concise, validated contacts with visible LinkedIn URLs and strict no-guess/no-bulk-scraping rules.
triggers:
  - find B2B contacts for company domain
  - search company and give LinkedIn of head manager VP
  - LinkedIn B2B contact list
  - head members checklist
  - company people page search
  - CTO CISO Head Director Manager prospects
  - example.com LinkedIn contacts
---

# linkedin-b2b

Hermes-native skill for focused LinkedIn B2B prospecting and decision-maker contact validation.

## Mission

Given a company domain or company name, produce a clean B2B contact table:

```markdown
| Name | Title | LinkedIn |
|---|---|---|
| ... | ... | https://www.linkedin.com/in/... |
```

The agent must behave like a careful research operator, not a crawler or bulk scraper. It must ground every accepted LinkedIn URL in visible evidence from a webpage, search result, official company page, or visible LinkedIn company People UI.

## Example user input

```text
search for example.com and give me linkedin of head/manager/VPs etc for B2B contact
```

## Expected final output

Default to the user's preferred concise terminal format: only contacts with valid, visible LinkedIn profile URLs and accepted company/title evidence. Use pipe-delimited rows, short titles, and no evidence/rejected/manual-review sections unless explicitly requested.

```text
Name | Title | LinkedIn URL
<Name> | <short title> | https://www.linkedin.com/in/<validated-slug>/

Best outreach shortlist:
<Name> | <short title> | https://www.linkedin.com/in/<validated-slug>/
```

Formatting rules:
- Keep titles short: e.g. `CTO / Corporate Officer`, `Deputy Head, Corporate Strategy`, `SRE Executive Manager`.
- Include only valid LinkedIn contacts in the main list.
- Do not include `needs_manual_review`, rejected profiles, detailed evidence, search logs, or long notes in the final answer unless the user asks.
- If the user asks for evidence or auditability, add a separate evidence section after the concise list.

## Non-negotiable rules

1. **Never guess a LinkedIn profile URL.**
   - Do not create `linkedin.com/in/firstname-lastname`.
   - Do not invent URL slugs from romanized names.
   - Do not normalize a name into a URL.
   - Accept only URLs that appeared visibly in search results, company People cards, official pages, or other evidence.

2. **Never search only a person name in LinkedIn global search.**
   - Bad: `Taro Yamada`
   - Good: `"Taro Yamada" "Example Company" LinkedIn`
   - Good: `site:linkedin.com/in "Example Company" "CTO"`

3. **Prefer company context first.**
   If the browser is on a page like:

   ```text
   https://www.linkedin.com/company/example-company/people/
   ```

   then use the company People search box before leaving the page.

4. **No bypass or evasion behavior.**
   - No private LinkedIn/Voyager API calls.
   - No cookie export/import.
   - No CAPTCHA or login-wall bypass.
   - No proxy rotation, fingerprint manipulation, stealth browsing, or anti-detection logic.
   - No bulk scraping.
   - No write actions such as connect, message, follow, like, or comment.

5. **Stop on blockers.**
   If LinkedIn shows login wall, CAPTCHA, account warning, unusual-activity warning, or restricted content, stop and ask the operator to continue manually.

## Native Hermes operating style

For best performance in Hermes CLI, connect a local browser before starting LinkedIn B2B research and sign in to LinkedIn in that browser:

```text
/browser connect
```

Browser/session handling rules:

1. If an active browser is already connected, use that browser first. Do not open a separate browser or fall back to search snippets until you have checked the active browser state.
2. If LinkedIn is logged in, use the visible logged-in LinkedIn UI first, especially company pages and company People pages.
3. If LinkedIn is not logged in, ask the operator to choose one of two options before continuing:
   - Log in to LinkedIn in the connected browser, then continue with the visible LinkedIn workflow.
   - Continue without logging in, with the limitation that public search fallback may return less data and profile validation may be less complete.
4. An established/older LinkedIn account is preferred because brand-new accounts may see more limited profile and People-page information.
5. If no browser is connected, recommend `/browser connect` for best results. If the operator declines or browser access is unavailable, continue with public company-grounded search results and clearly state the limitation.

Use Hermes local browser actions only. The exact command names depend on the Hermes build; map this pseudocode to the available commands:

```text
BROWSER.navigate(url)
BROWSER.wait(seconds)
BROWSER.evaluate(js)
BROWSER.click(selector)
BROWSER.type(selector, text)
BROWSER.screenshot()
```

Do not run hidden API harvesting. The agent should work from visible browser state and search result pages.

## Main workflow

## Operator correction: use logged-in local LinkedIn first when available

If the operator says LinkedIn is already logged in in the local browser, do not default to Google/Bing snippet harvesting first. Go directly to LinkedIn company resolution and the logged-in company People page:

```text
1. Search LinkedIn companies for the target name/domain.
2. Open the exact company page and then /people/.
3. Use People keyword searches for requested roles/functions: Head, Manager, VP, Director, CTO, CISO, IT, DX, cybersecurity/security, infrastructure, engineering.
   - For Japanese enterprise/SI targets, also search `General Manager`, `Executive Officer`, `本部長`, `部長`, `情報システム`, and `セキュリティ`; these often surface real buying authority better than only Western executive titles.
4. Capture visible People-page evidence and profile URLs from the logged-in UI.
5. Open high-value profiles to confirm title + current-company evidence before accepting.
```

This avoids search-engine CAPTCHA/blockers and better matches the user's preferred workflow when a logged-in browser is available.

## Fallback: Google Search Snippet Harvesting

When LinkedIn blocks direct access to People tab or profiles:

```text
1. Search: site:linkedin.com/in "<Company Name>" "CTO" OR "CISO" OR "VP" OR "Director" OR "Head"
2. Search: site:linkedin.com/in "<Company Name>" "cybersecurity" OR "infrastructure" OR "DX"
3. Search: site:linkedin.com/in "<Company Domain>" "engineering" OR "manager" OR "architect"
4. Visit each Google result snippet — titles + company context are often visible without
   opening the LinkedIn profile
5. Cross-reference names against the company People tab (if accessible)
```

> **Why this matters:** LinkedIn increasingly blocks direct profile access for
> non-Sales-Navigator users. Google caches profile index pages and shows title +
> company snippets without requiring a LinkedIn login session. This method
> recovered 70–80% of contacts that were otherwise inaccessible.

## Main Workflow (revised)

### Step 0 — Intake and company resolution

Run `playbooks/00_intake_and_company_resolution.md`.

### Step 1 — Official site leadership scan

Visit these URLs **before** LinkedIn (they sometimes list executives not found on LinkedIn):

- `https://<domain>/en/company/management/`
- `https://<domain>/en/leadership/`
- `https://<domain>/en/about/`
- `https://<domain>/<lang>/about/` (try Japanese `ja/` variant)
- `https://recruit.<domain>/`

> **Pitfall:** Many Japanese tech companies return 404 on English management
> pages. Try the Japanese path variant (e.g., `/company/` without `/en/`).

### Step 2 — LinkedIn company People page

```text
BROWSER.navigate("https://www.linkedin.com/company/<slug>/people/")
```

**If empty or login-gated**: do NOT spend time clicking. Switch to Step 2b.

### Step 2b — LinkedIn internal search (fallback)

```text
BROWSER.navigate("https://www.linkedin.com/search/results/people/?keywords=<encoded-query>")
```

Try queries like:
- `<Company Name>` + title filter (CTO, VP, Director, Head)
- Use `origin=SWITCH_SEARCH_VERTICAL&filters=List(currentCompany-%5B%22<company-id>%22%5D)`

**If empty**: proceed to Step 3 immediately.

### Step 3 — Google search snippet harvest (PRIMARY METHOD)

Run multiple Google searches in parallel:

```text
site:linkedin.com/in "<Company Name>" "CTO" OR "CISO" OR "VP"
site:linkedin.com/in "<Company Name>" "Head of" OR "Director of"
site:linkedin.com/in "<Company Domain>" "cybersecurity" OR "infrastructure"
site:linkedin.com/in "<Company Domain>" "engineering" OR "manager" OR "architect"
site:linkedin.com/in "<Company Name>" "DX" OR "digital transformation"
```

Extract names, titles, and LinkedIn URL slugs from Google's search snippets.

### Step 4 — Profile validation

For each candidate URL found:

1. Attempt `BROWSER.navigate(profile_url)` — expect ~50% to be blocked
2. For accessible profiles: validate current company, title, and relevance
3. For blocked profiles: mark status as `snippet-only` and record the Google snippet text as evidence

### Step 5 — B2B relevance filter

Accept contacts matching these roles:

- CEO / President / Representative Director
- CTO / CIO / CISO / CDO / CAIO
- VP / Head / Director / General Manager
- Engineering / Product / Platform / Infrastructure
- IT / Security / Cybersecurity
- DX / Digital Transformation
- Data / AI / ML

### Step 6 — Export

Use `prospects_template.csv` and `final_contacts.md`.

### Step 7 — Group company disambiguation (NEW)

Many large Japanese conglomerates (e.g., Hakuhodo, Dentsu, NTT) have
subsidiary companies. Verify the LinkedIn snippet references the **exact
subsidiary**, not the parent or sister company:

- Example Parent Co. ≠ Example Technologies ≠ Example Digital Services ≠ Example Consulting
- If the snippet says "at Example Parent Co." but your target is "Example Technologies",
  mark as `different entity` unless the person's role explicitly bridges both.
## Candidate validation

A candidate can be `accepted` only when all are true:

1. The LinkedIn URL was visibly found; it was not guessed.
2. The candidate has visible company evidence matching the target company.
3. The candidate has title/function evidence relevant to B2B.

If the profile URL is found but the company/title is uncertain:

```json
{
  "status": "needs_manual_review",
  "reason": "Profile URL was found, but current-company evidence is unclear"
}
```

If a name is known but no LinkedIn URL is found:

```json
{
  "status": "not_found",
  "reason": "No source-backed LinkedIn profile URL found"
}
```

## Output files

```text
prospect-output/
├── final_contacts.md
├── prospects.csv
├── prospects.jsonl
├── checklist.md
├── rejected.jsonl
└── session_notes.md
```

## Reference files

This skill may include local `references/` files with session-specific workflow notes. Treat those files as private/local by default. Before publishing this skill to a public GitHub repo, either sanitize those references or exclude them from the public package. The reusable public workflow should rely on the generic instructions in this SKILL.md, README.md, playbooks, templates, scripts, and sanitized examples only.

## Progress messages

Use brief progress updates:

```text
Resolved the company name and found the LinkedIn company page. Building a leadership/title checklist now.
Found 8 visible People-page candidates for CTO/Head/Director searches. Filtering for B2B relevance.
Rejected 6 profiles because the current company did not match the target company.
```

## Safety stop conditions

Stop immediately if the browser shows:

- login wall
- CAPTCHA/security challenge
- account restriction
- unusual-activity warning
- content the operator is not permitted to access

Then write the partial results already found and mark the remaining records as `needs_manual_review`.
