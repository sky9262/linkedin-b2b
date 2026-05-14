# Dentsu Soken / dentsusoken.com LinkedIn People Search Notes — 2026-05

## Target resolution

- Official site: `https://www.dentsusoken.com/`
- Official Japanese name observed: `電通総研`
- LinkedIn company page selected: `https://www.linkedin.com/company/dentsusoken/`
- LinkedIn display name: `電通総研_DENTSU SOKEN INC.`
- Disambiguation: avoid `DENTSU SOKEN USA, INC.` and `DCER, DENTSU SOKEN Center for Economic Security Research` unless the user explicitly asks for those entities.

## Productive LinkedIn People keywords

Use the logged-in company People page first:

- `Executive Officer` — surfaced senior executives and business-development leaders.
- `General Manager` — surfaced managers and heads, including global solutions.
- `Security` — surfaced security/cloud infrastructure sales and economic-security/business-development contacts.
- `DX` — surfaced DX strategy/director profiles.
- `Infrastructure` — surfaced infrastructure/financial solutions engineers.
- `Head` — surfaced Head of Global Solutions.
- `CTO` — low value for this target; only returned associate-manager/director-adjacent profiles.

## Accepted contacts from the session

Only include contacts after visible current-company/title evidence from the People card or profile page.

- 一丸丈巌 — Senior Executive Officer / Division Head — `https://www.linkedin.com/in/%E4%B8%88%E5%B7%8C-%E4%B8%80%E4%B8%B8-b975891ba/`
  - Profile evidence: `（株）電通総研 - 上席執行役員 ヒューマノロジー創発本部長`; current company button `電通総研_DENTSU SOKEN INC.`
- TAKAMITSU TERASHIMA — Executive Officer — `https://www.linkedin.com/in/takamitsu-terashima-791504157/`
  - Profile evidence: `株式会社電通総研　執行役員`; current company `株式会社電通総研`
- Tsuyoshi Kinugawa — GM / Head of Global Solutions — `https://www.linkedin.com/in/tsuyoshi-kinugawa-42542093/`
  - Profile evidence: `DENTSU SOKEN INC. - General Manager, Head of Global Solutions`; current company button `電通総研_DENTSU SOKEN INC.`
- Aritu O. — Director, DX Strategy — `https://www.linkedin.com/in/aritu-o-a5392050/`
  - Profile evidence: `Consulting Headquarters, Director of DX Strategy Department`; current company button `電通総研_DENTSU SOKEN INC.`
- Norifumi Watanabe — Chief DX Director / AI Master — `https://www.linkedin.com/in/norifumi-watanabe-5852b688/`
  - Profile evidence: `Chief DX Director / AI Master - Dentsu / Dentsu Soken`; current company button `電通総研_DENTSU SOKEN INC.`
- Takuma Akasawa — Security & Cloud Infra Sales — `https://www.linkedin.com/in/takuma-akasawa-68919a191/`
  - Profile evidence: `DENTSU SOKEN INC. - Security and Cloud-infra − Sales`; current company button `電通総研_DENTSU SOKEN INC.`
- Masayuki I. — Senior Project Director / HCM — `https://www.linkedin.com/in/masayuki-i-b951649a/`
  - Profile evidence: `Senior Project Director, Human Capital Management,DENTSU SOKEN INC.`; current company button `電通総研_DENTSU SOKEN INC.`
- Tatsuya KURAUCHI — Financial Solutions Engineer — `https://www.linkedin.com/in/tatsuya-kurauchi-411857328/`
  - Profile evidence: `DENTSU SOKEN INC. - Financial Solutions Engineer | System Design and Management`; current company button `電通総研_DENTSU SOKEN INC.`
- Kazuya Motoki — General Manager — `https://www.linkedin.com/in/kazuya-motoki-55439b203/`
  - People-card evidence: `General Manager at DENTSU SOKEN`; profile current company showed `ITID`, so treat as weaker than profiles with explicit `電通総研_DENTSU SOKEN INC.` profile company evidence.

## Shortlist logic used

Prioritize buying-authority and cyber/DX relevance:

1. 一丸丈巌 — senior executive/division head.
2. TAKAMITSU TERASHIMA — executive officer.
3. Tsuyoshi Kinugawa — GM / Head of Global Solutions.
4. Aritu O. — DX strategy director.
5. Norifumi Watanabe — Chief DX Director / AI Master.

Takuma Akasawa is security/cloud-infra relevant, but appears sales-oriented; include in main list and consider for security-specific outreach.

## Lessons

- For Dentsu Soken, Japanese titles (`上席執行役員`, `本部長`, `執行役員`) are more useful than Western `CTO/CISO` queries.
- The company formerly/also appears as ISID in profiles; accept ISID only when context clearly maps to Dentsu Soken or the People page lists the profile under `電通総研_DENTSU SOKEN INC.`. Prefer profile pages that show current company as `電通総研_DENTSU SOKEN INC.` or `株式会社電通総研`.
- Do not include evidence in the final user response by default; keep it in this reference for future auditability.
