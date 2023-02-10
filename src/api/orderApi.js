import { axiosClient } from "./axiosClient";

export const orderApi = {
	listing({ productID, orderQuantity, supplierID }) {
		const url = "/order/create";
		return axiosClient().post(url, {
			product_id: productID,
			order_quantity: orderQuantity,
			supplier_id: supplierID,
		});
	},
	waitingOrderByCustomer() {
		const url = "/order/waiting-by-customer";
		return axiosClient().get(url);
	},
	waitingOrderBySupplier() {
		const url = "/order/waiting-by-supplier";
		return axiosClient().get(url);
	},
	handledOrderByCustomer() {
		const url = "/order/handled-order-by-customer";
		return axiosClient().get(url);
	},
	deleteOrder({ id }) {
		const url = "/order/delete";
		return axiosClient().post(url, {
			orderId: id,
		});
	},
	handleOrder({ id }) {
		const url = "/order/handle";
		return axiosClient().post(url, {
			orderId: id,
		});
	},
};
