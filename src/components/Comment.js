import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
	Avatar,
	Button,
	Grid,
	ImageList,
	ImageListItem,
	Modal,
	Rating,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { commentApi } from "../api/commentApi";
import userApi from "../api/userApi";
import { XsContainer } from "./Layout";

export default function Comment() {
	const theme = useTheme();
	const [listComment, setListComment] = useState([]);
	const [listUser, setListUser] = useState([]);

	const search = useLocation().search;
	useEffect(() => {
		try {
			const fetch = async () => {
				const productId = new URLSearchParams(search).get("product_id");
				const response = await commentApi.listing({ productId: productId });
				setListComment(response.data.listReview);
				let listUserId = response.data.listReview.map((review) => {
					return parseInt(review.userId);
				});
				const listUser = await userApi.getUserById({ userId: listUserId });
				setListUser(listUser.data.listUser);
			};
			fetch();
		} catch (err) {
			console.log(err);
		}
	}, []);

	return (
		<XsContainer marginTop={theme.spacing(2)}>
			{listComment.length === 0 ? (
				<EmptyComment />
			) : (
				listComment.map((comment, i) => (
					<NoEmptyComment
						comment={comment}
						key={comment.reviewId}
						user={listUser[i]}
					/>
				))
			)}
			<AddComment
				productId={new URLSearchParams(search).get("product_id")}
				setListComment={setListComment}
			/>
		</XsContainer>
	);
}

const EmptyComment = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				paddingBottom: "80px",
			}}
		>
			<AssignmentLateIcon sx={{ fontSize: 128, color: "#e0e0e0" }} />
			<Typography sx={{ fontSize: "24px", color: "#9e9e9e" }}>
				Hiện tại sản phẩm này chưa có nhận xét nào
			</Typography>
		</Box>
	);
};

const NoEmptyComment = ({ comment, user }) => {
	return (
		<Box>
			<Grid container sx={{ padding: "16px", borderRadius: "5px" }}>
				<Grid item xs={12} md={4}>
					<Box sx={{ display: "flex", flexDirection: "column" }}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
							}}
						>
							<Avatar> {user ? user.profile.userName : "Unknown"}</Avatar>
							<Box>
								<Typography
									variant="body1"
									sx={{ marginLeft: "12px", fontWeight: "450" }}
								>
									{user ? user.profile.userName : "Unknown"}
								</Typography>
								<Typography
									variant="body2"
									sx={{
										marginLeft: "12px",
										color: "#757575",
									}}
								>
									Thành viên mới
								</Typography>
							</Box>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={12} md={8}>
					<CommentDetail comment={comment} />
				</Grid>
			</Grid>
		</Box>
	);
};

const CommentDetail = ({ comment }) => {
	return (
		<Box
			sx={{ display: "flex", flexDirection: "column", marginBottom: "24px" }}
		>
			<Box sx={{ display: "flex", alignContent: "center" }}>
				<Box sx={{ display: "flex", alignContent: "center" }}>
					<Rating readOnly value={comment.numStar} size="medium" />
				</Box>
				<Typography
					sx={{ marginLeft: "12px", fontSize: "16px", fontWeight: "450" }}
					variant="body2"
				>
					{convStarToText(comment.numStar)}
				</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					marginTop: "4px",
				}}
			>
				<CheckCircleIcon
					sx={{
						color: "rgb(0, 171, 86)",
						fontSize: "18px",
						marginRight: "4px",
					}}
				/>
				<Typography
					sx={{ color: "rgb(0, 171, 86)", fontSize: "14px", fontWeight: "450" }}
				>
					Đã mua hàng
				</Typography>
			</Box>
			<Typography
				sx={{ fontSize: "15px", marginTop: "12px", color: "#424242" }}
			>
				{comment.content}
			</Typography>
			<ImageList sx={{ height: 250, marginTop: "12px" }} cols={4}>
				{comment.imageUrl.map((item) => (
					<ImageListItem key={item}>
						<img
							src={`${item}?w=164&h=164&fit=crop&auto=format`}
							srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
							alt={"comment user"}
							loading="lazy"
						/>
					</ImageListItem>
				))}
			</ImageList>
		</Box>
	);
};

const AddComment = ({ productId, setListComment }) => {
	const [ratingReview, setRatingReview] = useState();
	const [openPopup, setOpenPopup] = useState(false);
	const [content, setContent] = useState("");
	const [productImage, setProductImage] = useState([]);

	const handlePostComment = () => {
		const fetch = async () => {
			console.log(productImage);
			await commentApi.create({
				productId: productId,
				content: content,
				numStar: ratingReview,
				imageDataChunk: productImage,
			});
			setListComment((prev) => {
				return [...prev];
			});
			setOpenPopup(false);
			setProductImage([]);
		};
		fetch();
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				marginBottom: "24px",
				width: 200,
				marginLeft: "auto",
			}}
		>
			<Button
				color="primary"
				fullWidth
				variant="outlined"
				onClick={() => setOpenPopup(true)}
			>
				Thêm nhận xét
			</Button>
			<Modal
				open={openPopup}
				onClose={() => setOpenPopup(false)}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Grid
					item
					container
					style={{
						backgroundColor: "#fff",
						width: 600,
						padding: 20,
					}}
				>
					<Grid
						item
						container
						xs={1}
						style={{ justifyContent: "center", marginRight: 10 }}
					>
						<Avatar alt="User avatar" src={""} />
					</Grid>
					<Grid item container xs={10} direction="column">
						<Grid item>
							<Typography variant="body2">{""}</Typography>
						</Grid>
						<Grid item>
							<Rating
								name="simple-controlled"
								value={ratingReview}
								onChange={(event, newValue) => {
									setRatingReview(newValue);
								}}
							/>
						</Grid>
						<Grid item container style={{ width: 430 }}>
							<TextField
								label="Content"
								fullWidth
								style={{ margin: "10px 0" }}
								onChange={(e) => setContent(e.target.value)}
							/>
							<Stack
								direction="row"
								alignItems="center"
								spacing={2}
								sx={{ marginBottom: "24px" }}
							>
								<Button
									variant="outlined"
									component="label"
									sx={{ textTransform: "none" }}
								>
									Ảnh sản phẩm
									<input
										hidden
										accept="image/*"
										multiple
										type="file"
										onChange={(e) => {
											var reader = new FileReader();
											reader.readAsDataURL(e.target.files[0]);

											reader.onload = () => {
												setProductImage((prev) => {
													return [...prev, reader.result];
												});
											};
										}}
									/>
								</Button>
							</Stack>
							<Button
								color="primary"
								fullWidth
								variant="contained"
								onClick={handlePostComment}
							>
								Thêm ngay
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Modal>
		</Box>
	);
};

const convStarToText = (star) => {
	if (star === 5) {
		return "Cực kì hài lòng";
	}
	if (star === 4) {
		return "Khá là ổn";
	}
	if (star === 3) {
		return "Cần cải thiện";
	}
	if (star === 2) {
		return "Không hài lòng";
	}
	if (star === 1) {
		return "Sản phẩm chất lượng kém";
	}

	return "Hài lòng";
};
