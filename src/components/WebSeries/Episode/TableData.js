import { useSelector } from "react-redux";

export const TableData = () => {
  const rights = useSelector((state) => state.layout.rights);
  return {
    tableTitle: "Episode",
    deleteAccess: rights?.["Web Series"]?.["delete"] == "true",
    tableHead: [
            {
        id: "thumbnail",
        label: "Image",
        isFirstImage: true,
      },
      {
        id: "title",
        label: "Episode Title",
        link: "/Episode/Episode/EpisodeDetails",
        subText: "episode_Num",
        color: "var(--gradientColor2)",
      },
      {
        id: "series_title",
        label: "Show Name",
        subText: "season_title",
      },
      // {
      //   id:'series_subCategory',
      //   label:"Sub Category"
      // },


      // {
      //   id: "total_usage",
      //   label: "Total Usage",
      // },
      // {
      //   id: 'release_date',
      //   label: 'Release Date',
      //   subText: "publish_time"
      // },
      // {
      //   id: 'uploaded_by',
      //   label: 'Uploaded By',
      // },
      // {
      //   id: 'series_ownership',
      //   label: 'Ownership',
      // },
      {
        id: "episode_view_count",
        label: "Viwes",
      },
      {
        id: "status",
        label: "Status",
        // isButtonDisplay: true
      },
      {
        id: "info",
        label: "View",
        isSpecial: true,
        align: "left",
      },
      {
        id: "edit",
        label: "Update",
        access: rights?.["TV Shows"]?.["edit"] == "true",
        isNewForm: true,
      },
    ],
    tableBody: [],
    filterColumn: [
      {
        id: "1",
        title: "Series",
        name: "series_title",
        options: ["Series 1", "Series 2", "Series 3"],
      },
      {
        id: "2",
        title: "Season",
        name: "season_title",
        // displayOn1:"series_name",
        displayOn: "series_title",
        dependentField: "series_name",
        requredField: "season_title",
        options: ["Season 1", "Season 2", "Season 3"],
      },
      // ,{
      //   id:"3",
      //   title:"Sub Category",
      //   name:"series_subCategory",
      //   options:[]
      // }
    ],
  };
};
