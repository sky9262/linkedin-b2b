# 04 — Filter B2B targets

Goal: turn raw candidates into a useful B2B contact list.

## Target use case

The user wants people who are worth contacting for B2B outreach, especially for cybersecurity, AI, SaaS, IT, DX, or business partnership conversations.

## Scoring

Start at 0.

### Role score

Add points:

- CEO / President / 代表取締役 / 社長: +30
- CTO / CIO / CISO / CDO / CAIO: +35
- VP / Head / Director / General Manager / 本部長 / 部長: +30
- Manager / マネージャー / 責任者: +20
- Engineering / Product / Platform / Infrastructure: +20
- Security / Cybersecurity / セキュリティ / サイバー: +30
- IT / 情報システム / 情シス: +30
- DX / Digital / Data / AI / ML: +25
- Business Development / Partnership / Corporate Planning / 経営企画: +15

### Evidence score

- Found on official company page: +25
- Found on LinkedIn company People page: +25
- Found in company-grounded search result: +15
- Direct official bio LinkedIn link: +35

### Penalties

- Current company unclear: -30
- Title unclear: -15
- Recruiter/HR-only: -25
- Junior IC/no buying influence: -20
- Different company evidence: reject
- Guessed URL: reject

## Status

- `accepted`: score >= 50 and profile URL is validated
- `candidate`: score 35-49 and profile URL is validated but not strong enough
- `needs_manual_review`: likely useful but company/title evidence incomplete
- `rejected`: wrong company, irrelevant, guessed URL, or weak evidence

## Dedupe

Deduplicate by normalized profile URL first. If profile URLs differ but names/titles are nearly identical, keep the strongest evidence record and put the other in notes.

## Final table inclusion

Only `accepted` records go in the final user-facing table by default.

If fewer than 3 accepted records exist, include `candidate` records under a separate section:

```markdown
## Needs manual review
| Name | Title | LinkedIn |
|---|---|---|
```
