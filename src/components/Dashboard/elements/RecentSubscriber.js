import React from "react";
import { useState, useMemo,useEffect } from "react";
import ListTable from "../../utils/Table";
import { all_subscription_list } from '../../../actions/subscription';
import { useDispatch,useSelector } from 'react-redux';
export default function RecentSubscriber({recentSubscriberDashboard}) {
	const dispatch=useDispatch()
	const [form, setForm] = useState({});
	const [isEdit, setIsEdit] = useState(false);
	
	const [tableData, setTableData] = useState({
		tableTitle: "Recent Subscribers",
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
				subText:"mobile_no"
			},
			
			{
				id: "transaction_type",
				label: "Plan",
				subText:"plan_movie"
			},
			{
				id: "payment_amount",
				label: "Amount",
			},
			
		
			{
				id: "payment_method",
				label: "Payment Method",
			},
			{
				id: "location",
				label: "Location",
			},
			
		],
		tableBody:[]
	});
	

useMemo(()=>{
	const temp=tableData
	temp.tableBody= recentSubscriberDashboard?.recently_subscriber.map((ele)=>({...ele,location:ele?.user?.userLocation,name:ele?.user?.firstName+" "+ele?.user?.lastName,plan_movie:ele?.transaction_type=="TVOD"?ele?.movie?.movie_name:ele?.plan?.plan_name}))||[]
	setTableData({...temp})
},[recentSubscriberDashboard])
	
   
    
	
	
	
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
