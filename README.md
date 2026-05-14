# linkedin-b2b

A Hermes skill for company-based LinkedIn B2B prospect research.

Use this skill when the input is a company name or company domain and the desired output is a concise list of relevant decision-makers with validated LinkedIn profile URLs.

## Purpose

`linkedin-b2b` helps an agent find B2B outreach contacts while staying grounded in visible evidence. It is designed for careful prospect research, not bulk scraping.

The workflow focuses on:

- company/domain-based research
- decision-maker discovery
- current-company validation
- title/function relevance
- visible LinkedIn profile URLs only
- concise terminal-friendly output

## Example input

```text
linkedin-b2b: find B2B contacts for example.com. Focus on Head, Manager, VP, Director, CTO, CISO, CIO, IT, DX, Security, Infrastructure, and Engineering roles.
```

## Expected output

Default final answer format:

```text
Name | Title | LinkedIn URL
Jane Smith | CTO | https://www.linkedin.com/in/example-profile-1/
Taro Yamada | Head of IT | https://www.linkedin.com/in/example-profile-2/
Alex Chen | Security Director | https://www.linkedin.com/in/example-profile-3/

Best outreach shortlist:
Jane Smith | CTO | https://www.linkedin.com/in/example-profile-1/
Taro Yamada | Head of IT | https://www.linkedin.com/in/example-profile-2/
```

Only include contacts whose LinkedIn URL and company/title evidence were visibly observed. Do not include rejected candidates, manual-review candidates, evidence logs, or long notes unless the user explicitly asks for them.

## What the skill does

1. Resolve the target company from the provided name or domain.
2. Confirm the exact company entity before accepting people.
3. Check official company pages when useful for leadership context.
4. Use the LinkedIn company People page when available.
5. Search role/function terms such as:
   - CEO / President / Representative Director
   - CTO / CIO / CISO / CDO / CAIO
   - VP / Head / Director / General Manager
   - Engineering / Product / Platform / Infrastructure
   - IT / Security / Cybersecurity
   - DX / Digital Transformation
   - Data / AI / ML
6. For Japanese enterprise and SIer targets, also search Japanese and Japan-market titles such as:
   - Executive Officer
   - General Manager
   - 本部長
   - 部長
   - 情報システム
   - セキュリティ
7. Validate profile URLs and current-company/title evidence from visible sources.
8. Return a clean pipe-delimited contact list and best outreach shortlist.

## What the skill does not do

- It does not guess LinkedIn URLs from names.
- It does not pattern-generate profile slugs.
- It does not search only a person's name without company context.
- It does not use private LinkedIn or Voyager APIs.
- It does not bypass login walls, CAPTCHA, account restrictions, rate limits, or visibility controls.
- It does not use proxy rotation, fingerprint manipulation, stealth browsing, or anti-detection logic.
- It does not send connection requests, messages, follows, likes, comments, or other write actions.
- It does not perform bulk scraping.

## Browser workflow

For best performance in Hermes CLI, connect a browser before using this skill and sign in to LinkedIn in that browser:

```text
/browser connect
```

Browser/session handling:

1. If an active browser is already connected, use that browser first.
2. If LinkedIn is logged in, use the visible LinkedIn UI first, especially company pages and company People pages.
3. If LinkedIn is not logged in, ask the user to choose one of two options:
   - Log in to LinkedIn in the connected browser, then continue.
   - Continue without logging in, with the limitation that less data may be available and profile validation may be less complete.
4. An established/older LinkedIn account is preferred because brand-new accounts may see more limited profile and People-page information.
5. If no browser is connected, recommend `/browser connect` for best results. If browser access is unavailable, continue with public company-grounded search results and state the limitation.

When a logged-in local browser session is available, prefer visible browser research:

1. Resolve the company page.
2. Open the company People page.
3. Search inside the company People interface using role/function keywords.
4. Open high-value visible profiles only when needed to confirm title and current-company evidence.
5. Stop if LinkedIn shows a blocker or account-safety warning.

If the company People page is empty, blocked, or incomplete, use company-grounded public search queries.

Example query shapes:

```text
site:linkedin.com/in "Example Company" "CTO" OR "CISO" OR "VP"
site:linkedin.com/in "Example Company" "Head of" OR "Director of"
site:linkedin.com/in "example.com" "cybersecurity" OR "infrastructure"
site:linkedin.com/in "Example Company" "DX" OR "digital transformation"
```

## Acceptance rule

A contact is accepted only when all three conditions are met:

1. The LinkedIn profile URL was visibly found.
2. The person has visible evidence connecting them to the target company or verified target subsidiary.
3. The person has a title or function relevant to B2B outreach.

If any condition is missing, do not include the person in the concise final list. Keep uncertain records as manual-review candidates only when the user asks for them.

## Entity disambiguation

For large groups, holding companies, subsidiaries, and renamed companies, confirm that the person belongs to the exact target entity. Do not accept a profile only because the person works at a similarly named parent, sister company, regional office, or former brand.

## Safety stop conditions

Stop and report partial results if the browser shows:

- login wall
- CAPTCHA or security challenge
- account restriction
- unusual-activity warning
- restricted-content warning

Do not attempt bypasses. Ask the operator to continue manually if needed.

## Output files

When saving artifacts, use a local output directory such as:

```text
prospect-output/
├── final_contacts.md
├── prospects.csv
├── prospects.jsonl
├── checklist.md
├── rejected.jsonl
└── session_notes.md
```

## Installation

Place the skill directory under the Hermes skills directory:

```bash
cp -r linkedin-b2b ~/.hermes/skills/linkedin-b2b
```

Then restart Hermes or start a new session so the skill loader can discover it.
