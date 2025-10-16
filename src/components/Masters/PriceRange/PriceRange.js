import React from "react";
import { useState, useMemo, useEffect } from "react";
import ListTable from "../../utils/Table";
import {
	
	all_country_list,
} from "../../../actions/Masters/country";
import { useDispatch, useSelector } from "react-redux";
import { product_price_range } from "../../../actions/Masters/priceRange";
export default function PriceRange() {
	const dispatch = useDispatch();
	
	const [isEdit, setIsEdit] = useState(false);
	const [form, setForm] = useState({});
	
	const tempTableData={
		tableTitle: "Price Range",
		tableHead: [
			{
				id: "price_range",
				label: "Price Range",
			},
			// {
			// 	id: "country_currency_symbol",
			// 	label: "Currency Symbol",
			// },
			
			
		],
		tableBody: [
			
		],
		
	}
	const [tableData, setTableData] = useState({...tempTableData});
	


	const PriceRange = useSelector((state) => state.masters.price_range);
	useEffect(() => {
		dispatch(product_price_range());
	}, []);
	useMemo(() => {
		if (PriceRange?.statuscode == 200) {
			const temp = tableData;
			temp.tableBody = PriceRange?.data;
			setTableData({ ...temp });
		}
	}, [PriceRange]);

	
	
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
