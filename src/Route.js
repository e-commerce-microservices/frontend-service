import { Route, Routes } from "react-router-dom";
import { About } from "./components/About";
import { ForgotPassword } from "./components/ForgotPassword";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import ProductDetail from "./components/ProductDetail";
import { Register } from "./components/Register";

export default function EcommerceRoute() {
	return (
		<Routes>
			{/* auth */}
			<Route path="/about" element={<About />}></Route>
			<Route path="/auth/login" element={<Login />}></Route>
			<Route path="/auth/register" element={<Register />}></Route>
			<Route path="/auth/forgot-password" element={<ForgotPassword />}></Route>

			{/* home */}
			<Route path="/" element={<Home />}></Route>

			<Route path="/product/:product_id" element={<ProductDetail />}></Route>
		</Routes>
	);
}
