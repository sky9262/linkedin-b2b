# 00 — Intake and company resolution

Goal: convert a user request like:

```text
search for hakuhodo-technologies.co.jp and give me linkedin of head/manager/VPs etc for B2B contact
```

into a grounded company research plan.

## Inputs

Accept any of these:

- company domain: `hakuhodo-technologies.co.jp`
- official company URL: `https://www.hakuhodo-technologies.co.jp/`
- company name: `Hakuhodo Technologies`
- LinkedIn company URL
- LinkedIn company People URL

## Resolve company identity

Create this record:

```json
{
  "input": "hakuhodo-technologies.co.jp",
  "companyName": null,
  "officialDomain": "hakuhodo-technologies.co.jp",
  "officialSiteUrl": null,
  "linkedinCompanyUrl": null,
  "linkedinPeopleUrl": null,
  "confidence": 0,
  "evidence": []
}
```

## Search order

1. Open the official domain first.
2. Read visible page title, meta description, footer, company name, and about page links.
3. Search web for the domain + LinkedIn company page:

```text
"hakuhodo-technologies.co.jp" "LinkedIn" "company"
"Hakuhodo Technologies" "LinkedIn" "company"
site:linkedin.com/company "Hakuhodo Technologies"
```

4. Accept a LinkedIn company URL only if the search result or page text visibly matches the target company.
5. Build People page URL from an accepted company page URL only by normal LinkedIn navigation or visible People tab link. Do not guess random company slugs.

## Output

Write `prospect-output/session_notes.md`:

```markdown
# Session Notes

Company: <resolved company name>
Official site: <url>
LinkedIn company page: <url or unknown>
LinkedIn People page: <url or unknown>
Target roles: Head, Manager, VP, Director, CTO, CISO, CIO, IT, DX, Security, Engineering
```

Then continue to `01_build_head_member_checklist.md`.
