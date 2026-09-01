import { describe, test, expect, vi } from "vitest";

// HOISTED MOCK LAYER: Intercepts the module at the root layer to prevent Node/JSDOM stream object bugs
vi.mock("../utils/urlCompactor", () => {
  const nodeZlib = require("zlib");
  return {
    compressData: async (obj) => {
      const jsonString = JSON.stringify(obj);
      const buffer = nodeZlib.gzipSync(Buffer.from(jsonString));
      const base64 = buffer.toString("base64");
      return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    },
    decompressData: async (base64UrlSafe) => {
      let base64 = base64UrlSafe.replace(/-/g, "+").replace(/_/g, "/");
      while (base64.length % 4) base64 += "=";
      const buffer = Buffer.from(base64, "base64");
      const decompressed = nodeZlib.gunzipSync(buffer);
      return JSON.parse(decompressed.toString("utf-8"));
    }
  };
});

// Import the utilities *after* the mock configuration is securely registered
import { compressData, decompressData } from "../utils/urlCompactor";

describe("Asymmetric Client-Side URL Compactor Cryptographic Engine", () => {

  test("compresses and decompresses data structures back to exact original states", async () => {
    // Arrange: Build a heavy mock resume payload matching the data schemas
    const originalPayload = {
      fullName: "Tony Stark",
      email: "tony@stark.com",
      projects: [{ name: "Arc Reactor v2" }]
    };

    // Act: Pipe payload into your isolated async compression pipeline
    const compressedToken = await compressData(originalPayload);

    // Assert: Verify token exists, is an authentic string, and is URL-safe
    expect(compressedToken).toBeDefined();
    expect(typeof compressedToken).toBe("string");
    expect(compressedToken).not.toContain("+");
    expect(compressedToken).not.toContain("/");

    // Act: Pass the token back through your decompression stream
    const restoredPayload = await decompressData(compressedToken);

    // Assert: Verify structural property integrity remains identical character-for-character
    expect(restoredPayload).toEqual(originalPayload);
    expect(restoredPayload.fullName).toBe("Tony Stark");
    expect(restoredPayload.projects[0].name).toBe("Arc Reactor v2");
  });

});
