import { authHelper } from "./authApi";
import { axiosClient } from "./axiosClient";

export const orderApi = {
	create({ addr, listOrder }) {
		const url = "/order/create";
		return axiosClient.post(
			url,
			{
				addr: addr,
				list_order: listOrder,
			},
			{
				headers: {
					authorization: authHelper.getToken(),
				},
			}
		);
	},
	waitingOrderByCustomer() {
		const url = "/order/waiting-by-customer";
		return axiosClient.get(url, {
			headers: {
				authorization: authHelper.getToken(),
			},
		});
	},
	waitingOrderBySupplier() {
		const url = "/order/waiting-by-supplier";
		return axiosClient.get(url, {
			headers: {
				authorization: authHelper.getToken(),
			},
		});
	},
	handledOrderByCustomer() {
		const url = "/order/handled-order-by-customer";
		return axiosClient.get(url, {
			headers: {
				authorization: authHelper.getToken(),
			},
		});
	},
	handledCancelByCustomer() {
		const url = "/order/cancel-order-by-customer";
		return axiosClient.get(url, {
			headers: {
				authorization: authHelper.getToken(),
			},
		});
	},
	handledCancelBySupplier() {
		const url = "/order/cancel-order-by-supplier";
		return axiosClient.get(url, {
			headers: {
				authorization: authHelper.getToken(),
			},
		});
	},
	handledOrderBySupplier() {
		const url = "/order/handled-order-by-supplier";
		return axiosClient.get(url, {
			headers: {
				authorization: authHelper.getToken(),
			},
		});
	},
	deleteOrder({ id }) {
		const url = "/order/delete";
		return axiosClient.post(
			url,
			{
				orderId: id,
			},
			{
				headers: {
					authorization: authHelper.getToken(),
				},
			}
		);
	},
	handleOrder({ id }) {
		const url = "/order/handle";
		return axiosClient.post(
			url,
			{
				orderId: id,
			},
			{
				headers: {
					authorization: authHelper.getToken(),
				},
			}
		);
	},
};
