import React, { useEffect } from "react";
import styles from "./Notifications.module.css";
import { Link } from "react-router-dom";
import { distributor_unread_count } from "../../../actions/notification";
import { useDispatch, useSelector } from "react-redux";
import notification_icon from "./../../../images/notification_icon.png";
function Notifications() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.layout.profile);
  const count = useSelector(
    (state) => state.merchandise.notifications_count?.unread_count
  );
  const rights = useSelector((state) => state.layout.rights);
  const role = useSelector((state) => state.layout.role);

  useEffect(() => {
    if(role == "Distributor") {;
      dispatch(distributor_unread_count({distributor_id : user?.id}));
    }
  }, [user]);

  return (
    <>
      <Link to={"/notification"} className={styles.Notifications}>
        <img
          src={notification_icon}
          alt="Notifications"
          // height={"25px"}
          style={{ marginRight: "5px", height: "25px" }}
        />
       { role == "Distributor" && <span className={styles.num}>{count}</span>}
      </Link>
    </>
  );
}

export default Notifications;
