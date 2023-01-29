import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {
	Box,
	Button,
	Grid,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Modal,
	Pagination,
	Stack,
	TextField,
	Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import productApi from "../api/productApi";
import shopApi from "../api/shopApi";
import { XsContainer } from "./Layout";
import { UpdateProductCard } from "./UpdateProductCard";

export const ShopManager = () => {
	const [listProduct, setListProduct] = useState(new Array(18).fill(null));
	const [page, setPage] = useState(1);
	const handleUpdatePage = (event, value) => {
		setPage(value);
	};
	const [productData, setProductData] = useState({});
	const [updateProductModalOpen, setUpdateProductModalOpen] = useState(false);

	const search = useLocation().search;

	useEffect(() => {
		const fetchListProduct = async () => {
			const supllierId = new URLSearchParams(search).get("supplier_id");
			const response = await productApi.supplier({
				supplierId: supllierId,
				limit: 18,
				offset: 18 * (page - 1),
			});
			setListProduct(response.data.listProduct);
		};

		fetchListProduct();
	}, [page]);

	const [open, setOpen] = useState(false);
	const handleOpenCreateProduct = () => {
		setOpen(true);
	};
	const handleCloseCreateProduct = () => {
		setOpen(false);
	};

	const handleCloseUpdateProduct = () => {
		setUpdateProductModalOpen(false);
	};

	return (
		<XsContainer marginTop="16px">
			<Grid container spacing={1}>
				<Grid item xs={0} md={4} lg={3}>
					<Manage handleOpenCreateProduct={handleOpenCreateProduct} />
				</Grid>

				<Grid item container xs={12} md={8} lg={9}>
					<Grid container spacing="4px">
						{listProduct.map((product, index) => (
							<Grid item xs={12} sm={6} md={3} lg={2} key={index}>
								<UpdateProductCard
									product={product}
									setProductData={setProductData}
									setUpdateProductModalOpen={setUpdateProductModalOpen}
								/>
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
			<CreateProduct open={open} handleClose={handleCloseCreateProduct} />
			<UpdateProduct
				open={updateProductModalOpen}
				handleClose={handleCloseUpdateProduct}
				product={productData}
			/>
		</XsContainer>
	);
};

const Manage = ({ handleOpenCreateProduct }) => {
	return (
		<Box>
			<List
				sx={{ width: "100%", bgcolor: "background.paper" }}
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						Quản lý shop
					</ListSubheader>
				}
			>
				<ListItemButton onClick={handleOpenCreateProduct}>
					<ListItemIcon>
						<ControlPointIcon />
					</ListItemIcon>
					<ListItemText primary="Thêm sản phẩm" />
				</ListItemButton>
			</List>
		</Box>
	);
};

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	borderRadius: "4px",
	pt: 2,
	px: 4,
	pb: 3,
};

const CreateProduct = ({ open, handleClose }) => {
	const [productImage, setProductImage] = useState("");
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = new FormData(event.currentTarget);
			let categoryID = 9999;
			let productName = data.get("productName");
			let price = parseInt(data.get("productPrice"));
			let thumbnail = productImage;
			let inventory = parseInt(data.get("productInventory"));
			let brand = data.get("productBrand");

			let response = await shopApi.createProduct({
				productCategory: categoryID,
				productName: productName,
				productPrice: price,
				productThumbnail: thumbnail,
				inventory: inventory,
				brand: brand,
			});
			if (response.status == 200) {
				console.log("create success");
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="parent-modal-title"
			aria-describedby="parent-modal-description"
		>
			<Box sx={{ ...style, width: 500 }}>
				<Typography component="h1" variant="h5"></Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						fullWidth
						id="product_name"
						label="Tên sản phẩm"
						name="productName"
						autoFocus
					/>
					<TextField
						margin="normal"
						fullWidth
						id="product_price"
						label="Giá cả sản phẩm"
						name="productPrice"
					/>
					<TextField
						margin="normal"
						fullWidth
						id="product_inventory"
						label="Số lượng sản phẩm trong kho"
						name="productInventory"
					/>
					<TextField
						margin="normal"
						fullWidth
						id="product_brand"
						label="Nhãn hàng"
						name="productBrand"
					/>
					<Stack direction="row" alignItems="center" spacing={2}>
						<Button variant="contained" component="label">
							Ảnh sản phẩm
							<input
								hidden
								accept="image/*"
								multiple
								type="file"
								onChange={(e) => {
									var reader = new FileReader();
									reader.readAsDataURL(e.target.files[0]);

									reader.onload = () => {
										setProductImage(reader.result);
									};
								}}
							/>
						</Button>
					</Stack>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Thêm mới
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

const UpdateProduct = ({ open, handleClose, product }) => {
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="parent-modal-title"
			aria-describedby="parent-modal-description"
		>
			<UpdateProductData product={product} />
		</Modal>
	);
};

const UpdateProductData = ({ product }) => {
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			// const data = new FormData(event.currentTarget);
			// let response = await authApi.login({
			// 	email: data.get("email"),
			// 	password: data.get("password"),
			// });
			// if (response.error) {
			// 	return;
			// }
			// const { accessToken, refreshToken } = response.data;
			// authHelper.setToken({ accessToken: accessToken });
			// authHelper.setRefresh({ refreshToken: refreshToken });
		} catch (err) {
			// setSeverity("error");
			// setSnackbarOpen(true);
			// setSnackbarMessage(err.response.data.message);
		}
	};

	return (
		<Box sx={{ ...style, width: 500 }}>
			<Typography component="h1" variant="h5">
				Cập nhật thông tin sản phẩm: {product.name}
			</Typography>
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					fullWidth
					id="product_name"
					label="Tên sản phẩm"
					name="productName"
					autoFocus
				/>
				<TextField
					margin="normal"
					fullWidth
					id="product_price"
					label="Giá cả sản phẩm"
					name="productPrice"
				/>
				<TextField
					margin="normal"
					fullWidth
					id="product_inventory"
					label="Số lượng sản phẩm trong kho"
					name="productInventory"
				/>
				<TextField
					margin="normal"
					fullWidth
					id="product_brand"
					label="Nhãn hàng"
					name="productBrand"
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					Cập nhật
				</Button>
			</Box>
		</Box>
	);
};
