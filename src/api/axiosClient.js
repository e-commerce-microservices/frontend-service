import axios from "axios";

function getToken() {
	const token = window.localStorage.getItem("authorization");
	return token;
}

export const axiosClient = axios.create({
	baseURL: "http://192.168.49.2:30100",
	headers: {
		"Content-Type": "application/json",
		authorization: getToken(),
	},
});

axiosClient.interceptors.request.use(
	function (config) {
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);
