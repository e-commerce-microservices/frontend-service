import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import FlagIcon from "@mui/icons-material/Flag";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
	Box,
	Grid,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { forwardRef, useEffect, useState } from "react";
import { authHelper } from "../api/authApi";
import { orderApi } from "../api/orderApi";
import reportApi from "../api/reportApi";
import { XsContainer } from "./Layout";
import {
	OrderBoughtCard,
	OrderHandleCard,
	OrderHandledCard,
	OrderWaitingCard,
	ReportProductCart,
} from "./Order";

export const OrderMange = () => {
	const [updateUserInfoView, setUpdateUserInfoView] = useState(false);
	const [orderBoughtView, setOrderBoughtView] = useState(true);
	const [orderWatingView, setOrderWaitingView] = useState(false);
	const [orderHandleView, setOrderHandleView] = useState(false);
	const [orderHandledView, setOrderHandledView] = useState(false);
	const [orderDeletedByCustomer, setOrderDeletedByCustomer] = useState(false);
	const [orderDeletedBySupplier, setOrderDeletedBySupplier] = useState(false);

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

	return (
		<XsContainer marginTop="16px" marginBottom="32px">
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
			<Grid container sx={{ height: 900, padding: "0px" }}>
				<Grid
					item
					xs={0}
					md={3}
					sx={{ bgcolor: "background.paper", padding: "0px" }}
				>
					<Box sx={{ height: "100%", borderRight: "2px solid #e0e0e0" }}>
						<List
							sx={{
								width: "100%",
								bgcolor: "background.paper",
							}}
							component="nav"
							aria-labelledby="nested-list-subheader"
							subheader={
								<ListSubheader component="div" id="nested-list-subheader">
									Quản lý mua hàng
								</ListSubheader>
							}
						>
							<ListItemButton
								onClick={() => {
									setUpdateUserInfoView(false);
									setOrderBoughtView(true);
									setOrderWaitingView(false);
									setOrderHandleView(false);
									setOrderHandledView(false);
									setOrderDeletedByCustomer(false);
									setOrderDeletedBySupplier(false);
								}}
							>
								<ListItemIcon sx={{ minWidth: "40px" }}>
									<ShoppingCartOutlinedIcon />
								</ListItemIcon>
								<ListItemText primary={"Đơn hàng đã mua"} />
							</ListItemButton>
							<ListItemButton
								onClick={() => {
									setUpdateUserInfoView(false);
									setOrderBoughtView(false);
									setOrderWaitingView(true);
									setOrderHandleView(false);
									setOrderHandledView(false);
									setOrderDeletedByCustomer(false);
									setOrderDeletedBySupplier(false);
								}}
							>
								<ListItemIcon sx={{ minWidth: "40px" }}>
									<HourglassBottomOutlinedIcon />
								</ListItemIcon>
								<ListItemText primary={"Đơn hàng đang chờ xử lý"} />
							</ListItemButton>
							<ListItemButton
								onClick={() => {
									setUpdateUserInfoView(false);
									setOrderBoughtView(false);
									setOrderWaitingView(false);
									setOrderHandleView(false);
									setOrderHandledView(false);
									setOrderDeletedByCustomer(true);
									setOrderDeletedBySupplier(false);
								}}
							>
								<ListItemIcon sx={{ minWidth: "40px" }}>
									<HourglassBottomOutlinedIcon />
								</ListItemIcon>
								<ListItemText primary={"Đơn hàng đã bị hủy"} />
							</ListItemButton>
						</List>
						{authHelper.isSupplier() && (
							<List
								sx={{
									width: "100%",
									bgcolor: "background.paper",
								}}
								component="nav"
								aria-labelledby="nested-list-subheader"
								subheader={
									<ListSubheader component="div" id="nested-list-subheader">
										Quản lý bán hàng
									</ListSubheader>
								}
							>
								<ListItemButton
									onClick={() => {
										setUpdateUserInfoView(false);
										setOrderBoughtView(false);
										setOrderWaitingView(false);
										setOrderHandleView(true);
										setOrderHandledView(false);
										setOrderDeletedByCustomer(false);
										setOrderDeletedBySupplier(false);
									}}
								>
									<ListItemIcon sx={{ minWidth: "40px" }}>
										<HourglassBottomOutlinedIcon />
									</ListItemIcon>
									<ListItemText primary={"Đơn hàng đang cần duyệt"} />
								</ListItemButton>
								<ListItemButton
									onClick={() => {
										setUpdateUserInfoView(false);
										setOrderBoughtView(false);
										setOrderWaitingView(false);
										setOrderHandleView(false);
										setOrderHandledView(true);
										setOrderDeletedByCustomer(false);
										setOrderDeletedBySupplier(false);
									}}
								>
									<ListItemIcon sx={{ minWidth: "40px" }}>
										<HourglassBottomOutlinedIcon />
									</ListItemIcon>
									<ListItemText primary={"Đơn hàng đã duyệt"} />
								</ListItemButton>
								<ListItemButton
									onClick={() => {
										setUpdateUserInfoView(false);
										setOrderBoughtView(false);
										setOrderWaitingView(false);
										setOrderHandleView(false);
										setOrderHandledView(false);
										setOrderDeletedByCustomer(false);
										setOrderDeletedBySupplier(true);
									}}
								>
									<ListItemIcon sx={{ minWidth: "40px" }}>
										<HourglassBottomOutlinedIcon />
									</ListItemIcon>
									<ListItemText primary={"Đơn hàng đã hủy"} />
								</ListItemButton>
							</List>
						)}
						{authHelper.isAdmin() && (
							<List
								sx={{
									width: "100%",
									bgcolor: "background.paper",
								}}
								component="nav"
								aria-labelledby="nested-list-subheader"
								subheader={
									<ListSubheader component="div" id="nested-list-subheader">
										Quản lý báo cáo sản phẩm
									</ListSubheader>
								}
							>
								<ListItemButton
									onClick={() => {
										setUpdateUserInfoView(true);
										setOrderBoughtView(false);
										setOrderWaitingView(false);
										setOrderHandleView(false);
										setOrderHandledView(false);
										setOrderDeletedByCustomer(false);
										setOrderDeletedBySupplier(false);
									}}
								>
									<ListItemIcon sx={{ minWidth: "40px" }}>
										<FlagIcon />
									</ListItemIcon>
									<ListItemText primary={"Xử lý báo cáo"} />
								</ListItemButton>
							</List>
						)}
					</Box>
				</Grid>
				<Grid
					item
					container
					xs={12}
					md={9}
					sx={{ bgcolor: "background.paper" }}
				>
					<Box sx={{ height: "100%", width: "100%", padding: "20px" }}>
						{orderWatingView && <OrderWaiting />}
						{orderBoughtView && <OrderBought />}
						{orderHandleView && <OrderHandle />}
						{orderHandledView && <OrderHandled />}
						{orderDeletedByCustomer && <OrderCancelCustomer />}
						{orderDeletedBySupplier && <OrderCancelSupplier />}
						{authHelper.isAdmin() && updateUserInfoView && (
							<ReportProduct
								setSeverity={setSeverity}
								setSnackBarOpen={setSnackBarOpen}
								setSnackBarMessage={setSnackBarMessage}
							/>
						)}
					</Box>
				</Grid>
			</Grid>
		</XsContainer>
	);
};

