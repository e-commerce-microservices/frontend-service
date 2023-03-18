import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
	Avatar,
	Box,
	Button,
	Container,
	CssBaseline,
	Grid,
	Link,
	Snackbar,
	TextField,
	Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

export const Register = () => {
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState();
	const [severity, setSeverity] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

		try {
			const response = await authApi.register({
				email: data.get("email"),
				password: data.get("password"),
				username: data.get("username"),
			});
			console.log(response);
			if (response.status == 200) {
				setSeverity("success");
				setSnackbarMessage("Đăng kí thành công, vui lòng đăng nhập để sử dụng");
				setSnackbarOpen(true);
				await delay(2000);

				navigate("/auth/login");
			} else {
				setSeverity("error");
				setSnackbarMessage(response.response.data.message);
				setSnackbarOpen(true);
			}
		} catch (err) {
			setSeverity("error");
			setSnackbarMessage(err.response.data.message);
			setSnackbarOpen(true);
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
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Register
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						name="username"
						label="User Name"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						name="email"
						label="Email Address"
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						label="Password"
						type="password"
						id="password"
						name="password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Register
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="/auth/forgot-password" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="/auth/login" variant="body2">
								{"Already have an account? Login"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};
