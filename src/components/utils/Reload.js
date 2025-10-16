import React from "react";
import Grid from "@mui/material/Grid";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "@mui/material";
export default function Reload({
	
	isClubed,
}) {
	const refresh = () => window.location.reload(true)
	return (
		<>
		
			{isClubed ? (
				<Button
					style={{
						background:
							"linear-gradient(225deg,  #ac1600 0%, #500303 91.25%)",
					}}
					sx={{
						textTransform: "capitalize",
						borderRadius: "10px",
						mt: "10px",
						p: "10px 30px",
						fontSize: "14px",
						color: "#fff !important",
					}}
					variant="contained"
					className="mr-10px"
					onClick={refresh}
				>
					Reset
				</Button>
			) : (
				<Grid
					item
					xs={12}
					md={12}
					key={"-grid"}
					lg={12}
					container
					direction="row"
					justifyContent={"flex-end"}
					alignItems={"center"}
					marginLeft={"-1rem"}
					marginBottom={"0.7rem"}
					
				>
					<Button
					style={{
						background:
							"linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)",
					}}
					sx={{
						textTransform: "capitalize",
						borderRadius: "10px",
						mt: "10px",
						p: "10px 30px",
						fontSize: "14px",
						color: "#fff !important",
					}}
					variant="contained"
					className="mr-10px"
					onClick={refresh}
				>
					Reset
				</Button>
				</Grid>
			)}
		</>
	);
}
