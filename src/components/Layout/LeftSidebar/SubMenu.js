import React, { useState, useMemo, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import styles from "./SubMenu.module.css";
import { useLocation } from "react-router-dom";

import EnlargedView from "../../utils/EnlargedView";

const SubMenu = ({ item, isActive, setIsActive }) => {
  const [currentPath, setCurrentPath] = useState("");
  const router = useLocation();
  useMemo(() => {
    setCurrentPath(router.pathname);
  }, [router]);

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  return (
    <>
      <EnlargedView open={open} setOpen={setOpen} content={content} />
      <Link
        to={
          item.subNav == undefined &&
          (currentPath.split("/").pop() == item.path.split("/").pop()
            ? currentPath
            : item.path)
        }
        onClick={() => {
          {
            if (isActive == item.path.split("/")[1]) setIsActive();
            else {
              if (item?.onClick == "true") {
                var sideNavbar = document.getElementById("sideNavbar");
                setTimeout(() => {
                  sideNavbar.scrollTop = 800;
                }, 50);
                setIsActive(item.path.split("/")[1]);
              } else {
                setIsActive(item.path.split("/")[1]);
              }
            }
          }
        }}
        className={`${styles.sidebarLink} ${
          currentPath.split("/")[1] == item.path.split("/")[1] &&
          "sidebarLinkActive"
        }`}
      >
        <div>
          {item.icon}
          <span className="ml-1">{item.title}</span>
        </div>

        <div style={{ display: "flex" }}>
          {/* {item?.access!="true"&&!item.subNav &&<div><img src="https://i.ibb.co/k20TGP4/Lock1.png" height={"30px"} /></div>} */}
          {item.subNav && currentPath.split("/")[1] == item.path.split("/")[1]
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </Link>
      {/* {currentPath.split("/")[1] == item.path.split("/")[1]&&item.subNav && */}
      {isActive == item.path.split("/")[1] &&
        item.subNav &&
        item.subNav.map((item, index) => {
          return (
            <Link
              to={item.path}
              key={index}
              className={`${styles.sidebarLink2} ${
                currentPath == item.path && "sidebarLinkActive2"
              }`}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              {item.icon}
              {item.title}
              {/* {item?.access!="true"&&<div><img src="https://i.ibb.co/k20TGP4/Lock1.png" height={"30px"} /></div>} */}
            </Link>
          );
        })}
    </>
  );
};

export default SubMenu;
