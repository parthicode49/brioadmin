import React, { useState, useMemo } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SidebarData } from "../LeftSidebar/SidebarData";
import SubMenu from "./SubMenu";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import logo from "./../../../images/logo.png";
// import logo_black from "./../../../images/logo.png"

const SidebarNav = styled("nav")(({ theme }) => ({
  boxShadow: "0px 4px 20px rgba(47, 143, 232, 0.07)",
  width: "98.8vw",
  padding: "0px 10px",
  height: "max-content",
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  transition: "350ms",
  zIndex: "10",
  transform: "rotateX(180deg)",
  overflowY: "visible",
  "&::-webkit-scrollbar": {
    width: ".1rem",
    height: ".4rem",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "var(--themeFontColor)",
    borderRadius: "1rem",
  },
}));

const SidebarWrap = styled("div")(({ theme }) => ({
  width: "100vw",
  display: "flex",
  justifyContent: "space-evenly",
  transform: "rotateX(180deg)",
}));

const Sidebar = ({ darkMode }) => {
  const [isActive, setIsActive] = useState("");
  const sidebardata = SidebarData(darkMode);

  return (
    <div
      style={{
        marginBottom: "2rem",
        background: "var(--themeColor)",
        zIndex: "1100",
        height: "3.5rem",
        overflow: "visible",
        borderRadius: "8px",
        marginLeft: "2rem",
        marginRight: "2rem",
        position: "sticky",
        top: "4.5rem",
        left: "0",
        boxShadow:"var(--themeShadow)",
        display:"flex",
        alignItems:"center"
      }}
    >
      <SidebarNav id="topNavbar" className="TopSidebarNav">
        <SidebarWrap>
          {sidebardata.map((item, index) => {
            return (
              <SubMenu
                item={item}
                isActive={isActive}
                setIsActive={setIsActive}
                key={index}
              />
            );
          })}
        </SidebarWrap>
      </SidebarNav>
    </div>
  );
};

export default Sidebar;
