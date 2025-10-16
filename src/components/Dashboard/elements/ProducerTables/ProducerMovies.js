import React from "react";
import { useState, useMemo,useEffect } from "react";
import ListTable from "../../../utils/Table";

export default function ProducerMovies({movies}) {

	const [tableData,setTableData]=useState({
    tableTitle:"Movies",
    disableDelete:true,
    tableHead:[
        {
            id: 'movie_name',
            label: 'Name',
            link:"/Movie/MovieDetails",
            color:"var(--gradientColor2)",
            width:"auto",
          },
          {
            id: 'movie_views',
            label: 'Views',
          },
          {
            id: 'total_earned',
            label: 'Amount Earned',
          },
          ,
          {
            id: 'no_of_rented',
            label: 'No of Rented',
          }
         
    ],
    tableBody:movies?.Data||[]
    })
	
	const [form, setForm] = useState({});
	const [isEdit, setIsEdit] = useState(false);
	

  

 
    useMemo(()=>{
      
      if(movies!=undefined){
        const temp=tableData
temp.tableBody=movies?.Data
	 
      setTableData({...temp})
      // setTableData({...tableData,tableBody:movies})
    }
    },[movies])



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
