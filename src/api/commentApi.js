import { axiosClient } from "./axiosClient";

export const commentApi = {
	listing({ productId }) {
		const url = "/review/get-by-product-id";
		return axiosClient().post(url, {
			product_id: productId,
		});
	},
	create({ productId, content, imageDataChunk, numStar }) {
		const url = "/review/create";
		return axiosClient().post(url, {
			product_id: productId,
			content: content,
			image_data_chunk: imageDataChunk,
			num_star: numStar,
		});
	},
};
