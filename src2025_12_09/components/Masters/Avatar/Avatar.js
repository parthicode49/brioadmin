import React from "react";
import { useState, useMemo } from "react";
import ListTable from "../../utils/Table";
import Form from "../../utils/Form";
import { avatar_create,avatar_update,avatar_delete,all_avatar_list } from "../../../actions/Masters/avatar";
import { useSelector } from "react-redux";
import ViewChange from "../../utils/ViewChange";
import { useDispatch } from "react-redux";
import { TableData } from "./TableData";
import { formStructure } from "./FormStructure";
import { useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import Reload from "../../utils/Reload";
export default function Avatar() {
	const dispatch = useDispatch();
	const rights=useSelector((state) => state.layout.rights)
	const user=useSelector((state) => state.layout.profile)
const location = useLocation();
const navigate = useNavigate()
const [isEdit, setIsEdit] = useState(false);
	const [form, setForm] = useState((location?.state?.form && JSON.parse(location?.state?.form)) || {});
	const [view, setView] = useState(location?.state?.view || "view_all");
	useMemo(() => {
		if(isEdit) 
     {setView("create_new") }
    else
    {setView("view_all")
    setForm({});
  }
	}, [isEdit]);
	const path = location?.pathname.split("/")[3]
	useEffect(() => {
		setView(path != "Avatar" ? "create_new" : "view_all");
		setForm((location?.state?.form && JSON.parse(location?.state?.form)) || {});
		setIsEdit(path == "EditAvatar");
	}, [location]);
const tempTableData={...TableData(),deleteRecord:avatar_delete,updateRecord:avatar_update,
	onDeleteText:"Are you Sure?",}
  const [tableData,setTableData]=useState({...tempTableData})
	useMemo(()=>{
		setTableData({...tempTableData})
	},[rights])
	const formTitle = isEdit ? "Edit Avatar" : "Create Avatar";
	

	
	useEffect(()=>{
		dispatch(all_avatar_list())
	},[])
	
	const avatars = useSelector((state) => state.masters.avatars);
	
	useMemo(()=>{
		
		if(avatars?.statuscode==200){const temp=tableData
		temp.tableBody=avatars?.data
		setTableData({...temp})
		// setForm({...form,sequence:Number(tableData.tableBody[tableData.tableBody.length-1]["sequence"])+1})
	}
	},[avatars])
	
	const message = useSelector((state) => state.layout.message);
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData();
		Object.keys(form)?.map((key) => data.append(key, form?.[key]));
		data.append("user", user?.id);
		formStructure?.map((element) => {
			if (element.type == "image" && form?.[element.name] && typeof(form?.[element.name])!="string") {
				const temp = form;
				temp["temp"+element.name] = form?.[element.name];
				temp[element.name] = URL.createObjectURL(form?.[element.name]);

				setForm({
					...temp,
				});
			}
		});

		const temp = tableData;
		if (isEdit)
			{
		dispatch(avatar_update(data))
		}
		else
		{	
			dispatch(avatar_create(data))
		}
		
		
	};
	useMemo(()=>{
		if(message?.statuscode==200)
		{
			const temp = tableData;
		if (isEdit) {
			temp.tableBody?.map(
				(value, index) =>
					value.id == form.id && (temp.tableBody[index] = { ...form })
			);
		
		} else {
			temp.tableBody[temp.tableBody.length] = {
				id: temp.tableBody.length,
				...form,
				edit: temp.tableBody.length,
			};
			
		}
			setTableData({ ...temp });
		setIsEdit(false);
		setForm({});
		setTimeout(() => {
			dispatch(all_avatar_list());
			navigate("/Masters/Avatar/Avatar/", { state: { view: "view_all" } })
			setView("view_all");
		}, 1000);
		}
		else{
			
		setForm({...form,avatarImage:form?.tempavatarImage });
		}
	},[message])
	return (
		<>
		
			<ViewChange
				setView={setView}
				setIsEdit={setIsEdit}
				view={view}
				isEdit={isEdit}
				access={rights?.["Masters"]?.["create"]=="true"}
				create_new={"/Masters/Avatar/CreateAvatar"}
				view_all={"/Masters/Avatar/Avatar"}
				form={form}
				reload={<Reload isClubed={true} />}
			/>

			{view == "create_new" && (
				<Form
					handleSubmit={handleSubmit}
					formStructure={formStructure}
					formTitle={formTitle}
					key={"Form"}
					setForm={setForm}
					form={form}
					tableData={tableData}
					setTableData={setTableData}
					isEdit={isEdit}
					setIsEdit={setIsEdit}
				/>
			)}
			{view == "view_all" && (
				<ListTable
					tableData={tableData}
					key={"ListTable"}
					setForm={setForm}
					setTableData={setTableData}
					setIsEdit={setIsEdit}
					create_new={"/Masters/Avatar/EditAvatar"}
				/>
			)}
			
		</>
	);
}
