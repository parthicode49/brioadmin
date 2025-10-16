import React from "react";
import { useState, useMemo, useEffect } from "react";
import ListTable from "./../utils/Table";
import { movie_watch_user_list } from './../../actions/Movie/movie';
import { episode_watch_user_list } from './../../actions/WebSeries/episode';


import { useDispatch, useSelector } from 'react-redux';
export default function ValueAddedCustomer({ path, id }) {
	const dispatch = useDispatch()
	const [tableData, setTableData] = useState({
		tableTitle: "Customers Who Have Seen",
		disableDelete: true,
		tableHead: [
			{
				id: "watch_by",
				label: "Name",
				link: "/Customer/CustomerDetail/CustomerDetail",
				// color:"var(--gradientColor1)",
				width: "auto"
			},
			{
				id: "user",
				label: "Email",
			},
			// {
			// 	id: "mobileNumber",
			// 	label: "Mobile No",
			// },

			// {
			// 	id: "location",
			// 	label: "Location",
			// },
			{
				id: "device_name",
				label: "Device Type",
			},
			{
				id: "last_watch_on",
				label: "Last Watched On",
			},
			{
				id: "watch_hours",
				label: "Watch Hours",
			},


		],
		tableBody: [

		]
	});
	const [form, setForm] = useState({});
	const [isEdit, setIsEdit] = useState(false);


	const customers = useSelector((state) => path == "MovieDetails" ? state.movies.movie_watch_user : state.webseries.episode_watch_user);
	useEffect(() => {
		const data = new FormData()
		data.append("id", id)
		if (path == "MovieDetails")
			dispatch(movie_watch_user_list(data))
		else
			dispatch(episode_watch_user_list(data))
	}, [])
	useMemo(() => {

		if (customers?.statuscode == 200) {
			const temp = tableData
			temp.tableBody = customers?.data
			setTableData({ ...temp })
		}
	}, [customers])


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
