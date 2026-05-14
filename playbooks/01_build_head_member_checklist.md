# 01 — Build head-member checklist

Goal: create a checkbox list of potential B2B decision makers before resolving LinkedIn profile URLs.

## Principle

Do not start by randomly searching names on LinkedIn. First collect names and target role categories from company-grounded sources.

## Sources to inspect

From the official site and search results, inspect:

- About / Company / 会社概要
- Leadership / Management / 役員 / 経営陣
- Board / Directors / 取締役
- News / Press releases / お知らせ
- Interviews / Events / Speakers
- Product or technology pages mentioning leaders
- Recruiting pages mentioning department heads
- LinkedIn company People page title search results

## Target role checklist

Use two kinds of checklist items.

### Known-person checkbox

Use when a name is found:

```markdown
- [ ] <Name> — <Title> — source: <source_url> — evidence: "<visible text>"
```

### Title-search checkbox

Use when a useful title exists but no name is found yet:

```markdown
- [ ] title-search: CTO
- [ ] title-search: CISO
- [ ] title-search: CIO
- [ ] title-search: Head
- [ ] title-search: Director
- [ ] title-search: Manager
- [ ] title-search: Engineering
- [ ] title-search: Security
- [ ] title-search: DX
- [ ] title-search: 情報システム
```

## Priority roles

High priority:

- CEO / President / Representative Director / 代表取締役 / 社長
- CTO / CIO / CISO / CDO / CAIO
- VP / Head / Director / General Manager / 部長 / 統括
- Engineering / Product / Platform / Infrastructure
- Security / Cybersecurity / セキュリティ / サイバー
- IT / 情報システム / 情シス
- DX / Digital Transformation
- Data / AI / ML
- Business Development / Partnership / Corporate Planning

Medium priority:

- Senior Manager
- Project Manager for IT/DX/Security/Data
- Product Manager
- Corporate planning / 経営企画

Low priority or reject by default:

- Recruiter / HR only
- Junior engineer with no buying influence
- Alumni not currently at the company
- Sales roles unless the user asks for partnership/sales contacts

## Output

Write `prospect-output/checklist.md`:

```markdown
# Head Member Checklist — <Company>

## Known members
- [ ] <Name> — <Title> — source: <url>

## Title searches
- [ ] CTO
- [ ] CISO
- [ ] Head
- [ ] Director
- [ ] Manager
```

Continue to `02_resolve_member_profiles.md` for known names and `03_company_people_page_search.md` for title searches.
