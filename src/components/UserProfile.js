import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
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
import { useEffect, useState } from "react";
import { orderApi } from "../api/orderApi";
import { XsContainer } from "./Layout";
import { OrderBoughtCard, OrderHandleCard, OrderWaitingCard } from "./Order";

export const UserProfile = () => {
	const [updateUserInfoView, setUpdateUserInfoView] = useState(true);
	const [orderBoughtView, setOrderBoughtView] = useState(false);
	const [orderWatingView, setOrderWaitingView] = useState(false);
	const [orderHandleView, setOrderHandleView] = useState(false);

	return (
		<XsContainer marginTop="16px" marginBottom="32px">
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
									Quản lý thông tin cá nhân
								</ListSubheader>
							}
						>
							<ListItemButton
								onClick={() => {
									setUpdateUserInfoView(true);
									setOrderBoughtView(false);
									setOrderWaitingView(false);
									setOrderHandleView(false);
								}}
							>
								<ListItemIcon sx={{ minWidth: "40px" }}>
									<PersonOutlineOutlinedIcon />
								</ListItemIcon>
								<ListItemText primary={"Chỉnh sửa thông tin cá nhân"} />
							</ListItemButton>
						</List>
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
								}}
							>
								<ListItemIcon sx={{ minWidth: "40px" }}>
									<HourglassBottomOutlinedIcon />
								</ListItemIcon>
								<ListItemText primary={"Đơn hàng đang chờ xử lý"} />
							</ListItemButton>
						</List>
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
								}}
							>
								<ListItemIcon sx={{ minWidth: "40px" }}>
									<HourglassBottomOutlinedIcon />
								</ListItemIcon>
								<ListItemText primary={"Đơn hàng đang cần duyệt"} />
							</ListItemButton>
						</List>
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
					</Box>
				</Grid>
			</Grid>
		</XsContainer>
	);
};

const UpdateUser = () => {
	return <Box>User update</Box>;
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
