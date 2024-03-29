import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cartApi } from "../api/cartApi";
import productApi from "../api/productApi";
import Comment from "./Comment";
import { XsContainer } from "./Layout";
import { SnackbarCustom } from "./Snackbar";

export default function ProductDetail() {
	const theme = useTheme();
	const [product, setProduct] = useState();
	const [snackBarMessage, setSnackBarMessage] = useState("");
	const [snackBarOpen, setSnackBarOpen] = useState(false);

	const search = useLocation().search;
	useEffect(() => {
		try {
			const fetchProduct = async () => {
				const productId = new URLSearchParams(search).get("product_id");
				const response = await productApi.detail({ productId: productId });
				setProduct(response.data);
			};
			fetchProduct();
		} catch (err) {
			console.log(err);
		}
	}, []);

	return (
		<XsContainer marginTop={theme.spacing(2)} marginBottom={theme.spacing(10)}>
			<SnackbarCustom
				open={snackBarOpen}
				setOpen={setSnackBarOpen}
				message={snackBarMessage}
			/>
			{product ? (
				<>
					<Grid
						container
						sx={{
							backgroundColor: "#FFF",
							padding: "16px",
							borderRadius: "5px",
						}}
					>
						<Grid item xs={12} md={5}>
							<Thumbnail src={product.thumbnail} alt={product.name} />
						</Grid>
						<Grid item xs={12} md={7}>
							<Description
								product={product}
								setSnackBarMessage={setSnackBarMessage}
								setSnackBarOpen={setSnackBarOpen}
							/>
						</Grid>
					</Grid>
					<Grid
						container
						sx={{
							backgroundColor: "#FFF",
							padding: "16px",
							marginTop: "16px",
							borderRadius: "5px",
						}}
					>
						<Comment />
					</Grid>
				</>
			) : (
				""
			)}
		</XsContainer>
	);
}

const Thumbnail = ({ src, alt }) => {
	return (
		<Box sx={{ padding: "4px 24px 4px 4px" }}>
			<img
				src={src.replace("280x280", "750x750")}
				alt={alt}
				// style={{ width: "100%" }}
				style={{ height: 540, width: 540 }}
			/>
		</Box>
	);
};

