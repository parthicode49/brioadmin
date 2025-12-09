import React from 'react';
import { useState,useMemo } from 'react';
import {useLocation} from "react-router-dom";
import styles from './../../styles/PageTitle.module.css'
import ListTable from './../utils/Table'
export default function MoviesDownloaded() {
  const location=useLocation()
    const [tableData,setTableData]=useState({
        tableTitle:"Movies Downloaded",
        disableDelete:true,
        tableHead:[
           
              {
                id: 'movie',
                label: 'Movie/Series Name',
                // isSpecial:true,
               align:"left"
              },
              {
                id: 'created_at',
                label: 'Download On',
              },
              {
                id: 'profile',
                label: 'Download By',
              },
             
              {
                id: 'device_name',
                label: 'Device Name',
              },
              {
                id: 'location',
                label: 'Location',
              },
        ],
        tableBody:[]
      })
    const [form,setForm]=useState({})
    const [isEdit,setIsEdit]=useState(false)
    useMemo(()=>{
      const temp = tableData
      temp.tableBody=location.state?.data||[]
      setTableData({...temp})
    },[location.state?.data])
  return (
    <>
   


      
                 <ListTable tableData={tableData} key={"ListTable"} setForm={setForm} setTableData={setTableData} setIsEdit={setIsEdit}/>

     
    </>
  );
}
