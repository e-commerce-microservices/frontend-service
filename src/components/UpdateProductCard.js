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
import { Link } from "react-router-dom";
import shopApi from "../api/shopApi";
import EcommerceCard from "./Card";

export const UpdateProductCard = ({ product, setListProduct }) => {
	if (product) {
		return <ProductCard product={product} setListProduct={setListProduct} />;
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

const ProductCard = ({ product, setListProduct }) => {
	const [updateProductModalOpen, setUpdateProductModalOpen] = useState(false);
	const [deleteProductModalOpen, setDeleteProductModalOpen] = useState(false);

	const handleDeleteProduct = async () => {
		try {
			await shopApi.deleteProduct({
				productId: product.productId,
			});
			setListProduct((prev) => {
				return prev.filter((prod) => prod.productId !== product.productId);
			});
			setDeleteProductModalOpen(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Card variant="outlined" sx={{ height: "100%" }}>
			<CardActionArea sx={{ height: "100%" }} disableRipple>
				<CardMedia
					component="img"
					image={product.thumbnail}
					alt={product.name}
					style={{ width: 200, height: 150 }}
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
								textDecoration: "none",
							}}
							component={Link}
							to={`/product_detail?product_id=${product.productId}`}
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
								{product.starAverage}
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
								Đã bán {product.totalSold}
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
								onClick={() => setUpdateProductModalOpen(true)}
							>
								Cập nhật
							</Button>
							<Button
								onClick={() => setDeleteProductModalOpen(true)}
								variant="outlined"
								sx={{
									fontSize: "13.5px",
									padding: "0px 10px",
									textTransform: "none",
								}}
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
				setListProduct={setListProduct}
				setUpdateProductModalOpen={setUpdateProductModalOpen}
			/>
			<DeleteProduct
				open={deleteProductModalOpen}
				handleClose={() => {
					setDeleteProductModalOpen(false);
				}}
				product={product}
				handleDelete={handleDeleteProduct}
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
			<UpdateProductData {...props} />
		</Modal>
	);
});

const UpdateProductData = React.forwardRef((props, ref) => {
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const data = new FormData(event.currentTarget);
			const productName =
				data.get("productName").length > 0
					? data.get("productName")
					: props.product.name;
			const productBrand =
				data.get("productBrand").length > 0
					? data.get("productBrand")
					: props.product.brand;
			const inv =
				data.get("productInventory").length > 0
					? data.get("productInventory")
					: props.product.inventory;
			const price =
				data.get("productPrice").length > 0
					? data.get("productPrice")
					: props.product.price;

			let response = await shopApi.updateProduct({
				productName: productName,
				productBrand: productBrand,
				productInventory: inv,
				productId: props.product.productId,
				productPrice: price,
			});
			props.setListProduct((prev) => {
				return prev.map((prod) => {
					if (prod.productId === props.product.productId) {
						prod.name = productName;
						prod.brand = productBrand;
						prod.inventory = inv;
						prod.price = price;
					}
					return prod;
				});
			});
			props.setUpdateProductModalOpen(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Box sx={{ ...style, width: 500 }} ref={ref}>
			<Typography component="h1" variant="h5">
				Cập nhật thông tin sản phẩm
			</Typography>
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					fullWidth
					id="product_name"
					label="Tên sản phẩm"
					name="productName"
					defaultValue={props.product.name}
					autoFocus
				/>
				<TextField
					margin="normal"
					OrderHandleCard
					fullWidth
					id="product_price"
					label="Giá cả sản phẩm"
					defaultValue={props.product.price}
					name="productPrice"
				/>
				<TextField
					margin="normal"
					fullWidth
					id="product_inventory"
					label="Số lượng sản phẩm trong kho"
					defaultValue={props.product.inventory}
					name="productInventory"
				/>
				<TextField
					margin="normal"
					fullWidth
					id="product_brand"
					label="Nhãn hàng"
					defaultValue={props.product.brand}
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
			<Button
				variant="contained"
				sx={{ width: "100%" }}
				onClick={() => props.handleDelete()}
			>
				Xác nhận xóa
			</Button>
		</Box>
	);
});
