import { describe, it, expect } from "vitest";
import { calculateReadingTime, getWordCount } from "../../src/utils/reading-time";

describe("calculateReadingTime", () => {
  it("should return 1 minute for a very short text", () => {
    expect(calculateReadingTime("Hello world")).toBe(1);
  });

  it("should return 1 minute for exactly 200 words", () => {
    const words = Array(200).fill("word").join(" ");
    expect(calculateReadingTime(words)).toBe(1);
  });

  it("should return 2 minutes for 201 words", () => {
    const words = Array(201).fill("word").join(" ");
    expect(calculateReadingTime(words)).toBe(2);
  });

  it("should return 5 minutes for 1000 words", () => {
    const words = Array(1000).fill("word").join(" ");
    expect(calculateReadingTime(words)).toBe(5);
  });

  it("should return 0 for empty string", () => {
    expect(calculateReadingTime("")).toBe(0);
  });

  it("should return 0 for whitespace-only string", () => {
    expect(calculateReadingTime("   \n\t  ")).toBe(0);
  });

  it("should handle multiple spaces between words", () => {
    const text = "word   word   word";
    expect(calculateReadingTime(text)).toBe(1);
  });

  it("should handle newlines and tabs", () => {
    const text = "word\nword\tword";
    expect(calculateReadingTime(text)).toBe(1);
  });

  it("should always return at least 1 for non-empty text", () => {
    expect(calculateReadingTime("a")).toBe(1);
  });

  it("should ceil the reading time", () => {
    const words = Array(401).fill("word").join(" ");
    expect(calculateReadingTime(words)).toBe(3);
  });
});

describe("getWordCount", () => {
  it("should return 0 for empty string", () => {
    expect(getWordCount("")).toBe(0);
  });

  it("should return 0 for whitespace-only string", () => {
    expect(getWordCount("   \n\t  ")).toBe(0);
  });

  it("should count words correctly", () => {
    expect(getWordCount("one two three")).toBe(3);
  });

  it("should handle multiple spaces", () => {
    expect(getWordCount("one   two   three")).toBe(3);
  });

  it("should handle leading and trailing whitespace", () => {
    expect(getWordCount("  hello world  ")).toBe(2);
  });

  it("should count a single word", () => {
    expect(getWordCount("hello")).toBe(1);
  });
});
