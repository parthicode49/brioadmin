import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTable from "../utils/Table";
import { useLocation, useNavigate } from "react-router-dom";
import ViewChangeForm from "../utils/ViewChangeForm";

import Export from "../utils/Export";
// import { all_distributor_list } from "../../actions/distributor";
import * as Action from "../../actions/Advertiser/advertiser";
import NewForm from "../utils/NewFormStructure/NewForm";
import { Button } from "@mui/material";
import { bindActionCreators } from "redux";

const Advertisers = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.layout.role);
  const rights = useSelector((state) => state.layout.rights);
  const user = useSelector((state) => state.layout.profile);
  const [save, setSave] = useState(false);
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const [drawer, setDrawer] = useState(false);
  const { advertiser_create , advertiser_update } = bindActionCreators(
    Action,
    dispatch
  );
  const [tableData, setTableData] = useState({
    tableTitle: "Advertisers",
    deleteRecord: Action.advertiser_delete,
    updateRecord: Action.advertiser_status_update,
    deleteAccess: rights?.["Masters"]?.["delete"] == "true",
    onDeleteText:
      "Are you Sure?",
    onUpdateText: "Are you Sure?",
    tableHead: [
      {
        id: "name",
        label: "Advertisor Name",
        link: "/Distributors/DistributerProducts",
        color: "var(--gradientColor2)",
      },

      {
        id: "company_name",
        label: "Company Name",
      },

      {
        id: "email",
        label: "Contact Info",
        subText: "mobile_number",
      },
      {
        id: "created_at",
        label: "Registration Date",
      },
      {
        id: "status",
        label: "Status",
      },
      {
        id: "edit",
        label: "Update",
        access: rights?.["Distributor"]?.["edit"] == "true",
        isNewForm: true,
      },
    ],
    tableBody: [],
    // isDateRangeFilter: "created_at",
  });

  useEffect(() => {
    if (user?.id) {
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      //  if(movies?.statuscode!=200)
      dispatch(Action.all_advertiser_list(data));
    }
  }, [user?.id, save]);

