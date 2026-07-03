import React from "react";
import { useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import ProducerMovies from "./ProducerMovies";
// import ProducerSeries from "./ProducerSeries";
// import ProducerStream from "./ProducerStream";
import {producer_movie_list } from '../../../../actions/dashboard';
// import {all_series_list } from '../../../../actions/WebSeries/series';
// import { all_tv_channel_list } from '../../../../actions/LiveStreaming/tv_channel';
import { useLocation } from "react-router-dom";
import { PRODUCER_MOVIE_LIST } from '../../../../constants/actionTypes';
export default function ProducerProducts() {
  const user=useSelector((state) => state.layout.profile)
  const dispatch=useDispatch()
	const location=useLocation()
  useEffect(()=>{
    
		
    // dispatch({ type: TV_CHANNELS, payload:undefined })
    dispatch({ type: PRODUCER_MOVIE_LIST, payload:undefined })
    // dispatch({ type: SERIES, payload:undefined })
      dispatch(producer_movie_list({user:user?.id}))
      // dispatch(all_series_list(data));
      // dispatch(all_tv_channel_list(data))
    },[])

// const tv_channels = useSelector((state) => state.livestreamings.tv_channels);
const movies = useSelector((state) => state.dashboard.producer_movie_list);
// const series = useSelector((state) => state.webseries.series);
	return (
		<>
      <ProducerMovies movies={movies}/>
      {/*<ProducerSeries series={series}/>*/}
      {/* <ProducerStream tv_channels={tv_channels}/> */}
		
				
	
		</>
	);
}
