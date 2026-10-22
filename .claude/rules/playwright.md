---
paths:
  - "tests/**/*.ts"
  - "pages/**/*.ts"
---
# Playwright rules
- Prefer getByRole, getByPlaceholder, getByTestId (SauceDemo exposes data-test attributes)
- Never use page.waitForTimeout; use web-first assertions (expect(locator).toBeVisible())
- Assert on exact error text captured from the live app, not guessed text
- One behaviour per test; shared login goes in a fixture or beforeEach
