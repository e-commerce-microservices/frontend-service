import axios from "axios";
import authApi, { authHelper } from "./authApi";

function getToken() {
	const token = window.localStorage.getItem("authorization");
	return token;
}

export const axiosClient = () => {
	return axios.create({
		baseURL: "http://192.168.49.2:30100",
		headers: {
			"Content-Type": "application/json",
			authorization: getToken(),
		},
	});
};

axiosClient().interceptors.request.use(
	function (config) {
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

axiosClient().interceptors.response.use(
	(response) => response,
	async (error) => {
		const prevRequest = error?.config;
		if (error?.response?.status === 401 && !prevRequest?.sent) {
			prevRequest.sent = true;
			const response = await authApi.refresh({
				refreshToken: authHelper.getRefreshToken(),
			});
			authHelper.setToken({ accessToken: response.data.accessToken });
			console.log("set new access token: ", response.data.accessToken);
			prevRequest.headers["Authorization"] = response.data.accessToken;
			return axios(prevRequest);
		}
	}
);
