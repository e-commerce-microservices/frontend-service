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
		productThumbnail,
		productDesc,
		productBrand,
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
				desc: productDesc,
				brand: productBrand,
			},
			{
				headers: {
					authorization: accessToken,
				},
			}
		);
	},
	deleteProduct({ productId }) {
		const url = "/shop/delete";
		return axiosClient.post(
			url,
			{
				product_id: productId,
			},
			{
				headers: {
					authorization: authHelper.getToken(),
				},
			}
		);
	},
	updateProduct({
		productName,
		productPrice,
		productInventory,
		productBrand,
		productId,
	}) {
		const url = "/shop/update";
		return axiosClient.post(
			url,
			{
				product_id: productId,
				name: productName,
				price: productPrice,
				inventory: productInventory,
				brand: productBrand,
			},
			{
				headers: {
					authorization: authHelper.getToken(),
				},
			}
		);
	},
	getShop({ shopId }) {
		const url = "/shop/get";
		return axiosClient.post(url, { shop_id: shopId });
	},
	updateShopName({ name }) {
		const url = "/shop/update-shop-name";
		return axiosClient.post(
			url,
			{
				name: name,
			},
			{
				headers: {
					authorization: authHelper.getToken(),
				},
			}
		);
	},
};

export default shopApi;
