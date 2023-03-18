import { axiosClient } from "./axiosClient";

const searchApi = {
	listing({ key }) {
		const url = "/search/product";
		return axiosClient.post(url, {
			product_name: key,
		});
	},
};

export default searchApi;
