import {
	Box,
	Button,
	ButtonGroup,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Paper,
	Radio,
	RadioGroup,
	Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { forwardRef, useEffect, useState } from "react";
import { authHelper } from "../api/authApi";
import { cartApi } from "../api/cartApi";
import { orderApi } from "../api/orderApi";
import { XsContainer } from "./Layout";

export const CartManager = () => {
	const [listCart, setListCart] = useState([]);
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

	useEffect(() => {
		const fetch = async () => {
			const response = await cartApi.getAll();
			let listCart = response.data.listCart;
			listCart = listCart.map((el) => {
				el.checked = false;
				return el;
			});
			setListCart(listCart);
		};
		fetch();
	}, []);

	return (
		<XsContainer marginTop={"32px"} backgroundColor="#FFF" padding="40px 40px">
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
			<Grid container spacing={1}>
				<Grid item xs={9}>
					<Typography
						variant="h2"
						sx={{
							fontWeight: "450",
							fontSize: "24px",
							marginBottom: "12px",
							color: "#333",
						}}
					>
						Giỏ hàng
					</Typography>
					<CartHeader />
					{listCart.map((cart) => (
						<Cart
							cart={cart}
							key={cart.id}
							id={cart.id}
							setListCart={setListCart}
						/>
					))}
				</Grid>
				<Grid item xs={3}>
					<Typography
						variant="h2"
						sx={{
							fontWeight: "450",
							fontSize: "24px",
							marginBottom: "12px",
							color: "#333",
						}}
					>
						Địa chỉ giao hàng
					</Typography>
					<Paper sx={{ padding: "20px" }}>
						<Address
							listCart={listCart}
							setSnackBarMessage={setSnackBarMessage}
							setSeverity={setSeverity}
							setSnackBarOpen={setSnackBarOpen}
							setListCart={setListCart}
						/>
					</Paper>
				</Grid>
			</Grid>
		</XsContainer>
	);
};

const Cart = ({ cart, setListCart, id }) => {
	const [checked, setChecked] = useState(false);
	const [productCount, setProductCount] = useState(cart.quantity);

	const handleDeleteCart = async () => {
		try {
			const response = await cartApi.delete({ cartId: cart.id });
			if (response.status === 200) {
				setListCart((prev) => {
					return prev.filter((el) => {
						return el.id != id;
					});
				});
			}
		} catch (err) {
			console.error(err);
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
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					width: 450,
				}}
			>
				<Checkbox
					sx={{ marginRight: "24px" }}
					checked={checked}
					onChange={() => {
						setChecked(!checked);
						setListCart((prev) => {
							return prev.map((el) => {
								if (id == el.id) {
									el.checked = !checked;
								}
								return el;
							});
						});
					}}
				/>
				<img
					src={cart.product.thumbnail}
					style={{ width: "90px", heigth: "90px", marginRight: "24px" }}
				/>
				<Typography sx={{ color: "#333", marginRight: "24px" }}>
					{cart.product.name}
				</Typography>
			</Box>
			<Typography sx={{ color: "#333", width: 150, marginRight: "0px" }}>
				{convertToVndFormat(cart.product.price)}
			</Typography>
			<ButtonGroup sx={{ marginRight: "50px", color: "#333", width: 100 }}>
				<Button
					sx={{ height: "25px", width: "25px", fontSize: "24px" }}
					onClick={() => {
						if (productCount > 1) {
							setListCart((prev) => {
								return prev.map((el) => {
									if (id == el.id) {
										el.quantity = productCount - 1;
									}
									return el;
								});
							});
							setProductCount(productCount - 1);
						}
					}}
				>
					-
				</Button>
				<Button sx={{ height: "25px", width: "25px" }}>{productCount}</Button>
				<Button
					sx={{ height: "25px", width: "25px", fontSize: "24px" }}
					onClick={() => {
						setListCart((prev) => {
							return prev.map((el) => {
								if (id == el.id) {
									el.quantity = productCount + 1;
								}
								return el;
							});
						});
						setProductCount(productCount + 1);
					}}
				>
					+
				</Button>
			</ButtonGroup>
			{/* <Typography sx={{ marginRight: "24px", color: "#333", width: 100 }}>
				{cart.quantity}
			</Typography> */}
			<Typography sx={{ marginRight: "24px", color: "#333", width: 150 }}>
				{convertToVndFormat(cart.product.price * cart.quantity)}
			</Typography>
			<Button
				variant="outlined"
				sx={{ textTransform: "none", marginRight: "12px", marginLeft: "auto" }}
				onClick={handleDeleteCart}
			>
				Xóa
			</Button>
		</Box>
	);
};

