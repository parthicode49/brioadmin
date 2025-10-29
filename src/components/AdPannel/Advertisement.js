import React, { useEffect, useState } from "react";
import ListTable from "../utils/Table";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as Action from "../../actions/Advertiser/advertisement";
import { bindActionCreators } from "redux";
import Export from "../utils/Export";

const Advertisement = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [save, setSave] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [adPrice, setAdPrice] = useState(null);
  const {
    advertisement_create,
    advertisement_update,
    advertisement_charge_list,
  } = bindActionCreators(Action, dispatch);

  const user = useSelector((state) => state.layout.profile);
  const adv_list = useSelector((state) => state?.advertisement?.ad_list_adv);
  console.log(adv_list, "adv_list123");

  useEffect(() => {
    const dailyAdPrice = async () => {
      const resData = await advertisement_charge_list();
      console.log(resData, "resData123654");
      if (resData?.data) {
        setAdPrice(resData?.data?.ad_charge);
      }
    };
    dailyAdPrice();
  }, []);
  console.log(adPrice, "adPrice44444");
  useEffect(() => {
    if (user?.id) {
      dispatch(
        Action.advertisement_list_advertiser({ advertiser_id: user?.id })
      );
    }
  }, [user, save]);

  useEffect(() => {
    if (adv_list?.data) {
      const temp = tableData;

      temp.tableBody = adv_list?.data?.map((ele) => ({
        ...ele,
      }));

      setTableData({ ...temp });
    }
  }, [adv_list]);

  const [tableData, setTableData] = useState({
    tableTitle: "Advertisement",
    deleteRecord: Action.advertisement_delete,
    updateRecord: Action.advertisement_update,
    deleteAccess: "true",
    customisedStatusUpdateMessage: true,
    onDeleteText: "Are you sure want to delete Advertisement?",
    onActiveText: "Are you Sure want to Activate Advertisement?",
    onInactiveText: "Are you Sure want to Inactivate Advertisement?",
    tableHead: [
      {
        id: "product_name",
        label: "Product Name",
      },
      {
        id: "no_of_views",
        label: "No Of Views",
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
      },
      {
        id: "status",
        label: "Status",
        // isButtonDisplay: true,
      },
      {
        id: "approval_status",
        label: "Approval Status",
        isButtonDisplay: true,
      },
      {
        id: "edit",
        label: "Update",
        // access: rights?.["Slider Banner"]?.["edit"] == "true",
        isNewForm: true,
      },
    ],
    tableBody: [],
    filterColumn: [
      {
        id: "2",
        title: "Approval Status",
        name: "approval_status",
        options: ["Approved", "Pending", "Rejected"],
      },
    ],
  });
  const [formStructure, setFormStructure] = useState([
    {
      title: "Details",
      fields: [
        {
          type: "inputBox",
          name: "product_name",
          title: "Product Name",
          placeholder: "Enter Product Name",
          required: true,
        },
        {
          type: "inputBox",
          name: "views_required",
          title: "Views Required",
          regex: /^[0-9\s]+$/,
          placeholder: "Enter No Of Views",
          required: true,
        },
        {
          type: "inputBox",
          name: "payable_amount",
          title: "Payable Amount",
          regex: /^[0-9\s]+$/,
          placeholder: "Enter Amount",
          disabled : true,
          required: true,
        },
      ],
    },
    {
      title: "Media",
      fields: [
        {
          type: "inputBox",
          name: "advertise_url",
          title: "Advertise Link",
          placeholder: "Paste Advertise Link",
          required: true,
          size: "12",
        },
        {
          type: "inputBox",
          name: "website_url",
          title: "Website Url",
          placeholder: "Paste Link",
          // required: true,
          size: "12",
        },


      ],
    },
  ]);

  useEffect(()=>{
    if(form?.views_required){
      const amount = Number(form?.views_required) * parseFloat(adPrice)  
      setForm({...form , payable_amount : amount.toFixed(2)   })
    }
  },[form?.views_required])
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    data.append("advertiser", user?.id);
    if (isEdit) {
      const resData = await advertisement_update(data);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    } else {
      const resData = await advertisement_create(data);
      if (resData?.status === 200) {
        // setForm({});
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    }
  };
  return (
    <div>
      {" "}
      <ListTable
        tableData={tableData}
        key={"ListTable"}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
        view="view_all"
        save={save}
        setSave={setSave}
        isDrawerForm={true}
        openDrawer={drawer}
        setOpenDrawer={setDrawer}
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        form={form}
        isEdit={isEdit}
        formTitle={isEdit ? "Edit Advertisement" : "Add Advertisement"}
        exportButton={
          <Export
            fileName={"Advertisement"}
            isClubed={true}
            access={"true"}
            exportData={tableData?.exportData || tableData?.tableBody}
            headings={tableData.tableHead?.map((value) => value.label)}
            // api = {"export_episode_list"}
            // api_data = {episodes?.filter_condition}
          />
        }
      />
    </div>
  );
};

export default Advertisement;
