const API_BASE = "https://newsapi.org/v2";

const ApiService = {
  get: async <ResponseType = any>(url: string) => {
    const data = await fetch(API_BASE + url, {
      headers: [["X-Api-Key", process.env.API_KEY || ""]],
    });
    return data.json() as ResponseType;
  },

  post: async <ResponseType = any>(url: string, body?: any) => {
    const data = await fetch(API_BASE + url, {
      method: "POST",
      body,
      headers: [["X-Api-Key", process.env.API_KEY || ""]],
    });
    return data.json() as ResponseType;
  },
};

export default ApiService;
