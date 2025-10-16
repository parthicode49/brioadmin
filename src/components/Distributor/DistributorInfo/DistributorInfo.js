import React, { useEffect } from "react";
import DistributorMovie from "./DistributorMovie";
import DistributorSeries from "./DistributorSeries";
import DistributorSong from "./DistributorSong";
import { useDispatch } from "react-redux";
import { all_distributor_movie_list, all_distributor_series_list, all_distributor_song_list, all_promocode_list_distributor } from "../../../actions/distributorPanel/distributorContentForm";
import { useLocation } from "react-router-dom";
import DistributorCoupon from "./DistributorCoupon";
import MonthlyRevenue from "./MonthlyRevenue";

const DistributorInfo = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  console.log(location ,"New Location")
  useEffect(()=>{
    if(location?.state?.id){
      dispatch(all_distributor_movie_list({distributor_id :location?.state?.id }))
      dispatch(all_distributor_series_list({distributor_id :location?.state?.id }))
      // dispatch(all_distributor_song_list({distributor_id :location?.state?.id }))
      dispatch(all_promocode_list_distributor({distributor_id :location?.state?.id }))
    }
  },[location?.state?.id])

  return (
    <>
      <MonthlyRevenue id ={location?.state?.id}/>
      <DistributorMovie />
      <DistributorSeries />
      {/* <DistributorSong /> */}
      <DistributorCoupon />
    </>
  );
};

export default DistributorInfo;
