import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTable from "../utils/Table";
import * as Action from "../../actions/advertisement_banner";
import Export from "../utils/Export";
import dayjs from "dayjs";
import { bindActionCreators } from "redux";
import { useAccessControl } from "../utils/useAccessControl";

const AdSliderBanner = () => {
  const { canEdit } = useAccessControl("Slider");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.layout.profile);
  const rights = useSelector((state) => state.layout.rights);
  const { advertisement_banner_create, advertisement_banner_update } =
    bindActionCreators(Action, dispatch);
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [save, setSave] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const sliderbanners = useSelector(
    (state) => state.merchandise.ad_slider_banners
  );
  const [tableData, setTableData] = useState({
    tableTitle: "Ad Slider Banner",
    deleteRecord: Action.advertisement_banner_delete,
    updateRecord: Action.advertisement_banner_status_update,
    deleteAccess: "true",
    customisedStatusUpdateMessage: true,
    onDeleteText: "Are you sure want to delete Ad Slider Banner?",
    onActiveText: "Are you Sure want to Activate Ad Slider Banner?",
    onInactiveText: "Are you Sure want to Inactivate Ad Slider Banner?",
    tableHead: [
      {
        id: "expired_on",
        label: "Expiring On",
        isSpecial: true,
        align: "left",
      },

      {
        id: "thumbnail",
        label: "Web View",
        isImage: true,
      },
      {
        id: "redirection_link",
        label: "Redirection Link",
      },

      {
        id: "status",
        label: "Status",
        // isButtonDisplay: true,
      },
      {
        id: "edit",
        label: "Update",
        access: rights?.["Slider Banner"]?.["edit"] == "true",
        isNewForm: true,
      },
    ],
    tableBody: [],
    filterColumn: [],
  });

  useEffect(() => {
    if (user?.id) {
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      dispatch(Action.advertisement_banner_list_admin(data));
    }
  }, [user?.id, save]);
  useMemo(() => {
    if (sliderbanners?.data) {
      const temp = tableData;
      const status = (expire_date, status) => {
        const today = dayjs().startOf("day");
        const expDate = dayjs(expire_date).startOf("day");

        if (expDate.isBefore(today)) {
          return "Expired";
        } else if (expDate.diff(today, "day") <= 3) {
          return "Expiring Soon";
        } else {
          return status;
        }
      };
      temp.tableBody = sliderbanners?.data?.map((ele) => ({
        ...ele,
        status: status(ele.expire_date, ele?.status),
        expired_on:
          new Date(ele?.expire_date) > new Date() ? (
            <p style={{ color: "var(--themeFontColor)" }}>
              {dayjs(ele?.expire_date).format("DD-MM-YYYY")}
            </p>
          ) : (
            <p style={{ color: "red" }}>Expired</p>
          ),
      }));

      setTableData({ ...temp });
      setForm({ ...form, set_sequence: tableData.tableBody.length + 1 });
    }
  }, [sliderbanners]);

  const [formStructure, setFormStructure] = useState([
    {
      title: "Details",
      fields: [
        {
          type: "date",
          variant: "date",
          title: "Expire Date",
          min: new Date().toISOString().split("T")[0],
          name: "expire_date",
          default: new Date().toISOString().split("T")[0],
          required: true,
          placeholder: "Select Expire Date",
          // size: "3",
        },
        {
          type: "inputBox",
          name: "redirection_link",
          title: "Redirection Link",
          placeholder: "Paste link",
          // required: true,
        },
      ],
    },
    {
      title: "Media",
      fields: [
        {
          type: "image",
          name: "poster",
          title: "App View",
          description: "Image size",
          image_size: "1400 * 400 PX",
          accept: "image/*",
          size: 6,
          required: true,
        },
        {
          type: "image",
          name: "thumbnail",
          title: "Web View",
          description: "Image size",
          image_size: "1584 * 270 PX",
          accept: "image/*",
          size: 6,
          required: true,
        },
      ],
    },
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.keys(form)?.map((key) => data.append(key, form?.[key]));
    data.append("user", user?.id);

    if (isEdit) {
      const resData = await advertisement_banner_update(data);
      if (resData?.status === 200) {
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    } else {
      const resData = await advertisement_banner_create(data);
      if (resData?.status === 200) {
        // setForm({});
        setForm({});
        setSave(!save);
        setDrawer(false);
      } else {
        setForm(form);
      }
    }
  };
  return (
    <div>
      <ListTable
        tableData={tableData}
        key={"ListTable"}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
        view="view_all"
        save={save}
        setSave={setSave}
        isDrawerForm={true}
        openDrawer={drawer}
        setOpenDrawer={setDrawer}
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        form={form}
        canEdit={canEdit}
        isEdit={isEdit}
        formTitle={isEdit ? "Edit Ad Slider" : "Add Ad Slider"}
        exportButton={
          <Export
            fileName={"Slider"}
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

export default AdSliderBanner;
