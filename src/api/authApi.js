import { axiosClient } from "./axiosClient";

const authApi = {
	register({ username, email, password }) {
		const url = "/auth/register";
		return axiosClient.post(url, { username, email, password });
	},
	login({ email, password }) {
		const url = "/auth/login";
		return axiosClient.post(url, { email, password });
	},
	refresh({ refreshToken }) {
		const url = "/auth/refresh";
		return axiosClient.post(url, { refreshToken });
	},
};

const authHelper = {
	setToken({ accessToken }) {
		window.localStorage.setItem("authorization", accessToken);
	},
	setUser({ user }) {
		window.localStorage.setItem("user", JSON.stringify(user));
	},
	setRefresh({ refreshToken }) {
		window.localStorage.setItem("refreshToken", refreshToken);
	},
	getToken() {
		console.log("get authorization token");
		return window.localStorage.getItem("authorization");
	},
	getUser() {
		return JSON.parse(window.localStorage.getItem("user"));
	},
	getRefreshToken() {
		return window.localStorage.getItem("refreshToken");
	},
	logOut() {
		window.localStorage.removeItem("authorization");
		window.localStorage.removeItem("refreshToken");
		window.localStorage.removeItem("user");
	},
	isAdmin() {
		const user = JSON.parse(window.localStorage.getItem("user"));
		return user.role == "admin";
	},
	isSupplier() {
		const user = JSON.parse(window.localStorage.getItem("user"));
		return user.role == "admin" || user.role == "supplier";
	},
};

export { authHelper };

export default authApi;
