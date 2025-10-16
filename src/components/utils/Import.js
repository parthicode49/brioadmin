import React,{useState} from "react";

import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import imageXL from "./../../images/file9.png"
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Typography } from "@mui/material";
import { bulk_import } from "../../actions/import.js"
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import { Button } from "@mui/material";
import EnlargedView from "./EnlargedView";
import { useDispatch, useSelector } from "react-redux";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 500,
    width: "100%",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "8px",
  };
export default function Import({ isClubed,access, module_name }) {
	const user = useSelector((state) => state.layout.profile);
  const dispatch=useDispatch()
    const [open, setOpen] = useState(false);
    const [openMessageBox, setOpenMessageBox] = useState(false);
  const [content, setContent] = useState();
    const handleOpen = () => {
      if(access)
      setOpen(true)
      else{
        setContent(
          <p style={{ color: "black" }}>
           You do not have permission to import the file
          </p>
        );
        setOpen(true)
        }
    };
    const handleClose = () => setOpen(false);
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      data.append("module_name", module_name)
      data.append("id", user?.id)
      dispatch(bulk_import(data));
     
      handleClose()
      };
	return (
		<>
     <EnlargedView open={openMessageBox} setOpen={setOpenMessageBox} content={content}/>
    {isClubed?
		<Button style={{background: "linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)"}} sx={{
			textTransform: 'capitalize',
			borderRadius: '10px',
			mt: '10px',
			p: '10px 30px',
			fontSize: '14px',
			color: '#fff !important',
		  }} variant="contained" className="mr-10px" onClick={handleOpen} >Import</Button>:
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
				<Button style={{background: "linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)"}} sx={{
              textTransform: 'capitalize',
              borderRadius: '10px',
              p: '10px 30px',
              fontSize: '14px',
              color: '#fff !important',
            }} variant="contained" className="mr-10px" onClick={handleOpen}>Import</Button>
			</Grid>}
            <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="dark-BG-101010">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#EDEFF5",
                borderRadius: "8px",
                padding: "25px 20px",
              }}
              className="bg-black"
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                Bulk Upload
              </Typography>

              <IconButton
                aria-label="remove"
                size="small"
                onClick={handleClose}
                className="modal-close"
              >
                <ClearIcon />
              </IconButton>
            </Box>

            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Box
                sx={{
                  background: "#fff",
                  padding: "30px 20px",
                  borderRadius: "8px",
                }}
                className="dark-BG-101010"
              >
                <Grid container alignItems="center" justifyContent={"center"} spacing={1}>
                <Grid item xs={12} textAlign="center"> <Typography mt={1} fontWeight="500" fontSize="13px">
                
                Click here to download template
                        

</Typography>
</Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={ "-grid"}>
             <label for={ "image"} className="btn"> <Box
                sx={{
                  background: "#F3F6F9",
                  borderRadius: "10px",
                  padding: "40px 5px",
                  textAlign: "center",
                }}
                className="dark-BG-101010"
              >
                <img src={imageXL} alt="Icon"  height="100vh" />
                <Typography mt={1} fontWeight="500" fontSize="13px">
                
											Choose Excel to Upload
													
				
                </Typography>
				<span style={{fontSize:"9px",color:"red"}}>Please follow the template</span>
				<input
													type="file"
													id={ "image"}
													name="file"
													placeholder="Choose Image"
													style={{ visibility: "hidden",position:"relative",zIndex:"10",height:"100%" }}
													// onChange={(event) =>
													// 	event.target.files[0] &&
													// 	setForm({
													// 		...form,
													// 		[event.target.name]: event.target.files[0],
													// 	})
													// }
												/>
              </Box>
			  </label>
            </Grid>

                  <Grid item xs={12} textAlign="center">
                    <Button
                      type="submit"
                      variant="contained"
                      style={{background: "linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)"}}
                      sx={{
                        mt: 1,
                        textTransform: "capitalize",
                        borderRadius: "8px",
                        fontWeight: "500",
                        fontSize: "13px",
                        padding: "12px 20px",
                        color: "#fff !important",
                      }}
                    >
                      <AddIcon
                        sx={{
                          position: "relative",
                          top: "-2px",
                        }}
                        className="mr-5px"
                      />{" "}
                      Upload
                    </Button>
                  </Grid>
                </Grid>
                		
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
			</>
		
	);
}



