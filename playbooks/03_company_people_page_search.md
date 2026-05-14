# 03 — LinkedIn company People page search

Goal: when the operator/browser is on a LinkedIn company People page, search inside that company before using global search.

Example page:

```text
https://www.linkedin.com/company/hakuhodo-technologies/people/
```

## Do this first

Find and use the company People search field:

```html
<textarea class="org-people__search-input" id="people-search-keywords" placeholder="Search employees by title, keyword or school"></textarea>
```

Use `extractors/company_people_search_box.js` to identify the search input.

Selector priority:

```text
textarea#people-search-keywords
textarea.org-people__search-input
textarea[placeholder*="Search employees"]
textarea[placeholder*="keyword"]
input[id*="people-search"]
input[placeholder*="Search employees"]
```

## Search strategy

Search title/function keywords inside the company page, not random names globally.

English queries:

```text
CTO
CIO
CISO
VP
Head
Director
Manager
Engineering
Security
Cybersecurity
Infrastructure
Platform
Product
Data
AI
DX
Digital
Business Development
Partnership
Corporate Planning
```

Japanese queries:

```text
代表取締役
社長
取締役
執行役員
本部長
部長
責任者
マネージャー
情報システム
情シス
セキュリティ
サイバー
インフラ
開発
開発責任者
DX
データ
AI
経営企画
事業開発
パートナーシップ
```

## After each search

1. Wait for visible results to update.
2. Extract visible cards only with `extractors/company_people_visible_cards.js`.
3. Save candidates with the query that found them.
4. Do not click every result unless needed for validation.
5. Do not infinite-scroll aggressively. Keep it targeted.

## Visible card record

```json
{
  "source": "linkedin_company_people_page",
  "searchQuery": "CTO",
  "name": "visible name",
  "title": "visible headline or title",
  "profileUrl": "visible href",
  "companyEvidence": "company People page URL"
}
```

## Validation

Because the person was found inside the target company's People page, company confidence is higher. Still reject if the visible headline clearly says a different company or unrelated role.

## Stop conditions

Stop if:

- login wall appears
- CAPTCHA appears
- restricted/security warning appears
- page stops showing permitted content

Save partial results and continue to final export.
