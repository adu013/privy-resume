/**
 * Compresses a JSON object into a URL-safe GZIP Base64 string
 */
export async function compressData(obj) {
  try {
    const stream = new Blob([JSON.stringify(obj)], { type: "application/json" }).stream();
    // Use the native browser Compression Stream API
    const compressedStream = stream.pipeThrough(new CompressionStream("gzip"));

    const response = new Response(compressedStream);
    const buffer = await response.arrayBuffer();

    // Convert array buffer to standard base64 string
    const binary = String.fromCharCode(...new Uint8Array(buffer));
    const base64 = btoa(binary);

    // Make Base64 string URL-safe by converting characters (+ to -, / to _, and stripping padding)
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  } catch (err) {
    console.error("URL Compression Failed:", err);
    return null;
  }
}

/**
 * Decompresses a URL-safe GZIP Base64 string back into a JSON object
 */
export async function decompressData(base64UrlSafe) {
  try {
    // Restore standard Base64 formatting parameters
    let base64 = base64UrlSafe.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) base64 += "=";

    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const stream = new Blob([bytes]).stream();
    // Pipe it back through Decompression Stream
    const decompressedStream = stream.pipeThrough(new DecompressionStream("gzip"));

    const response = new Response(decompressedStream);
    const text = await response.text();
    return JSON.parse(text);
  } catch (err) {
    console.error("URL Decompression Failed:", err);
    return null;
  }
}
