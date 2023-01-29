import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { forwardRef, useState } from "react";

export const SnackbarCustom = ({ vertical, horizontal }) => {
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState();
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
		<Snackbar
			open={snackbarOpen}
			autoHideDuration={1000}
			onClose={handleCloseSnackbar}
			anchorOrigin={{ vertical, horizontal }}
		>
			<Alert
				onClose={handleCloseSnackbar}
				severity="success"
				sx={{ width: "100%" }}
			>
				{snackbarMessage}
			</Alert>
		</Snackbar>
	);
};
