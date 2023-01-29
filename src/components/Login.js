import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi, { authHelper } from "../api/authApi";
import userApi from "../api/userApi";

const theme = createTheme();

export const Login = () => {
	const navigate = useNavigate();
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState();
	const [severity, setSeverity] = useState("success");

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = new FormData(event.currentTarget);
			let response = await authApi.login({
				email: data.get("email"),
				password: data.get("password"),
			});

			if (response.error) {
				return;
			}
			const { accessToken, refreshToken } = response.data;
			authHelper.setToken({ accessToken: accessToken });
			authHelper.setRefresh({ refreshToken: refreshToken });

			// get user infomation
			response = await userApi.me({ accessToken });
			authHelper.setUser({ user: response.data });

			navigate("/");
		} catch (err) {
			setSeverity("error");
			setSnackbarOpen(true);
			setSnackbarMessage(err.response.data.message);
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
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs" sx={{ minHeight: "100vh" }}>
				<CssBaseline />

				<Snackbar
					open={snackbarOpen}
					autoHideDuration={3000}
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
						Log in
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Log In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="/auth/register" variant="body2">
									{"Don't have an account? Register"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};