const CartHeader = () => {
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
				padding: "10px 10px",
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					width: 450,
				}}
			>
				<Typography sx={{ fontWeight: "450", color: "#333" }}>
					Chọn mua
				</Typography>
			</Box>
			<Typography
				sx={{
					marginRight: "24px",
					fontWeight: "450",
					color: "#333",
					width: 150,
				}}
			>
				Đơn giá
			</Typography>
			<Typography
				sx={{
					marginRight: "24px",
					fontWeight: "450",
					color: "#333",
					width: 100,
				}}
			>
				Số lượng
			</Typography>
			<Typography
				sx={{
					marginRight: "24px",
					fontWeight: "450",
					color: "#333",
					width: 150,
				}}
			>
				Thành tiền
			</Typography>
		</Box>
	);
};

const Address = ({
	listCart,
	setSeverity,
	setSnackBarMessage,
	setSnackBarOpen,
	setListCart,
}) => {
	const currentUser = authHelper.getUser();
	console.log(currentUser);
	const [phone, setPhone] = useState(currentUser.profile.phone);
	const [username, setUsername] = useState(currentUser.profile.userName);
	const [address, setAddress] = useState(
		currentUser.address.length > 0 ? currentUser.address[0].address : ""
	);

	const handleOrder = async (e) => {
		e.preventDefault();

		try {
			let listOrder = [];
			let remainOrder = [];
			listCart.forEach((el) => {
				if (el.checked) {
					listOrder.push({
						product_id: el.product.productId,
						order_quantity: el.quantity,
						cart_id: parseInt(el.id),
						supplier_id: el.product.supplierId,
					});
				} else {
					remainOrder.push(el);
				}
			});
			console.log(listOrder);

			const data = new FormData(e.currentTarget);
			const response = await orderApi.create({
				addr: {
					name: "Tran Ngocc",
					phone: "0339229174",
					detail: "Thanh Xuan, Ha Noi",
				},
				listOrder: listOrder,
			});
			console.log(response);

			if (response.status === 200) {
				setListCart(remainOrder);

				setSnackBarOpen(true);
				setSeverity("success");
				setSnackBarMessage(response.data.message);
			} else {
				setSnackBarOpen(true);
				setSeverity("error");
				setSnackBarMessage(response.response.data.message);
			}
		} catch (err) {
			setSnackBarOpen(true);
			setSeverity("error");
			setSnackBarMessage("Tạo đơn hàng không thành côngg");
		}
	};

	return (
		<Box component="form" onSubmit={(e) => handleOrder(e)} noValidate>
			<FormControl>
				<FormLabel id="demo-radio-buttons-group-label">Chọn địa chỉ</FormLabel>
				<RadioGroup
					aria-labelledby="demo-radio-buttons-group-label"
					defaultValue="female"
					name="radio-buttons-group"
				>
					<FormControlLabel
						value="female"
						control={<Radio />}
						sx={{ marginTop: "12px" }}
						label={
							<Box sx={{ display: "flex", flexDirection: "column" }}>
								<Typography>Người nhận: Tran Ngocc</Typography>
								<Typography>Phone: 0339229174</Typography>
								<Typography>Địa chỉ: Thanh Xuan, Ha Noi</Typography>
							</Box>
						}
					/>
					<FormControlLabel
						value="male"
						control={<Radio />}
						sx={{ marginTop: "12px" }}
						label={
							<Box sx={{ display: "flex", flexDirection: "column" }}>
								<Typography>Người nhận: Tran Ngocc</Typography>
								<Typography>Phone: 0339229174</Typography>
								<Typography>Địa chỉ: Đại học BKHN</Typography>
							</Box>
						}
					/>
				</RadioGroup>
			</FormControl>
			<Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
				Thêm địa chỉ khác
			</Button>
			<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
				Mua ngay
			</Button>
		</Box>
	);
};

function convertToVndFormat(price) {
	return parseInt(price).toLocaleString("vi-VN", {
		style: "currency",
		currency: "VND",
	});
}
