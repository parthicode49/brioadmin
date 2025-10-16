import React,{useState,useMemo} from 'react';
import {
  Box
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {  SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import {Link} from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import logo from "./../../../images/logo.png"
// import logo_black from "./../../../images/logo.png"
// import seven_logo from "./../../../images/logo_final.png"

const SidebarNav = styled("nav")(({ theme }) => ({
  background: 'var(--themeColor)',
  boxShadow: "0px 4px 20px rgba(47, 143, 232, 0.07)",
  width: '300px',
  padding: '30px 10px',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  transition: '350ms',
  zIndex: '10',
  overflowY: 'auto',
  '&::-webkit-scrollbar' : {
    
    width: "0rem",
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0)'
    
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#092433',
    borderRadius: '1rem',
    
  }
}

));
 
const SidebarWrap = styled("div")(({ theme }) => ({
  width: '100%'
}));

const Sidebar = ({ toogleActive,darkMode }) => {
  const [isActive,setIsActive]=useState("")
  const sidebardata=SidebarData(darkMode)
 
  return (
    <>
    <div   style={{height:"100%"}}>
    
        <SidebarNav  id="sideNavbar" style={{height:"100vh" ,overflowY:"auto"}} className="LeftSidebarNav dark">
          <SidebarWrap >
            <Box 
              sx={{ 
                mb: '20px',
                px: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                
                
              }}
            >
              <Link to='/Dashboard'>
                <img 
                  src={logo} alt="Logo" 
                  // src={seven_logo} alt="Logo" 

                  className='white-logo' 
                  // height={"100rem"} 
                  width={"190px"}
                />
                {/* <h2 style={{width:"200px" ,textAlign:"center"}}>BHAUKAAL</h2> */}
              </Link>

              <IconButton 
                onClick={toogleActive} 
                size="small"
                sx={{
                  background: 'rgb(253, 237, 237)',
                  display: { lg: 'none' }
                }}
              >
                <ClearIcon />
              </IconButton>
            </Box>

            {sidebardata.map((item, index) => {
              return <SubMenu item={item} isActive={isActive} setIsActive={setIsActive} key={index}  />;
            })}
          </SidebarWrap>
        </SidebarNav>
    
      </div>
    </>
  );
};

export default Sidebar;
