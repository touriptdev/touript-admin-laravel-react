import { fetchUtils } from "react-admin";
import { getToken } from "./authProvider";

const apiUrl = "/api/admin";

const httpClient = (url, options = {}) => {
  const opts = { ...options };
  opts.headers = new Headers(opts.headers || { "Content-Type": "application/json" });
  const token = getToken();
  if (token) opts.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, opts);
};

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
    const data = json.data ?? json.items ?? [];
    const total = json.meta?.total ?? data.length;
    return { data, total };
  },

  getOne: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`);
    return { data: json.data ?? json };
  },

  getMany: async (resource, params) => {
    const url = `${apiUrl}/${resource}?ids=${params.ids.join(",")}`;
    const { json } = await httpClient(url);
    return { data: json.data ?? json };
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      page,
      per_page: perPage,
      sort: field,
      order,
      [params.target]: params.id,
      ...params.filter,
    };
    const url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
    const { json } = await httpClient(url);
    const data = json.data ?? json.items ?? [];
    const total = json.meta?.total ?? data.length;
    return { data, total };
  },

  create: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    const payload = json.data ?? json;
    return { data: { ...params.data, ...payload } };
  },

  update: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return { data: json.data ?? json };
  },

  updateMany: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: "PATCH",
      body: JSON.stringify({ ids: params.ids, ...params.data }),
    });
    const items = json.data ?? json;
    return { data: (items || []).map((i) => i.id) };
  },

  delete: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    });
    return { data: json.data ?? { id: params.id } };
  },

  deleteMany: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: "DELETE",
      body: JSON.stringify({ ids: params.ids }),
    });
    const items = json.data ?? json;
    return { data: (items || []).map((i) => i.id) };
  },
};

export default dataProvider;
