import { Container } from "@mui/system";

export const XsContainer = ({
	children,
	maxWidth,
	marginTop,
	marginBottom,
}) => {
	return (
		<Container
			maxWidth={maxWidth || "lg"}
			style={{ marginTop: marginTop, marginBottom: marginBottom }}
		>
			{children}
		</Container>
	);
};
