import {
	Button,
	Grid,
	Menu,
	MenuItem,
	Pagination,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import productApi from "../api/productApi";
import shopApi from "../api/shopApi";
import EcommerceCard from "./Card";
import { XsContainer } from "./Layout";

export const ViewShop = () => {
	const [listProduct, setListProduct] = useState(new Array(18).fill(null));
	const [page, setPage] = React.useState(1);
	const [shopName, setShopName] = React.useState("shop name");
	const [byPriceDesc, setByPriceDesc] = React.useState(false);
	const [byPriceInc, setByPriceInc] = React.useState(false);
	const [byTime, setByTime] = React.useState(false);
	const [category, setCategory] = React.useState({
		categoryId: 0,
		categoryName: "Thể loại",
	});
	const handleUpdatePage = (event, value) => {
		setPage(value);
	};

	const search = useLocation().search;
	const [listCategory, setListCategory] = useState([]);
	useEffect(() => {
		const fetch = async () => {
			const supllierId = new URLSearchParams(search).get("supplier");
			const response = await productApi.supplierCategory({
				supplierId: supllierId,
			});
			console.log(response);
			setListCategory(response.data.categoryDetail);
		};
		fetch();
	}, []);

	useEffect(() => {
		const fetchListProduct = async () => {
			const supllierId = new URLSearchParams(search).get("supplier");
			const response = await productApi.supplier({
				supplierId: supllierId,
				limit: 18,
				offset: 18 * (page - 1),
				byPriceDesc,
				byPriceInc,
				byTime,
				categoryId: parseInt(category.categoryId),
			});
			setListProduct(response.data.listProduct);
		};

		fetchListProduct();
	}, [page, byPriceDesc, byPriceInc, byTime, category]);
	useEffect(() => {
		const fetch = async () => {
			const supllierId = new URLSearchParams(search).get("supplier");
			const response = await shopApi.getShop({ shopId: supllierId });
			setShopName(response.data.name);
		};
		fetch();
	});
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = (category) => {
		setAnchorEl(null);
		if (category.type == "click") {
		} else {
			setCategory(category);
		}
	};

	return (
		<XsContainer marginTop="16px">
			<Grid container spacing={1}>
				<Grid item container xs={12} md={12} lg={12}>
					<Box
						sx={{
							backgroundColor: "#fff",
							width: "100%",
							padding: "16px",
							// height: "200px",
							display: "flex",
							flexDirection: "column",
							marginBottom: "6px",
						}}
					>
						<Box sx={{ display: "flex" }}>
							<Box sx={{ display: "flex", marginBottom: "12px" }}>
								<Typography sx={{ fontSize: "32px", color: "#616161" }}>
									Chào mừng bạn đến với
								</Typography>
								<Typography
									sx={{
										color: "#616161",
										marginLeft: "12px",
										fontWeight: "bold",
										fontSize: "32px",
									}}
								>
									{shopName}
								</Typography>
							</Box>
						</Box>
						<Box sx={{ display: "flex" }}>
							<Button
								variant="outlined"
								sx={{
									textTransform: "none",
									fontSize: "12px",
									marginRight: "6px",
								}}
								onClick={() => {
									setByPriceDesc(false);
									setByPriceInc(false);
									setByTime(false);
									setCategory({ categoryId: 0, categoryName: "Thể loại" });
								}}
							>
								Tất cả sản phẩm
							</Button>
							<Button
								variant="outlined"
								sx={{
									textTransform: "none",
									fontSize: "12px",
									marginRight: "6px",
								}}
								onClick={() => {
									setByPriceDesc(false);
									setByPriceInc(false);
									setByTime(true);
								}}
							>
								Hàng mới
							</Button>
							<Button
								variant="outlined"
								sx={{
									textTransform: "none",
									fontSize: "12px",
									marginRight: "6px",
								}}
								onClick={() => {
									setByPriceDesc(false);
									setByPriceInc(true);
									setByTime(false);
								}}
							>
								Giá thấp đến cao
							</Button>
							<Button
								variant="outlined"
								sx={{
									textTransform: "none",
									fontSize: "12px",
									marginRight: "6px",
								}}
								onClick={() => {
									setByPriceDesc(true);
									setByPriceInc(false);
									setByTime(false);
								}}
							>
								Giá cao đến thấp
							</Button>
							<Box>
								<Button
									id="basic-button"
									aria-controls={open ? "basic-menu" : undefined}
									aria-haspopup="true"
									aria-expanded={open ? "true" : undefined}
									onClick={handleClick}
									variant="outlined"
									sx={{
										textTransform: "none",
										fontSize: "12px",
										marginRight: "6px",
									}}
								>
									{category.categoryName}
								</Button>
								<Menu
									id="basic-menu"
									anchorEl={anchorEl}
									open={open}
									onClose={handleClose}
									MenuListProps={{
										"aria-labelledby": "basic-button",
									}}
								>
									{listCategory.map((el) => (
										<MenuItem onClick={() => handleClose(el)}>
											{el.categoryName}
										</MenuItem>
									))}
								</Menu>
							</Box>
						</Box>
					</Box>
				</Grid>
				<Grid item container xs={12} md={12} lg={12}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							height: "90vh",
							width: "100%",
							justifyContent: "space-between",
							backgroundColor: "#ff",
						}}
					>
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
					</Box>
				</Grid>
			</Grid>
			<Box sx={{ marginTop: "16px", height: "30px" }}></Box>
		</XsContainer>
	);
};
