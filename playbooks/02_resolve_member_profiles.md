# 02 — Resolve member LinkedIn profiles

Goal: find LinkedIn profile URLs for known members without guessing.

## Hard rule

Never create a profile URL from a name.

Forbidden:

```text
https://www.linkedin.com/in/<first-name>-<last-name>/
https://www.linkedin.com/in/<firstname><lastname>/
https://www.linkedin.com/in/<romanized-japanese-name>/
```

Allowed only when the exact URL is visibly found in a source.

## Search query discipline

For each checklist person, every query must include the company name or domain.

Good queries:

```text
"<Name>" "<Company Name>" LinkedIn
"<Name>" "<official-domain>" LinkedIn
site:linkedin.com/in "<Name>" "<Company Name>"
site:linkedin.com/in "<Name>" "<official-domain>"
```

Bad queries:

```text
<Name>
<Name> LinkedIn
```

## Validation logic

For each candidate result, extract:

```json
{
  "name": "visible candidate name",
  "title": "visible headline/title",
  "profileUrl": "visible LinkedIn URL",
  "visibleCompanyEvidence": "text that connects candidate to target company",
  "sourceUrl": "where this was found"
}
```

Accept only if:

1. `profileUrl` visibly exists on a page/result.
2. Name matches the checklist person.
3. Company evidence matches the target company or domain.
4. Title/function is relevant, or the known source title is relevant.

## Status decisions

### accepted

Use when name, company, and URL are all supported.

### candidate

Use when URL and name match, but company/title evidence is incomplete.

### needs_manual_review

Use when a likely match exists but the agent cannot verify current company.

### rejected

Use when the person is unrelated, at another company, or the LinkedIn profile is only guessed.

### not_found

Use when no source-backed LinkedIn URL is found.

## Output record

Append to `prospect-output/prospects.jsonl`:

```json
{
  "company": "<Company>",
  "fullName": "<Name>",
  "title": "<Title>",
  "profileUrl": "<LinkedIn URL or null>",
  "status": "accepted",
  "confidence": 0.9,
  "evidence": [
    {
      "type": "search_result_or_page",
      "url": "<source URL>",
      "text": "<visible evidence>"
    }
  ]
}
```
