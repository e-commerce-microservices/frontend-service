import StarIcon from "@mui/icons-material/Star";
import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Modal,
	Skeleton,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useState } from "react";
import EcommerceCard from "./Card";

export const UpdateProductCard = ({ product }) => {
	if (product) {
		return <ProductCard product={product} />;
	}
	return <SkeletonCard />;
};

function convertToVndFormat(price) {
	return parseInt(price).toLocaleString("vi-VN", {
		style: "currency",
		currency: "VND",
	});
}

const SkeletonCard = () => {
	return (
		<Card variant="outlined" sx={{ height: "100%" }}>
			<CardActionArea sx={{ padding: "8px 8px 16px 8px" }}>
				<React.Fragment>
					<Skeleton
						variant="rectangular"
						height={200}
						style={{ marginBottom: 6 }}
					/>
					<Skeleton animation="wave" height={20} width="80%" />
					<Skeleton animation="wave" height={20} width="50%" />
				</React.Fragment>
			</CardActionArea>
		</Card>
	);
};

const ProductCard = ({ product }) => {
	const [updateProductModalOpen, setUpdateProductModalOpen] = useState(false);
	const [deleteProductModalOpen, setDeleteProductModalOpen] = useState(false);

	const handleUpdateProduct = () => {
		setUpdateProductModalOpen(true);
		console.log("update");
	};
	const handleDeleteProduct = () => {
		setDeleteProductModalOpen(true);
		console.log("delete");
	};

	return (
		<Card variant="outlined" sx={{ height: "100%" }}>
			<CardActionArea sx={{ height: "100%" }} disableRipple>
				<CardMedia
					component="img"
					image={product.thumbnail}
					alt={product.name}
				/>
				<CardContent sx={{ padding: "4px 12px 12px 12px" }}>
					<Box sx={{ display: "flex", flexDirection: "column" }}>
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{
								overflow: "hidden",
								textOverflow: "ellipsis",
								display: "-webkit-box",
								WebkitLineClamp: "2",
								WebkitBoxOrient: "vertical",
								fontSize: "12px",
								height: "35px",
							}}
						>
							{product.name}
						</Typography>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
							}}
						>
							<Typography
								variant="body2"
								color="text.secondary"
								sx={{ marginRight: "3px" }}
							>
								0
							</Typography>
							<StarIcon sx={{ color: "#ffca28", width: "16px" }} />
							<Box
								sx={{
									width: "1px",
									height: "12px",
									backgroundColor: "rgb(199, 199, 199)",
									margin: "0px 5px",
								}}
							></Box>
							<Typography
								variant="body2"
								color="text.secondary"
								sx={{ marginRight: "3px" }}
							>
								Đã bán 0
							</Typography>
						</Box>
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{ marginRight: "3px", fontSize: "12px" }}
						>
							Còn {product.inventory} sản phẩm
						</Typography>
						<Typography
							component="div"
							sx={{
								marginTop: "6px",
								fontWeight: "600",
								color: "rgb(255, 66, 78)",
							}}
							color="primary"
						>
							{convertToVndFormat(product.price)}
						</Typography>
						<Box
							sx={{
								display: "flex",
								marginTop: "8px",
								justifyContent: "space-between",
							}}
						>
							<Button
								variant="outlined"
								sx={{
									fontSize: "13.5px",
									padding: "0px 10px",
									textTransform: "none",
								}}
								onClick={handleUpdateProduct}
							>
								Cập nhật
							</Button>
							<Button
								variant="outlined"
								sx={{
									fontSize: "13.5px",
									padding: "0px 10px",
									textTransform: "none",
								}}
								onClick={handleDeleteProduct}
							>
								Xóa
							</Button>
						</Box>
					</Box>
				</CardContent>
			</CardActionArea>
			<UpdateProduct
				open={updateProductModalOpen}
				handleClose={() => {
					setUpdateProductModalOpen(false);
				}}
				product={product}
			/>
			<DeleteProduct
				open={deleteProductModalOpen}
				handleClose={() => {
					setDeleteProductModalOpen(false);
				}}
				product={product}
			/>
		</Card>
	);
};

const UpdateProduct = React.forwardRef((props, ref) => {
	return (
		<Modal
			open={props.open}
			onClose={props.handleClose}
			aria-labelledby="parent-modal-title"
			aria-describedby="parent-modal-description"
			ref={ref}
		>
			<UpdateProductData product={props.product} />
		</Modal>
	);
});

const UpdateProductData = React.forwardRef((props, ref) => {
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
		<Box sx={{ ...style, width: 500 }} ref={ref}>
			<Typography component="h1" variant="h5">
				Cập nhật thông tin sản phẩm: {props.product.name}
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
					type="sub			<UpdateProductData product={props.product} />mit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					Cập nhật
				</Button>
			</Box>
		</Box>
	);
});

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

const DeleteProduct = React.forwardRef((props, ref) => {
	return (
		<Modal
			open={props.open}
			onClose={props.handleClose}
			aria-labelledby="parent-modal-title"
			aria-describedby="parent-modal-description"
			ref={ref}
		>
			<DeleteProductData {...props} />
		</Modal>
	);
});

const DeleteProductData = React.forwardRef((props, ref) => {
	return (
		<Box sx={{ ...style, width: 500, padding: "32px " }} ref={ref}>
			<EcommerceCard product={props.product} />
			<Button variant="contained" sx={{ width: "100%" }}>
				Xác nhận xóa
			</Button>
		</Box>
	);
});
