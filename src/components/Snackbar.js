import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { forwardRef } from "react";

export const SnackbarCustom = ({ open, setOpen, message, severity }) => {
	const vertical = "top";
	const horizontal = "center";

	const handleCloseSnackbar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};
	const Alert = forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	return (
		<Snackbar
			open={open}
			autoHideDuration={2000}
			onClose={handleCloseSnackbar}
			anchorOrigin={{ vertical, horizontal }}
		>
			<Alert
				onClose={handleCloseSnackbar}
				severity="success"
				sx={{ width: "100%" }}
			>
				{message}
			</Alert>
		</Snackbar>
	);
};
