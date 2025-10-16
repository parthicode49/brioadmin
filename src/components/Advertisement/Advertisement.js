import React from "react";
import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ListTable from "../utils/Table";
import Form from "../utils/Form";
import { TableData } from "./TableData";
import ViewChange from "../utils/ViewChange";
import { useDispatch, useSelector } from "react-redux";
import { FormStructure } from "./FormStructure";
import { useLocation } from "react-router-dom";
import Reload from "../utils/Reload";
import Export from "../utils/Export";
import { advertisement_update, all_advertisement_list } from "../../actions/advertisement";

const Advertisement = () => {
  const user = useSelector((state) => state.layout.profile);
  const role = useSelector((state) => state.layout.role);
  const rights = useSelector((state) => state.layout.rights);
  const tempFormStruct = FormStructure();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState(
    (location?.state?.form && JSON.parse(location?.state?.form)) || {}
  );
  const [view, setView] = useState(location?.state?.view || "view_all");
  const [isEdit, setIsEdit] = useState(false);
  const [flag, setFlag] = useState(false);
  const path = location?.pathname.split("/")[2];
  const message = useSelector((state) => state.layout.message);

  // cons
  useMemo(() => {
    if (isEdit) {
      setView("create_new");
    } else {
      setView("view_all");
      setForm({});
    }
  }, [isEdit]);
  const tempTableData = {
    ...TableData(),
    // disableDelete: role !== "Advertiser" ? false: true,

    // deleteRecord: advertise_form_delete,
    // updateRecord: advertise_form_upate,
    deleteAccess: "true",
    onDeleteText: "Are you sure want to delete?",
    onUpdateText: "Are you Sure?",
  };
  const [tableData, setTableData] = useState({ ...tempTableData });
  const [formStructure, setFormStructure] = useState([...tempFormStruct]);

  useMemo(() => {
    setTableData({ ...tempTableData });
  }, [rights]);
  useEffect(() => {
    if (user?.id) {
      dispatch(all_advertisement_list());
    }
  }, [user?.id]);
  const advertisement_list = useSelector(
    (state) => state.advertisement.advertisement_list
  );

  useEffect(() => {
    // setForm((location?.state?.form && JSON.parse(location?.state?.form)) || {});
    const newDataForm =
      location?.state?.form && JSON.parse(location?.state?.form);

    setForm(newDataForm || { email: user?.email });

    setView(path != "Advertisement" ? "create_new" : "view_all");

    setIsEdit(path == "EditAdvertisement");
  }, [location]);

  useMemo(()=>{
    if(form?.status == "Approved"){
      const temp = formStructure;
      temp[3]["display"] = "block"
      temp[5]["display"] = "none"

      setFormStructure([...temp])
    }else if(form?.status == "Rejected"){
      const temp = formStructure;
      temp[5]["display"] = "block"
      temp[3]["display"] = "none"

      setFormStructure([...temp])
    } else{
      const temp = formStructure;
      temp[3]["display"] = "none"
      temp[5]["display"] = "none"
      setFormStructure([...temp])
    }
  },[form?.status])

  // useMemo(()=>{
  //   if(form?.payment_status == "Done"){
  //     const temp = formStructure;
  //     temp[5]["display"] = "block"
  //     setFormStructure([...temp])
  //   } else{
  //     const temp = formStructure;
  //     temp[5]["display"] = "none"
  //     setFormStructure([...temp])
  //   }
  // },[form?.payment_status])

  useMemo(() => {
    if (advertisement_list?.statuscode == 200) {
      const temp = tableData;
      temp.tableBody = advertisement_list?.data?.map((ele) => ({
        ...ele,
        edit: ele?.payment_status == "Done" ? "Done" : "",
        // notification_send: ele?.status == "Rejected"  ? <Link to='/Notifications/CreateNotifications/' state={{customer: ele?.advertiser?.user,send :"nofitication"}}><img src={notification_icon} alt="Notifications" height={"25px"} style={{marginRight:"5px"}} /></Link> : <p style={{color:"var(--themeFontColor)"}}>-</p>,
        Advertiser_name: ele?.advertiser?.name,
        advertiser: ele?.advertiser?.id,
        company_name: ele?.advertiser?.company_name,
      }));
      setTableData({ ...temp });
    }
  }, [advertisement_list]);

  const formTitle = isEdit ? "Edit Advertisement" : "Create Advertisement";

  const handleSubmit = (event) => {
    event.preventDefault();
    const temp_form = form;
    temp_form["user"] = user?.id;
    // temp_form["movie_genre"] = genre?.data.map((option) => form?.["movie_genre"]?.includes(option.genre_title) && option.id).filter(e => e)
    setForm({
      ...temp_form,
    });
    const data = new FormData();
    Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    // data.append("user", user?.id);
    // if (isEdit) {
      dispatch(advertisement_update(data));
    // } else {
    //   dispatch(advertise_form_create(data));
    // }
  };
  useMemo(() => {
    if (message?.statuscode == 200) {
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
      setTimeout(() => {
        const data = new FormData();
        // data.append("email", user?.email);
        // data.append("user", user?.id);

        dispatch(all_advertisement_list());

        navigate("/Advertisement/Advertisement/", {
          state: { view: "view_all" },
        });
        setView("view_all");
      }, 900);
    } else {
      const tempForm = form;
      setForm({ ...tempForm });
    }
  }, [message]);
  return (
    <>
      {/* {role === "Advertiser" && (
      <ViewChange
        setForm={setForm}
        setView={setView}
        setIsEdit={setIsEdit}
        view={view}
        isEdit={isEdit}
        create_new={"/AdForm/CreateAdForm/"}
        view_all={"/AdForm/AdForm/"}
        form={form}
        reload={<Reload isClubed={true} />}
        access={"true"}
      />
    )} */}
      {view == "create_new" && (
        <Form
          formStructure={formStructure}
          handleSubmit={handleSubmit}
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
          create_new={"/Advertisement/EditAdvertisement"}
        />
      )}
    </>
  );
};

export default Advertisement;
