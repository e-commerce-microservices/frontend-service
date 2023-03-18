import { Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import { orderApi } from "../api/orderApi";
import reportApi from "../api/reportApi";

export const OrderBoughtCard = ({ order }) => {
	const [openPopup, setOpenPopup] = useState(false);
	const [content, setContent] = useState("");
	const handleCreateReport = async () => {
		console.log(content, order);
		try {
			const response = await reportApi.createReport({
				productId: order.productId,
				description: content,
			});
			console.log(response);
		} catch (err) {
			console.log(err);
		}
		setOpenPopup(false);
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
				padding: "0px 10px",
			}}
		>
			<img src={order.productImage} style={{ width: "90px", heigth: "90px" }} />
			<Typography sx={{ width: 250, color: "#424242", marginLeft: "12px" }}>
				{order.productName}
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					width: 150,
				}}
			>
				Số lượng : {order.orderQuantity}
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					width: 200,
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
					sx={{
						textTransform: "none",
						marginRight: "12px",
						textDecoration: "none",
					}}
					component={Link}
					to={`/product_detail?product_id=${order.productId}`}
				>
					Đánh giá đơn hàng
				</Button>
				<Button
					variant="outlined"
					sx={{ textTransform: "none", marginRight: "12px" }}
					onClick={() => {
						console.log("RUN");
						setOpenPopup(true);
					}}
				>
					Báo cáo
				</Button>
			</Box>
			<Modal
				open={openPopup}
				onClose={() => setOpenPopup(false)}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Grid
					item
					container
					style={{
						backgroundColor: "#fff",
						width: 400,
						padding: 20,
					}}
				>
					<Grid item container>
						<TextField
							label="Lý do báo cáo"
							fullWidth
							style={{ margin: "10px 0" }}
							onChange={(e) => setContent(e.target.value)}
						/>
						<Button
							color="primary"
							fullWidth
							variant="contained"
							onClick={handleCreateReport}
						>
							Báo cáo ngay
						</Button>
					</Grid>
				</Grid>
			</Modal>
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
				padding: "0px 10px",
			}}
		>
			<img src={order.productImage} style={{ width: "90px", heigth: "90px" }} />
			<Typography
				sx={{
					width: 250,
					color: "#424242",
					textDecoration: "none",
					marginLeft: "12px",
				}}
				component={Link}
				to={`/product_detail?product_id=${order.productId}`}
			>
				{order.productName}
			</Typography>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<Typography
					sx={{ width: 250, color: "#424242", textDecoration: "none" }}
				>
					Người mua: {order.addressName}
				</Typography>
				<Typography
					sx={{ width: 250, color: "#424242", textDecoration: "none" }}
				>
					Số điện thoại: {order.addressPhone}
				</Typography>
				<Typography
					sx={{ width: 250, color: "#424242", textDecoration: "none" }}
				>
					Địa chỉ: {order.addressDetail}
				</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					marginRight: "12px",
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
					width: 150,
				}}
			>
				<Typography sx={{ color: "#424242" }}>
					Giá : {convertToVndFormat(order.productPrice * order.orderQuantity)}
				</Typography>
			</Box>
			<Box>
				{/* <Button
					variant="outlined"
					sx={{ textTransform: "none", marginRight: "12px" }}
				>
					Xem địa chỉ
				</Button> */}
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
				padding: "0px 10px",
			}}
		>
			<img
				src={order.productImage}
				style={{ width: "90px", heigth: "90px", marginRight: "12px" }}
			/>
			<Typography
				sx={{
					width: 250,
					color: "#424242",
					textDecoration: "none",
					marginRight: "12px",
				}}
				component={Link}
				to={`/product_detail?product_id=${order.productId}`}
			>
				{order.productName}
			</Typography>
			<Box
				sx={{ display: "flex", flexDirection: "column", marginRight: "20px" }}
			>
				<Typography
					sx={{ width: 200, color: "#424242", textDecoration: "none" }}
				>
					Người mua: {order.addressName}
				</Typography>
				<Typography
					sx={{ width: 200, color: "#424242", textDecoration: "none" }}
				>
					Số điện thoại: {order.addressPhone}
				</Typography>
				<Typography
					sx={{ width: 200, color: "#424242", textDecoration: "none" }}
				>
					Địa chỉ: {order.addressDetail}
				</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					marginRight: "20px",
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
					width: 150,
				}}
			>
				<Typography sx={{ color: "#424242" }}>
					Giá : {convertToVndFormat(order.productPrice * order.orderQuantity)}
				</Typography>
			</Box>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<Button
					variant="outlined"
					sx={{ textTransform: "none", marginRight: "12px" }}
					onClick={handleOrder}
				>
					Duyệt đơn hàng
				</Button>
				<Button
					variant="outlined"
					sx={{ textTransform: "none", marginRight: "12px", marginTop: "4px" }}
					onClick={handleDeleteOrder}
				>
					Hủy đơn hàng
				</Button>
			</Box>
		</Box>
	);
};

