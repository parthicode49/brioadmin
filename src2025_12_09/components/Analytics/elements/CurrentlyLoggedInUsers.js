import React from "react";
import { useState, useMemo,useEffect } from "react";
import ListTable from "../../utils/Table";

import { currently_logged_in_users } from '../../../actions/analytics';

import { useDispatch,useSelector } from 'react-redux';
export default function CurrentlyLoggedInUsers() {
	const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(currently_logged_in_users())

	},[])
	
	
  const data = useSelector((state) => state.analytics.currently_logged_in_users);
  useEffect(()=>{
	setTimeout(()=>{dispatch(currently_logged_in_users())},5000)
		
	
		},[data])
	const [form, setForm] = useState({});
	const [isEdit, setIsEdit] = useState(false);
	
	const [tableData, setTableData] = useState({
		tableTitle: "Currently Logged In Users",
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
				id: "userLocation",
				label: "Location",
			},
			
		
			
			
		],
		tableBody:[]
	});
	

useMemo(()=>{
	const temp=tableData
	temp.tableBody= data?.Data||[]
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
