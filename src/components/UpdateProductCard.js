import StarIcon from "@mui/icons-material/Star";
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Skeleton,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";

export const UpdateProductCard = ({
	product,
	setProductData,
	setUpdateProductModalOpen,
}) => {
	if (product) {
		return (
			<ProductCard
				product={product}
				setProductData={setProductData}
				setUpdateProductModalOpen={setUpdateProductModalOpen}
			/>
		);
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

const ProductCard = ({
	product,
	setProductData,
	setUpdateProductModalOpen,
}) => {
	return (
		<Card
			variant="outlined"
			sx={{ height: "100%" }}
			onClick={() => {
				setProductData(product);
				setUpdateProductModalOpen(true);
			}}
		>
			<CardActionArea sx={{ height: "100%" }}>
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
					</Box>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};
