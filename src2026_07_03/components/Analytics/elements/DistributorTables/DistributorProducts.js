import React from "react";
import { useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import DistributorMovies from "./DistributorMovies";
import DistributorSeries from "./DistributorSeries";
import DistributorStream from "./DistributorStream";
import {all_movie_list } from '../../../../actions/Movie/movie';
import {all_series_list } from '../../../../actions/WebSeries/series';
import { all_tv_channel_list } from '../../../../actions/LiveStreaming/tv_channel';
import { useLocation } from "react-router-dom";
import { TV_CHANNELS,MOVIES,SERIES } from '../../../../constants/actionTypes';
export default function DistributorProducts() {
  const user=useSelector((state) => state.layout.profile)
  const dispatch=useDispatch()
	const location=useLocation()
  useEffect(()=>{
    
		const data=new FormData()
		data.append('id',user?.id)
    dispatch({ type: TV_CHANNELS, payload:undefined })
    dispatch({ type: MOVIES, payload:undefined })
    dispatch({ type: SERIES, payload:undefined })
      dispatch(all_movie_list(data))
      dispatch(all_series_list(data));
      dispatch(all_tv_channel_list(data))
    },[])

const tv_channels = useSelector((state) => state.livestreamings.tv_channels);
const movies = useSelector((state) => state.movies.movies);
const series = useSelector((state) => state.webseries.series);
	return (
		<>
      <DistributorMovies movies={movies}/>
      <DistributorSeries series={series}/>
      {/* <DistributorStream tv_channels={tv_channels}/> */}
		
				
	
		</>
	);
}
