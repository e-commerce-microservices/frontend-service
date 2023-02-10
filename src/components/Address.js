import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { orderApi } from "../api/orderApi";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	borderRadius: "4px",
	pt: 2,
	px: 4,
	pb: 3,
};

export const AddAddress = ({
	open,
	setOpen,
	product,
	quantity,
	setSnackBarMessage,
	setSnackBarOpen,
}) => {
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = new FormData(event.currentTarget);

			let address = data.get("address");
			let note = data.get("note");

			const response = await orderApi.listing({
				productID: product.productId,
				orderQuantity: quantity,
				supplierID: product.supplierId,
			});
			setOpen(false);
			setSnackBarMessage(response.data.message);
			setSnackBarOpen(true);
		} catch (err) {
			console.log(err);
			setOpen(false);
			setSnackBarMessage("Tạo đơn hàng không thành công");
			setSnackBarOpen(true);
		}
	};

	return (
		<Modal
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="parent-modal-title"
			aria-describedby="parent-modal-description"
		>
			<Box sx={{ ...style, width: 500 }}>
				<Box>
					<Typography
						sx={{
							color: "rgb(0, 171, 86)",
							fontSize: "24px",
							fontWeight: "450",
						}}
					>
						Tóm tắt đơn hàng
					</Typography>
					<Typography sx={{ color: "#757575" }}>
						Tên sản phẩm: {product.name}
					</Typography>
					<Typography sx={{ color: "#757575" }}>
						Số lượng: {quantity}
					</Typography>
					<Typography sx={{ color: "#757575" }}>
						Tổng tiền: {convertToVndFormat(quantity * product.price)}
					</Typography>
				</Box>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						fullWidth
						id="product_name"
						label="Địa chỉ giao hàng"
						name="address"
						autoFocus
					/>
					<TextField
						margin="normal"
						fullWidth
						id="product_price"
						label="Ghi chú dành cho shop"
						name="note"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Mua ngay
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

function convertToVndFormat(price) {
	return parseInt(price).toLocaleString("vi-VN", {
		style: "currency",
		currency: "VND",
	});
}
