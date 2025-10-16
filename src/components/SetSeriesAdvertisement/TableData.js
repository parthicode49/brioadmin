
import { useSelector } from "react-redux"

export const TableData = () => {
  const rights = useSelector((state) => state.layout.rights)
  const role = useSelector((state) => state.layout.role)
  return {
    tableTitle: "Set Ad",
    deletePayload : [{id:"id",value_id : "",constant : ""},{id:"video_type",value_id : "",constant : "Series"}, {id:"all_delete",value_id : "",constant : "All"}, {id:"series",value_id : "series",constant : ""},{id:"episode",value_id : "episode",constant : ""}],
	disableDelete: role === "Advertiser" ?  true : false,
  onDeleteText: "Are you Sure?",
  deleteAccess: rights?.["Set Series Advertisement"]?.["delete"] == "true",
    onUpdateText: "Are you Sure?",
    tableHead: [
        {
            id: "episode",
            label: "Episode",
            subText: "series",
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
      

          role !== "Advertiser"&& {
    id: 'edit',
    label: 'Update',
    access: rights?.["Set Series Advertisement"]?.["edit"] == "true",
    ErrorMsg:"You cannot change the details once it has been approved."
  }
 
        
    ].filter(e => e),
    tableBody: [

    ],
    filterColumn: [
      {
        id: "1",
        title: "Series",
        name: "series",
        options: ["Series 1", "Series 2", "Series 3"],
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