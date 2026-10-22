---
name: story-to-tests
description: Converts a user story (Jira key like QA-101, or a path to a .md story) into Playwright tests with page objects and an AC traceability matrix. Use when the user asks to automate, cover or write tests for a story.
argument-hint: [jira-key-or-story-file]
---

Story source: $ARGUMENTS

1. Get the story.
   - If it looks like a Jira key, fetch it with the Atlassian MCP tools.
   - Otherwise read the file path.
   List every acceptance criterion with its id.

2. Design test cases before coding. Output a table:
   | TC id | AC id | Type (positive/negative/boundary) | Steps | Expected |
   Add at least one negative case per AC where it makes sense.

3. Explore the live app with the Playwright MCP browser tools at
   https://www.saucedemo.com to confirm real locators and capture the
   EXACT text of every error message. Do not guess selectors or text.

4. Write page objects in pages/ and specs in tests/, following
   CLAUDE.md and .claude/rules/playwright.md.

5. Run: npx playwright test --reporter=list
   Fix failures caused by the tests themselves. If a failure looks like a
   real product bug, do NOT change the assertion — report it.

6. Finish with:
   - Traceability matrix: AC id -> test titles -> PASS/FAIL
   - Any product bugs found, in bug-report format
   - Coverage gaps (ACs you could not automate and why)
