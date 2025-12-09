import React from "react";
import { useState, useMemo,useEffect } from "react";
import ListTable from "../../../utils/Table";

export default function ProducerStream({tv_channels}) {

	const [tableData,setTableData]=useState({
    tableTitle:"Channels /Events",
    disableDelete:true,
    tableHead: [
			{
				id: "channel_name",
				label: "Channel Name",
			},
			{
				id: "stream_category_name",
				label: "Category",
			},
			{
				id: "stream_type",
				label: "Access Type",
				width:"10%",
				padding:"8px 5px"
			},
			
			{
				id: "thumbnail",
				label: "Image",
				isImage:true,
				width:"10%",
				padding:"8px 5px"
			},
			
			  {
				id: 'views',
				label: 'Views',
			  },{
				id: 'status',
				label: 'Status',
			  },
			
		
		],
    tableBody:tv_channels||[]
    })
	
	const [form, setForm] = useState({});
	const [isEdit, setIsEdit] = useState(false);
	



 
    useMemo(()=>{
      
      if(tv_channels!=undefined){
        const temp=tableData
        temp.tableBody=tv_channels?.data.map((value)=>({...value,stream_category:value.stream_category_name}))
	 
      setTableData({...temp})
      // setTableData({...tableData,tableBody:tv_channels})
    }
    },[tv_channels])



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
