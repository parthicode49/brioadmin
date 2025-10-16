import React, { useEffect, useMemo, useState } from "react";
import ListTable from "../utils/Table";
import Export from "../utils/Export";
import { all_distributor_song_list } from "../../actions/distributorPanel/distributorContentForm";
import { useDispatch, useSelector } from "react-redux";
import InfoIcone from "../../images/info.png"
import { useNavigate } from "react-router-dom";

const DistributorSong = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate()
  const [form, setForm] = useState({});
  const user = useSelector((state) => state?.layout?.profile);
  const distributor_song = useSelector(
    (state) => state?.distributorPanel?.distributor_song
  );
  useEffect(() => {
    if (user?.id) {
      dispatch(all_distributor_song_list({ distributor_id: user?.id }));
    }
  }, [user?.id]);
  const [tableData, setTableData] = useState({
    tableTitle: "Song",
    // deleteRecord: Action.sliderbanner_delete,
    // updateRecord: Action.slide_banner_status_update,
    // deleteAccess: rights?.["Slider Banner"]?.["delete"] == "true",
    disableDelete: true,
    customisedStatusUpdateMessage: true,
    onDeleteText: "Are you sure want to delete Slider Banner?",
    onActiveText: "Are you Sure want to Activate Slider Banner?",
    onInactiveText: "Are you Sure want to Inactivate Slider Banner?",
    tableHead: [
      {
        id: "title",
        label: "Name",
        // link: "/Movie/MovieDetails",
        color: "var(--gradientColor2)",
        // subText: "movie_subcategory"
      },
      {
        id: "thumbnail",
        label: "Image",
        isImage: true,
      },
      {
        id: "category_name",
        label: "Category",
        subText: "sub_category_list",
      },
   {
        id: "movie_access1",
        label: "Access",
        isSpecial: true,
        align: "left",
      },
                  {
        id: 'distributor_commission_view',
        label: 'Pay Per View',
      },
        {
        id: "total_usage",
        label: "Total Usage",
      },
      {
        id: "sequence",
        label: "Sequence",
      },
      {
        id: "song_view",
        label: "Views",
      },
      {
        id: "status",
        label: "Status",
        isButtonDisplay: true
      },
      {
        id: "info",
        label: "View",
        isSpecial: true,
        align: "left",
      },
  
    ].filter((e) => e),
    tableBody: [],
    filterColumn: [],
  });
  useMemo(() => {
    if (distributor_song?.data) {
      const temp = tableData;
      temp.tableBody = distributor_song?.data?.map((value, index) => ({
        ...value,
        uploaded_by: value?.created_by?.firstName,
        // movie_suggestion:value?.movie_suggestion?.movie_name,
        // movie_producer:value?.movie_producer?.name,
        // movie_distributor: value?.movie_distributor?.name,
        // company_name: value?.movie_distributor?.company_name,
        movie_access1:
          value?.content_access === "FREE" ? (
            <span style={{ color: "var(--successColor)" }}>
              {value?.content_access}
            </span>
          ) : value?.content_access === "TVOD" ? (
            <span style={{ color: "var(--dangerColor)" }}>
              {value?.content_access}
            </span>
          ) : (
            <span style={{ color: "var(--warningColor)" }}>
              {value?.content_access}
            </span>
          ),
                    distributor_commission_view : value?.content_access == "SVOD"  ? "₹ " + value?.distributor_commission : value?.content_access == "TVOD" ?  value?.distributor_tvod_commission + "%" : "-" ,
           info: (
          <img 
          src={InfoIcone}
           width="20px"
            height="20px"
               style={{ cursor: "pointer" }}
            onClick={() => navigate("detail", { state: { id: value?.id } })}
          />),
        // sub_category_list: value?.subcategory_name.join(" , "),
        rental_price: parseFloat(value?.rental_price).toFixed(2),
        released_status:
          new Date(value?.release_date) > new Date()
            ? "Upcoming"
            : value?.release_date,
      }));
      setTableData({ ...temp });
      setForm({ ...form });
    }
  }, [distributor_song]);
  return (
    <ListTable
      tableData={tableData}
      key={"ListTable"}
      setForm={setForm}
      setTableData={setTableData}
      //  setIsEdit={setIsEdit}
      view="view_all"
      //  totalCount={movies?.movie_count}
      // isCountry={true}

      form={form}
      exportButton={
        <Export
          fileName={"Song"}
          isClubed={true}
          access={"true"}
          exportData={tableData?.exportData || tableData?.tableBody}
          headings={tableData.tableHead?.map((value) => value.label)}
          // api = {"export_episode_list"}
          // api_data = {episodes?.filter_condition}
        />
      }
    />
  );
};

export default DistributorSong;
