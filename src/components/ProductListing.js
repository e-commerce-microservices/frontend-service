import {
	Box,
	Grid,
	List,
	ListItemButton,
	ListSubheader,
	Pagination,
	Rating,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import productApi from "../api/productApi";
import EcommerceCard from "./Card";
import { XsContainer } from "./Layout";

export const ProductListing = () => {
	const [listProduct, setListProduct] = useState(new Array(18).fill(null));
	const [page, setPage] = useState(1);
	const handleUpdatePage = (event, value) => {
		setPage(value);
	};

	const search = useLocation().search;

	useEffect(() => {
		const fetchListProduct = async () => {
			const categoryId = new URLSearchParams(search).get("category_id");
			const response = await productApi.listing({
				limit: 24,
				offset: 24 * (page - 1),
				categoryId: categoryId,
			});
			setListProduct(response.data.listProduct);
		};

		fetchListProduct();
	}, [page]);

	return (
		<XsContainer marginTop="16px">
			<Grid container spacing={1}>
				<Grid item xs={0} md={3} lg={2}>
					<Filter />
				</Grid>
				<Grid item container xs={12} md={8} lg={10}>
					<Grid container spacing="4px">
						{listProduct.map((product, index) => (
							<Grid item xs={12} sm={6} md={3} lg={2} key={index}>
								<EcommerceCard product={product} />
							</Grid>
						))}
					</Grid>
					<Box
						sx={{
							margin: "16px auto",
							backgroundColor: "#FFF",
							padding: "16px",
							width: "100%",
							display: "flex",
							justifyContent: "center",
							borderRadius: "4px",
						}}
					>
						<Pagination
							count={10}
							page={page}
							onChange={handleUpdatePage}
							color="primary"
						/>
					</Box>
				</Grid>
			</Grid>
		</XsContainer>
	);
};

const Filter = () => {
	return (
		<Box>
			<List
				sx={{ width: "100%", bgcolor: "background.paper" }}
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						Đánh giá
					</ListSubheader>
				}
			>
				<ListItemButton>
					<StarFilter value={5} />
				</ListItemButton>
				<ListItemButton>
					<StarFilter value={4} />
				</ListItemButton>
				<ListItemButton>
					<StarFilter value={3} />
				</ListItemButton>
			</List>
			<List
				sx={{ width: "100%", bgcolor: "background.paper" }}
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						Giá sản phẩm
					</ListSubheader>
				}
			>
				<ListItemButton>
					<ConstPriceFilter value="Dưới 100.000 ₫" />
				</ListItemButton>
				<ListItemButton>
					<ConstPriceFilter value="100.000 -> 1.000.000 ₫" />
				</ListItemButton>
				<ListItemButton>
					<ConstPriceFilter value="Trên 1.000.000 ₫" />
				</ListItemButton>
			</List>
			<List
				sx={{ width: "100%", bgcolor: "background.paper" }}
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						Lượt mua
					</ListSubheader>
				}
			>
				<ListItemButton>
					<ConstPriceFilter value="Mua nhiều nhất" />
				</ListItemButton>
			</List>
			<List
				sx={{ width: "100%", bgcolor: "background.paper" }}
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						Lượt nhận xét
					</ListSubheader>
				}
			>
				<ListItemButton>
					<ConstPriceFilter value="Nhận xét nhiều nhất" />
				</ListItemButton>
			</List>
		</Box>
	);
};

const StarFilter = ({ value }) => {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Rating readOnly value={value} size="small" />
			</Box>
			<Typography
				sx={{ marginLeft: "4px", fontSize: "14px" }}
				variant="body2"
				color="text.secondary"
			>
				từ {value} sao
			</Typography>
		</Box>
	);
};

const ConstPriceFilter = ({ value }) => {
	return (
		<Typography
			variant="body2"
			sx={{
				fontWeight: "500",
				fontSize: "12px",
				borderRadius: "15px",
				padding: "3px 8px",
				backgroundColor: "#eee",
			}}
			color="text.secondary"
		>
			{value}
		</Typography>
	);
};
