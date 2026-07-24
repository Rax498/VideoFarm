import axios from "axios";

export const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    query: "cat",
    geo: "US",
    maxResults: 50,
  },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

// Cache responses for the session: dedupes StrictMode's double-fired
// effects and repeat navigation, and survives page reloads — the free
// API plan has a small monthly quota, so every skipped call counts
const cache = new Map();

export const fetchFromAPI = (url) => {
  if (cache.has(url)) return cache.get(url);

  const stored = sessionStorage.getItem(`vf:${url}`);
  if (stored) {
    const promise = Promise.resolve(JSON.parse(stored));
    cache.set(url, promise);
    return promise;
  }

  const promise = axios
    .get(`${BASE_URL}/${url}`, options)
    .then(({ data }) => {
      try {
        sessionStorage.setItem(`vf:${url}`, JSON.stringify(data));
      } catch {
        // storage full — in-memory cache still applies
      }
      return data;
    })
    .catch((error) => {
      cache.delete(url); // don't cache failures, allow retry
      throw error;
    });
  cache.set(url, promise);
  return promise;
};

// Turn an axios error into a user-facing explanation, based on what the
// API itself reported — so the UI can say "quota used up" instead of
// looking like the site is broken
export const describeApiError = (error) => {
  const status = error?.response?.status;
  const apiMessage =
    error?.response?.data?.message || error?.response?.data?.messages || "";

  if (status === 429 && /monthly quota/i.test(apiMessage)) {
    return {
      kind: "quota",
      title: "Monthly request limit reached",
      message:
        "This site uses a free video-API plan and its monthly request quota is used up. The site itself is fine — videos will be back when the quota resets.",
      detail: apiMessage,
    };
  }
  if (status === 429) {
    return {
      kind: "rate",
      title: "Too many requests",
      message:
        "The video API is rate-limiting requests right now. Wait a few seconds and retry.",
      detail: apiMessage,
    };
  }
  if (status === 401 || status === 403) {
    return {
      kind: "auth",
      title: "API access problem",
      message:
        "The video API rejected the request — the API key may be missing or invalid.",
      detail: apiMessage,
    };
  }
  return {
    kind: "network",
    title: "Couldn't load videos",
    message:
      "The video API is unreachable. Check your connection and try again.",
    detail: apiMessage,
  };
};

export default fetchFromAPI;
