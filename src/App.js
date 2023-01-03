import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "./components/Nav";
import EcommerceRoute from "./Route";

const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1450,
			xl: 1536,
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<NavBar />
			<EcommerceRoute />
		</ThemeProvider>
	);
}

export default App;
