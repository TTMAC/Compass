import { describe, it, expect } from "vitest";
import {
  buildUtmUrl,
  buildWhatsAppShareUrl,
  buildCopyLinkUrl,
} from "../../src/utils/utm-params";

describe("buildUtmUrl", () => {
  it("should add UTM parameters to a URL", () => {
    const result = buildUtmUrl("https://compass.co.za/articles/test", {
      source: "whatsapp",
      medium: "share",
      campaign: "article-test",
    });
    expect(result).toContain("utm_source=whatsapp");
    expect(result).toContain("utm_medium=share");
    expect(result).toContain("utm_campaign=article-test");
  });

  it("should preserve the base URL path", () => {
    const result = buildUtmUrl("https://compass.co.za/articles/test", {
      source: "twitter",
      medium: "social",
      campaign: "launch",
    });
    expect(result).toContain("https://compass.co.za/articles/test");
  });

  it("should handle URLs with existing query params", () => {
    const result = buildUtmUrl("https://compass.co.za/articles/test?foo=bar", {
      source: "whatsapp",
      medium: "share",
      campaign: "test",
    });
    expect(result).toContain("foo=bar");
    expect(result).toContain("utm_source=whatsapp");
  });
});

describe("buildWhatsAppShareUrl", () => {
  it("should create a WhatsApp share URL", () => {
    const result = buildWhatsAppShareUrl(
      "Test Title",
      "Test Subtitle",
      "https://compass.co.za/articles/test",
      "test",
    );
    expect(result).toContain("https://api.whatsapp.com/send?text=");
  });

  it("should include article title in the message", () => {
    const result = buildWhatsAppShareUrl(
      "The Architecture of the State",
      "Understanding SA governance",
      "https://compass.co.za/articles/1-1",
      "1-1",
    );
    const decodedText = decodeURIComponent(
      result.replace("https://api.whatsapp.com/send?text=", ""),
    );
    expect(decodedText).toContain("The Architecture of the State");
    expect(decodedText).toContain("Understanding SA governance");
    expect(decodedText).toContain("Read it here:");
    expect(decodedText).toContain("utm_source=whatsapp");
    expect(decodedText).toContain("Compass: Making SA");
  });

  it("should include the correct UTM campaign", () => {
    const result = buildWhatsAppShareUrl(
      "Title",
      "Sub",
      "https://compass.co.za/articles/1-1-test",
      "1-1-test",
    );
    const decodedText = decodeURIComponent(result);
    expect(decodedText).toContain("utm_campaign=article-1-1-test");
  });
});

describe("buildCopyLinkUrl", () => {
  it("should create a URL with clipboard UTM params", () => {
    const result = buildCopyLinkUrl(
      "https://compass.co.za/articles/test",
      "test",
    );
    expect(result).toContain("utm_source=clipboard");
    expect(result).toContain("utm_medium=share");
    expect(result).toContain("utm_campaign=article-test");
  });
});
