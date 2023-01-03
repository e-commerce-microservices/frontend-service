import StarIcon from "@mui/icons-material/Star";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useState } from "react";
import { XsContainer } from "./Layout";

export default function ProductDetail() {
	const theme = useTheme();
	const [product, setProduct] = useState({});
	const [image, setImage] = useState({
		src: "https://salt.tikicdn.com/cache/750x750/ts/product/e2/1a/80/ebd11992c962a5e63d0b148b78cfee9d.png.webp",
		alt: "image",
	});

	return (
		<XsContainer marginTop={theme.spacing(2)}>
			<Grid container sx={{ backgroundColor: "#FFF", padding: "16px" }}>
				<Grid item xs={12} md={5}>
					<Thumbnail image={image} />
				</Grid>
				<Grid item xs={12} md={7}>
					<Description product={product} />
				</Grid>
			</Grid>
			<Grid container sx={{ backgroundColor: "#FFF", padding: "16px" }}></Grid>
		</XsContainer>
	);
}

const Thumbnail = ({ image }) => {
	return (
		<Box>
			<img src={image.src} alt={image.alt} style={{ maxWidth: 500 }} />
		</Box>
	);
};

const Description = ({ product }) => {
	return (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			<Typography>Thương hiệu: Sam sung</Typography>
			<Typography>
				Điện thoại Samsung Galaxy Z Flip 4 (8GB/128GB) - Hàng chính hãng
			</Typography>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<StarIcon sx={{ color: "#ffca28", width: "16px" }} />
				<Typography>Xem 40 đánh giá</Typography>
				<Box
					sx={{
						width: "1px",
						height: "12px",
						backgroundColor: "rgb(199, 199, 199)",
						margin: "0px 5px",
					}}
				></Box>
				<Typography>Đã bán 181</Typography>
			</Box>
		</Box>
	);
};
