import { axiosClient } from "./axiosClient";

const productApi = {
	listing({ categoryId, limit, offset }) {
		const url = "/product/listing";
		return axiosClient().post(url, {
			category_id: categoryId,
			limit: limit,
			offset: offset,
		});
	},
	listingSearch({ listID }) {
		const url = "/product/list-product-by-ids";
		return axiosClient().post(url, {
			list_id: listID,
		});
	},
	detail({ productId }) {
		const url = "/product/detail";
		return axiosClient().post(url, {
			product_id: productId,
		});
	},
	recommend({ limit, offset }) {
		const url = "/product/recommend";
		return axiosClient().post(url, {
			limit: limit,
			offset: offset,
		});
	},
	supplier({ supplierId, limit, offset }) {
		const url = "/product/supplier";
		return axiosClient().post(url, {
			supplier_id: supplierId,
			limit: limit,
			offset: offset,
		});
	},
	update({ productId, name, price, inventory, brand }) {
		const url = "/product/update";
		return axiosClient().post(url, {
			product_id: productId,
			name: name,
			price: price,
			inventory: inventory,
			brand: brand,
		});
	},
};

export default productApi;
