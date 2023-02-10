import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { orderApi } from "../api/orderApi";

export const Order = () => {
	return <Box>listing</Box>;
};

export const OrderBoughtCard = ({ order }) => {
	return (
		<Box
			sx={{
				display: "flex",
				bgcolor: "background.paper",
				width: "100%",
				alignItems: "center",
				border: "1px solid #e0e0e0",
				borderRadius: "4px",
				marginBottom: "8px",
				justifyContent: "space-between",
				padding: "0px 10px",
			}}
		>
			<img src={order.productImage} style={{ width: "90px", heigth: "90px" }} />
			<Typography sx={{ width: 350, color: "#424242" }}>
				{order.productName}
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				Số lượng : {order.orderQuantity}
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Typography sx={{ color: "#424242" }}>
					{" "}
					Giá : {convertToVndFormat(order.productPrice * order.orderQuantity)}
				</Typography>
			</Box>
			<Box>
				<Button
					variant="outlined"
					sx={{ textTransform: "none", marginRight: "12px" }}
					component={Link}
					to={"/product_detail?product_id=" + order.productId}
				>
					Đánh giá đơn hàng
				</Button>
				<Button
					variant="outlined"
					sx={{ textTransform: "none", marginRight: "12px" }}
				>
					Báo cáo
				</Button>
			</Box>
		</Box>
	);
};

export const OrderWaitingCard = ({ order, setListOrder, listOrder }) => {
	const handleDeleteOrder = async () => {
		try {
			const response = await orderApi.deleteOrder({ id: order.orderId });
			if (response.status === 200) {
				setListOrder(
					listOrder.filter((v) => {
						return v.orderId !== order.orderId;
					})
				);
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<Box
			sx={{
				display: "flex",
				bgcolor: "background.paper",
				width: "100%",
				alignItems: "center",
				border: "1px solid #e0e0e0",
				borderRadius: "4px",
				marginBottom: "8px",
				justifyContent: "space-between",
				padding: "0px 10px",
			}}
		>
			<img src={order.productImage} style={{ width: "90px", heigth: "90px" }} />
			<Typography sx={{ width: 350, color: "#424242" }}>
				{order.productName}
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Typography sx={{ color: "#424242" }}>
					Số lượng : {order.orderQuantity}
				</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Typography sx={{ color: "#424242" }}>
					Giá : {convertToVndFormat(order.productPrice * order.orderQuantity)}
				</Typography>
			</Box>
			<Box>
				<Button
					variant="outlined"
					sx={{ textTransform: "none", marginRight: "12px" }}
				>
					Xem địa chỉ
				</Button>
				<Button
					variant="outlined"
					sx={{ textTransform: "none", marginRight: "12px" }}
					onClick={handleDeleteOrder}
				>
					Hủy đơn hàng
				</Button>
			</Box>
		</Box>
	);
};

export const OrderHandleCard = ({ order, setListOrder, listOrder }) => {
	const handleDeleteOrder = async () => {
		try {
			const response = await orderApi.deleteOrder({ id: order.orderId });
			if (response.status === 200) {
				setListOrder(
					listOrder.filter((v) => {
						return v.orderId !== order.orderId;
					})
				);
			}
		} catch (err) {
			console.log(err);
		}
	};
	const handleOrder = async () => {
		try {
			const response = await orderApi.handleOrder({ id: order.orderId });
			if (response.status === 200) {
				setListOrder(
					listOrder.filter((v) => {
						return v.orderId !== order.orderId;
					})
				);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				bgcolor: "background.paper",
				width: "100%",
				alignItems: "center",
				border: "1px solid #e0e0e0",
				borderRadius: "4px",
				marginBottom: "8px",
				justifyContent: "space-between",
				padding: "0px 10px",
			}}
		>
			<img src={order.productImage} style={{ width: "90px", heigth: "90px" }} />
			<Typography sx={{ width: 350, color: "#424242" }}>
				{order.productName}
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Typography sx={{ color: "#424242" }}>
					Số lượng : {order.orderQuantity}
				</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Typography sx={{ color: "#424242" }}>
					Giá : {convertToVndFormat(order.productPrice * order.orderQuantity)}
				</Typography>
			</Box>
			<Box>
				<Button
					variant="outlined"
					sx={{ textTransform: "none", marginRight: "12px" }}
					onClick={handleOrder}
				>
					Duyệt đơn hàng
				</Button>
				<Button
					variant="outlined"
					sx={{ textTransform: "none", marginRight: "12px" }}
					onClick={handleDeleteOrder}
				>
					Hủy đơn hàng
				</Button>
			</Box>
		</Box>
	);
};

function convertToVndFormat(price) {
	return parseInt(price).toLocaleString("vi-VN", {
		style: "currency",
		currency: "VND",
	});
}
