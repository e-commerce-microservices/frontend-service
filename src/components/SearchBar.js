import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ setSearchQuery, handleSubmit }) => (
	<form onSubmit={handleSubmit}>
		<TextField
			sx={{
				input: { color: "#FFF", borderColor: "#FFF" },
				"& .MuiOutlinedInput-notchedOutline": {
					borderColor: "#fff !important;",
				},
			}}
			id="search-bar"
			onInput={(e) => {
				setSearchQuery(e.target.value);
			}}
			variant="outlined"
			placeholder="Tìm kiếm sản phẩm"
			size="small"
		/>
	</form>
);
export default function App() {
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			e.target.value = "";
			navigate(`/search?key=${searchQuery}`);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignSelf: "center",
				justifyContent: "center",
				flexDirection: "column",
				marginLeft: "12px",
				borderColor: "#FFF",
			}}
		>
			<SearchBar
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				handleSubmit={handleSubmit}
			/>
		</Box>
	);
}
