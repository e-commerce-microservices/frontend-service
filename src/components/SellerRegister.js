import {
	Box,
	Button,
	Container,
	CssBaseline,
	TextField,
	Typography,
} from "@mui/material";

import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi, { authHelper } from "../api/authApi";
import shopApi from "../api/shopApi";
import userApi from "../api/userApi";

export const RegisterSeller = () => {
	const navigate = useNavigate();
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState();
	const [severity, setSeverity] = useState("success");

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = new FormData(event.currentTarget);
			const shopName = data.get("shopname");

			const response = await shopApi.register({
				accessToken: authHelper.getToken(),
				shopName: shopName,
			});
			console.log(response);
			const currentUser = authHelper.getUser();
			// navigate(`/shop_manager?supplier_id=${currentUser.id}`);
			console.log(currentUser);
			if (response.status === 200) {
				setSnackbarMessage(response.data.message);
				setSnackbarOpen(true);
				setSeverity("success");

				// create new token
				const refresh = await authApi.refresh({
					refreshToken: authHelper.getRefreshToken(),
				});
				const { accessToken } = refresh.data;
				authHelper.setToken({ accessToken: accessToken });
				const user = await userApi.me({ accessToken });
				authHelper.setUser({ user: user.data });
				const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
				await delay(2000);

				navigate("/");
			} else {
				setSnackbarMessage(response.response.data.message);
				setSnackbarOpen(true);
				setSeverity("error");
			}
		} catch (err) {
			setSnackbarMessage(err.response.data.message);
			setSnackbarOpen(true);
			setSeverity("error");
		}
	};

	const vertical = "top";
	const horizontal = "center";

	const handleCloseSnackbar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setSnackbarOpen(false);
	};
	const Alert = forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});
	return (
		<Container component="main" maxWidth="xs" sx={{ minHeight: "90vh" }}>
			<CssBaseline />
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={2000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical, horizontal }}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={severity}
					sx={{ width: "100%" }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography component="h1" variant="h5">
					Đăng kí làm người bán hàng
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="shopname"
						label="Tên shop"
						name="shopname"
						autoFocus
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Đăng kí ngay
					</Button>
				</Box>
			</Box>
		</Container>
	);
};
