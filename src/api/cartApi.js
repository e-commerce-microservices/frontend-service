import { authHelper } from "./authApi";
import { axiosClient } from "./axiosClient";

export const cartApi = {
	getAll() {
		const url = "/cart/get-all";
		return axiosClient.post(
			url,
			{},
			{
				headers: {
					authorization: authHelper.getToken(),
				},
			}
		);
	},
	create({ productId, quantity }) {
		const url = "/cart/create";
		return axiosClient.post(
			url,
			{
				product_id: productId,
				quantity: quantity,
			},
			{
				headers: {
					authorization: authHelper.getToken(),
				},
			}
		);
	},
	delete({ cartId }) {
		const url = "/cart/delete";
		return axiosClient.post(
			url,
			{
				cart_id: cartId,
			},
			{
				headers: {
					authorization: authHelper.getToken(),
				},
			}
		);
	},
};
