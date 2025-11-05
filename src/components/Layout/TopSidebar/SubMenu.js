// import React, { useState, useMemo, useEffect } from "react";
// import { styled } from "@mui/material/styles";
// import { Link } from "react-router-dom";
// import styles from "./SubMenu.module.css";
// import { useLocation } from "react-router-dom";

// import EnlargedView from "../../utils/EnlargedView";

// const SubMenu = ({ item, isActive, setIsActive }) => {
//   const role = JSON.parse(localStorage.getItem("loggedInDetails"));
//   const [currentPath, setCurrentPath] = useState("");
//   const router = useLocation();
//   useMemo(() => {
//     setCurrentPath(router.pathname);
//   }, [router]);

//   const [open, setOpen] = useState(false);
//   const [content, setContent] = useState();
//   return (
//     <div style={{ position: "relative", overflow: "visible" }}>
//       <EnlargedView open={open} setOpen={setOpen} content={content} />
//       <div
//         style={{
//           position: "relative",
//           overflow: "visible",
//           background: "var(--themeColor)",
//           height: "fit-content",
//           borderRadius:"7px",
//           width:"100%",
//           maxWidth: "167px",
//         }}
//         onMouseOver={() => {
//           setIsActive(item.path.split("/")[1]);
//         }}
//         onMouseOut={() => {
//           setIsActive();
//         }}
//       >
//         <Link
//           to={
//             item.subNav == undefined &&
//             (currentPath.split("/").pop() == item.path.split("/").pop()
//               ? currentPath
//               : item.path)
//           }
//           onClick={() => {
//             if (isActive == item.path.split("/")[1]) setIsActive();
//             else {
//               setIsActive(item.path.split("/")[1]);
//             }
//           }}
//           className={`${styles.sidebarLink} ${
//             currentPath.split("/")[1] == item.path.split("/")[1] &&
//             "sidebarLinkActive"
//           } ${
//             role?.id?.userType?.roleName == "Advertiser"
//               ? styles.inlinetext
//               : ""
//           }`}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               width: "max-content",
//               // justifyContent:"center"
//             }}
//           >
//             <span >{item.icon}</span>
//             <span className="ml-1">{item.title}</span>
//           </div>

//           <div style={{ display: "flex", color: "var(--themeFontColor)" }}>
//             {/* {item?.access != "true" && !item.subNav && <div><img src="https://i.ibb.co/k20TGP4/Lock1.png" height={"20px"} /></div>} */}
//             {item.subNav && item.iconOpened}
//           </div>
//         </Link>
//         {item.subNav && isActive == item.path.split("/")[1] && (
//           <div
//             style={{
//               boxShadow: "var(--themeShadow)",
//               background: "var(--themeColor)",
//               margin: ".2rem",
//               right: item.title == "Settings" && "0",
//               borderRadius: "10px",
//               margin: "0",
//               position: "absolute",
//               top: "2.5rem",
//               zIndex: "1000",
//               width: "max-content",
//             }}
//           >
//             {item.subNav.map((item, index) => {
//               return (
//                 <Link
//                   to={item.path}
//                   key={index}
                
//                   className={`${styles.sidebarLink2} ${
//                     currentPath == item.path && "sidebarLinkActive2"
//                   }`}
//                   style={{ display: "flex", justifyContent: "space-between" }}
//                 >
//                   {item.icon}
//                   {item.title}
//                 </Link>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SubMenu;
import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./TopSubMenu.module.css";
import { useLocation } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
import EnlargedView from "../../utils/EnlargedView";

