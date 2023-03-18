import { authHelper } from "./authApi";
import { axiosClient } from "./axiosClient";

const productApi = {
	listing({ categoryId, limit, offset, byPriceDesc, byPriceInc, byTime }) {
		const url = "/product/listing";
		return axiosClient.post(url, {
			category_id: categoryId,
			limit: limit,
			offset: offset,
			byPriceDesc,
			byPriceInc,
			byTime,
		});
	},
	listingSearch({ listID }) {
		const url = "/product/list-product-by-ids";
		return axiosClient.post(url, {
			list_id: listID,
		});
	},
	detail({ productId }) {
		const url = "/product/detail";
		return axiosClient.post(url, {
			product_id: productId,
		});
	},
	recommend({ limit, offset }) {
		const url = "/product/recommend";
		return axiosClient.post(url, {
			limit: limit,
			offset: offset,
		});
	},
	supplier({
		supplierId,
		limit,
		offset,
		byPriceDesc,
		byPriceInc,
		byTime,
		categoryId,
	}) {
		const url = "/product/supplier";
		return axiosClient.post(
			url,
			{
				supplier_id: supplierId,
				limit: limit,
				offset: offset,
				byPriceDesc,
				byPriceInc,
				byTime,
				category_id: categoryId,
			},
			{
				headers: {
					authorization: authHelper.getToken(),
				},
			}
		);
	},
	update({ productId, name, price, inventory, brand }) {
		const url = "/product/update";
		return axiosClient.post(
			url,
			{
				product_id: productId,
				name: name,
				price: price,
				inventory: inventory,
				brand: brand,
			},
			{
				headers: {
					authorization: authHelper.getToken(),
				},
			}
		);
	},
	supplierCategory({ supplierId }) {
		const url = "/product/category-supplier";
		return axiosClient.post(
			url,
			{
				supplier_id: supplierId,
			},
			{
				headers: {
					authorization: authHelper.getToken(),
				},
			}
		);
	},
};

export default productApi;
