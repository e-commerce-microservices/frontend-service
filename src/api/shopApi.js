import { authHelper } from "./authApi";
import { axiosClient } from "./axiosClient";

const shopApi = {
	register({ accessToken, shopName }) {
		const url = "/shop/register";
		return axiosClient.post(
			url,
			{
				name: shopName,
			},
			{
				headers: {
					authorization: accessToken,
				},
			}
		);
	},
	createProduct({
		productName,
		productPrice,
		productInventory,
		productCategory,
		productBrand,
		productThumbnail,
	}) {
		const url = "/shop/add-product";
		let accessToken = authHelper.getToken();
		return axiosClient.post(
			url,
			{
				category_id: productCategory,
				product_name: productName,
				price: productPrice,
				thumbnailDataChunk: productThumbnail,
				inventory: productInventory,
				brand: productBrand,
			},
			{
				headers: {
					authorization: accessToken,
				},
			}
		);
	},
	deleteProduct() {},
	updateProduct() {},
};

export default shopApi;
