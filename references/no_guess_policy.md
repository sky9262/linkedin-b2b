# No-Guess Profile URL Policy

The agent must never invent profile URLs.

## Forbidden

```text
linkedin.com/in/<first>-<last>
linkedin.com/in/<firstname><lastname>
linkedin.com/in/<company>-<name>
```

Do not create, test, or navigate to guessed variants.

## Allowed

A profile URL is allowed only if the exact URL appears in one of these places:

- official company site
- conference/speaker/bio page
- search result link/snippet
- visible LinkedIn company People card
- visible LinkedIn search result
- user-provided URL

## If not found

Return:

```json
{
  "status": "needs_manual_review",
  "reason": "No source-backed URL found; URL guessing is prohibited."
}
```

## Validation before accepting

A profile is accepted only if at least two are true:

1. name matches
2. target company appears in current company/headline/card/source
3. title/function matches target role family

Otherwise keep it as `candidate` or `needs_manual_review`.