const Description = ({ product, setSnackBarMessage, setSnackBarOpen }) => {
	const [productCount, setProductCount] = useState(1);
	const [user, setUser] = useState({});

	useEffect(() => {
		const fetch = async () => {
			setUser(await JSON.parse(localStorage.getItem("user")));
		};
		fetch();
	}, []);

	const navigate = useNavigate();
	const handleCart = async () => {
		if (user == null) {
			navigate("/auth/login");
			return;
		}
		const response = await cartApi.create({
			productId: product.productId,
			quantity: productCount,
		});
		console.log(response);

		setSnackBarMessage(response.data.message);
		setSnackBarOpen(true);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", paddingTop: "16px" }}>
			<Box sx={{ display: "flex" }}>
				<Typography variant="body2" sx={{ fontSize: "12px" }}>
					Thương hiệu:
				</Typography>
				<Typography
					variant="body2"
					sx={{
						fontSize: "12px",
						fontWeight: "500",
						marginLeft: "5px",
						color: "#1769aa",
					}}
				>
					{product.brand}
				</Typography>
			</Box>
			<Typography variant="body1" sx={{ fontSize: "24px", fontWeight: "350" }}>
				{product.name}
			</Typography>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				{/* <Rating readOnly value={5} size="small" />
				<Typography
					sx={{
						fontSize: "14px",
						fontWeight: "400",
						paddingLeft: "5px",
						color: "#757575",
					}}
				>
					{" ( "}
					Chưa có đánh giá{" ) "}
				</Typography>
				<Box
					sx={{
						width: "1px",
						height: "12px",
						backgroundColor: "rgb(199, 199, 199)",
						margin: "0px 5px",
					}}
				></Box> */}
				{/* <Typography
					sx={{
						fontSize: "14px",
						fontWeight: "400",
						paddingLeft: "5px",
						color: "#757575",
					}}
				>
					Đã bán 0
				</Typography> */}
				<Typography
					sx={{
						fontSize: "14px",
						fontWeight: "400",
						paddingLeft: "5px",
						color: "#757575",
						textDecoration: "none",
					}}
					component={Link}
					to={`/view-shop?supplier=${product.supplierId}`}
				>
					Xem cửa hàng
				</Typography>
				{user != null && user.id != product.supplierId && (
					<>
						<Box
							sx={{
								width: "1px",
								height: "12px",
								backgroundColor: "rgb(199, 199, 199)",
								margin: "0px 5px",
							}}
						></Box>
						<Typography
							sx={{
								fontSize: "14px",
								fontWeight: "400",
								paddingLeft: "5px",
								color: "#757575",
								textDecoration: "none",
							}}
							component={Link}
							to={`/chat?supplier=${product.supplierId}`}
						>
							Trò chuyện
						</Typography>
					</>
				)}
			</Box>
			<Grid container sx={{ marginTop: "16px" }}>
				<Grid item xs={8} sx={{ paddingRight: "12px" }}>
					<Box
						sx={{
							display: "flex",
							backgroundColor: "rgb(250, 250, 250)",
							padding: "12px 16px 32px 12px",
							borderRadius: "6px",
						}}
					>
						<Typography
							sx={{
								fontSize: "32px",
								fontWeight: "600",
								color: "rgb(255, 66, 78)",
							}}
						>
							{convertToVndFormat(product.price)}
						</Typography>
					</Box>
					<Box
						sx={{ display: "flex", flexDirection: "column", marginTop: "16px" }}
					>
						<Box sx={{ display: "flex", flexDirection: "column" }}>
							<Typography variant="body2" sx={{ fontSize: "16px" }}>
								Mô tả sản phẩm: {product.desc}
							</Typography>
							<Typography variant="body2" sx={{ fontSize: "16px" }}>
								Số Lượng ( Trong kho: {product.inventory} )
							</Typography>

							<ButtonGroup sx={{ marginTop: "8px" }}>
								<Button
									sx={{ height: "30px", width: "30px", fontSize: "24px" }}
									onClick={() => {
										if (productCount > 1) {
											setProductCount(productCount - 1);
										}
									}}
								>
									-
								</Button>
								<Button sx={{ height: "30px", width: "30px" }}>
									{productCount}
								</Button>
								<Button
									sx={{ height: "30px", width: "30px", fontSize: "24px" }}
									onClick={() => setProductCount(productCount + 1)}
								>
									+
								</Button>
							</ButtonGroup>
						</Box>
						<Box sx={{ marginTop: "16px" }}>
							<Button
								variant="contained"
								disableElevation
								sx={{ width: "240px", height: "42px" }}
								disabled={
									user != null && user.id == product.supplierId ? true : false
								}
								onClick={handleCart}
							>
								Thêm vào giỏ hàng
							</Button>
						</Box>
					</Box>
				</Grid>
				{/* <Grid
					item
					xs={4}
					sx={{
						border: "1px solid #eeeeee",
						borderRadius: "4px",
						padding: "8px",
					}}
				>
					<Box sx={{ display: "flex", flexDirection: "column" }}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
							}}
						>
							<Avatar sx={{ marginRight: "8px" }}>NT</Avatar>
							<Typography sx={{ fontWeight: "500", flexGrow: 1 }}>
								Gu Bag Official Store
							</Typography>
						</Box>
						<Box
							sx={{ display: "flex", marginTop: "16px", alignItems: "center" }}
						>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									flexGrow: 1,
								}}
							>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<Typography>4.6 / 5</Typography>
									<StarIcon sx={{ color: "#ffca28", width: "20px" }} />
								</Box>
								<Typography sx={{ color: "#757575", fontSize: "12px" }}>
									2.5k+
								</Typography>
							</Box>
							<Box
								sx={{
									width: "1px",
									height: "16px",
									backgroundColor: "rgb(199, 199, 199)",
									margin: "0px 5px",
								}}
							></Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									flexGrow: 1,
								}}
							>
								<Typography>745</Typography>
								<Typography sx={{ color: "#757575", fontSize: "12px" }}>
									Theo dõi
								</Typography>
							</Box>
							<Box
								sx={{
									width: "1px",
									height: "16px",
									backgroundColor: "rgb(199, 199, 199)",
									margin: "0px 5px",
								}}
							></Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									flexGrow: 1,
								}}
							>
								<Typography>88%</Typography>
								<Typography sx={{ color: "#757575", fontSize: "12px" }}>
									Phản hồi chat
								</Typography>
							</Box>
						</Box>
						<Box sx={{ margin: "12px auto 0px" }}>
							<Button
								variant="outlined"
								sx={{ height: "32px", marginRight: "4px" }}
							>
								Xem Shop
							</Button>
							<Button
								variant="outlined"
								sx={{ height: "32px", marginLeft: "4px" }}
							>
								Theo dõi
							</Button>
						</Box>
						<Box></Box>
					</Box>
				</Grid> */}
			</Grid>
		</Box>
	);
};

function convertToVndFormat(price) {
	return parseInt(price).toLocaleString("vi-VN", {
		style: "currency",
		currency: "VND",
	});
}
