
import { useSelector } from "react-redux"

export const TableData = () => {
  const rights = useSelector((state) => state.layout.rights)
  const role = useSelector((state) => state.layout.role)
  return {
    tableTitle: "Set Ad",
    deletePayload : [{id:"id",value_id : "",constant : ""},{id:"video_type",value_id : "",constant : "Movie"}, {id:"all_delete",value_id : "",constant : "All"}, {id:"movie",value_id : "movie",constant : ""}],
	disableDelete: role === "Advertiser" ? true : false,
  onDeleteText: "Are you Sure?",
  deleteAccess: rights?.["Set Movie Advertisement"]?.["delete"] == "true",
    onUpdateText: "Are you Sure?",
    tableHead: [
        {
            id: "movie",
            label: "Movie",
            // isSpecial: true,
            subText : "Duration",
            // align: "left",
        },
        {
            label: "Ad Name",
            id: "produce_name_1",
            subText1: "produce_name_2",
            subText2: "produce_name_3",
            subText3: "produce_name_4",
            subText4: "produce_name_5",

          },
          {
            label: "Ad duration",
            id: "ad_time_1",
            subText1: "ad_time_2",
            subText2: "ad_time_3",
            subText3: "ad_time_4",
            subText4: "ad_time_5",

          },
          {
            label: "Play Time",
            id: "play_time_1",
            subText1: "play_time_2",
            subText2: "play_time_3",
            subText3: "play_time_4",
            subText4: "play_time_5",

          },
      

          role !== "Advertiser" && {
    id: 'edit',
    label: 'Update',
    access: rights?.["Set Movie Advertisement"]?.["edit"] == "true",
    ErrorMsg:"You cannot change the details once it has been approved."
  }
 
        
    ].filter(e => e),
    tableBody: [

    ],
    filterColumn: [
      {
        id: "1",
        title: "Movie",
        name: "movie",
        options: ["FREE", "TVOD", "SVOD"],
      },
      {
        id: "1",
        title: "Advertisement",
        name: "findad",
        options: ["FREE", "TVOD", "SVOD"],
      }
    ]
  }
}