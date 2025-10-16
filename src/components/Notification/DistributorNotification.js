import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTable from "../utils/Table";
import { useLocation, useNavigate } from "react-router-dom";
import * as Action from "../../actions/notification";
import { all_category_list } from "../../actions/Masters/category";
import Export from "../utils/Export";
import { bindActionCreators } from "redux";
import EnlargedView from "../utils/EnlargedView";

const DistributorNotification = () => {
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const role = useSelector((state) => state.layout.role);
  const rights = useSelector((state) => state.layout.rights);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [save, setSave] = useState(false);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const handleOpen = () => setOpen(true);
    const ReadNotification  = (id) =>{
      console.log(id ,"sdsadsadsadeeee")
  }
  const [tableData, setTableData] = useState({
    tableTitle: "Notification",
    openModal: handleOpen,
    // deleteRecord: Action.subcategory_delete,
       readNotification :Action.notification_read_status_update,
    disableDelete: true,
    tableHead: [
            {
        id: "image",
        label: "Image",
        isImage: true,
      },
      {
        id: "notification_title1",
        label: "Title",
      },
      {
        id: "created_at",
        label: "Date",
        isDate : true
      },

      // {
      //   id: "user_type",
      //   label: "User Type",
      // },
      {
        id: "description",
        label: "Description",
        isModal: true,
        readNotification : true,
        n_id:"noti_id",
        default: (
          <>
            <button
              style={{
                padding: "5px 15px",
                color: "rgb(238, 127, 37)",
                background: "transparent",
                border: "1px solid rgb(238, 127, 37)",
                borderRadius: "5px",
              }}
                 onClick={()=>ReadNotification("noti_id")}
            >
              VIEW
            </button>
          </>
        ),
      },
      

        // default: (
        //   <>
        //     <button
        //       style={{
        //         padding: "5px 15px",
        //         color: "rgb(238, 127, 37)",
        //         background: "transparent",
        //         border: "1px solid rgb(238, 127, 37)",
        //         borderRadius: "5px",
        //       }}
        //     >
        //       VIEW
        //     </button>
        //   </>
        // ),
      
    ],
    tableBody: [],
    filterColumn: [],
  });
  const user = useSelector((state) => state.layout.profile);
  const notifications = useSelector(
    (state) => state?.merchandise?.notification_list_distributor
  );
    const notification_read = useSelector((state)=> state?.merchandise?.notification_read)
  console.log(notifications?.data ,"new Notification")
  // const categories = useSelector((state) => state.masters.categories);
  // const subcategories = useSelector((state) => state.masters.subcategories);
  // const genre = useSelector((state) => state.masters.genre);
  // const language = useSelector((state) => state.masters.languages);

  useEffect(() => {
    if (user?.id) {

      dispatch(Action.distributor_notification_list({distributor_id : user?.id}));
    }
  }, [user?.id, save]);
  useMemo(()=>{
    if(notification_read?.status === 200){
      setTimeout(() => {
        setSave(!save)
        dispatch(Action.distributor_unread_count({distributor_id : user?.id}))
      }, 1000);
    }
  },[notification_read])
  useMemo(() => {
    if (notifications?.data) {
      const temp = tableData;
      temp.tableBody = notifications?.data?.map((ele) => ({
        ...ele,
        description: (
          <>
            <div style={{ color: "var(--themeFontColor)" }} >
              {ele?.notification?.description}
            </div>
            <p style={{ color: "var(--themeFontColor)" }}>
              {temp?.tableHead?.default}
            </p>{" "}
          </>
        ),
        created_at : ele?.notification?.created_at ,
         noti_id : ele?.id,
        title : ele?.notification?.title ,
                notification_title1:  ele?.status !== "Unread" ? <p style={{color:"var(--themeFontColor)"}}>{ele?.notification?.title}</p> : <p style={{color:"var(--themeFontColor)" , fontWeight:"900"}}>{ele?.notification?.title}</p>,
      }));
      setTableData({ ...temp });
    }
  }, [notifications]);


  useEffect(() => {
    if (isModalOpen) {
      setForm({ ...form, receiver_type: "All" });
    }
  }, [isModalOpen]);


  return (
    <div>

      <EnlargedView open={open} setOpen={setOpen} content={content} />
      <ListTable
        tableData={tableData}
        key={"ListTable"}
        form={form}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
        view="view_all"
        create_new={"/Masters/SubCategory/EditSubCategory/"}
        setContent = {setContent }
      />
    </div>
  );
};

export default DistributorNotification;
