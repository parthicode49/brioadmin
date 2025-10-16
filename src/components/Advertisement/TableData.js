import { useSelector } from "react-redux";

export const TableData = () => {
  const rights = useSelector((state) => state.layout.rights);
  const role = useSelector((state) => state.layout.role);
  return {
    tableTitle: "Advertisement",
    // disableDelete: true,
    deleteAccess: "true",
    onUpdateText: "Are you Sure?",
    tableHead: [
      {
        id: "title",
        label: "Title",
        // subText:"distribution_name",
        // link:"/DistributorsFormData/DistributorsFormDetails/DistributorsFormDetails"
      },
    {
        id: "advertisement_plan",
        label: "Advertisement Plan",
        // subText:"company_name",

      },
      {
        id: "advertisement_photo",
        label: "Image",
        isImage: true,
      },
      // {
      //   id: "recharge_amount",
      //   label: "Amount",
      //   // subText:"category_type"
      // },
      // {
      //   id: "subscription_type",
      //   label: "subscription Type",
      //   // subText:"mobileNumber"
      // },
      // {
      //     id: "views_required",
      //     label: "Views" ,
      // },
      {
          id: "payment_status",
          label: "payment Status" ,
      },
      {
        id: "status",
        label: "Status",
        isButtonDisplay: true,
      },
    // {
    //     id: "notification_send",
    //     label: "Notification",
    //     isSpecial: true,
    //     align: "center",
    //   },
      {
        id: "edit",
        label: "Update",
        access:  "true",
        ErrorMsg: "You cannot change the details once it has been approved  .",
      },
    ].filter((e) => e),
    tableBody: [],
    filterColumn: [
      {
        id: "1",
        title: "Status",
        name: "status",
        options: ["Approved", "Rejected" , 	"Pending"],
      },
    ],
  };
};
