import React, { useState, useMemo, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import styles from "./SubMenu.module.css";
import { useLocation } from "react-router-dom";

import EnlargedView from "../../utils/EnlargedView";

const SubMenu = ({ item, isActive, setIsActive }) => {
  const role = JSON.parse(localStorage.getItem("loggedInDetails"));
  const [currentPath, setCurrentPath] = useState("");
  const router = useLocation();
  useMemo(() => {
    setCurrentPath(router.pathname);
  }, [router]);

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  return (
    <div style={{ position: "relative", overflow: "visible" }}>
      <EnlargedView open={open} setOpen={setOpen} content={content} />
      <div
        style={{
          position: "relative",
          overflow: "visible",
          background: "var(--themeColor)",
          height: "fit-content",
          // borderBottomRightRadius: "10px",
          // borderBottomLeftRadius: "10px",
          borderRadius:"7px",
          width:"100%",
          maxWidth: "167px",
          // marginBottom: "1rem",
          // ,paddingLeft:"1rem"
        }}
        onMouseOver={() => {
          setIsActive(item.path.split("/")[1]);
        }}
        onMouseOut={() => {
          setIsActive();
        }}
      >
        <Link
          to={
            item.subNav == undefined &&
            (currentPath.split("/").pop() == item.path.split("/").pop()
              ? currentPath
              : item.path)
          }
          onClick={() => {
            if (isActive == item.path.split("/")[1]) setIsActive();
            else {
              setIsActive(item.path.split("/")[1]);
            }
          }}
          className={`${styles.sidebarLink} ${
            currentPath.split("/")[1] == item.path.split("/")[1] &&
            "sidebarLinkActive"
          } ${
            role?.id?.userType?.roleName == "Advertiser"
              ? styles.inlinetext
              : ""
          }`}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "max-content",
              // justifyContent:"center"
            }}
          >
            <span >{item.icon}</span>
            <span className="ml-1">{item.title}</span>
          </div>

          <div style={{ display: "flex", color: "var(--themeFontColor)" }}>
            {/* {item?.access != "true" && !item.subNav && <div><img src="https://i.ibb.co/k20TGP4/Lock1.png" height={"20px"} /></div>} */}
            {item.subNav && item.iconOpened}
          </div>
        </Link>
        {item.subNav && isActive == item.path.split("/")[1] && (
          <div
            style={{
              boxShadow: "var(--themeShadow)",
              background: "var(--themeColor)",
              margin: ".2rem",
              right: item.title == "Settings" && "0",
              borderRadius: "10px",
              margin: "0",
              position: "absolute",
              top: "2.5rem",
              zIndex: "1000",
              width: "max-content",
            }}
          >
            {item.subNav.map((item, index) => {
              return (
                <Link
                  to={item.path}
                  key={index}
                  // onClick={() => {
                  //   if (item?.access != "true") {
                  //     setContent(
                  //       <p style={{ color: "black" }}>
                  //         You don't have permission to view this module
                  //       </p>
                  //     );
                  //     setOpen(true)
                  //   }

                  // }}
                  className={`${styles.sidebarLink2} ${
                    currentPath == item.path && "sidebarLinkActive2"
                  }`}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {item.icon}
                  {item.title}
                  {/* {item?.access != "true" && <div><img src="https://i.ibb.co/k20TGP4/Lock1.png" height={"30px"} /></div>} */}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubMenu;
