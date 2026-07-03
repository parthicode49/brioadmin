import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTable from "../../utils/Table";
import { useLocation, useNavigate } from "react-router-dom";
import ViewChangeForm from "../../utils/ViewChangeForm";
import { all_genre_list, genre_delete, genre_update } from "../../../actions/Masters/genre";
import Export from "../../utils/Export";


const Language= () => {
    const navigate = useNavigate()
  const role = useSelector((state) => state.layout.role);
  const rights = useSelector((state) => state.layout.rights);
  
  const [tableData, setTableData] = useState({
    tableTitle: "Genre",
    deleteRecord: genre_delete,
    updateRecord: genre_update,
    deleteAccess: rights?.["Masters"]?.["delete"] == "true",
    onDeleteText: "Are you sure want to delete?",
    onUpdateText: "Are you Sure?",
    tableHead: [
      {
        id: "genre_title",
        numeric: false,
        disablePadding: true,
        label: "Genre",
      },
      {
        id: "genre_image",
        label: "Image",
        isImage: true,
      },

      {
        id: "edit",
        label: "Update",
        access: rights?.["Masters"]?.["edit"] == "true",
      },
    ],
    tableBody: [
      
    ],
    // isDateRangeFilter: "created_at",
  });
  const user = useSelector((state) => state.layout.profile);

  const genre = useSelector((state) => state.masters.genre);
  // const categories = useSelector((state) => state.masters.categories);
  // const subcategories = useSelector((state) => state.masters.subcategories);
  // const genre = useSelector((state) => state.masters.genre);
  // const language = useSelector((state) => state.masters.languages);
  const [form, setForm] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation()
  console.log(location,"locationns")
  useEffect(() => {
    if (user?.id) {
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      //  if(movies?.statuscode!=200)
      dispatch(all_genre_list(data));
    }
  }, [user?.id]);
  useEffect(()=>{
    if(location?.state?.formUpload){
      const data = new FormData();
      data.append("id", user?.id);
      data.append("user", user?.id);
      //  if(movies?.statuscode!=200)
      dispatch(all_genre_list(data));
      navigate(location.pathname, { replace: true, state: null });

    }
  },[location])
  useMemo(() => {
    if (genre?.statuscode == 200) {
      const temp = tableData;
      temp.tableBody = genre?.data;
      setTableData({ ...temp });
    }
  }, [genre]);

  return (
    <div>
        {/* <div style={{textAlign:"right"}}>
         <Button
          startIcon={<AddIcon sx={{ color: '#fff !important' }} />}
          variant="contained"
          color="success"
          sx={{
            textTransform: 'capitalize',
            borderRadius: '10px',
            mt: '10px',
            p: '10px 30px',
            fontSize: '14px',
            color: '#fff !important',
          }}
          style={{ background: "linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)" }}
          className="mr-10px"
          onClick={() => navigate("/movie_testing/create_movie_testing/" )}
        >
          Add
        </Button>
        </div> */}
        <ViewChangeForm
        create_new = {"/Masters/Genre/CreateGenre/"}
        access = {true}
        view = "create_new"
        export_excel={
          <Export
          fileName={"Genre"}
          isClubed={true}
          access={"true"}
          exportData={tableData?.exportData || tableData?.tableBody}
          headings={tableData.tableHead?.map((value) => value.label)}
          // api = {"export_episode_list"}
          // api_data = {episodes?.filter_condition}
          />
        }
        />

      <ListTable
        tableData={tableData}
        key={"ListTable"}
        setForm={setForm}
        setTableData={setTableData}
        setIsEdit={setIsEdit}
        view = "view_all"
        create_new = {"/Masters/Genre/EditGenre/"}
      />
    </div>
  );
};

export default Language;