//   const distributors = useSelector((state) => state.distributors.distributors);
  const advertisers_list = useSelector((state) => state?.advertisers?.advertisers);
  const [formStructure, setFormStructure] = useState([
    {
      title: "Details",
      fields: [
        {
          id: "1",
          type: "inputBox",
          title: "Company Name",
          name: "company_name",
          placeholder: "Enter Company Name",
          required: true,
        },
        {
          id: "2",
          type: "inputBox",
          title: "Advertisor Name",
          name: "name",
          placeholder: "Enter Advertisor Name",
          required: true,
        },
        {
          id: "3",
          type: "inputBox",
          title: "Email ID",
          variant: "email",
          placeholder: "Enter Email ID Name",
          isEmail: true,
          name: "email",
          required: true,
        },
        {
          id: "4",
          type: "mobile",
          title: "Mobile Number",
          // maxLength: 12,
          placeholder: "Enter Mobile Number",
          name: "mobile_number",
          isMobile: true,
          required: true,
        },
        {
          id: "5",
          type: "inputBox",
          name: "country",
          title: "Country",
          placeholder: "Enter Country Name",
          required: true,
        },
        {
          id: "6",
          type: "inputBox",
          name: "state",
          title: "State",
          placeholder: "Enter state",
          required: true,
        },
        {
          id: "7",
          type: "inputBox",
          title: "Password",
          name: "password",
          placeholder: "Enter password",
          // regex: /^[0-9\.]+$/,
          required: true,
        },
        // {
        //   id: "110",
        //   type: "mobile",
        //   // options : ["parth" ,"gohel"],
        //   title: "Alternative Number",
        //   placeholder: "Type your Mobile no. here",
        //   name: "alternative_number",
        //   required: true,
        //   isMobile: true,
        //   // disabled: isEdit,
        // },
      ],
    },
    // {
    //   title: "Contact",
    //   fields: [
    //     {
    //       id: "1",
    //       type: "inputBox",
    //       name: "contact_person_name",
    //       title: "Contact Person",
    //       placeholder: "Enter Contact Person Name here",
    //       required: true,
    //     },
    //     {
    //       id: "2",
    //       type: "mobile",
    //       title: "Mobile Number",
    //       // maxLength: 12,
    //       placeholder: "Enter Contact Person Mobile Number",
    //       name: "contact_person_number",
    //       isMobile: true,
    //       required: true,
    //     },
    //   ],
    // },
    // {
    //   title: "Media",
    //   fields: [
    //     {
    //       id: "8",
    //       type: "image",
    //       title: "Company Registration Certificate",
    //       name: "company_registration_certificate",
    //       description: "PDF, DOC, DOCX (Max 5MB)",
    //       accept: ".pdf,.doc,.docx",
    //       size: 4,
    //     },
    //     {
    //       id: "9",
    //       type: "image",
    //       title: "Company Logo",
    //       name: "company_logo",
    //       description: "Upload a Company Logo (JPG, PNG)",
    //       accept: "image/*",
    //       required: true,
    //       display: "block",
    //       size: 4,
    //     },
    //     {
    //       id: "10",
    //       type: "image",
    //       title: "Contract Agreement",
    //       name: "contract_agreement",
    //       description: "PDF, DOC, DOCX (Max 5MB)",
    //       accept: ".pdf,.doc,.docx",
    //       size: 4,
    //     },
    //   ],
    // },
  ]);
  useMemo(() => {
    if (advertisers_list) {
      const temp = tableData;
      temp.tableBody = advertisers_list?.data;
      setTableData({ ...temp });
    }
  }, [advertisers_list]);

  useEffect(()=>{
    if(isEdit){
      setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 6) {
                return { ...field, display: "block" };
              }
              return field;
            });
            return { ...section, fields: updatedFields };
          }
          return section;
        })
      );
    }else{
        setFormStructure((prevFormStructure) =>
        prevFormStructure.map((section) => {
          if (section.title === "Details") {
            const updatedFields = section.fields.map((field, index) => {
              if (index === 6) {
                return { ...field, display: "none" };
              }
              return field;
            });
            return { ...section, fields: updatedFields };
          }
          return section;
        })
      );
    }
  },[isEdit])

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData();
    // Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    // data.append("user", user?.id);
    if (isEdit) {
      const resData = await advertiser_update(form);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    } else {
      const resData = await advertiser_create(form);
      if (resData?.status === 200) {
        // setForm({});
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
      //
      // dispatch(language_create(data));
    }
  };
  return (
    <div>
      {/* <div style={{textAlign:"right"}}>
		 <Button
		  startIcon={<AddIcon sx={{ color: '#fff !important' }} />}
		  variant="contained"
		  color="success"
		  sx={{
			textTransform: 'capitalize',
			borderRadius: '10px',
			mt: '10px',
			p: '10px 30px',
			fontSize: '14px',
			color: '#fff !important',
		  }}
		  style={{ background: "linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)" }}
		  className="mr-10px"
		  onClick={() => navigate("/movie_testing/create_movie_testing/" )}
		>
		  Add
		</Button>
		</div> */}
      {/* <ViewChangeForm
		create_new={"/distributor/createdistributor/"}
		access={true}
		view="create_new"
		export_excel={
		  <Export
			fileName={"Distributor"}
			isClubed={true}
			access={"true"}
			exportData={tableData?.exportData || tableData?.tableBody}
			headings={tableData.tableHead?.map((value) => value.label)}
			// api = {"export_episode_list"}
			// api_data = {episodes?.filter_condition}
		  />
		}
	  /> */}
      {/* <Button onClick={() => setDrawer(!drawer)}>Create</Button>
	  <NewForm
		open={drawer}
		setOpen={setDrawer}
		formStructure={formStructure}
		handleSubmit={handleSubmit}
		form={form}
		setForm={setForm}
		formTitle = {"Add Movie"}
	  /> */}

      <ListTable
        tableData={tableData}
        key={"ListTable"}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
        save={save}
        setSave={setSave}
        view="view_all"
        isDrawerForm={true}
        openDrawer={drawer}
        setOpenDrawer={setDrawer}
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        form={form}
        formTitle={isEdit ? "Edit Advertisers" : "Add Advertisers"}
        exportButton={
          <Export
            fileName={"Advertisers"}
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

export default Advertisers;
