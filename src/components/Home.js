import { Grid, Pagination } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { Box } from "@mui/system";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import categoryApi from "../api/categoryApi";
import productApi from "../api/productApi";
import EcommerceCard from "./Card";
import { XsContainer } from "./Layout";

export const Home = () => {
	const [listProduct, setListProduct] = useState(new Array(18).fill(null));
	const [page, setPage] = React.useState(1);
	const handleUpdatePage = (event, value) => {
		setPage(value);
	};

	useEffect(() => {
		const fetchListProduct = async () => {
			const response = await productApi.recommend({
				limit: 24,
				offset: 24 * (page - 1),
			});
			console.log(response.data.listProduct);
			setListProduct(response.data.listProduct);
		};

		fetchListProduct();
	}, [page]);

	return (
		<XsContainer marginTop="16px">
			<Grid container spacing={1}>
				<Grid item xs={0} md={4} lg={3}>
					<CategoryListing />
				</Grid>
				<Grid item container xs={12} md={8} lg={9}>
					<Grid container spacing={1}>
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
			<Box sx={{ marginTop: "16px", height: "30px" }}></Box>
		</XsContainer>
	);
};

const CategoryImage = ({ src }) => {
	return (
		<Box>
			<img
				src={src}
				style={{ width: "32px", height: "32px" }}
				alt="category type"
			/>
		</Box>
	);
};

const CategoryListing = () => {
	const [listCategory, setListCategory] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const response = await categoryApi.getAll();
			setListCategory(response.data.listCategory);
		};

		fetchCategories();
	}, []);

	return (
		<Box>
			<List
				sx={{
					width: "100%",
					bgcolor: "background.paper",
					borderRadius: "8px",
				}}
				component="nav"
				aria-labelledby="category-list-subheader"
				subheader={
					<ListSubheader
						component="div"
						id="category-list-subheader"
						sx={{ borderRadius: "8px" }}
					>
						Danh mục sản phẩm
					</ListSubheader>
				}
			>
				{listCategory.map((category, index) => (
					<ListItemButton
						key={category.categoryId}
						component={Link}
						to={"/product_listing?category_id=" + category.categoryId}
					>
						<ListItemIcon sx={{ minWidth: "40px" }}>
							<CategoryImage src={category.thumbnail} />
						</ListItemIcon>
						<ListItemText primary={category.name} />
					</ListItemButton>
				))}
			</List>
			<List
				sx={{
					width: "100%",
					bgcolor: "background.paper",
					borderRadius: "8px",
					marginTop: "16px",
				}}
				component="nav"
				aria-labelledby="category-list-subheader"
			>
				<ListItemButton component={Link} to="/supplier/register">
					<ListItemIcon sx={{ minWidth: "40px" }}>
						<CategoryImage src="https://salt.tikicdn.com/cache/100x100/ts/upload/08/2f/14/fd9d34a8f9c4a76902649d04ccd9bbc5.png.webp" />
					</ListItemIcon>
					<ListItemText primary="Bán hàng cùng tôi" />
				</ListItemButton>
			</List>
		</Box>
	);
};
