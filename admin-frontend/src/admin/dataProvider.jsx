// src/dataProvider.jsx
import { fetchUtils } from "react-admin";
import { getToken } from "./authProvider";

// ✅ HARD-CODED API BASE – Laravel backend
// const API_BASE = "http://127.0.0.1:8000/api/admin";

// ✅ Relative URL – goes through Vite proxy
const apiUrl = "/api/admin";

const httpClient = (url, options = {}) => {
  const opts = { ...options };
  opts.headers = opts.headers || new Headers();

  const token = getToken();
  if (token) {
    opts.headers.set("Authorization", `Bearer ${token}`);
  }

  // 🔴 Guard: if the URL isn't pointing to our backend API, explode
  if (!url.startsWith(apiUrl)) {
    console.error("❌ WRONG URL passed to httpClient:", url);
    throw new Error("WRONG URL passed to httpClient: " + url);
  }

  console.log("HTTP", opts.method || "GET", url);

  return fetchUtils.fetchJson(url, opts);
};

const hasFile = (data) =>
  Object.values(data).some((v) => v && v.rawFile instanceof File);

const dataProvider = {
  // LIST: GET /api/admin/posts
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const query = {
      page,
      per_page: perPage,
      sort: field,
      order,
      ...params.filter,
    };

    const url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
    const { json } = await httpClient(url);

    return {
      data: json.data,
      total: json.meta.total,
    };
  },

  // GET ONE: GET /api/admin/posts/:id
  getOne: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url);
    return { data: json.data ?? json };
  },

  // CREATE: POST /api/admin/posts
  create: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;

    if (hasFile(params.data)) {
      const formData = new FormData();
      Object.keys(params.data).forEach((key) => {
        const value = params.data[key];
        if (value && value.rawFile instanceof File) {
          formData.append(key, value.rawFile);
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const { json } = await httpClient(url, {
        method: "POST",
        body: formData,
      });

      return { data: json.data ?? json };
    }

    const { json } = await httpClient(url, {
      method: "POST",
      body: JSON.stringify(params.data),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    return { data: json.data ?? json };
  },

  // UPDATE: PUT (partial update allowed because of "sometimes" rules)
  update: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const payload = params.data || {};

    if (hasFile(payload)) {
      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        const value = payload[key];
        if (value && value.rawFile instanceof File) {
          formData.append(key, value.rawFile);
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      // Use PUT override
      formData.append("_method", "PUT");

      const { json } = await httpClient(url, {
        method: "POST",
        body: formData,
      });

      return { data: json.data ?? json };
    }

    const { json } = await httpClient(url, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    return { data: json.data ?? json };
  },

  // DELETE: DELETE /api/admin/posts/:id
  delete: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url, {
      method: "DELETE",
    });

    return { data: json.data ?? { id: params.id } };
  },
};

export default dataProvider;
