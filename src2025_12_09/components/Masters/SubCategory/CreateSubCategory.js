import React, { useMemo, useState } from "react";
import ViewChangeForm from "../../utils/ViewChangeForm";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "../../utils/Form";
// import {
//   subcategory_create,
//   subcategory_update,
// } from "../../../actions/Masters/subcategory";
import * as Action from "../../../actions/Masters/subcategory";
import { bindActionCreators } from "redux";
const CreateSubCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.layout.profile);
  const { subcategory_create, subcategory_update } = bindActionCreators(
    Action,
    dispatch
  );
  //   const series = useSelector((state) => state?.webseries?.series_name);
  const categories = useSelector((state) => state?.masters?.categories);
  const [isEdit, setIsEdit] = useState(location?.state?.isEdit || false);

  const [form, setForm] = useState({});
  const message = useSelector((state) => state.layout.message);
  const subcategories = useSelector((state) => state.masters.subcategories);

  const [content, setPopupContent] = useState("");
  const [openAdError, setOpenAdError] = useState(false);
  const [formStructure, setFormStructure] = useState([
    {
      id: "1",
      type: "select_id",
      title: "Select Category",
      name: "category_id",
      options: ["Portrait", "Landscape"],
      symbol123: "yes",
      required: true,
    },

    {
      id: "2",
      type: "inputBox",
      title: "Sub Category",
      name: "subcategory_name",
      maxLength: 30,
      // regex: /^[a-zA-Z\s]+$/,
      isCapitalise: true,
      required: true,
    },
    {
      id: "3",
      type: "lockedInput",
      variant: "number",
      title: "Set Sequence",
      name: "sequence",
      min: "1",
      max: "99",
      required: true,
    },

    {
      id: "4",
      type: "toggle",
      title: "Status",
      name: "status",
      default: "Active",
      size: "2",
      options: [
        { value: "Active", color: "success" },
        { value: "Inactive", color: "danger" },
      ],
    },
    {
      id: "5",
      type: "toggle",
      title: "Movie Image View",
      name: "movie_image_view",
      default: "Vertical",
      size: "2",
      options: [
        { value: "Vertical", color: "success" },
        { value: "Horizontal", color: "danger" },
      ],
    },
    {
      id: "6",
      type: "toggle",
      title: "Series Image View",
      name: "series_image_view",
      default: "Horizontal",
      size: "2",
      options: [
        { value: "Vertical", color: "success" },
        { value: "Horizontal", color: "danger" },
      ],
    },
    {
      id: "7",
      type: "image",
      title: "Image",
      name: "subcategory_image",
      subtitle: "(Resolution : 512px x 512px) *",
      subsubsubtitle: "Support only JPG,PNG,JPEG",
      subsubtitle: "Max File Size 1MB",
      size:"4",
      required : true
    },
    {
      id: "8",
      type: "button",
      title: isEdit ? "Edit" : "Create",
    },
  ]);
  useMemo(() => {
    if (isEdit) {
      const temp = formStructure;
      temp[7]["title"] = "Edit";
      setFormStructure(temp);
    } else {
      const temp = formStructure;
      temp[7]["title"] = "Create";
      setFormStructure(temp);
    }
  }, [isEdit]);
  useMemo(() => {
    if (subcategories?.statuscode == 200) {
      setForm({ ...form, set_sequence: subcategories?.data?.length + 1 });
    }
  }, [subcategories]);
  const formTitle = isEdit ? "Edit Sub Category" : "Create Sub Category";
  // console.log(
  //   "location",
  //   location?.state?.form && JSON.parse(location?.state?.form),location
  // );
  useMemo(() => {
    if (location?.state?.isEdit) {
      const formData = JSON.parse(location?.state?.form);
      setForm({ ...formData, category: formData?.category_id });
      // console.log("chhhd9e");
      const temp = formStructure;
      //   temp[3]["title"] = "Edit"
      temp[0]["disabled"] = true;
      setFormStructure([...temp]);
      setIsEdit(true);
    } else {
      setIsEdit(false);

      setForm({
        set_sequence: subcategories?.data?.length + 1,
      });
    }
  }, [location]);
  //   console.log("formChech", form);

  useMemo(() => {
    if (categories) {
      const temp = formStructure;
      temp[0]["options"] = categories?.data?.map((category) => ({
        label: category?.category_name,
        value: category?.id,
      }));

      setFormStructure([...temp]);
      //   const tempFilter = tableData;
      //   tempFilter["filterColumn"][2]["options"] = categories?.data?.map(
      //     (category) => category?.category_name
      //   );

      //   setTableData({ ...tempFilter });
    }
  }, [categories]);

  console.log("13333333333form", isEdit);
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
      const resData = await subcategory_update(data);
      if (resData?.status === 200) {
        setForm({});
        navigate("/masters/subcategory/", { state: { formUpload: true } });
      } else {
        setForm(form);
      }
    } else {
      const resData = await subcategory_create(data);
      if (resData?.status === 200) {
        setForm({});
        navigate("/masters/subcategory/", { state: { formUpload: true } });
      } else {
        setForm(form);
      }
    }
    // setFlag(true);
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
  //     navigate("/Masters/SubCategory", { state: { formUpload: true } });

  //     // setTimeout(()=>{
  //     // setFormStructure([...tempFormStruct]);
  //     // },1500)
  //   } else {
  //     const tempForm = form;
  //     setForm({ ...tempForm });
  //   }
  // }, [message]);
  const handleClose = () => {
    setOpenAdError(false);
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openAdError}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert severity="info" variant="filled" color="success">
          {content}
        </Alert>
      </Snackbar>
      <ViewChangeForm
        view_all={"/Masters/SubCategory"}
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

export default CreateSubCategory;
