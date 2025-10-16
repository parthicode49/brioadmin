import React from "react";
import { useState, useMemo,useEffect } from "react";
import ListTable from "../../utils/Table";
import { all_customer_list } from '../../../actions/customer';
import { useDispatch,useSelector } from 'react-redux';
export default function ValueAddedCustomer() {
	const dispatch=useDispatch()
	const [tableData, setTableData] = useState({
		tableTitle: "Value Added Customers",
    disableDelete:true,
		tableHead: [
			{
				id: "name",
				label: "Name",
            link:"/Customer/CustomerDetail/CustomerDetail",
			color:"var(--gradientColor2)",
      width:"auto"
			},
			{
				id: "email",
				label: "Contact Info",
				subText:"mobileNumber"
			},
			
			{
				id: "",
				label: "Subscription",
			},
			{
				id: "",
				label: "Rented Movies",
			},
			{
				id: "",
				label: "Watch Hours",
			},
			{
				id: "",
				label: "No. of Movies Watched",
			},
			{
				id: "",
				label: "No. of Episodes Watched",
			}
		],
		tableBody: [
			{
				id: 0,
				name: "Movie",
				email: "Landscape",
				mobile_no: "2",
				plan: "Active",
				login_by: "Active",
				device_type: "Active",
				registered_on: "Active",
				status: "Active",
				edit: 0,
			},
		]
	});
	const [form, setForm] = useState({});
	const [isEdit, setIsEdit] = useState(false);
	
	
    const customers = useSelector((state) => state.customers.customers);
    useEffect(()=>{
      dispatch(all_customer_list())
    },[])
    useMemo(()=>{
      
      if(customers?.statuscode==200){const temp=tableData
      temp.tableBody=customers?.data.map((ele)=>({...ele,name:ele?.firstName+" "+ele?.lastName}))
      setTableData({...temp})}
    },[customers])


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
