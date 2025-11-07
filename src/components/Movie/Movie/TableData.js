import { useSelector } from "react-redux";

export const TableData = (canEdit) => {
  const rights = useSelector((state) => state.layout.rights);
  const role = useSelector((state) => state.layout.role);
  return {
    tableTitle: role !== "Distributor" ? "Movies" : "Videos",
    onDeleteText: "Are you Sure?",
    deleteAccess: rights?.["Movie"]?.["delete"] == "true",
    onUpdateText: "Are you Sure?",
    tableHead: [
      {
        id: "thumbnail",
        label: "Image",
        isFirstImage: true,
      },
      {
        id: "title",
        label: "Name",
        // link: "/movie/moviedetail",
        color: "var(--gradientColor2)",
        // subText: "movie_subcategory"
      },

      {
        id: "category_name",
        label: "Category",
        subText: "sub_category_list",
      },
      ,
      {
        id: "ownership",
        label: "Ownership",
        subText: "distributor_name",
      },
      role !== "Distributor" && {
        id: "movie_access1",
        label: "Access",
        isSpecial: true,
        align: "left",
      },

      // {
      //   id:"released_status",
      //   label:"Release Date"
      // }
      // ,

      // {
      //   id: "language_name",
      //   label: "Language",
      // },
      // {
      //   id: "total_usage",
      //   label: "Total Usage",
      // },
      // {
      //   id: 'ott_platform',
      //   label: 'Ott name',
      // },
      // {
      //   id: 'content_advisory',
      //   label: 'Content Type',
      // },
      // role === "Distributor" &&    {
      //   id: 'rental_price',
      //   label: 'TVOD Amount',
      //   // isSpecial: true,
      // 	// align: "left"
      // },
      // ,
      {
        id: "sequence",
        label: "Sequence",
      },
      {
        id: "movie_view",
        label: "Views",
      },

      // {
      //   id: 'movieLikes',
      //   label: 'Likes',
      // },
      // ,
      // {
      //   id: 'dislikes',
      //   label: 'Dislikes',
      // },
      // {
      //   id: 'total_downloads',
      //   label: 'Downloads',
      // },

      // role != "Distributor" &&
      {
        id: "approval_status",
        label: "Approval Status",
        isButtonDisplay: true,
      },
      {
        id: "status",
        label: "Status",
        isButtonDisplay: !canEdit,
      },
      {
        id: "info",
        label: "View",
        isSpecial: true,
        align: "left",
      },
      canEdit && {
        id: "notification",
        label: "Notification",
        isSpecial: true,
        align: "center",
      },
      {
        id: "edit",
        label: "Update",
        access: rights?.["Distributor"]?.["edit"] == "true",
        isNewForm: true,
      },
    ].filter((e) => e),
    tableBody: [],
    filterColumn: [
      {
        id: "1",
        title: "Access Type",
        name: "content_access",
        options: ["FREE", "Rent", "SVOD"],
      },
      //  {
      //   id: "2",
      //   title: "Language",
      //   name: "movie_language",
      //   options: ["English", "Hindi", "Gujarati"],
      // },
      {
        id: "3",
        title: "Category",
        name: "category",
        options: ["Action", "Comedy", "Drama", "Horror"],
      },
      {
        id: "3",
        title: "Sub Category",
        name: "subcategory",
        options: ["Action", "Comedy", "Drama", "Horror"],
        displayOn: "category",
        dependentField: "category",
        requredField: "subcategory_name",
      },

      {
        id: "3",
        title: "Ownership",
        name: "ownership",
        options: ["In House", "Content Owner"],
      },
      // {
      //     id: "4",
      //     title: "Released Status",
      //     name: "released_status",
      //     options: ["Upcoming", "Released"],
      //   },
      // {
      //     id: "5",
      //     title: "Language",
      //     name: "movie_language",
      //     options: ["Upcoming", "Released"],
      //   },
      {
        id: "6",
        title: "Status",
        name: "status",
        options: ["Active", "Inactive"],
      },
    ],
  };
};
