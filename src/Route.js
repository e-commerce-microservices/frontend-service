import { Route, Routes } from "react-router-dom";
import { About } from "./components/About";
import { CartManager } from "./components/Cart";
import Chat from "./components/Chat";
import { ForgotPassword } from "./components/ForgotPassword";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { OrderMange } from "./components/OrderManage";
import ProductDetail from "./components/ProductDetail";
import { ProductListing } from "./components/ProductListing";
import { Register } from "./components/Register";
import { SearchResult } from "./components/SearchResult";
import { RegisterSeller } from "./components/SellerRegister";
import { ShopManager } from "./components/ShopManager";
import { UserProfile } from "./components/UserProfile";
import { ViewShop } from "./components/ViewShop";

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
			<Route path="/chat" element={<Chat />}></Route>

			<Route path="/product_detail" element={<ProductDetail />}></Route>

			{/* supplier,shop */}
			<Route path="/supplier/register" element={<RegisterSeller />}></Route>
			<Route path="/manage_shop" element={<ShopManager />}></Route>

			{/* Category */}

			<Route path="/product_listing" element={<ProductListing />}></Route>
			<Route path="/search" element={<SearchResult />}></Route>
			{/* <Route path="/orders" element={<Order />}></Route> */}
			<Route path="/orders-manage" element={<OrderMange />}></Route>

			{/* Cart */}
			<Route path="/carts" element={<CartManager />}></Route>
			<Route path="/view-shop" element={<ViewShop />}></Route>

			{/* Profile */}
			<Route path="/user-profile" element={<UserProfile />}></Route>
		</Routes>
	);
}
