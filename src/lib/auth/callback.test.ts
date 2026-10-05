import assert from "node:assert/strict";
import { test } from "node:test";
import { getAuthCallbackPath } from "./callback";

test("recovery without next opens the password form instead of the dashboard", () => {
  assert.equal(getAuthCallbackPath(null, "recovery"), "/admin/reset-password");
});

test("recovery takes precedence over a dashboard destination", () => {
  assert.equal(getAuthCallbackPath("/admin", "recovery"), "/admin/reset-password");
});

test("explicit reset destinations still work without recovery metadata", () => {
  assert.equal(getAuthCallbackPath("/admin/reset-password", null), "/admin/reset-password");
});

test("ordinary sign-in and invitation callbacks preserve admin destinations", () => {
  assert.equal(getAuthCallbackPath(null, null), "/admin");
  assert.equal(getAuthCallbackPath("/admin/events", null), "/admin/events");
});

test("untrusted callback destinations fall back to the dashboard", () => {
  for (const next of ["https://example.com", "//example.com", "/admin\\example.com", "/administrator", "/admin?code=secret", "/admin#secret"]) {
    assert.equal(getAuthCallbackPath(next, null), "/admin");
  }
});
