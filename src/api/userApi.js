import { axiosClient } from "./axiosClient";

const userApi = {
	me({ accessToken }) {
		const url = "/user/me";
		return axiosClient.get(url, {
			headers: {
				"Content-Type": "application/json",
				authorization: accessToken,
			},
		});
	},
};

export default userApi;
