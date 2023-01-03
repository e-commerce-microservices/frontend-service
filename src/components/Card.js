import StarIcon from "@mui/icons-material/Star";
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { Link } from "react-router-dom";

export default function EcommerceCard({ product }) {
	return (
		<Card variant="outlined">
			<CardActionArea component={Link} to={`/product/${product.id}`}>
				<CardMedia
					component="img"
					image="https://salt.tikicdn.com/cache/750x750/ts/product/f5/52/80/1f5c2c344cbf5d13ff2691eefb7e3055.png.webp"
					alt="green iguana"
				/>
				<CardContent>
					<Typography variant="body2" color="text.secondary">
						Lizards are a widespread group of squamate reptiles, with over 6,000
						species, ranging across all continents except Antarctica
					</Typography>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
						}}
					>
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{ marginRight: "3px" }}
						>
							3.5
						</Typography>
						<StarIcon sx={{ color: "#ffca28", width: "16px" }} />
						<Box
							sx={{
								width: "1px",
								height: "12px",
								backgroundColor: "rgb(199, 199, 199)",
								margin: "0px 5px",
							}}
						></Box>
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{ marginRight: "3px" }}
						>
							Đã bán 512
						</Typography>
					</Box>
					<Typography component="div" sx={{ marginTop: "6px" }}>
						259.000 VND
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
