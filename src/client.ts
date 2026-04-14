import { DatamuseWord } from "./types.js";

const BASE_URL = "https://api.datamuse.com";
const TIMEOUT_MS = 10000;
const MAX_RETRIES = 3;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

type QueryParams = Record<string, string | number | undefined>;

interface CacheEntry {
  data: DatamuseWord[];
  expiry: number;
}

class DatamuseClient {
  private cache = new Map<string, CacheEntry>();

  async words(params: QueryParams): Promise<DatamuseWord[]> {
    return this.request("/words", params);
  }

  async suggest(params: QueryParams): Promise<DatamuseWord[]> {
    return this.request("/sug", params);
  }

  private async request(endpoint: string, params: QueryParams): Promise<DatamuseWord[]> {
    const url = this.buildUrl(endpoint, params);

    // Check cache
    const cached = this.cache.get(url);
    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }

    // Fetch with retry
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

        const response = await fetch(url, {
          signal: controller.signal,
          headers: { "User-Agent": "datamuse-mcp/1.0.0" },
        });

        clearTimeout(timeout);

        if (!response.ok) {
          if (response.status === 429) {
            throw new Error("Rate limit exceeded (100k requests/day)");
          }
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = (await response.json()) as DatamuseWord[];

        // Cache response
        this.cache.set(url, {
          data,
          expiry: Date.now() + CACHE_TTL_MS,
        });

        return data;
      } catch (error) {
        lastError = error as Error;
        if (attempt < MAX_RETRIES) {
          await this.delay(1000 * attempt);
        }
      }
    }

    throw lastError ?? new Error("Request failed");
  }

  private buildUrl(endpoint: string, params: QueryParams): string {
    const url = new URL(endpoint, BASE_URL);
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
    return url.toString();
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const client = new DatamuseClient();
