import { describe, it, expect } from "vitest";

describe("smoke test", () => {
  it("should pass basic assertions", () => {
    expect(true).toBe(true);
  });

  it("should have correct project name", () => {
    expect("compass").toBeTruthy();
  });
});
