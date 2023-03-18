import { authHelper } from "./authApi";
import { axiosClient } from "./axiosClient";

const reportApi = {
	createReport({ productId, description }) {
		const url = "/report/create";
		return axiosClient.post(
			url,
			{
				product_id: productId,
				description: description,
			},
			{
				headers: {
					authorization: authHelper.getToken(),
				},
			}
		);
	},
	handleReport({ reportId }) {
		const url = "/report/handle";
		return axiosClient.post(
			url,
			{
				report_id: reportId,
			},
			{
				headers: {
					authorization: authHelper.getToken(),
				},
			}
		);
	},
	deleteReport({ reportId }) {
		const url = "/report/delete";
		return axiosClient.post(
			url,
			{
				report_id: reportId,
			},
			{
				headers: {
					authorization: authHelper.getToken(),
				},
			}
		);
	},
	getAllReport() {
		const url = "/report/get";
		return axiosClient.get(url, {
			headers: {
				authorization: authHelper.getToken(),
			},
		});
	},
};

export default reportApi;