const ReportProduct = ({
	setSeverity,
	setSnackBarOpen,
	setSnackBarMessage,
}) => {
	const [listReport, setListReport] = useState([]);
	useEffect(() => {
		const fetch = async () => {
			const response = await reportApi.getAllReport();
			setListReport(response.data.listReport);
		};
		fetch();
	}, []);

	return (
		<Box sx={{ width: "100%", height: "100%" }}>
			<Typography
				sx={{ fontSize: "32px", marginBottom: "12px", color: "#757575" }}
			>
				Danh sách sản phẩm bị báo cáo
			</Typography>
			{listReport.map((report) => (
				<ReportProductCart
					report={report}
					key={report.reportId}
					setSeverity={setSeverity}
					setSnackBarOpen={setSnackBarOpen}
					setSnackBarMessage={setSnackBarMessage}
					setListReport={setListReport}
				/>
			))}
		</Box>
	);
};

const OrderCancelCustomer = () => {
	const [listOrder, setListOrder] = useState([]);
	useEffect(() => {
		const fetch = async () => {
			const response = await orderApi.handledCancelByCustomer();
			setListOrder(response.data.listOrder);
		};

		fetch();
	}, []);

	return (
		<Box sx={{ width: "100%", height: "100%" }}>
			<Typography
				sx={{ fontSize: "32px", marginBottom: "12px", color: "#757575" }}
			>
				Danh sách đơn hàng đã hủy
			</Typography>
			{listOrder.map((order) => (
				<OrderHandledCard
					order={order}
					key={order.orderId}
					setListOrder={setListOrder}
					listOrder={listOrder}
				/>
			))}
		</Box>
	);
};

