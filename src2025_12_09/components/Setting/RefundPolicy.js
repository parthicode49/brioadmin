import React from "react";
import { useState, useMemo, useEffect } from "react";

import Form from "../utils/Form";
import { refund_policy,refund_policy_update } from "../../actions/Setting/refund_policy";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAccessControl } from "../utils/useAccessControl";
export default function RefundPolicy() {
	  const { canEdit } = useAccessControl("Setting");
	const user = useSelector((state) => state.layout.profile);
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const [form, setForm] = useState({});
	useEffect(()=>{
		dispatch(refund_policy())
	},[])
	const refundpolicy=useSelector((state)=>state.setting?.refundpolicy?.data[0])
	useMemo(()=>{
		setForm({...refundpolicy})
	},[refundpolicy])
	

	const formStructure= [
		{
			id: "1",
			type: "description",
			name:"description",
			title: "",
			limit:"2000"
		},

		
		
		canEdit &&{
			id: "8",
			type: "button",
			title: "Update" ,
		},
	].filter(Boolean)

	
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData();
		
		
		Object.keys(form).map((key) => data.append(key, form?.[key]));
		
		
		data.append("user", user?.id);
		dispatch(refund_policy_update(data));
		navigate('/Dashboard')
		
	};

	return (
		<>
			
				<Form
					formStructure={formStructure}
					handleSubmit={handleSubmit}
					formTitle={"Refund Policy"}
					key={"Form"}
					setForm={setForm}
					form={form}
				/>
		
		</>
	);
}
