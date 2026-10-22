# story2tests — Playwright test suite for SauceDemo

## Commands
- Run all tests: `npx playwright test`
- Run one file: `npx playwright test tests/<file>.spec.ts --reporter=list`
- Open report: `npx playwright show-report`

## Structure
- Page objects in `pages/` (one class per page), specs in `tests/`
- Test data in `test-data/users.ts`
- Every test title starts with its AC id, e.g. "AC2 locked out user sees error"
