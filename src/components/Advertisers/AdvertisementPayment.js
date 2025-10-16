import React from "react";
import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./../../styles/PageTitle.module.css";
import ListTable from "../utils/Table";
import Form from "../utils/Form";
import ViewChange from "../utils/ViewChange";
import {
  advertisement_delete,
  advertisement_update,
  all_advertisement_list,
} from "../../actions/Advertiser/advertisement";
import {
  advertise_transaction_create,
  advertiser_transaction_history,
} from "../../actions/Advertiser/advertisementpayment";

import { all_movie_list } from "../../actions/Movie/movie";
import { all_advertiser_list } from "../../actions/Advertiser/advertiser";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { ADVERTISEMENTS } from "./../../constants/actionTypes";
import { all_series_list } from "../../actions/WebSeries/series";
import { all_tv_channel_list } from "../../actions/LiveStreaming/tv_channel";
import { all_category_list } from "../../actions/Masters/category";
import { all_genre_list } from "../../actions/Masters/genre";
import { all_language_list } from "../../actions/Masters/language";
import { Country, State, City } from "country-state-city";
export default function AdvertisementPayment() {
  // const role = useSelector((state) => state.layout.role)
  const countries = Country.getAllCountries();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.layout.profile);
  const location = useLocation();
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [form, setForm] = useState(
    (location?.state?.form && JSON.parse(location?.state?.form)) || {}
  );
  const [view, setView] = useState(location?.state?.view || "view_all");
  const [isEdit, setIsEdit] = useState(false);
  const rights = useSelector((state) => state.layout.rights);
  const categories = useSelector((state) => state.masters?.categories);

  useMemo(() => {
    if (isEdit) {
      setView("create_new");
    } else {
      setView("view_all");
      setForm({});
    }
  }, [isEdit]);

  const path = location?.pathname.split("/")[2];
  useEffect(() => {
    setView(path != "AdvertisementPayment" ? "create_new" : "view_all");
    setForm((location?.state?.form && JSON.parse(location?.state?.form)) || {});
    setIsEdit(path == "EditAdvertisementPayment");
  }, [location]);

  const tempTableData = {
    tableTitle: "Advertisement Payment",
    disableDelete: true,

    //  deleteRecord: advertisement_delete, updateRecord: advertisement_update,
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
        label: "Product",
      },
      {
        id: "advertisers",
        label: "Company Info",
        subText: "company_name",
      },
      // {
      // 	id: "email",
      // 	label: "Contact Info",
      // 	subText:"mobileNumber"
      // },
      {
        id: "payment_type",
        label: "Patment Type",
      },

      {
        id: "recharge_amount",
        label: "Totle Amount",
      },

      {
        id: "firstName",
        label: "Uploaded By",
      },
    ],
    tableBody: [],
  };
  const [tableData, setTableData] = useState({ ...tempTableData });
  useMemo(() => {
    setTableData({ ...tempTableData });
  }, [rights]);
  const [formStructure, setFormStructure] = useState([
    {
      id: "2",
      type: "select",
      title: "Select Advertisement",
      name: "state",
      options: ["Ad1", "Ad2"],
      required: true,
    },
    {
      id: "15",
      type: "select",
      title: "Select Advertisement",
      options: ["Ad1", "Ad2"],
    },
    {
      id: "2",
      type: "select",
      title: "Video Type",
      name: "vd",
      options: ["All", "Movie", "Series"],
      required: true,
    },
    {
      id: "2",
      type: "select_multiple",
      title: "Select ",
      options: [],
      maxSelections: "7",
      errorText: "You can select max 7 cast at a time",
      name: "movie_name",
      display: "none",
      required: true,
    },

    {
      id: "2",
      type: "select",
      title: "Category",
      name: "category",
      options: ["VIDEO"],
      // required: true,
    },
    {
      id: "2",
      type: "select",
      title: "Select Gender",
      name: "gender",
      options: ["Male", "Female", "Transgender"],
      // required: true,
    },
    {
      id: "2",
      type: "select",
      title: "Select Age Range",
      name: "age_range",
      options: ["10 to 17", "18 to 35", "36 to 50", "50 above"],
      // required: true,
    },
    {
      id: "2",
      type: "select_multiple",
      title: "Select Locations ( Area )",
      options: [
        "CG Road",
        "Chandkheda",
        "Ghatlodiya",
        "Naranpura",
        "Sabarmati",
        "Iscon",
      ],
      maxSelections: "7",
      errorText: "You can select max 7 cast at a time",
      name: "locations_area",
      // display: "none",
      // required: true,
    },
    {
      id: "6",
      type: "select_multiple",
      title: "Select Genre",
      name: "genre",
      maxSelections: "3",
      errorText: "You can select max 3 genre at a time",
      options: ["hii"],
      // required: true,
    },
    {
      id: "5",
      type: "select",
      title: "Language",
      name: "language",
      options: ["English", "Hindi", "Gujarati"],
      // required: true,
    },
    {
      id: "10",
      type: "inputBox",
      variant: "date",
      title: "Publish Date",
      min: new Date().toISOString().split("T")[0],
      name: "date",
      default:new Date().toISOString().split('T')[0],
    //   display: "none",
      // required: true,
    },  
	  {
		id: "5",
		type: "select",
		title: "Select Time",
		name: "time",
		options: ["Slot Wise", "Specific Time"],
		required: true,
	  },
	  {
		id: "6",
		type: "select_multiple",
		title: "Select Slot",
		name: "slot",
		maxSelections: "3",
		errorText: "You can select max 3 slot at a time",
		options: ["0 to 3","3 to 6","6 to 9" , "9 to 12" ,"12 to 15" ,"15 to 18" ,"18 to 21" , "21 to 24"],
		display: "none",
		
		required: true,
	  },
	  {
		id: "10",
		type: "inputBox",
		variant: "time",
		title: "Publish Time",
		default:new Date().toISOString().split('T')[1],
		name: "publish_time",
		display: "none",
		required: true
	},


    {
      id: "9",
      type: "button",
      title: isEdit ? "Edit" : "Create",
    },
  ]);

  const movies = useSelector((state) => state?.movies?.movies);
  const series = useSelector((state) => state?.webseries?.series);
  // const tv_channels = useSelector((state) => state.livestreamings.tv_channels);
  useEffect(() => {
    if(user?.id)
    {const data = new FormData();
    data.append("id", user?.id);

    dispatch(all_series_list(data));
    dispatch(all_movie_list(data));
    dispatch(all_category_list());
    dispatch(all_tv_channel_list(data));
    dispatch(all_genre_list());
    dispatch(all_language_list());}
  }, [user?.id]);
  const advertisements = useSelector(
    (state) => state?.advertisers?.advertisements
  );
  const advertisers = useSelector((state) => state?.advertisers?.advertisers);
  const advertisers2 = useSelector(
    (state) => state?.advertisementspay?.adpaymentlist
  );
  const genre = useSelector((state) => state.masters.genre);
  const language = useSelector((state) => state.masters.languages);
 
 

  useMemo(() => {
      const temp = formStructure;
      temp[0]["options"] =State.getStatesOfCountry('IN')?.map((ele)=>ele?.name)
      setFormStructure([...temp]);
  }, [State]);


  useMemo(() => {
    if(form?.state !== undefined){
      const StateName = State.getStatesOfCountry('IN')?.map((ele)=>ele?.name == form?.state && ele?.isoCode).filter((e)=>e).toString()
      const temp = formStructure;
      temp[1]["options"] =  City.getCitiesOfState('IN', StateName)?.map((ele)=> ele?.name)
      setFormStructure([...temp]);
    }
}, [City,form?.state]);
  useMemo(() => {
    if (form?.vd == "Movie") {
      const temp = formStructure;
      temp[3]["display"] = "block";
      temp[3]["title"] = "Select Movie";
      temp[3]["name"] = "movie";
      temp[3]["options"] = movies?.data?.map((ele) => ele.movie_name);
      setFormStructure([...temp]);
    } else if (form?.vd == "Series") {
      const temp = formStructure;
      temp[3]["display"] = "block";
      temp[3]["title"] = "Select Series";
      temp[3]["name"] = "series";
      temp[3]["options"] = series?.data?.map((ele) => ele.series_name);
      setFormStructure([...temp]);
    } else {
      const temp = formStructure;
      temp[3]["display"] = "none";
      setFormStructure([...temp]);
    }
  }, [form?.vd]);
  useMemo(() => {
    if (categories?.statuscode == 200) {
      const temp = formStructure;
      // console.log(formStructure, "formStarree");
      temp[4]["options"] = categories?.data?.map(
        (category) => category?.category_name
      );
      setFormStructure([...temp]);
    }
  }, [categories]);
  // console.log(categories, "new Cate");
  useMemo(() => {
    if (form?.advertisement) {
      setForm({
        ...form,

        duration: advertisements?.data
          ?.map(
            (ele) => form?.advertisement == ele?.product_name && ele.duration
          )
          .filter((e) => e),
      });
    }
  }, [form?.advertisement]);
  useMemo(() => {
    if (genre?.statuscode == 200) {
      const temp = formStructure;
      temp[8]["options"] = genre?.data?.map((genre) => genre?.genre_title);

      setFormStructure([...temp]);
    }
  }, [genre]);
  useEffect(() => {
    if(user?.id)
   { const data = new FormData();
    data.append("id", user?.id);

    // dispatch({ type: ADVERTISEMENTS, payload: undefined })
    dispatch(advertiser_transaction_history(data));}
  }, [location, user?.id]);
  useMemo(() => {
    if (language?.statuscode == 200) {
      const temp = formStructure;
      temp[9]["options"] = language?.data?.map(
        (language) => language?.language_name
      );
      setFormStructure([...temp]);
    }
  }, [language]);
  useMemo(()=>{
	if(form?.time =="Slot Wise"){
		const temp = formStructure;
		temp[12]["display"]= "block"
		temp[13]["display"]= "none"

		setFormStructure([...temp])

	} else if(form?.time == "Specific Time"){
		const temp = formStructure;
		temp[13]["display"] = "block"
		temp[12]["display"]= "none"

		setFormStructure([...temp])
	}else{
		const temp = formStructure;

		temp[12]["display"]= "none"
		temp[13]["display"]= "none"
setFormStructure([...temp])
	}
	
  },[form?.time])
  useMemo(() => {
    if (advertisers2?.statuscode == 200) {
      const temp = tableData;
      temp.tableBody = advertisers2?.data?.map((ele) => ({
        ...ele,
        advertisers: ele?.advertiser?.name,
        company_name: ele?.advertiser?.company_name,
      }));
      setTableData({ ...temp });
    }
  }, [advertisers2]);

  const formTitle = isEdit
    ? "Edit Advertisement Payment"
    : "Create Advertisement Payment";

  const message = useSelector((state) => state.layout.message);

  const handleSubmit = (event) => {
    event.preventDefault();
    const tempForm = form;
    tempForm["tempadvertiser"] = form?.["advertiser"];
    tempForm["advertiser"] = advertisers?.data
      ?.map((option) => form?.["advertiser"]?.includes(option.name) && option.id)
      .filter((e) => e);
    tempForm["uploaded_by"] = user?.id;
    // tempForm["movies"] = movies?.data
    // 	.map(
    // 		(option) => form?.["movies"]?.includes(option.movie_name) && option.id
    // 	)
    // 	.filter((e) => e);

    setForm({
      ...tempForm,
    });
    const data = new FormData();
    Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    data.append("user", user?.id);
    formStructure?.map((element) => {
      if (
        element.type == "image" &&
        form?.[element.name] &&
        typeof form?.[element.name] != "string"
      ) {
        const temp = form;
        temp["temp" + element.name] = form?.[element.name];
        temp[element.name] = URL.createObjectURL(form?.[element.name]);

        setForm({
          ...temp,
        });
      }
    });

    dispatch(advertise_transaction_create(data));

    setFlag(true);
  };

  useMemo(() => {
    if (message?.statuscode == 200 && flag) {
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
      setFlag(false);
      setTimeout(() => {
        const data = new FormData();
        data.append("id", user?.id);
        dispatch(advertise_transaction_create(data));
        // console.log("namwee")
        navigate("/Advertisers/AdvertisementPayment/", {
          state: { view: "view_all" },
        });
        // console.log("namwee12")

        setView("view_all");
      }, 1000);
    } else {
      const tempForm = form;
      tempForm["advertiser"] = form?.["tempadvertiser"];
      // tempForm["thumbnail"] = form?.["tempthumbnail"]
      setForm({ ...tempForm });
    }
  }, [message]);

  return (
    <>
      <ViewChange
        setForm={setForm}
        setView={setView}
        setIsEdit={setIsEdit}
        view={view}
        access={rights?.["Advertisement"]?.["create"] == "true"}
        isEdit={isEdit}
        create_new={"/Advertisers/CreateAdvertisementPayment"}
        view_all={"/Advertisers/AdvertisementPayment"}
        form={form}
      />
      {view == "create_new" && (
        <Form
          formStructure={formStructure}
          formTitle={formTitle}
          key={"Form"}
          handleSubmit={handleSubmit}
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
          create_new={"/Advertisers/EditAdvertisementPayment"}
        />
      )}
    </>
  );
}
