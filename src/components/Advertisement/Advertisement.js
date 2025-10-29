import React, { useEffect, useState } from "react";
import ListTable from "../utils/Table";
import Export from "../utils/Export";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../actions/Advertiser/advertisement"
import { bindActionCreators } from "redux";

const Advertisement = () => {
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false);
  const user = useSelector((state) => state.layout.profile);
  const [advertisementList , setAdvertisementList] = useState([])
  const [save, setSave] = useState(false);
  const {all_advertisement_list_admin} = bindActionCreators(Action , dispatch)

  useEffect(()=>{
    const adData = async () => {
      const resData = await all_advertisement_list_admin()
      if(resData?.data){
        console.log(resData?.data , "resData------")
        setAdvertisementList(resData?.data)
      }
    }
    adData()
  },[])

  console.log(advertisementList , "dfsfddsf")

  const [tableData, setTableData] = useState({
    tableTitle: "Advertisement",
    // deleteRecord: Action.top_ten_delete,
    // updateRecord: Action.top_ten_update,
    customisedStatusUpdateMessage: true,
    onDeleteText: "Are you sure want to delete ?",
    // onActiveText: "Are you Sure want to Activate Slider Banner?",
    // onInactiveText: "Are you Sure want to Inactivate Slider Banner?",
    tableHead: [
      {
        id: "advertiser_name",
        label: "Advertiser",
        subText : "advertiser_company_name"
      },
      {
        id: "advertiser_mobile_number",
        label: "Contact",
        subText : "advertiser_email"
      },
      {
        id: "product_name",
        label: "Product Name",
      },
      {
        id: "views_required",
        label: "Required Views",
      },
      {
        id: "payable_amount",
        label: "Payable Amount",
      },

      {
        id: "created_at",
        label: "Created At",
        isDate: true,
      },
      {
        id: "edit",
        label: "Update",
        isNewPopUpForm: true,
      },
    ],
    tableBody: [],
    filterColumn: [
      {
        id: "2",
        title: "Content Type",
        name: "content_type",
        options: ["Movie", "Series"],
      },
    ],
  });

    useEffect(() => {
      if (advertisementList?.length > 0) {
        const temp = tableData;
        temp.tableBody = advertisementList;
        setTableData({ ...temp });
        // setForm({ ...form, sequence: Number(tableData.tableBody[tableData.tableBody.length - 1]?.["sequence"]) + 1 })
      }
    }, [advertisementList]);

  return (
    <ListTable
      tableData={tableData}
      key={"ListTable"}
      //  form={form}
      //  setForm={setForm}
      setTableData={setTableData}
      //  setIsEdit={setIsEdit}
      view="view_all"
      save={save}
      setSave={setSave}
      isPopUpNewTable={true}
      hideAddBtn={true}
      exportButton={
        <Export
          fileName={"Category"}
          isClubed={true}
          access={"true"}
          exportData={tableData?.exportData || tableData?.tableBody}
          headings={tableData.tableHead?.map((value) => value.label)}
          // api = {"export_episode_list"}
          // api_data = {episodes?.filter_condition}
        />
      }
      // setForm = {se}
      // setIsEdit(true)
    />
  );
};

export default Advertisement;
