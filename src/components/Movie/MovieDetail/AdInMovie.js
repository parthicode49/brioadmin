import React, { useEffect, useState } from "react";
import ListTable from "../../utils/Table";
import { useDispatch, useSelector } from "react-redux";
import Export from "../../utils/Export";
import * as Action from "../../../actions/Advertiser/adinmovie";
import { bindActionCreators } from "redux";

const AdInMovie = ({ id }) => {
  const dispatch = useDispatch();
  const {
    advertisement_in_movie_create,
    advertisement_in_movie_list_admin,
    advertisement_in_movie_update,
    advertisement_name_id_only,
    // advertisement_in_movie_delete,
  } = bindActionCreators(Action, dispatch);
  const [form, setForm] = useState({ movie: id });
  const [isEdit, setIsEdit] = useState(false);
  const user = useSelector((state) => state.layout.profile);
  const [save, setSave] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adInMovieData, setAdInMovieData] = useState([]);
  const [adData, setAdData] = useState([]);

  useEffect(() => {
    if (id) {
      const apiData = async () => {
        const resData = await advertisement_in_movie_list_admin({
          movie_id: id,
        });
        if (resData?.status === 200) {
          setAdInMovieData(resData?.data?.data);
        }
        // console.log(resData , "resData111111")
      };
      apiData();
    }
  }, [id, save]);
  useEffect(() => {
    const apiData = async () => {
      const resData = await advertisement_name_id_only({
        movie_id: id,
      });
      if (resData?.status === 200) {
        setAdData(resData?.data?.data);
      }
      // console.log(resData , "resData111111")
    };
    apiData();
  }, []);

  useEffect(() => {
    if (adData?.length > 0) {
      const temp = formStructure;
      temp[0]["options"] = adData?.map((ele) => ({
        label: ele?.product_name + " - " + ele?.advertiser,
        value: ele?.id,
      }));
      setFormStructure([...temp]);
    }
  }, [adData]);
  useEffect(() => {
    if (adInMovieData?.length > 0) {
      const temp = tableData;
      temp.tableBody = adInMovieData;
      setTableData({ ...temp });
    }
  }, [adInMovieData]);

  console.log(adInMovieData, adData, "new Add Data");

  const [tableData, setTableData] = useState({
    tableTitle: "Advertisement",
    deleteRecord: Action.advertisement_in_movie_delete,
    // updateRecord: Action.top_ten_update,
    customisedStatusUpdateMessage: true,
    // disableDelete: true,
    onDeleteText: "Are you sure want to delete ?",
    onActiveText: "Are you Sure want to Activate Slider Banner?",
    onInactiveText: "Are you Sure want to Inactivate Slider Banner?",
    tableHead: [
      {
        id: "product_name",
        label: "Product Name",
      },
      {
        id: "time",
        label: "Ad Time",
      },
      {
        id: "created_at",
        label: "Created At",
        isDate: true,
      },
      //   {
      //     id: "status",
      //     label: "Status",
      //   },
      {
        id: "edit",
        label: "Update",
        isNewPopUpForm: true,
      },
    ],
    tableBody: [],
    filterColumn: [
    ],
  });

  const [formStructure, setFormStructure] = useState([
    {
      type: "select",
      name: "advertisement_id",
      title: "Select Advertisement",
      placeholder: "Select Advertisement here",
      options: [],
      required: true,
    },
    {
      type: "duration",
      name: "time",
      title: "Duration",
      placeholder: "Type Duration",
      required: true,
    },
  ]);
  useEffect(() => {
    if (isEdit) {
      const temp = formStructure;
      temp[0]["disabled"] = true;
      setFormStructure([...temp]);
    } else {
      const temp = formStructure;
      temp[0]["disabled"] = false;
      setFormStructure([...temp]);
    }
  }, [isEdit]);
  const handleSubmit = async (event) => {
    if (isEdit) {
      const resData = await advertisement_in_movie_update(form);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setIsModalOpen(false);
      } else {
        setForm(form);
      }
    } else {
      const resData = await advertisement_in_movie_create(form);
      if (resData?.status === 200) {
        // setForm({});
        setForm({});
        setSave(!save);
        setIsModalOpen(false);
      } else {
        setForm(form);
      }
    }
  };
  return (
    <ListTable
      tableData={tableData}
      key={"ListTable"}
      form={form}
      setForm={setForm}
      setTableData={setTableData}
      setIsEdit={setIsEdit}
      view="view_all"
      save={save}
      setSave={setSave}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      isPopUpNewTable={true}
      formStructure={formStructure}
      formTitle={isEdit ? "Edit Advertisement" : "Add Advertisement"}
      onSubmit={handleSubmit}
      initialData={editingIndex !== null ? tableData[editingIndex] : {}}
      exportButton={
        <Export
          fileName={"Ad In Movie"}
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

export default AdInMovie;
