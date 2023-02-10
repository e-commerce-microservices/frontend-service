import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import MailIcon from "@mui/icons-material/Mail";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authHelper } from "../api/authApi";
import Search from "./SearchBar";

export default function NavBar() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const navigate = useNavigate();

	// get data from localStorage
	const [currentUser, setCurrentUser] = React.useState(authHelper.getUser());
	React.useEffect(() => {
		const interval = setInterval(() => {
			const currentUser = authHelper.getUser();
			setCurrentUser(currentUser);
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
		// navigate to profile
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};
	const handleMenuCloseAndLogout = () => {
		handleMenuClose();
		authHelper.logOut();
		setCurrentUser(null);
		navigate("/");
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose} component={Link} to="/user-profile">
				Quản lý thông tin cá nhân
			</MenuItem>
			<MenuItem onClick={handleMenuCloseAndLogout}>Đăng xuất</MenuItem>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton size="large" aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="error">
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="show 17 new notifications"
					color="inherit"
				>
					<Badge badgeContent={17} color="error">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="show 17 new notifications"
					color="inherit"
				>
					<Badge badgeContent={17} color="error">
						<ShoppingCartIcon />
					</Badge>
				</IconButton>
				<p>Cart</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h6"
						noWrap
						component={Link}
						to="/"
						sx={{
							display: {
								xs: "none",
								sm: "block",
								color: "#FFF",
								textDecoration: "none",
							},
						}}
					>
						Ecommerce
					</Typography>
					<Search />
					<Box sx={{ flexGrow: 1 }} />
					{currentUser != null ? (
						<AuthenticatedUser
							menuId={menuId}
							handleProfileMenuOpen={handleProfileMenuOpen}
							userId={currentUser.id}
							userRole={currentUser.role}
						/>
					) : (
						<IconButton
							size="large"
							aria-label="show 17 carts"
							color="inherit"
							href="/auth/login"
						>
							<LoginIcon />
						</IconButton>
					)}

					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</Box>
	);
}

const AuthenticatedUser = ({
	menuId,
	handleProfileMenuOpen,
	userId,
	userRole,
}) => {
	return (
		<Box sx={{ display: { xs: "none", md: "flex" } }}>
			<IconButton color="inherit" size="large" component={Link} to="/">
				<HomeIcon />
			</IconButton>
			{(userRole === "supplier" || userRole === "admin") && (
				<IconButton
					color="inherit"
					size="large"
					component={Link}
					to={`/manage_shop?supplier_id=${userId}`}
				>
					<StorefrontIcon />
				</IconButton>
			)}

			<IconButton
				size="large"
				aria-label="show 17 new notifications"
				color="inherit"
				component={Link}
				to="/notifications"
			>
				<Badge badgeContent={17} color="error">
					<NotificationsIcon />
				</Badge>
			</IconButton>
			<IconButton size="large" color="inherit" component={Link} to="/carts">
				<ShoppingCartIcon />
			</IconButton>
			<IconButton
				size="large"
				edge="end"
				aria-label="account of current user"
				aria-controls={menuId}
				aria-haspopup="true"
				onClick={handleProfileMenuOpen}
				color="inherit"
			>
				<AccountCircle />
			</IconButton>
		</Box>
	);
};
