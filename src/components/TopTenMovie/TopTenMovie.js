import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../actions/Movie/top_ten_movies";
import { bindActionCreators } from "redux";
import { all_movie_name_list } from "../../actions/Movie/movie";
import { only_series_name } from "../../actions/WebSeries/series";
import ListTable from "../utils/Table";
import Export from "../utils/Export";

const TopTenMovie = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const user = useSelector((state) => state.layout.profile);
  const [save, setSave] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const series = useSelector((state) => state?.webseries?.series_name);
  const movie = useSelector((state) => state?.movies?.movie_name);
  const { top_ten_create, top_ten_update } = bindActionCreators(
    Action,
    dispatch
  );
  const topTenData = useSelector((state)=> state?.movies?.top_ten_videos) 
  useEffect(() => {
    if (user?.id) {
      dispatch(only_series_name());
      dispatch(all_movie_name_list());
    }
  }, [user?.id]);
  const [tableData, setTableData] = useState({
    tableTitle: "Top Ten Video",
    deleteRecord: Action.top_ten_delete,
    // updateRecord: Action.top_ten_update,
    customisedStatusUpdateMessage: true,
    onDeleteText: "Are you sure want to delete ?",
    // onActiveText: "Are you Sure want to Activate Slider Banner?",
    // onInactiveText: "Are you Sure want to Inactivate Slider Banner?",
    tableHead: [
      {
        id: "content_type",
        label: "Content Type",
      },
      {
        id: "title",
        label: "Title",
      },

      {
        id: "poster",
        label: "Image",
        isImage: true,
      },
      // {
      //   id: "web_banner",
      //   label: "Web View",
      //   isImage: true,
      // },

      {
        id: "sequence",
        label: "Sequence",
        align: "center",
      },
      {
        id: "created_at",
        label: "Created At",
        isDate : true
      },
       {
        id: "edit",
        label: "Update",
        isNewPopUpForm : true
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
    if (user?.id) {
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      dispatch(Action.all_top_ten_list_admin(data));
    }
  }, [user?.id, save]);
  const [formStructure, setFormStructure] = useState([
    {
      type: "select",
      name: "content_type",
      title: "Content Type",
      placeholder: "Select Content Type here",
      options: [
        { value: "Movie", label: "Movie" },
        { value: "Series", label: "Series" },
      ],
      required: true,
    },
    {
      type: "select",
      name: "movie",
      title: "Select Movie",
      placeholder: "Select Movie here",
      options: [
        { value: "Movie", label: "Movie" },
        { value: "Series", label: "Series" },
      ],
      display: "none",
      required: true,
    },
    {
      type: "select",
      name: "series",
      title: "Select series",
      placeholder: "Select series here",
      options: [
        { value: "Movie", label: "Movie" },
        { value: "Series", label: "Series" },
      ],
      display: "none",
      required: true,
    },
    {
      type: "inputBox",
      name: "sequence",
      title: "Sequence",
      display: "none",
      regex: /^[0-9\.]+$/,
      // maxLength: "2",
      //   size: "3",
      placeholder: "Type Sequence",
      required: true,
    },
  ]);

  useMemo(() => {
    if (movie?.data) {
      const temp = formStructure;
      temp[1]["options"] = movie?.data?.map((ele) => ({
        label: ele?.title,
        value: ele?.id,
      }));
      setFormStructure([...temp]);
    }
  }, [movie]);
  useMemo(() => {
    if (series?.data) {
      const temp = formStructure;
      temp[2]["options"] = series?.data?.map((ele) => ({
        label: ele?.title,
        value: ele?.id,
      }));
      setFormStructure([...temp]);
    }
  }, [series]);
    useMemo(() => {
      if (topTenData?.data) {
        const temp = tableData;
        temp.tableBody = topTenData?.data;
        setTableData({ ...temp });
        // setForm({ ...form, sequence: Number(tableData.tableBody[tableData.tableBody.length - 1]?.["sequence"]) + 1 })
      }
    }, [topTenData]);
  console.log(movie, "new FormData");
  useMemo(() => {
    if (form?.content_type == "Movie") {
      console.log(formStructure, "nmewkjvddsfdfki");
      const temp = formStructure;
      temp[1]["display"] = "block";
      temp[2]["display"] = "none";
      setFormStructure([...temp]);
    } else if (form?.content_type == "Series") {
      const temp = formStructure;
      temp[2]["display"] = "block";
      temp[1]["display"] = "none";
      setFormStructure([...temp]);
    } else {
      const temp = formStructure;
      temp[2]["display"] = "none";
      temp[1]["display"] = "none";
      setFormStructure([...temp]);
    }
  }, [form?.content_type]);

  useMemo(() => {
    if (isEdit) {
      const temp = formStructure;
      temp[3]["display"] = "block";
      setFormStructure([...temp]);
    } else {
      const temp = formStructure;
      temp[3]["display"] = "none";
      setFormStructure([...temp]);
    }
  }, [isEdit]);

  const handleSubmit = async (event) => {
    const data = new FormData();
    Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    data.append("user", user?.id);
    if (isEdit) {
      const resData = await top_ten_update(data);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
         setIsModalOpen(false);
      } else {
        setForm(form);
      }
    } else {
      const resData = await top_ten_create(data);
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
      hideAddBtn = {topTenData?.data?.length >=10 ? true : false}
      formStructure={formStructure}
      formTitle={isEdit ? "Edit Top Ten Video" : "Add Top Ten Video"}
      onSubmit={handleSubmit}
      initialData={editingIndex !== null ? tableData[editingIndex] : {}}
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
export default TopTenMovie;
