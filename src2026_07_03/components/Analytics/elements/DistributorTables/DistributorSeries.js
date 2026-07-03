import React from "react";
import { useState, useMemo,useEffect } from "react";
import ListTable from "../../../utils/Table";

export default function DistributorSeries({series}) {

	const [tableData,setTableData]=useState({
    tableTitle:"Series",
    disableDelete:true,
    tableHead:[
      {
          id: 'series_name',
          label: 'Show Name',
          link:"/Series/Series/SeriesDetails",
          // color:"#4267B2"
        },
        {
          id: 'series_poster',
          label: 'Image',
          isImage:true
        },
        {
          id: 'season',
          label: 'Season',
        },
        {
          id: 'series_type',
          label: 'Access Type',
        },
        {
          id: 'seriesViews',
          label: 'Views',
        },
        
        
        {
          id: 'language',
          label: 'Language',
        },
        
      
        

        {
          id: 'status',
          label: 'Status',
        },
      
  ],
    tableBody:series||[]
    })
	
	const [form, setForm] = useState({});
	const [isEdit, setIsEdit] = useState(false);
	



 
    useMemo(()=>{
      
      if(series!=undefined){
        const temp=tableData
        temp.tableBody=series?.data.map((ele)=>({...ele,language:ele?.language?.language_name,genre:ele?.genre.map((value)=>value?.genre_title),series_distributor:ele?.series_distributor?.distributor_name,company_name:ele?.series_distributor?.company_name}))
	 
      setTableData({...temp})
      // setTableData({...tableData,tableBody:series})
    }
    },[series])



	return (
		<>
		
		
				<ListTable
					tableData={tableData}
					key={"ListTable"}
					setForm={setForm}
					setTableData={setTableData}
					setIsEdit={setIsEdit}
				/>
	
		</>
	);
}
