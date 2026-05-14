# Blocker Policy

Stop immediately when the browser shows any of these:

- login wall
- CAPTCHA/security check
- checkpoint or 2FA prompt
- account restriction
- unusual activity warning
- page that is not accessible to the operator

## Do not bypass

The agent must not solve, bypass, retry through, evade, or disguise activity around these screens.

## What to do

1. Save current work.
2. Record the URL and page title.
3. Tell the operator what happened.
4. Stop browser actions until the operator manually resolves the issue or cancels.

## Message template

```text
I hit a LinkedIn blocker: <type>. I saved current results to prospect-output/. Please handle this manually in the browser if you want to continue. I will not bypass or automate around this screen.
```
