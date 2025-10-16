import React from "react";
import { useState, useMemo, useEffect } from "react";

import Form from "../utils/Form";
import { app_setting,app_setting_update } from "../../actions/Setting/app_setting";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function AppSetting() {
	
	const user = useSelector((state) => state.layout.profile);
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const [form, setForm] = useState({});
	useEffect(()=>{
		dispatch(app_setting())
	},[])
	const appsetting=useSelector((state)=>state.setting?.appsetting?.data[0])
	useMemo(()=>{
		setForm({...appsetting})
	},[appsetting])
	const formStructure= [
		{
			id: "5",
			type: "inputBox",
			title: "App Version",
			name: "app_version",
			required: true,
		},{
			id: "5",
			type: "inputBox",
			title: "Developed by",
			name: "developed_by",
			required: true,
		},
		

		{
			id: "5",
			type: "inputBox",
			title: "Support Email ID",
			variant: "email",
			name: "support_email",
			required: true,
		},
		{
			id: "4",
			type: "phone",
			title: "Support Mobile Number",
			maxLength: 12,
			name: "mobile_number",
			required: true,
		},
		{
			id: "5",
			type: "image",
			title: "App Logo",
			name: "app_logo",
			subtitle:"(Resolution : 512px x 512px) *",
        subsubtitle:"Max File Size 1MB",
			required: true,
		},
		
		{
			id: "8",
			type: "button",
			title: "Update" ,
		},
	]

	
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData();
		
		
		Object.keys(form).map((key) => data.append(key, form?.[key]));
		
		data.append("user", user?.id);
			
		dispatch(app_setting_update(data));
		navigate('/Dashboard')
		
	};

	return (
		<>
			
				<Form
					formStructure={formStructure}
					handleSubmit={handleSubmit}
					formTitle={"App Setting"}
					key={"Form"}
					setForm={setForm}
					form={form}
				/>
		
		</>
	);
}
