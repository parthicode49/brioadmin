import React, { useMemo, useState } from "react";
import ViewChangeForm from "../../utils/ViewChangeForm";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "../../utils/Form";
import { formStructure } from "./FormStructure";
import {
  season_create,
  season_update,
} from "../../../actions/WebSeries/season";
import * as Action from "../../../actions/Masters/category";
import { bindActionCreators } from "redux";
// import { category_create, category_update } from "../../../actions/Masters/category";
const CreateCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.layout.profile);
  const { category_create, category_update } = bindActionCreators(
    Action,
    dispatch
  );
  const series = useSelector((state) => state?.webseries?.series_name);
  const [isEdit, setIsEdit] = useState(location?.state?.isEdit || false);
  const [flag, setFlag] = useState(false);
  const [form, setForm] = useState({});
  const message = useSelector((state) => state?.layout?.message);
  console.log(message, "nfsdfsdffdsfsf");
  const [content, setPopupContent] = useState("");
  const [openAdError, setOpenAdError] = useState(false);
  //   const [formStructure, setFormStructure] = useState([
  //     {
  //       id: "1",
  //       type:"select_id",
  //       title: "Show Name",
  //       name: "series",
  //       options: [],
  //       required: true,
  //     //   disabled: isEdit ? true : false
  //     },
  //     {
  //       id: "2",
  //       type: "select",
  //       title: "Season",
  //       name: "season",
  //       options: [
  //         "Season 1",
  //         "Season 2",
  //         "Season 3",
  //         "Season 4",
  //         "Season 5",
  //         "Season 6",
  //         "Season 7",
  //         "Season 8",
  //         "Season 9",
  //         "Season 10",
  //       ],
  //       required: true,
  //     },

  //     {
  //       id: "3",
  //       type: "image",
  //       title: "Image",
  //       subtitle: "(Resolution : 1080px * 1080px) *",
  //       subsubtitle: "Max File Size 1MB",
  //       subsubsubtitle: "Support only JPG,PNG,JPEG",
  //       name: "season_thumbnail",
  //       // required: true,
  //     },

  //     {
  //       id: "5",
  //       type: "button",
  //       title: isEdit ? "Edit" : "Create",
  //     },
  //   ]);
  const formTitle = isEdit ? "Edit Category" : "Add Category";
  console.log(
    "location",
    location?.state?.form && JSON.parse(location?.state?.form),
    location
  );
  const categories = useSelector((state) => state.masters.categories);

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

      setForm({
        sequence: categories?.data?.length + 1,
      });
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
  useMemo(() => {
    if (categories?.statuscode == 200) {
      setForm({ ...form, sequence: categories?.data?.length + 1 });
    }
  }, [categories]);
  //   console.log("13333333333form",isEdit );
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData();

    // temp_movie_category["created_by"] = user?.id;
    // setForm({
    //   ...temp_movie_category,
    // });

    // Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    // data.append("user", user?.id);
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
      const resData = await category_update(form);
      console.log(resData ,"neweweweweweew")
      if (resData?.status === 200) {
        setForm({});
        navigate("/masters/category/", { state: { formUpload: true } });
      } else {
        setForm(form);
      }
    } else {
      const resData = await category_create(form);
      if (resData?.status === 200) {
        setForm({});
        navigate("/masters/category/", { state: { formUpload: true } });
      } else {
        setForm(form);
      }
    }
    setFlag(true);
  };
  // useMemo(() => {
  //   if (message) {
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
  //     navigate("/masters/category/", { state: { formUpload: true } });

  //     // setTimeout(()=>{
  //     // setFormStructure([...tempFormStruct]);
  //     // },1500)
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
        <Alert severity="error" variant="filled" color="success">
          {content}
        </Alert>
      </Snackbar>
      <ViewChangeForm
        view_all={"/masters/category/"}
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

export default CreateCategory;
