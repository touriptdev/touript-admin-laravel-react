import { fetchUtils } from "react-admin";
import { getToken } from "./authProvider";

const apiUrl = "http://127.0.0.1:8000/api/admin";

const httpClient = (url, options = {}) => {
    const opts = { ...options };
    opts.headers = opts.headers || new Headers();
    const token = getToken();
    if (token) opts.headers.set("Authorization", `Bearer ${token}`);
    return fetchUtils.fetchJson(url, opts);
};

const hasFile = (data) => Object.values(data).some(v => v && v.rawFile instanceof File);

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
        return { data: json.data, total: json.meta.total };
    },

    getOne: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`);
        return { data: json.data ?? json };
    },

    create: async (resource, params) => {
        if (hasFile(params.data)) {
            const formData = new FormData();
            Object.keys(params.data).forEach(key => {
                const value = params.data[key];
                if (value && value.rawFile instanceof File) formData.append(key, value.rawFile);
                else if (value !== undefined && value !== null) formData.append(key, value);
            });
            const { json } = await httpClient(`${apiUrl}/${resource}`, {
                method: "POST",
                body: formData, // browser sets Content-Type automatically
            });
            return { data: json.data };
        }

        const { json } = await httpClient(`${apiUrl}/${resource}`, {
            method: "POST",
            body: JSON.stringify(params.data),
            headers: new Headers({ "Content-Type": "application/json" }),
        });
        return { data: json.data };
    },

    update: async (resource, params) => {
        if (hasFile(params.data)) {
            const formData = new FormData();
            Object.keys(params.data).forEach(key => {
                const value = params.data[key];
                if (value && value.rawFile instanceof File) formData.append(key, value.rawFile);
                else if (value !== undefined && value !== null) formData.append(key, value);
            });
            const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: "POST", // Laravel can accept POST with _method=PUT if needed
                body: formData,
            });
            return { data: json.data };
        }

        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
            headers: new Headers({ "Content-Type": "application/json" }),
        });
        return { data: json.data };
    },

    delete: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: "DELETE",
        });
        return { data: json.data ?? { id: params.id } };
    },
};

export default dataProvider;
