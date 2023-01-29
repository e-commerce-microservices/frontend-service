import { axiosClient } from "./axiosClient";

const categoryApi = {
	getAll() {
		const url = "/category/listing";
		return axiosClient.get(url, { method: "GET" });
	},
};

export default categoryApi;
