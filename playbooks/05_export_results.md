# 05 — Export results

Goal: produce the exact output the user wants, plus internal evidence files.

## User-facing output

The main answer should be:

```markdown
# B2B LinkedIn Contacts — <Company>

| Name | Title | LinkedIn |
|---|---|---|
| <Name> | <Title> | <LinkedIn URL> |
```

Keep it simple. Do not overload the user with internal evidence unless asked.

## Internal files

Write:

```text
prospect-output/final_contacts.md
prospect-output/prospects.csv
prospect-output/prospects.jsonl
prospect-output/checklist.md
prospect-output/rejected.jsonl
prospect-output/session_notes.md
```

## CSV columns

For the CSV, include evidence columns even if the final answer is simple:

```csv
Name,Title,LinkedIn,Company,Status,B2BScore,Confidence,EvidenceURL,EvidenceText,Notes
```

## Markdown final_contacts.md

```markdown
# B2B LinkedIn Contacts — <Company>

| Name | Title | LinkedIn |
|---|---|---|
| ... | ... | ... |

## Needs manual review
| Name | Title | LinkedIn |
|---|---|---|
| ... | ... | ... |

## Not found / rejected summary
- <Name or query>: <reason>
```

## Final answer rule

If no validated LinkedIn contacts are found, say:

```text
I could not validate any LinkedIn profile URLs from visible evidence. I did not guess URLs. Here are the unresolved target titles/names for manual review.
```
