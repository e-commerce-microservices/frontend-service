import PersonIcon from "@mui/icons-material/Person";
import {
	Button,
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
import { Box } from "@mui/system";
import { forwardRef, useEffect, useState } from "react";
import { authHelper } from "../api/authApi";
import shopApi from "../api/shopApi";
import userApi from "../api/userApi";
import { XsContainer } from "./Layout";

export const UserProfile = () => {
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

	const [userInfoView, setUserInfoView] = useState(true);

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
			<Grid container sx={{ height: 700, padding: "0px" }}>
				<Grid
					item
					xs={0}
					md={3}
					sx={{ bgcolor: "background.paper", padding: "0px" }}
				>
					<Box sx={{ height: "100%", borderRight: "2px solid #e0e0e0" }}>
						<List
							sx={{ width: "100%", bgcolor: "background.paper" }}
							subheader={
								<ListSubheader component="div" id="nested-list-subheader">
									Quản lý thông tin cá nhân
								</ListSubheader>
							}
						>
							<ListItemButton
								onClick={() => {
									setUserInfoView(true);
								}}
							>
								<ListItemIcon sx={{ minWidth: "40px" }}>
									<PersonIcon />
								</ListItemIcon>
								<ListItemText primary={"Thông tin tài khoản"} />
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
						{userInfoView && (
							<UserInfo
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

const UserInfo = ({ setSeverity, setSnackBarMessage, setSnackBarOpen }) => {
	const [user, setUser] = useState({});
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [shopname, setShopname] = useState("");
	const [address, setAddress] = useState("");
	const [shop, setShop] = useState({});

	useEffect(() => {
		const currentUser = authHelper.getUser();
		console.log(currentUser);
		setEmail(currentUser.email);
		setPhone(currentUser.profile.phone);
		setUsername(currentUser.profile.userName);
		setUser(currentUser);
		if (currentUser.address.length > 0) {
			setAddress(currentUser.address[0].address);
		}
	}, []);
	useEffect(() => {
		const fetch = async () => {
			const currentUser = authHelper.getUser();
			const response = await shopApi.getShop({ shopId: currentUser.id });
			setShop(response.data);
		};
		fetch();
	}, []);

	const handleUpdateInfo = async () => {
		if (username.length == 0) {
			setSeverity("error");
			setSnackBarMessage("Vui lòng điền đầy đủ họ và tên");
			setSnackBarOpen(true);
		} else {
			const response = await userApi.updateProfile({
				userName: username,
				phone: phone,
				address: address,
			});
			console.log(response);
			if (response.status === 200) {
				const getUser = await userApi.me({
					accessToken: authHelper.getToken(),
				});
				authHelper.setUser({ user: getUser.data });

				setSeverity("success");
				setSnackBarMessage(response.data.message);
				setSnackBarOpen(true);
			}
		}
	};

	const handleUpdateShopName = async () => {
		if (shopname.length == 0) {
			setSeverity("error");
			setSnackBarMessage("Vui lòng điền tên cửa hàng");
			setSnackBarOpen(true);
		} else {
			const response = await shopApi.updateShopName({ name: shopname });
			console.log(response);
			if (response.status === 200) {
				setSeverity("success");
				setSnackBarMessage(response.data.name);
				setSnackBarOpen(true);
			}
		}
	};

	return (
		<Grid container sx={{ width: "100%", height: "100%" }}>
			{/* sx={{ borderRight: "1px solid #e0e0e0" }} */}
			<Grid item xs={6} sx={{ paddingLeft: "32px" }}>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					<Typography
						sx={{
							fontSize: "16px",
							fontWeight: "bold",
							marginBottom: "16px",
							color: "#757575",
						}}
					>
						Thông tin cá nhân
					</Typography>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Typography sx={{ fontSize: "16px", width: 150, color: "#424242" }}>
							Họ và tên
						</Typography>
						<input
							style={{ padding: "8px", width: 250 }}
							defaultValue={user.profile == null ? "" : user.profile.userName}
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						/>
					</Box>
					<Box
						sx={{ display: "flex", alignItems: "center", marginTop: "12px" }}
					>
						<Typography sx={{ fontSize: "16px", width: 150, color: "#424242" }}>
							Địa chỉ email
						</Typography>
						<input
							style={{ padding: "8px", width: 250 }}
							disabled
							value={user.email}
							// onChange={(e) => {
							// 	setEmail(e.target.value);
							// }}
						/>
					</Box>
					<Box
						sx={{ display: "flex", alignItems: "center", marginTop: "12px" }}
					>
						<Typography sx={{ fontSize: "16px", width: 150, color: "#424242" }}>
							Số điện thoại
						</Typography>
						<input
							style={{ padding: "8px", width: 250 }}
							defaultValue={user.profile == null ? "" : user.profile.phone}
							onChange={(e) => {
								setPhone(e.target.value);
							}}
						/>
					</Box>
					<Box
						sx={{ display: "flex", alignItems: "center", marginTop: "12px" }}
					>
						<Typography sx={{ fontSize: "16px", width: 150, color: "#424242" }}>
							Địa chỉ nhận hàng
						</Typography>
						<input
							style={{ padding: "8px", width: 250 }}
							defaultValue={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
					</Box>
					<Box
						sx={{ display: "flex", alignItems: "center", marginTop: "12px" }}
					>
						{/* <Typography sx={{ fontSize: "16px", width: 150, color: "#424242" }}>
							Giới tính
						</Typography> */}
						{/* <input
							style={{ padding: "8px", width: 250 }}
							defaultValue={gender}
						/> */}
						{/* <FormControl>
							<RadioGroup
								row
								aria-labelledby="demo-radio-buttons-group-label"
								defaultValue={"other"}
								name="radio-buttons-group"
							>
								<FormControlLabel
									value="female"
									control={<Radio />}
									label="Female"
								/>
								<FormControlLabel
									value="male"
									control={<Radio />}
									label="Male"
								/>
								<FormControlLabel
									value="other"
									control={<Radio />}
									label="Other"
								/>
							</RadioGroup>
						</FormControl> */}
					</Box>
					<Box
						sx={{ display: "flex", alignItems: "center", marginTop: "12px" }}
					>
						<Box sx={{ fontSize: "16px", width: 150 }}></Box>
						<Button
							variant="contained"
							sx={{ width: 150, fontSize: "12px", textTransform: "none" }}
							onClick={handleUpdateInfo}
						>
							Lưu thay đổi
						</Button>
					</Box>
				</Box>
				{authHelper.isSupplier() && (
					<Box
						sx={{ display: "flex", flexDirection: "column", marginTop: "32px" }}
					>
						<Typography
							sx={{
								fontSize: "16px",
								fontWeight: "bold",
								marginBottom: "16px",
								color: "#757575",
							}}
						>
							Thông tin cửa hàng
						</Typography>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Typography
								sx={{ fontSize: "16px", width: 150, color: "#424242" }}
							>
								Tên cửa hàng
							</Typography>
							<input
								style={{
									padding: "8px",
									width: 250,
								}}
								defaultValue={shop.name}
								onChange={(e) => setShopname(e.target.value)}
							/>
						</Box>
						<Box
							sx={{ display: "flex", alignItems: "center", marginTop: "12px" }}
						>
							<Box sx={{ fontSize: "16px", width: 150 }}></Box>
							<Button
								variant="contained"
								sx={{ width: 150, fontSize: "12px", textTransform: "none" }}
								onClick={handleUpdateShopName}
							>
								Lưu thay đổi
							</Button>
						</Box>
					</Box>
				)}
			</Grid>
			<Grid item xs={6}>
				{/* <Box
					sx={{ display: "flex", flexDirection: "column", paddingLeft: "20px" }}
				>
					<Box sx={{ display: "flex", flexDirection: "column" }}>
						<Typography
							sx={{
								fontSize: "16px",
								fontWeight: "bold",
								marginBottom: "16px",
								color: "#757575",
							}}
						>
							Thông tin địa chỉ nhận hàng
						</Typography>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Typography
								sx={{ fontSize: "16px", width: 150, color: "#424242" }}
							>
								Địa chỉ nhận
							</Typography>
							<input
								style={{ padding: "8px", width: 250 }}
								defaultValue={address}
							/>
						</Box>
						<Box
							sx={{ display: "flex", alignItems: "center", marginTop: "12px" }}
						>
							<Typography
								sx={{ fontSize: "16px", width: 150, color: "#424242" }}
							>
								Ghi chú
							</Typography>
							<input
								style={{ padding: "8px", width: 250 }}
								defaultValue={address}
							/>
						</Box>
						<Box
							sx={{ display: "flex", alignItems: "center", marginTop: "12px" }}
						>
							<Box sx={{ fontSize: "16px", width: 150 }}></Box>
							<Button
								variant="contained"
								sx={{ width: 150, fontSize: "12px", textTransform: "none" }}
							>
								Lưu thay đổi
							</Button>
						</Box>
					</Box>
				</Box> */}
			</Grid>
		</Grid>
	);
};
