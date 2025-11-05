// import React, { useState, useMemo, useEffect } from "react";
// import { styled } from "@mui/material/styles";
// import { Link } from "react-router-dom";
// import styles from "./SubMenu.module.css";
// import { useLocation } from "react-router-dom";

// import EnlargedView from "../../utils/EnlargedView";

// const SubMenu = ({ item, isActive, setIsActive }) => {
//   const [currentPath, setCurrentPath] = useState("");
//   const router = useLocation();
//   useMemo(() => {
//     setCurrentPath(router.pathname);
//   }, [router]);

//   const [open, setOpen] = useState(false);
//   const [content, setContent] = useState();
//   return (
//     <>
//       <EnlargedView open={open} setOpen={setOpen} content={content} />
//       <Link
//         to={
//           item.subNav == undefined &&
//           (currentPath.split("/").pop() == item.path.split("/").pop()
//             ? currentPath
//             : item.path)
//         }
//         onClick={() => {
//           {
//             if (isActive == item.path.split("/")[1]) setIsActive();
//             else {
//               if (item?.onClick == "true") {
//                 var sideNavbar = document.getElementById("sideNavbar");
//                 setTimeout(() => {
//                   sideNavbar.scrollTop = 800;
//                 }, 50);
//                 setIsActive(item.path.split("/")[1]);
//               } else {
//                 setIsActive(item.path.split("/")[1]);
//               }
//             }
//           }
//         }}
//         className={`${styles.sidebarLink} ${
//           currentPath.split("/")[1] == item.path.split("/")[1] &&
//           "sidebarLinkActive"
//         }`}
//       >
//         <div>
//           {item.icon}
//           <span className="ml-1">{item.title}</span>
//         </div>

//         <div style={{ display: "flex" }}>
//           {item.subNav && currentPath.split("/")[1] == item.path.split("/")[1]
//             ? item.iconOpened
//             : item.subNav
//             ? item.iconClosed
//             : null}
//         </div>
//       </Link>
//       {/* {currentPath.split("/")[1] == item.path.split("/")[1]&&item.subNav && */}
//       {isActive == item.path.split("/")[1] &&
//         item.subNav &&
//         item.subNav.map((item, index) => {
//           return (
//             <Link
//               to={item.path}
//               key={index}
//               className={`${styles.sidebarLink2} ${
//                 currentPath == item.path && "sidebarLinkActive2"
//               }`}
//               style={{ display: "flex", justifyContent: "space-between" }}
//             >
//               {item.icon}
//               {item.title}
//             </Link>
//           );
//         })}
//     </>
//   );
// };

// export default SubMenu;
import React, { useState, useMemo, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import styles from "./SubMenu.module.css";
import { useLocation } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
import EnlargedView from "../../utils/EnlargedView";

const SubMenu = ({ item, isActive, setIsActive }) => {
  const [currentPath, setCurrentPath] = useState("");
  const router = useLocation();
  
  useMemo(() => {
    setCurrentPath(router.pathname);
  }, [router]);

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();

  // Add debugging
  console.log(`SubMenu ${item.title} - Access:`, item.access);

  // Check if user has access to this route
  const hasAccess = item.access !== "No Access";
  const isReadOnly = item.access === "Only View";

  const handleClick = (e) => {
    console.log(`Clicked ${item.title}, hasAccess: ${hasAccess}`);
    
    // If no access, prevent navigation and show modal
    if (!hasAccess) {
      e.preventDefault();
      setContent(
        <div style={{ 
          textAlign: 'center', 
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto'
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
            lineHeight: '1.5'
          }}>
            You don't have permission to access <strong>{item.title}</strong>.
          </p>
          <p style={{ 
            color: '#888', 
            fontSize: '14px', 
            marginTop: '15px',
            lineHeight: '1.4'
          }}>
            Please contact your administrator to request access to this feature.
          </p>
        </div>
      );
      setOpen(true);
      return;
    }

    // If has access, handle normal navigation
    if (item.subNav) {
      if (isActive == item.path.split("/")[1]) {
        setIsActive();
      } else {
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
  };

  const handleSubNavClick = (e, subItem) => {
    console.log(`Clicked sub ${subItem.title}, Access: ${subItem.access}`);
    
    // Check sub-item access
    if (subItem.access === "No Access") {
      e.preventDefault();
      setContent(
        <div style={{ 
          textAlign: 'center', 
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto'
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
            lineHeight: '1.5'
          }}>
            You don't have permission to access <strong>{subItem.title}</strong>.
          </p>
          <p style={{ 
            color: '#888', 
            fontSize: '14px', 
            marginTop: '15px',
            lineHeight: '1.4'
          }}>
            Please contact your administrator to request access to this feature.
          </p>
        </div>
      );
      setOpen(true);
    }
  };

  return (
    <>
      <EnlargedView open={open} setOpen={setOpen} content={content} />
      <Link
        to={hasAccess && !item.subNav ? item.path : "#"}
        onClick={handleClick}
        className={`${styles.sidebarLink} ${
          currentPath.split("/")[1] == item.path.split("/")[1] &&
          "sidebarLinkActive"
        } ${!hasAccess ? styles.lockedRoute : ''}`}
        style={{ 
          cursor: !hasAccess ? 'not-allowed' : 'pointer',
          opacity: !hasAccess ? 0.65 : 1,
          pointerEvents: 'auto'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {item.icon}
          <span className="ml-1">{item.title}</span>
          {!hasAccess && (
            <LockIcon 
              style={{ 
                fontSize: '18px',
                color: '#ff6b6b',
                marginLeft: 'auto'
              }} 
            />
          )}
          {isReadOnly && hasAccess && (
            <span 
              style={{ 
                fontSize: '10px',
                padding: '2px 6px',
                backgroundColor: '#ffd700',
                borderRadius: '4px',
                color: '#000',
                fontWeight: '600',
                marginLeft: 'auto'
              }}
            >
              VIEW
            </span>
          )}
        </div>

        <div style={{ display: "flex" }}>
          {item.subNav && currentPath.split("/")[1] == item.path.split("/")[1]
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </Link>

      {isActive == item.path.split("/")[1] &&
        item.subNav &&
        item.subNav.map((subItem, index) => {
          const subHasAccess = subItem.access !== "No Access";
          const subIsReadOnly = subItem.access === "Only View";

          return (
            <Link
              to={subHasAccess ? subItem.path : "#"}
              key={index}
              onClick={(e) => handleSubNavClick(e, subItem)}
              className={`${styles.sidebarLink2} ${
                currentPath == subItem.path && "sidebarLinkActive2"
              }`}
              style={{ 
                display: "flex", 
                justifyContent: "space-between",
                alignItems: 'center',
                cursor: !subHasAccess ? 'not-allowed' : 'pointer',
                opacity: !subHasAccess ? 0.65 : 1,
                pointerEvents: 'auto'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
                {subItem.icon}
                <span>{subItem.title}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {!subHasAccess && (
                  <LockIcon 
                    style={{ 
                      fontSize: '16px',
                      color: '#ff6b6b'
                    }} 
                  />
                )}
                {subIsReadOnly && subHasAccess && (
                  <span 
                    style={{ 
                      fontSize: '9px',
                      padding: '2px 5px',
                      backgroundColor: '#ffd700',
                      borderRadius: '3px',
                      color: '#000',
                      fontWeight: '600'
                    }}
                  >
                    VIEW
                  </span>
                )}
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default SubMenu;