export const OrderHandledCard = ({ order, setListOrder, listOrder }) => {
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
				padding: "10px 20px",
			}}
		>
			<img
				src={order.productImage}
				style={{ width: "90px", heigth: "90px", marginRight: "12px" }}
			/>
			<Typography
				sx={{ width: 250, color: "#424242", textDecoration: "none" }}
				component={Link}
				to={`/product_detail?product_id=${order.productId}`}
			>
				{order.productName}
			</Typography>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<Typography
					sx={{ width: 300, color: "#424242", textDecoration: "none" }}
				>
					Người mua: {order.addressName}
				</Typography>
				<Typography
					sx={{ width: 300, color: "#424242", textDecoration: "none" }}
				>
					Số điện thoại: {order.addressPhone}
				</Typography>
				<Typography
					sx={{ width: 300, color: "#424242", textDecoration: "none" }}
				>
					Địa chỉ: {order.addressDetail}
				</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Typography sx={{ color: "#424242", width: 150 }}>
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
		</Box>
	);
};
function convertToVndFormat(price) {
	return parseInt(price).toLocaleString("vi-VN", {
		style: "currency",
		currency: "VND",
	});
}

export const ReportProductCart = ({
	report,
	setSeverity,
	setSnackBarOpen,
	setSnackBarMessage,
	setListReport,
}) => {
	const deleteReport = async () => {
		try {
			const response = await reportApi.deleteReport({
				reportId: report.reportId,
			});
			console.log(response);
			setSeverity("success");
			setSnackBarOpen(true);
			setSnackBarMessage(response.data.message);
			setListReport((prev) =>
				prev.filter((el) => {
					return el.reportId != el.reportId;
				})
			);
		} catch (err) {
			console.log(err);
		}
	};
	const handleReport = async () => {
		try {
			const response = await reportApi.handleReport({
				reportId: report.reportId,
			});
			console.log(response);
			setSeverity("success");
			setSnackBarOpen(true);
			setSnackBarMessage(response.data.message);
			setListReport((prev) =>
				prev.filter((el) => {
					return el.reportId != el.reportId;
				})
			);
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
				padding: "10px 10px",
			}}
		>
			<img
				src={report.productImage}
				style={{ width: "90px", heigth: "90px" }}
			/>
			<Typography sx={{ maxWidth: 350, color: "#424242" }}>
				{report.productName}
			</Typography>
			<Typography sx={{ maxWidth: 150, color: "#424242" }}>
				{report.description}
			</Typography>
			<Box>
				<Button
					variant="outlined"
					sx={{ textTransform: "none", marginRight: "12px" }}
					onClick={() => deleteReport()}
				>
					Bỏ qua báo cáo
				</Button>
				<Button
					variant="outlined"
					sx={{ textTransform: "none", marginRight: "12px" }}
					onClick={() => handleReport()}
				>
					Xử lý báo cáo
				</Button>
			</Box>
		</Box>
	);
};
