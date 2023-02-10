import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import productApi from "../api/productApi";
import searchApi from "../api/searchApi";
import EcommerceCard from "./Card";
import { XsContainer } from "./Layout";

export const SearchResult = () => {
	const [listProduct, setListProduct] = useState(new Array(24).fill(null));

	const search = useLocation().search;

	useEffect(() => {
		const fetchListProduct = async () => {
			const key = new URLSearchParams(search).get("key");
			const response = await searchApi.listing({
				key: key,
			});
			let listProductId = response.data.listProductId;
			const productResponse = await productApi.listingSearch({
				listID: listProductId,
			});
			setListProduct(productResponse.data.listProduct);
		};

		fetchListProduct();
	}, [search]);

	return (
		<XsContainer marginTop="16px" marginBottom="32px">
			<Grid container spacing={1}>
				<Grid item container xs={12}>
					<Grid container spacing="4px">
						{listProduct.map((product, index) => (
							<Grid item xs={12} sm={6} md={3} lg={2} key={index}>
								<EcommerceCard product={product} />
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		</XsContainer>
	);
};