const SubMenu = ({ item, isActive, setIsActive }) => {
  const role = JSON.parse(localStorage.getItem("loggedInDetails"));
  const [currentPath, setCurrentPath] = useState("");
  const router = useLocation();
  const menuRef = useRef(null);
  const timeoutRef = useRef(null);
  
  useMemo(() => {
    setCurrentPath(router.pathname);
  }, [router]);

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();

  // Check if user has access to this route
  const hasAccess = item.access !== "No Access";
  const isReadOnly = item.access === "Only View";

  const handleMouseEnter = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (hasAccess || item.subNav) {
      setIsActive(item.path.split("/")[1]);
    }
  };

  const handleMouseLeave = () => {
    // Delay closing to prevent flickering
    timeoutRef.current = setTimeout(() => {
      setIsActive("");
    }, 200);
  };

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = (e) => {
    // If no access, prevent navigation and show modal
    if (!hasAccess) {
      e.preventDefault();
      setContent(
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 30px',
          maxWidth: '450px',
          margin: '0 auto',
          borderRadius: '8px'
        }}>
          <LockIcon style={{ 
            fontSize: '80px', 
            color: '#ff6b6b', 
            marginBottom: '20px' 
          }} />
          <h2 style={{ 
            marginBottom: '15px', 
            color: '#333',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            Access Denied
          </h2>
          <p style={{ 
            color: '#666', 
            fontSize: '16px',
            marginBottom: '10px',
            lineHeight: '1.6'
          }}>
            You don't have permission to access <strong>{item.title}</strong>.
          </p>
          <p style={{ 
            color: '#888', 
            fontSize: '14px', 
            marginTop: '15px',
            lineHeight: '1.5'
          }}>
            Please contact your administrator to request access to this feature.
          </p>
        </div>
      );
      setOpen(true);
      return;
    }

    // If item has subNav, don't navigate, just toggle dropdown
    if (item.subNav) {
      e.preventDefault();
      if (isActive === item.path.split("/")[1]) {
        setIsActive("");
      } else {
        setIsActive(item.path.split("/")[1]);
      }
    }
  };

  const handleSubNavClick = (e, subItem) => {
    // Check sub-item access
    if (subItem.access === "No Access") {
      e.preventDefault();
      setContent(
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 30px',
          maxWidth: '450px',
          margin: '0 auto',
          borderRadius: '8px'
        }}>
          <LockIcon style={{ 
            fontSize: '80px', 
            color: '#ff6b6b', 
            marginBottom: '20px' 
          }} />
          <h2 style={{ 
            marginBottom: '15px', 
            color: '#333',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            Access Denied
          </h2>
          <p style={{ 
            color: '#666', 
            fontSize: '16px',
            marginBottom: '10px',
            lineHeight: '1.6'
          }}>
            You don't have permission to access <strong>{subItem.title}</strong>.
          </p>
          <p style={{ 
            color: '#888', 
            fontSize: '14px', 
            marginTop: '15px',
            lineHeight: '1.5'
          }}>
            Please contact your administrator to request access to this feature.
          </p>
        </div>
      );
      setOpen(true);
    } else {
      // Close dropdown after clicking
      setIsActive("");
    }
  };

  return (
    <div 
      className={styles.topMenuContainer}
      ref={menuRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <EnlargedView open={open} setOpen={setOpen} content={content} />
      
      <Link
        to={hasAccess && !item.subNav ? item.path : "#"}
        onClick={handleClick}
        className={`${styles.topSidebarLink} ${
          currentPath.split("/")[1] === item.path.split("/")[1] &&
          styles.topSidebarLinkActive
        } ${
          role?.id?.userType?.roleName === "Advertiser"
            ? styles.inlinetext
            : ""
        } ${!hasAccess ? styles.lockedItem : ''}`}
        style={{
          cursor: !hasAccess ? 'not-allowed' : 'pointer',
          opacity: !hasAccess ? 0.7 : 1,
          pointerEvents: 'auto'
        }}
      >
        <div className={styles.topLinkContent}>
          <span className={styles.topLinkIcon}>{item.icon}</span>
          <span className={styles.topLinkText}>{item.title}</span>
          {!hasAccess && (
            <LockIcon className={styles.lockIcon} />
          )}
          {isReadOnly && hasAccess && (
            <span className={styles.viewBadge}>VIEW</span>
          )}
        </div>

        {item.subNav && (
          <div className={styles.dropdownIndicator}>
            {item.iconOpened}
          </div>
        )}
      </Link>

      {item.subNav && isActive === item.path.split("/")[1] && (
        <div 
          className={styles.topDropdownMenu}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.subNav.map((subItem, index) => {
            const subHasAccess = subItem.access !== "No Access";
            const subIsReadOnly = subItem.access === "Only View";

            return (
              <Link
                to={subHasAccess ? subItem.path : "#"}
                key={index}
                onClick={(e) => handleSubNavClick(e, subItem)}
                className={`${styles.topSidebarLink2} ${
                  currentPath === subItem.path && styles.topSidebarLink2Active
                } ${!subHasAccess ? styles.lockedSubItem : ''}`}
                style={{ 
                  cursor: !subHasAccess ? 'not-allowed' : 'pointer',
                  opacity: !subHasAccess ? 0.7 : 1,
                  pointerEvents: 'auto'
                }}
              >
                <div className={styles.subLinkContent}>
                  {subItem.icon && <span className={styles.subLinkIcon}>{subItem.icon}</span>}
                  <span className={styles.subLinkText}>{subItem.title}</span>
                </div>
                <div className={styles.subLinkBadges}>
                  {!subHasAccess && (
                    <LockIcon className={styles.lockIconSub} />
                  )}
                  {subIsReadOnly && subHasAccess && (
                    <span className={styles.viewBadgeSub}>VIEW</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SubMenu;
