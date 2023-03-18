import { authHelper } from "./authApi";
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
	getUserById({ userId }) {
		const url = "/user/get-by-id";
		return axiosClient.post(
			url,
			{
				list_user_id: userId,
			},
			{
				headers: {
					authorization: authHelper.getToken(),
				},
			}
		);
	},
	updateProfile({ userName, phone, address, note }) {
		const url = "/user/update-profile";
		return axiosClient.post(
			url,
			{
				user_name: userName,
				phone: phone,
				address: address,
				note: note,
			},
			{
				headers: {
					authorization: authHelper.getToken(),
				},
			}
		);
	},
};

export default userApi;
