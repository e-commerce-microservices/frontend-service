import { Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import * as React from "react";
import EcommerceCard from "./Card";
import { XsContainer } from "./Layout";

export const Home = () => {
	const theme = useTheme();

	return (
		<XsContainer marginTop={theme.spacing(2)}>
			<Grid container spacing={2}>
				<Grid item xs={0} md={4} lg={3}>
					<NestedList />
				</Grid>
				<Grid item container xs={12} md={8} lg={9} spacing={1}>
					<Grid item xs={12} sm={6} md={3}>
						<EcommerceCard product={{ id: 1 }} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<EcommerceCard product={{ id: 2 }} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<EcommerceCard product={{ id: 3 }} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<EcommerceCard product={{ id: 4 }} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<EcommerceCard product={{ id: 5 }} />
					</Grid>
				</Grid>
			</Grid>
		</XsContainer>
	);
};

const NestedList = () => {
	const theme = useTheme();

	return (
		<List
			sx={{
				width: "100%",
				bgcolor: "background.paper",
				borderRadius: theme.spacing(1),
			}}
			component="nav"
			aria-labelledby="category-list-subheader"
			subheader={
				<ListSubheader
					component="div"
					id="category-list-subheader"
					sx={{ borderRadius: theme.spacing(1) }}
				>
					Danh mục sản phẩm
				</ListSubheader>
			}
		>
			<ListItemButton>
				<ListItemIcon>
					<CategoryImage src="https://salt.tikicdn.com/ts/category/54/c0/ff/fe98a4afa2d3e5142dc8096addc4e40b.png" />
				</ListItemIcon>
				<ListItemText primary="Điện thoại, máy tính bảng" />
			</ListItemButton>
			<ListItemButton>
				<ListItemIcon>
					<CategoryImage src="https://salt.tikicdn.com/ts/category/54/c0/ff/fe98a4afa2d3e5142dc8096addc4e40b.png" />
				</ListItemIcon>
				<ListItemText primary="Điện thoại, máy tính bảng" />
			</ListItemButton>
			<ListItemButton>
				<ListItemIcon>
					<CategoryImage src="https://salt.tikicdn.com/ts/category/54/c0/ff/fe98a4afa2d3e5142dc8096addc4e40b.png" />
				</ListItemIcon>
				<ListItemText primary="Điện thoại, máy tính bảng" />
			</ListItemButton>
		</List>
	);
};

const CategoryImage = ({ src }) => {
	return (
		<Box>
			<img
				src={src}
				style={{ width: "32px", height: "32px" }}
				alt="category image"
			/>
		</Box>
	);
};
