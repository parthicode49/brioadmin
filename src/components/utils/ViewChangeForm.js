import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import EnlargedView from "./EnlargedView";
import { useNavigate } from "react-router-dom"

export default function ViewChangeForm({
  setView, setIsEdit, export_excel, import_excel, create_new, view_all, view, access,reload
}) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const handleViewChange = (views) => {
    if(access){
      
      if (views == "view_all") navigate(view_all)
      else if (views == "create_new")
        navigate(create_new)
    } else{
      setContent(
				<p style={{ color: "var(--themeFontColor)" }}>
					You do not have permission to Add data
				</p>
			);
			setOpen(true);
    }
  };
  console.log("view",view ,view != "create_new")
  return (
    <>
      <EnlargedView open={open} setOpen={setOpen} content={content} />
      <Grid
        container
        item
        xs={12}
        md={12}
        key={"-grid"}
        lg={12}

        direction="row"
        justifyContent={"flex-end"}
        alignContent={"center"}
        marginLeft={"-1rem"}
        mb={1.5}
      >
        {view == "view_all" ?
          <Button
            startIcon={<InfoIcon sx={{ color: '#fff !important' }} />}
            variant="contained"
            color="info"
            sx={{
              textTransform: 'capitalize',
              borderRadius: '10px',
              mt: '10px',
              p: '10px 30px',
              fontSize: '14px',
              color: '#fff !important',
            }}
            style={{ background: "linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)" }}
            className="mr-10px"
            onClick={() => handleViewChange("view_all")}
          >
            View All
          </Button>
          :
          <Button
          startIcon={<AddIcon sx={{ color: '#fff !important' }} />}
          variant="contained"
          color="success"
          sx={{
            textTransform: 'capitalize',
            borderRadius: '10px',
            mt: '10px',
            p: '10px 30px',
            fontSize: '14px',
            color: '#fff !important',
          }}
          style={{ background: "linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)" }}
          className="mr-10px"
          onClick={() => handleViewChange("create_new")}
        >
          Add
        </Button>
        }
        {/* {view != "create_new" && 
        <Button
          startIcon={<AddIcon sx={{ color: '#fff !important' }} />}
          variant="contained"
          color="success"
          sx={{
            textTransform: 'capitalize',
            borderRadius: '10px',
            mt: '10px',
            p: '10px 30px',
            fontSize: '14px',
            color: '#fff !important',
          }}
          style={{ background: "linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)" }}
          className="mr-10px"
          onClick={() => handleViewChange("create_new")}
        >
          Add
        </Button>} */}
        {view == "create_new" && export_excel}
        {view != "create_new" && import_excel}
        {view != "create_new" && reload}
      </Grid>
    </>
  );
}
