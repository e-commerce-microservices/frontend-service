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
	Menu,
	Modal,
	Pagination,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";

import React, { forwardRef, useEffect, useState } from "react";
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
	const [reload, setReload] = useState(false);
	const [snackBarMessage, setSnackBarMessage] = useState("");
	const [snackBarOpen, setSnackBarOpen] = useState(false);
	const [severity, setSeverity] = useState("success");
	const handleCloseSnackbar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setSnackBarOpen(false);
	};
	const Alert = forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	const search = useLocation().search;

	const [open, setOpen] = useState(false);
	const handleOpenCreateProduct = () => {
		setOpen(true);
	};
	const handleCloseCreateProduct = () => {
		setOpen(false);
	};
	const [listCategory, setListCategory] = useState([]);
	useEffect(() => {
		const fetch = async () => {
			const supllierId = new URLSearchParams(search).get("supplier_id");
			const response = await productApi.supplierCategory({
				supplierId: supllierId,
			});
			setListCategory(response.data.categoryDetail);
		};
		fetch();
	}, []);
	const [category, setCategory] = useState({
		categoryId: 0,
		categoryName: "Thể loại",
	});
	const [byPriceDesc, setByPriceDesc] = React.useState(false);
	const [byPriceInc, setByPriceInc] = React.useState(false);
	const [byTime, setByTime] = React.useState(false);

	const [anchorEl, setAnchorEl] = useState(null);
	const openAnchorEl = Boolean(anchorEl);
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
	useEffect(() => {
		const fetchListProduct = async () => {
			const supllierId = new URLSearchParams(search).get("supplier_id");
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
	}, [page, reload, byPriceDesc, byPriceInc, byTime, category]);

	return (
		<XsContainer marginTop="16px">
			<Snackbar
				open={snackBarOpen}
				autoHideDuration={3000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={severity}
					sx={{ width: "100%" }}
				>
					{snackBarMessage}
				</Alert>
			</Snackbar>
			<Grid container spacing={1}>
				<Grid item xs={0} md={4} lg={3}>
					<Manage
						handleOpenCreateProduct={handleOpenCreateProduct}
						openAnchorEl={openAnchorEl}
						anchorEl={anchorEl}
						handleClose={handleClose}
						category={category}
						handleClick={handleClick}
						listCategory={listCategory}
						setCategory={setCategory}
						setPage={setPage}
						setByPriceDesc={setByPriceDesc}
						setByPriceInc={setByPriceInc}
						setByTime={setByTime}
					/>
				</Grid>

				<Grid item container xs={12} md={8} lg={9}>
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
						<Grid container spacing="4px">
							{listProduct.map((product, index) => (
								<Grid item xs={12} sm={6} md={3} lg={2} key={index}>
									<UpdateProductCard
										product={product}
										setListProduct={setListProduct}
										setProductData={setProductData}
										setUpdateProductModalOpen={setUpdateProductModalOpen}
									/>
								</Grid>
							))}
						</Grid>
						{listProduct.length > 10 && (
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
						)}
					</Box>
				</Grid>
			</Grid>
			<CreateProduct
				open={open}
				handleClose={handleCloseCreateProduct}
				setSnackBarOpen={setSnackBarOpen}
				setSnackBarMessage={setSnackBarMessage}
				setSeverity={setSeverity}
				setReload={setReload}
			/>
		</XsContainer>
	);
};

const Manage = ({
	handleOpenCreateProduct,
	openAnchorEl,
	anchorEl,
	handleClose,
	category,
	handleClick,
	listCategory,
	setCategory,
	setPage,
	setByPriceDesc,
	setByPriceInc,
	setByTime,
}) => {
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
			<List
				sx={{ width: "100%", bgcolor: "background.paper" }}
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						Bộ lọc
					</ListSubheader>
				}
			>
				<Box>
					<Button
						id="basic-button"
						aria-haspopup="true"
						aria-expanded={openAnchorEl ? "true" : undefined}
						onClick={handleClick}
						variant="outlined"
						sx={{
							marginTop: "10px",
							fontWeight: "500",
							fontSize: "12px",
							borderRadius: "15px",
							backgroundColor: "#eee",
							marginLeft: "18px",
							border: "1px solid #eee",
							color: "#333",
							textTransform: "none",
						}}
					>
						{category.categoryName}
					</Button>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={openAnchorEl}
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
				<ListItemButton
					onClick={() => {
						setByPriceDesc(false);
						setByPriceInc(false);
						setByTime(true);
					}}
				>
					<ConstPriceFilter value="Hàng mới" />
				</ListItemButton>
				<ListItemButton
					onClick={() => {
						setByPriceDesc(false);
						setByPriceInc(true);
						setByTime(false);
					}}
				>
					<ConstPriceFilter value="Giá từ thấp đến cao" />
				</ListItemButton>
				<ListItemButton
					onClick={() => {
						setByPriceDesc(true);
						setByPriceInc(false);
						setByTime(false);
					}}
				>
					<ConstPriceFilter value="Giá từ cao đến thấp" />
				</ListItemButton>
				<ListItemButton
					onClick={() => {
						setByPriceDesc(false);
						setByPriceInc(false);
						setByTime(false);
						setCategory({ categoryId: 0, categoryName: "Thể loại" });
					}}
				>
					<ConstPriceFilter value="Mặc định" />
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

const CreateProduct = ({
	open,
	handleClose,
	setSnackBarOpen,
	setSnackBarMessage,
	setSeverity,
	setReload,
}) => {
	const [productImage, setProductImage] = useState("");
	const [category, setCategory] = React.useState(9999);
	const handleChange = (event) => {
		setCategory(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = new FormData(event.currentTarget);
			let productName = data.get("productName");
			let price = parseInt(data.get("productPrice"));
			let thumbnail = productImage;
			let inventory = parseInt(data.get("productInventory"));
			let desc = data.get("productDesc");
			let brand = data.get("productBrand");

			let response = await shopApi.createProduct({
				productCategory: category,
				productName: productName,
				productPrice: price,
				productThumbnail: thumbnail,
				productInventory: parseInt(inventory),
				productDesc: desc,
				productBrand: brand,
			});
			if (response.status == 200) {
				handleClose();
				// snack
				setSnackBarMessage("Tạo sản phẩm thành công");
				setSnackBarOpen(true);
				setSeverity("success");
				setReload((prev) => !prev);
			} else {
				handleClose();
				setSnackBarMessage(response.response.data.message);
				setSnackBarOpen(true);
				setSeverity("error");
			}
		} catch (err) {
			console.log(err);
			setSnackBarMessage("Tạo sản phẩm không thành công");
			setSnackBarOpen(true);
			setSeverity("error");
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
						m403
						forbiddenargin="normal"
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
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Thể loại</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={category}
							label="Thể loại"
							onChange={handleChange}
						>
							<MenuItem value={1882}>Điện Gia Dụng</MenuItem>
							<MenuItem value={8371}>Đồng hồ và Trang sức</MenuItem>
							<MenuItem value={1846}>Laptop - Máy vi tính - Link kiện</MenuItem>
							<MenuItem value={1801}>Máy Ảnh - Máy Quay Phim</MenuItem>
							<MenuItem value={1789}>Điện Thoại - Máy Tính Bảng</MenuItem>
							<MenuItem value={4221}>Điện Tử - Điện Lạnh</MenuItem>
							<MenuItem value={915}>Thời trang nam</MenuItem>
							<MenuItem value={1686}>Giày - Dép nam</MenuItem>
							<MenuItem value={1883}>Nhà Cửa - Đời Sống</MenuItem>
							<MenuItem value={1975}>Thể Thao - Dã Ngoại</MenuItem>
							<MenuItem value={1815}>Thiết Bị Số - Phụ Kiện Số</MenuItem>
							<MenuItem value={4384}>Bách Hóa Online</MenuItem>
							<MenuItem value={2549}>Đồ Chơi - Mẹ & Bé</MenuItem>
							<MenuItem value={9999}>Khác</MenuItem>
						</Select>
					</FormControl>
					<TextField
						margin="normal"
						fullWidth
						id="product_desc"
						label="Mô tả tóm tắt về sản phẩm"
						name="productDesc"
					/>
					<Box sx={{ display: "flex" }}>
						<Box sx={{ display: "flex" }}>
							{productImage && (
								<Box sx={{ maxWidth: "100px", marginRight: "10px" }}>
									<img
										src={productImage}
										style={{ width: "100px", height: "100px" }}
									/>
								</Box>
							)}
						</Box>
						<Stack direction="row" alignItems="center" spacing={2}>
							<Button
								variant="outlined"
								component="label"
								sx={{
									textTransform: "none",
									width: "100px",
									height: "100px",
								}}
							>
								Thêm ảnh
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
					</Box>
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

const ConstPriceFilter = ({ value }) => {
	return (
		<Typography
			variant="body2"
			sx={{
				fontWeight: "500",
				fontSize: "12px",
				borderRadius: "15px",
				padding: "8px 15px",
				backgroundColor: "#eee",
			}}
			color="text.secondary"
		>
			{value}
		</Typography>
	);
};
