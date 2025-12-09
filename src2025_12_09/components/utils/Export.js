import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Button } from "@mui/material";
import axios from 'axios';
import EnlargedView from "./EnlargedView";
export default function Export({
	exportData,
	headings,
	fileName,
	isClubed,
	api,
	isApi,
	api_data ,
	access,
}) {
	const fileType =
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
	const fileExtension = ".xlsx";
	const [open, setOpen] = useState(false);
	const [content, setContent] = useState();
	const refresh = () => window.location.reload(true)

	// const exportToCSV = () => {
	// 	// if (access) {
	// 	// 	exportData.map((value) => {
	// 	// 		delete value.id;
	// 	// 		delete value?.color;
	// 	// 	});
	// 	// 	const excelData = [];
	// 	// 	exportData.map((value, index) =>
	// 	// 		{
	// 	// 			excelData.push({})
	// 	// 			Object.entries(value)?.map(( subvalue) =>
	// 	// 			{
	// 	// 				if(typeof subvalue[1] == "string")
	// 	// 				excelData[index][subvalue[0]]=subvalue[1]
	// 	// 				else if (Array.isArray(subvalue[1]))
	// 	// 				excelData[index][subvalue[0]]= subvalue[1].toString()
						
	// 	// 			}
	// 	// 		)}
	// 	// 	);

	// 	// 	const ws = XLSX.utils.json_to_sheet(excelData);
	// 	// 	// XLSX.utils.sheet_add_aoa(ws, [headings], { origin: "A1" });
	// 	// 	const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
	// 	// 	const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
	// 	// 	const data = new Blob([excelBuffer], { type: fileType });
	// 	// 	FileSaver.saveAs(data, fileName + fileExtension);
	// 	// } else {
	// 	// 	setContent(
	// 	// 		<p style={{ color: "#fff" }}>
	// 	// 			You do not have permission to Export data
	// 	// 		</p>
	// 	// 	);
	// 	// 	setOpen(true);
	// 	// }
	// 	axios({
	// 		// url: `http://192.168.0.125:5000/api/${api}/`, // Your endpoint
	// 		url: api({api_data}), // Your endpoint
	// 		method: 'POST',
	// 		responseType: 'blob', // Important for handling binary data
	// 	  }).then((response) => {
	// 		const url = window.URL.createObjectURL(new Blob([response.data]));
	// 		const link = document.createElement('a');
	// 		link.href = url;
	// 		link.setAttribute('download', fileName); // File name
	// 		document.body.appendChild(link)
	// 	  ;
	// 		link.click();
	// 	  });

	// };
	console.log("isClubed:",isClubed)
	const exportToCSV = () => {
		if (isApi) {

			axios({
					method: 'POST',
					url: `https://primeapi.tygonott.com/api/${api}/`, // Pass the correct endpoint here
					data: api_data, // Pass the payload
					responseType: 'blob', // Important for binary data
				})
				.then((response) => {
					console.log(response.data); // Log to confirm the content
					const url = window.URL.createObjectURL(new Blob([response.data]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', fileName);
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				})
				.catch((error) => {
					console.error("Error exporting the file:", error);
				})
		}else{

			exportData?.map((value) => {
				delete value.id;
				delete value?.color;
			});
			const excelData = [];
			exportData?.map((value, index) =>
				{
					excelData.push({})
					Object.entries(value)?.map(( subvalue) =>
					{
						if(typeof subvalue[1] == "string")
						excelData[index][subvalue[0]]=subvalue[1]
						else if (Array.isArray(subvalue[1]))
						excelData[index][subvalue[0]]= subvalue[1].toString()
						
					}
				)}
			);

			const ws = XLSX.utils.json_to_sheet(excelData);
			// XLSX.utils.sheet_add_aoa(ws, [headings], { origin: "A1" });
			const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
			const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
			const data = new Blob([excelBuffer], { type: fileType });
			FileSaver.saveAs(data, fileName + fileExtension)
		}
	};
	return (
		<>
			<EnlargedView open={open} setOpen={setOpen} content={content} />
			{isClubed ? (
				<Button
					style={{
						background:
							"linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)",
					}}
					sx={{
						textTransform: "capitalize",
						borderRadius: "10px",
						// mt: "10px",
						p: "10px 30px",
						fontSize: "14px",
						color: "#fff !important",
					}}
					variant="contained"
					className="mr-10px"
					onClick={(e) => exportToCSV()}
				>
					Export
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
				>
					<Button
						style={{
							background:
								"linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)",
						}}
						sx={{
							textTransform: "capitalize",
							borderRadius: "10px",
							p: "10px 30px",
							fontSize: "14px",
							color: "#fff !important",
						}}
						variant="contained"
						className="mr-10px"
						onClick={(e) => exportToCSV()}
					>
						Export
					</Button>
					<Button
					style={{
						background:
						"linear-gradient(225deg,  #ac1600 0%, #500303 91.25%)",
					}}
					sx={{
						textTransform: "capitalize",
						borderRadius: "10px",
						// mt: "4px",
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
