import React, { useMemo, useState } from "react";
import ViewChangeForm from "../../utils/ViewChangeForm";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "../../utils/Form";
// import { language_create,language_update } from "../../../actions/Masters/language";
import * as Action from "../../../actions/Masters/cast";
import { bindActionCreators } from "redux";
const CreateCast = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.layout.profile);
 const cast_msg = useSelector((state) => state.masters.cast_msg);
  console.log(
    cast_msg ,"cast MSFFF"
  )
  const { cast_create ,cast_update } = bindActionCreators(
    Action,
    dispatch
  );

  //   const series = useSelector((state) => state?.webseries?.series_name);
  const [isEdit, setIsEdit] = useState(location?.state?.isEdit || false);
  const [flag, setFlag] = useState(false);
  const [form, setForm] = useState({});
  const message = useSelector((state) => state.layout.message);
  const [content, setPopupContent] = useState("");
  const [openAdError, setOpenAdError] = useState(false);
  const formStructure = [
    {
      id: "1",
      type: "inputBox",
      title: "Cast Name",
      name: "cast_name",
      required: true,
    },
    {
      id: "2",
      type: "select",
      title: "Cast Type",
      name: "cast_type",
      options: ["Actor", "Actress", "Director", "Producer"],
      required: true,
    },

    {
      id: "3",
      type: "image",
      title: "Image",
      subtitle: "(Resolution : 512px x 512px) *",
      subsubtitle: "Max File Size 1MB",
      subsubsubtitle: "Support only JPG,PNG,JPEG",
      name: "cast_image",
      required: true,
    },

    {
      id: "5",
      type: "button",
      title: isEdit ? "Edit" : "Create",
    },
  ];
  const formTitle = isEdit ? "Edit Cast" : "Create Cast";
  // console.log(
  //   "location",
  //   location?.state?.form && JSON.parse(location?.state?.form),location
  // );
  // const categories = useSelector((state) => state?.masters?.categories);

  useMemo(() => {
    if (location?.state?.isEdit) {
      const formData = JSON.parse(location?.state?.form);
      setForm(formData);
      // console.log("chhhd9e");
      //   const temp = formStructure
      //   temp[3]["title"] = "Edit"
      //   temp[0]["disabled"] = true
      //   setFormStructure([...temp])
      setIsEdit(true);
    } else {
      setIsEdit(false);
      setForm({});
    }
  }, [location]);
  //   console.log("formChech", form);
  //   useMemo(() => {
  //     if (series?.statuscode == 200) {
  //       const temp = formStructure;
  //       temp[0]["options"] = series?.data?.map((series) => ({
  //         label: series?.series_name,
  //         value: series?.id,
  //       }));

  //       setFormStructure([...temp]);
  //       //   const tempFilter = tableData;
  //       //   tempFilter["filterColumn"][2]["options"] = categories?.data?.map(
  //       //     (category) => category?.category_name
  //       //   );

  //       //   setTableData({ ...tempFilter });
  //     }
  //   }, [series]);

  //   console.log("13333333333form",isEdit );
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();

    // temp_movie_category["created_by"] = user?.id;
    // setForm({
    //   ...temp_movie_category,
    // });

    Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    data.append("user", user?.id);
    // formStructure?.map((structure) =>
    //   structure?.map((element) => {
    //     if (
    //       element.type == "image" &&
    //       form?.[element.name] &&
    //       typeof form?.[element.name] != "string"
    //     ) {
    //       const temp = form;
    //       temp["temp" + element.name] = form?.[element.name];
    //       temp[element.name] = URL.createObjectURL(form?.[element.name]);

    //       setForm({
    //         ...temp,
    //       });
    //     }
    //   })
    // );

    // const temp = tableData;
    if (isEdit) {
      const resData = await cast_update(data);
      if (resData?.status === 200) {
        setForm({});
        navigate("/masters/cast/", { state: { formUpload: true } });

      } else {
        setForm(form);
      }
      // dispatch(language_update(data));
    } else {
      const resData = await cast_create(data);
      console.log(resData , "chechhhhhhhhh")
      if (resData?.status === 200) {
        setForm({});
        navigate("/masters/cast/", { state: { formUpload: true } });
      } else {
        setForm(form);
      }
      
      //
      // dispatch(language_create(data));
    }
    setFlag(true);
  };
  // useMemo(() => {
  //   if (message?.statuscode == 200) {
  //     // const temp = tableData;
  //     // if (isEdit) {
  //     //   temp.tableBody?.map(
  //     //     (value, index) =>
  //     //       value.id == form.id && (temp.tableBody[index] = { ...form })
  //     //   );
  //     // } else {
  //     //   temp.tableBody[temp.tableBody.length] = {
  //     //     id: temp.tableBody.length,
  //     //     ...form,
  //     //     edit: temp.tableBody.length,
  //     //   };
  //     // }
  //     // setTableData({ ...temp });
  //     // setIsEdit(false);

  //     // setFlag(false);
  //     // setTimeout(() => {
  //     //   const data = new FormData();
  //     //   // data.append("id", user?.id);
  //     //   // dispatch(all_series_list(data));
  //     // }, 1000);
  //     setForm({});
  //     navigate("/masters/language/", { state: { formUpload: true } });

  //     // setTimeout(()=>{
  //     // setFormStructure([...tempFormStruct]);
  //     // },1500)
  //   } else {
  //     if (flag) {
  //       const tempForm = form;
  //       setForm({ ...tempForm });
  //       setPopupContent("API Error");
  //       setOpenAdError(true);
  //     }
  //   }
  // }, [message]);
  const handleClose = () => {
    setOpenAdError(false);
  };
  return (
    <div>

      <ViewChangeForm
        view_all={"/masters/cast/"}
        access={true}
        view="view_all"
      />
      <Form
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        formTitle={formTitle}
        // formTitleNew={formTitleNew}
        key={"Form"}
        setForm={setForm}
        form={form}
        // tableData={tableData}
        // setTableData={setTableData}
        // isEdit={isEdit}
        // setIsEdit={setIsEdit}
      />
    </div>
  );
};

export default CreateCast;
