import React, { useMemo, useState } from "react";

import styles from "./Profile.module.css";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { IMAGE } from "./../../api/index";

import profile from "./../../images/photo.png";
const ProfileContent = ({ data, img }) => {
  const [years, setYears] = useState(null);
  useMemo(() => {
    if (data?.birthDate) {
      const currentDate = new Date();
      if (new Date(data?.birthDate) > currentDate) {
        setYears(null);
        return;
      }
      const diffTime = currentDate - new Date(data?.birthDate);
      const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      setYears(Math.floor(totalDays / 365.25));
    }
  }, [data]);

  return (
    <>
      <div className={styles.profileBox}>
        <div className={styles.profileInfoContent}>
          <Card
            sx={{
              textAlign: "center",
              boxShadow:
                "var(--gradientColorLighter2) 0px 6px 12px -2px, var(--gradientColorLighter1) 0px 3px 7px -3px",
              borderRadius: "10px",
              p: "20px 15px",
            }}
          >
            <img
              // src={IMAGE + img?.[0]?.avatar?.avatarImage}
              src={IMAGE + img?.avatar_image}
              alt="Member"
              height={"150px"}
              style={{borderRadius:"10px"}}
              // className="borRadius10"
            />
            <Typography
              as="h4"
              sx={{
                fontSize: 16,
                fontWeight: 500,
                mt: "10px",
              }}
            >
              {data?.email ? data?.email : data?.mobile_number}
            </Typography>
            {/* <Typography
                sx={{
                  fontSize: 13,
                  color: '#A9A9C8',
                 
                }}
              >
              User Code : <b>{data?.userCode}</b>
              </Typography> */}

            <Typography
              sx={{
                fontSize: 13,
                color: "#A9A9C8",
              }}
            >
              User Code : {data?.user_code}
            </Typography>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProfileContent;
