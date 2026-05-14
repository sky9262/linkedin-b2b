# 06 — External LinkedIn search fallback

Goal: find LinkedIn profile URLs only when company People page and official sources are incomplete.

## When to use

Use this only after:

1. official company sources were checked, and
2. LinkedIn company People page search was attempted or unavailable.

## Never do this

Do not search only a name:

```text
Taro Yamada LinkedIn
```

Do not guess a URL:

```text
linkedin.com/in/taro-yamada
```

## Allowed search patterns

Always include the company name/domain and role context.

For known people:

```text
"<Name>" "<Company Name>" LinkedIn
"<Name>" "<Domain>" LinkedIn
site:linkedin.com/in "<Name>" "<Company Name>"
```

For unknown people by title:

```text
site:linkedin.com/in "<Company Name>" "CTO"
site:linkedin.com/in "<Company Name>" "CISO"
site:linkedin.com/in "<Company Name>" "Head"
site:linkedin.com/in "<Company Name>" "Director"
site:linkedin.com/in "<Company Name>" "Manager"
site:linkedin.com/in "<Company Name>" "情報システム"
site:linkedin.com/in "<Company Name>" "セキュリティ"
site:linkedin.com/in "<Domain>" LinkedIn
```

## Candidate acceptance

Only accept a profile if the search result or opened page visibly contains:

- the profile URL
- matching company evidence
- relevant title or function evidence

If the search result title/snippet is weak, mark as candidate or needs_manual_review.
