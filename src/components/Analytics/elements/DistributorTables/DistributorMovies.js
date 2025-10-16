import React from "react";
import { useState, useMemo,useEffect } from "react";
import ListTable from "../../../utils/Table";

export default function DistributorMovies({movies}) {

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
            id: 'movie_thumbnail',
            label: 'Image',
            isImage:true
          },
          {
            id: 'movie_subcategory',
            label: 'Sub Category',
          },
          ,
          {
            id: 'uploaded_by',
            label: 'Uploaded By',
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
    tableBody:movies||[]
    })
	
	const [form, setForm] = useState({});
	const [isEdit, setIsEdit] = useState(false);
	

  

 
    useMemo(()=>{
      
      if(movies!=undefined){
        const temp=tableData
temp.tableBody=movies?.data.map((value,index)=>({...value,movie_genre:value.movie_genre.map((genre)=>genre.genre_title),movie_cast:value.movie_cast.map((cast)=>cast.cast_name),uploaded_by:value?.created_by?.firstName+" "+value?.created_by?.lastName,movie_distributor:value?.movie_distributor?.distributor_name,company_name:value?.movie_distributor?.company_name}))
	 
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
