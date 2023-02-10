import {
	Box,
	Button,
	Checkbox,
	Grid,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { cartApi } from "../api/cartApi";
import { XsContainer } from "./Layout";

export const CartManager = () => {
	const [listCart, setListCart] = useState([]);

	useEffect(() => {
		const fetch = async () => {
			const response = await cartApi.getAll();
			console.log(response);
		};
		fetch();
	}, []);

	const cart = {
		productImage:
			"https://salt.tikicdn.com/cache/280x280/ts/product/24/ce/1e/72bb9f75d23ec25c66ae61a3ea280444.png",
		orderQuantity: 10,
		productPrice: 1000000,
		productName: "test product name",
	};
	return (
		<XsContainer marginTop={"32px"} backgroundColor="#FFF" padding="40px 40px">
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
					<Cart cart={cart} />
					<Cart cart={cart} />
					<Cart cart={cart} />
					<Cart cart={cart} />
					<Cart cart={cart} />
					<Cart cart={cart} />
					<Cart cart={cart} />
					<Cart cart={cart} />
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
						<Address />
					</Paper>
				</Grid>
			</Grid>
		</XsContainer>
	);
};

const Cart = ({ cart }) => {
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
				<Checkbox defaultChecked sx={{ marginRight: "24px" }} />
				<img
					src={cart.productImage}
					style={{ width: "90px", heigth: "90px", marginRight: "24px" }}
				/>
				<Typography sx={{ color: "#333", marginRight: "24px" }}>
					{cart.productName}
				</Typography>
			</Box>
			<Typography sx={{ color: "#333", width: 150, marginRight: "24px" }}>
				{convertToVndFormat(cart.productPrice)}
			</Typography>
			<Typography sx={{ marginRight: "24px", color: "#333", width: 100 }}>
				{cart.orderQuantity}
			</Typography>
			<Typography sx={{ marginRight: "24px", color: "#333", width: 150 }}>
				{convertToVndFormat(cart.productPrice * cart.orderQuantity)}
			</Typography>
			<Button
				variant="outlined"
				sx={{ textTransform: "none", marginRight: "12px", marginLeft: "auto" }}
				// onClick={handleDeleteOrder}
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
					defaultChecked
					sx={{ marginRight: "24px" }}
					onChange={(event) => {
						console.log(event.target.checked);
					}}
				/>
				<Typography sx={{ fontWeight: "450", color: "#333" }}>
					Chọn tất cả
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
			<Button
				variant="outlined"
				sx={{ textTransform: "none", marginRight: "12px", marginLeft: "auto" }}
				// onClick={handleDeleteOrder}
			>
				Xóa
			</Button>
		</Box>
	);
};

const Address = () => {
	return (
		<Box component="form" onSubmit={() => {}} noValidate>
			<TextField
				margin="normal"
				fullWidth
				id="user"
				label="Tên người mua hàng"
				name="buyer"
				autoFocus
			/>
			<TextField
				margin="normal"
				fullWidth
				id="product_name"
				label="Số điện thoại"
				name="phone"
			/>
			<TextField
				margin="normal"
				fullWidth
				id="product_name"
				label="Địa chỉ giao hàng"
				name="address"
			/>
			<TextField
				margin="normal"
				fullWidth
				id="product_price"
				label="Ghi chú dành cho shop"
				name="note"
			/>
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