const OrderCancelSupplier = () => {
	const [listOrder, setListOrder] = useState([]);
	useEffect(() => {
		const fetch = async () => {
			const response = await orderApi.handledCancelBySupplier();
			setListOrder(response.data.listOrder);
		};

		fetch();
	}, []);

	return (
		<Box sx={{ width: "100%", height: "100%" }}>
			<Typography
				sx={{ fontSize: "32px", marginBottom: "12px", color: "#757575" }}
			>
				Danh sách đơn hàng đã duyệt
			</Typography>
			{listOrder.map((order) => (
				<OrderHandledCard
					order={order}
					key={order.orderId}
					setListOrder={setListOrder}
					listOrder={listOrder}
				/>
			))}
		</Box>
	);
};

const OrderBought = () => {
	const [listOrder, setListOrder] = useState([]);
	useEffect(() => {
		const fetch = async () => {
			const response = await orderApi.handledOrderByCustomer();
			setListOrder(response.data.listOrder);
		};
		fetch();
	}, []);

	return (
		<Box sx={{ width: "100%", height: "100%" }}>
			<Typography
				sx={{ fontSize: "32px", marginBottom: "12px", color: "#757575" }}
			>
				Danh sách đơn hàng đã mua
			</Typography>
			{listOrder.map((order) => (
				<OrderBoughtCard order={order} key={order.orderId} />
			))}
		</Box>
	);
};

const OrderWaiting = () => {
	const [listOrder, setListOrder] = useState([]);
	useEffect(() => {
		const fetch = async () => {
			const response = await orderApi.waitingOrderByCustomer();
			setListOrder(response.data.listOrder);
		};
		fetch();
	}, []);

	return (
		<Box sx={{ width: "100%", height: "100%" }}>
			<Typography
				sx={{ fontSize: "32px", marginBottom: "12px", color: "#757575" }}
			>
				Danh sách đơn hàng đang chờ xử lý
			</Typography>
			{listOrder.map((order) => (
				<OrderWaitingCard
					order={order}
					key={order.orderId}
					setListOrder={setListOrder}
					listOrder={listOrder}
				/>
			))}
		</Box>
	);
};

const OrderHandle = () => {
	const [listOrder, setListOrder] = useState([]);
	useEffect(() => {
		const fetch = async () => {
			const response = await orderApi.waitingOrderBySupplier();
			console.log(response.data);
			setListOrder(response.data.listOrder);
		};
		fetch();
	}, []);

	return (
		<Box sx={{ width: "100%", height: "100%" }}>
			<Typography
				sx={{ fontSize: "32px", marginBottom: "12px", color: "#757575" }}
			>
				Danh sách đơn hàng cần duyệt
			</Typography>
			{listOrder.map((order) => (
				<OrderHandleCard
					order={order}
					key={order.orderId}
					setListOrder={setListOrder}
					listOrder={listOrder}
				/>
			))}
		</Box>
	);
};

const OrderHandled = () => {
	const [listOrder, setListOrder] = useState([]);
	useEffect(() => {
		const fetch = async () => {
			const response = await orderApi.handledOrderBySupplier();
			console.log(response.data);
			setListOrder(response.data.listOrder);
		};
		fetch();
	}, []);

	return (
		<Box sx={{ width: "100%", height: "100%" }}>
			<Typography
				sx={{ fontSize: "32px", marginBottom: "12px", color: "#757575" }}
			>
				Danh sách đơn hàng đã duyệt
			</Typography>
			{listOrder.map((order) => (
				<OrderHandledCard
					order={order}
					key={order.orderId}
					setListOrder={setListOrder}
					listOrder={listOrder}
				/>
			))}
		</Box>
	);
};
const EmptyOrder = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<AssignmentLateIcon sx={{ fontSize: 110, color: "#e0e0e0" }} />
			<Typography sx={{ fontSize: "24px", color: "#9e9e9e" }}>
				Hiện chưa có đơn hàng nào
			</Typography>
		</Box>
	);
};
