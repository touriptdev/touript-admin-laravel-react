import { fetchUtils } from "react-admin";
import { getToken } from "./authProvider";

const apiUrl = "http://localhost:8000/api/admin";

const httpClient = (url, options = {}) => {
  const opts = { ...options };
  opts.headers = opts.headers || new Headers();

  // Add auth header
  const token = getToken();
  if (token) {
    opts.headers.set("Authorization", `Bearer ${token}`);
  }

  // For JSON requests
  if (!(opts.body instanceof FormData)) {
    opts.headers.set("Accept", "application/json");
    if (opts.method && opts.method !== "GET") {
      opts.headers.set("Content-Type", "application/json");
    }
  }

  console.log("HTTP", opts.method || "GET", url);

  return fetchUtils.fetchJson(url, opts);
};

const hasFile = (data) =>
  Object.values(data).some((v) => v && v.rawFile instanceof File);

const dataProvider = {
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

  getOne: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url);
    return { data: json.data ?? json };
  },

  create: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    const data = params.data;

    // File upload
    if (hasFile(data)) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        const value = data[key];
        if (value?.rawFile instanceof File) {
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

    // Normal POST
    const { json } = await httpClient(url, {
      method: "POST",
      body: JSON.stringify(data),
    });

    return { data: json.data ?? json };
  },

  update: async (resource, params) => {
  const url = `${apiUrl}/${resource}/${params.id}`;
  const data = { ...params.data };

  // Remove fields that should not be sent to backend
  delete data.cover_image_url;  // frontend display-only field

  const hasNewFile =
    data.cover_image &&
    data.cover_image.rawFile instanceof File;

  // If there is a new file, send multipart/form-data
  if (hasNewFile) {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (key === "cover_image" && value.rawFile instanceof File) {
        formData.append("cover_image", value.rawFile);
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    // Laravel requires PUT override
    formData.append("_method", "PUT");

    const { json } = await httpClient(url, {
      method: "POST",
      body: formData,
    });

    return { data: json.data ?? json };
  }

    // No new file → send JSON without cover_image
    delete data.cover_image;

    const { json } = await httpClient(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    return { data: json.data ?? json };
  },


  delete: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url, {
      method: "DELETE",
    });

    return { data: json.data ?? { id: params.id } };
    },
  };

export default dataProvider;
