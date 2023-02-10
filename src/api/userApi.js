import { axiosClient } from "./axiosClient";

const userApi = {
	me({ accessToken }) {
		const url = "/user/me";
		return axiosClient().get(url, {
			headers: {
				"Content-Type": "application/json",
				authorization: accessToken,
			},
		});
	},
	getUserById({ userId }) {
		const url = "/user/get-by-id";
		return axiosClient().post(url, {
			list_user_id: userId,
		});
	},
};

export default userApi;
