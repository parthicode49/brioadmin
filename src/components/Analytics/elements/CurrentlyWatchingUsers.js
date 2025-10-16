import React from "react";
import { useState, useMemo,useEffect } from "react";
import ListTable from "../../utils/Table";
import { currently_watching_users } from '../../../actions/analytics';
import { useDispatch,useSelector } from 'react-redux';
export default function CurrentlyWatchingUsers() {
	const dispatch=useDispatch()
  
	const data = useSelector((state) => state.analytics.currently_watching_users);
	useEffect(()=>{
		dispatch(currently_watching_users())
			
		
			},[])
	useEffect(()=>{
	setTimeout(()=>{dispatch(currently_watching_users())},5000)
		
	
		},[data])
	const [form, setForm] = useState({});
	const [isEdit, setIsEdit] = useState(false);
	
	const [tableData, setTableData] = useState({
		tableTitle: "Currently Watching Users",
		disableDelete:true,
		rowsPerPage:5,
		tableHead: [
			{
				id: "name",
				label: "Name",
				width:"auto",
				link:"/Customer/CustomerDetail/CustomerDetail",
			color:"var(--gradientColor2)"
			},
			{
				id: "email",
				label: "Contact Details",
				subText:"mobileNumber"
			},
			
			{
				id: "deviceType",
				label: "Device",
				subText:"deviceId"
			},
		
		
			{
				id: "content_type",
				label: "Content Type",
			},
			{
				id: "content",
				label: "Content",
				subText:"sub_content"
			},
			
		],
		tableBody:[]
	});
	

useMemo(()=>{
	const temp=tableData
	temp.tableBody= data?.Data.map((val)=>({...val,content:val?.content_type=="Movie"?val?.movie:val?.series,sub_content:val?.episode}))||[]
	setTableData({...temp})
},[data])
	
   
    
	
	
	
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
