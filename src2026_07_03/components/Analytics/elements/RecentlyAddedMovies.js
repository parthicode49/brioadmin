import React from "react";
import { useState, useMemo,useEffect } from "react";
import ListTable from "../../utils/Table";

export default function RecentlyAddedMovie({recently_added_data}) {

	const [tableData,setTableData]=useState({
    tableTitle:"Recently Added Movies",
    disableDelete:true,
    rowsPerPage:5,
    tableHead:[
        {
            id: 'movie_name',
            label: 'Name',
            link:"/Movie/MovieDetails",
            color:"var(--gradientColor2)",
            subText:"movie_subcategory",
            width:"auto",
          },
          {
            id: 'movie_poster',
            label: 'Image',
            isImage:true
          },
          
          ,
          {
            id: 'uploaded_by',
            label: 'Uploaded By',
          },
          {
            id: 'movie_ownership',
            label: 'Ownership',
          },
          ,
          {
            id: 'movie_access',
            label: 'Access',
          },
          ,
          {
            id: 'movie_language',
            label: 'Language',
          },
          ,
          {
            id: 'movieViews',
            label: 'views',
          },
        
          {
            id: 'total_downloads',
            label: 'Downloads',
          }
    ],
    tableBody:recently_added_data||[]
    })
	
	const [form, setForm] = useState({});
	const [isEdit, setIsEdit] = useState(false);
	



 
    useMemo(()=>{
      
      if(recently_added_data!=undefined){
        const temp=tableData
temp.tableBody=recently_added_data.map((value,index)=>({...value,movie_genre:value.movie_genre.map((genre)=>genre.genre_title),movie_cast:value.movie_cast.map((cast)=>cast.cast_name),uploaded_by:value?.created_by?.firstName+" "+value?.created_by?.lastName}))
	 
      setTableData({...temp})
      // setTableData({...tableData,tableBody:recently_added_data})
    }
    },[recently_added_data])



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
