import React from 'react'
import ViewChange from "../../../utils/ViewChange";
import ListTable from "../../../utils/Table";
import { all_movie_list } from "../../../../actions/Movie/movie";
import Export from "../../../utils/Export";
import Reload from "../../../utils/Reload"
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';

const AdvertisementHistory = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [view, setView] = useState(location?.state?.view || "view_all");
    const user = useSelector((state) => state.layout.profile);
    const [tableData2, setTableData2] = useState({
        tableTitle: "Transaction History123",
        // deleteRecord: advertisement_delete,
        // updateRecord: advertisement_update,
        // deleteAccess: rights?.["Advertisement"]?.["delete"] == "true",
        // onDeleteText: "Are you sure want to delete?",
        // onUpdateText: "Are you Sure?",
        tableHead: [
          // {
          // 	id: "company_name",
          // 	label: "Company",
          // 	width:"auto"
          // },
          {
            id: "product_name",
            label: "Product Name",
          },
          {
            id: "payment_id",
            label: "Payment ID",
          },
          // {
          // 	id: "advertiser",
          // 	label: "Company Info",
          // 	subText:"company_name"
          // },
          {
            id: "recharge_amount",
            label: "Recharge Amount",
          },
          {
            id: "tvod_amount",
            label: "Amount",
          },
          {
            id: "status",
            label: "Status",
          },
          {
            id: "name",
            label: "Create By",
          },
          {
            id: "created_at",
            label: "Date",
          },
          //   {
          //     id: "uploaded_by",
          //     label: "Uploaded By",
          //   },
    
          //   {
          //     id: "status",
          //     label: "Status",
          //   },
          //   {
          //     id: "edit",
          //     label: "Update",
          //     access: rights?.["Advertisement"]?.["edit"] == "true",
          //   },
        ],
        tableBody: [
          {
            id: 0,
            company_name: "Movie",
            advertiser_name: "Landscape",
            // product_name: "2",
            // views: "Active",
            start_date: "Active",
            end_date: "Active",
            product_status: "Active",
            status: "Active",
          },
        ],
    
        filterColumn: [
          //   {
          //     id: "1",
          //     title: "Ad name",
          //     name: "product_name",
          //     options: ["FREE", "TVOD", "SVOD"],
          //   },
        ],
      });
      const advertisements = useSelector(
        (state) => state.advertisers.advertisements
      );
      const advertisements2 = useSelector(
        (state) => state.advertisers.advertisements
      );
      //   const advertisers2= useSelector((state) => state.advertisers.advertisers);
      //   const movies = useSelector((state) => state.movies.movies);
      useEffect(() => {
        const data = new FormData();
        // data.append("id", 161);
        data.append("id", user?.id);
    
        dispatch(all_movie_list(data));
      }, []);
      useMemo(() => {
        if (advertisements2?.statuscode == 200) {
          const temp123 = tableData2;
          temp123.tableBody = advertisements?.transaction_history.map((ele) => ({
            ...ele,
            name:
              ele?.lastName !== null
                ? ele?.firstName + " " + ele?.lastName
                : ele?.firstName,
            // advertiser: ele?.advertiser?.name,
            // company_name: ele?.advertiser?.company_name,
            // available_views: ele?.views_required - ele?.no_of_views,
            // uploaded_by: ele?.uploaded_by?.firstName,
          }));
          //   temp.filterColumn[0]["options"] = [
          //     ...new Set(advertisements?.data.map((ele) => ele?.product_name)),
          //   ];
          setTableData2({ ...temp123 });
        }
      }, [advertisements2]);
  return (
 
        <ListTable
          tableData={tableData2}
          //   key={"ListTable"}
          //   setForm={setForm}
          setTableData={setTableData2}
          //   setIsEdit={setIsEdit}
          //   addButton={
          //     <ViewChange
          //       setForm={setForm}
          //       setView={setView}
          //       setIsEdit={setIsEdit}
          //       view={view}
          //       access={rights?.["Advertisement"]?.["create"] == "true"}
          //       isEdit={isEdit}
          //     />
          //   }
          // exportButton={
          //   <Export
          //     fileName={"Report"}
          //     exportData={tableData2?.exportData || tableData2?.tableBody}
          //     headings={tableData2.tableHead.map((value) => value.label)}
          //   />
          
          // }
          resetButton={
            <Reload/>
          }
        />
)
        }

export default AdvertisementHistory