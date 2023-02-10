import { Container } from "@mui/system";

export const XsContainer = ({
	children,
	maxWidth,
	marginTop,
	marginBottom,
	backgroundColor,
	padding,
}) => {
	return (
		<Container
			maxWidth={maxWidth || "lg"}
			style={{
				marginTop: marginTop,
				marginBottom: marginBottom,
				backgroundColor: backgroundColor,
				padding: padding,
			}}
		>
			{children}
		</Container>
	);
};
