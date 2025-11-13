import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "./../../images/trash.png";
import { visuallyHidden } from "@mui/utils";
import Card from "@mui/material/Card";
import EditTwoToneIcon from "./../../images/edit.png";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE } from "../../api";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import EnlargedView from "./EnlargedView";
import "rsuite/dist/rsuite.css";
import Grid from "@mui/material/Grid";
import { DateRangePicker } from "rsuite";
import Autocomplete from "@mui/material/Autocomplete";
import Popup from "./Popup";
import empty from "./../../images/empty.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import DynamicFormModal from "./NewFormStructure/DynamicFormModal";
import AddIcon from "@mui/icons-material/Add";
import NewForm from "./NewFormStructure/NewForm";
import notification_icon from "./../../images/notification_icon.png";
import LockIcon from "@mui/icons-material/Lock";
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    disableDelete,
    canEdit,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead
      sx={{
        background:
          "linear-gradient(225deg,  var(--gradientColorLighter1) 0%, var(--gradientColorLighter2) 91.25%)",
      }}
    >
      <TableRow>
        {disableDelete && canEdit && (
          <TableCell
            padding="checkbox"
            sx={{
              borderBottom: "1px solid  rgb(97 97 97)",
              fontSize: "13.5px",
              padding: "10px 10px",
            }}
          >
            {/* <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            /> */}
          </TableCell>
        )}
        {headCells.map((headCell) => (
          <TableCell
            sx={{
              borderBottom: "1px solid rgb(97 97 97)",
              fontSize: "13.5px",
              padding: headCell?.padding || "10px 8px",
              fontWeight: 600,
            }}
            key={headCell.id}
            align={headCell.isImage ? "center" : headCell?.align || "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.isImage || headCell.id == "edit" ? (
              <p style={{ color: "var(--tableHeadFontColor)" }}>
                {headCell.label}
              </p>
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                <p style={{ color: "var(--tableHeadFontColor)" }}>
                  {headCell.label}
                </p>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headCells: PropTypes.array.isRequired,
  disableDelete: PropTypes.bool.isRequired,
  canEdit: PropTypes.bool.isRequired,
};

function EnhancedTableToolbar(props) {
  const role = useSelector((state) => state.layout.role);
  const dispatch = useDispatch();
  const darkMode = JSON.parse(sessionStorage.getItem("darkMode"));

  const {
    numSelected,
    title,
    deleteRows,
    column_sum,
    setSearch,
    search,
    setFilter,
    filter,
    filterColumn,
    isDateRangeFilter,
    dateRange,
    setDateRange,
    person_name,
    isMultiNotificationSend,
    setSelected,
    selected,
    sendMultiNotification,
    addButton,
    exportButton,
    notShowDelete,
    resetButton,
    searchApi,
    isLoadingData,
    isPopUpNewTable,
    tableData,
    isModalOpen,
    setForm,
    setIsEdit,
    setIsModalOpen,
    formStructure,
    onSubmit,
    form,
    initialData,
  } = props;
  console.log(isMultiNotificationSend, "Dfsdfsdfsdf");
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
      className="ss-table-toolbar"
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="var(--themeFontColor)"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          // sx={{ flex: "1 1 40%" }}
          style={{ width: "max-content", whiteSpace: "nowrap" }}
          variant="p"
          color="var(--themeFontColor)"
          // color="white"

          fontSize={20}
          id="tableTitle"
          component="div"
          fontWeight={600}
        >
          <span style={{ color: "var(--themeFontColor)" }}>{title}</span>
          <Typography
            style={{ width: "max-content", whiteSpace: "nowrap" }}
            variant="p"
            color="var(--themeFontColor)"
            fontSize={16}
            id="amount"
            component="div"
            fontWeight={600}
          >
            <p>{person_name}</p>
          </Typography>
          <Typography
            style={{ width: "max-content", whiteSpace: "nowrap" }}
            variant="p"
            color="var(--themeFontColor)"
            fontSize={16}
            id="amount"
            component="div"
            fontWeight={600}
          >
            <p>{column_sum}</p>
          </Typography>
        </Typography>
      )}

      {numSelected > 0 ? (
        isMultiNotificationSend && numSelected > 1 ? (
          <>
            <Tooltip
              title="Notification"
              onClick={() => sendMultiNotification(selected, setSelected)}
            >
              <IconButton>
                <img src={notification_icon} height={"20px"} />
                {/* <DeleteIcon /> */}
              </IconButton>
            </Tooltip>

            {!notShowDelete && (
              <Tooltip title="Delete" onClick={() => deleteRows()}>
                <IconButton>
                  <img src={DeleteIcon} height={"20px"} />
                  {/* <DeleteIcon /> */}
                </IconButton>
              </Tooltip>
            )}
          </>
        ) : (
          !notShowDelete && (
            <Tooltip title="Delete" onClick={() => deleteRows()}>
              <IconButton>
                <img src={DeleteIcon} height={"20px"} />
                {/* <DeleteIcon /> */}
              </IconButton>
            </Tooltip>
          )
        )
      ) : (
        <Grid
          container
          justifyContent="flex-end"
          alignItems={"center"}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 2 }}
        >
          {isDateRangeFilter && (
            <Grid
              item
              xs={10}
              sm={4}
              md={3}
              lg={
                filterColumn?.length >= 2
                  ? (filterColumn?.length > 5 ? 12 : 10) /
                    (filterColumn?.length + (isDateRangeFilter ? 2 : 1))
                  : 2
              }
              key={"dateRange"}
            >
              <FormControl fullWidth>
                {/* <div className="calendar-bg"> */}
                <DateRangePicker
                  size="md"
                  placeholder={"Date range"}
                  ranges={[]}
                  name={"value.name"}
                  value={dateRange || []}
                  format="dd-MM-yyyy"
                  style={{
                    // borderRadius: "2px !important",
                    backgroundColor: "var(--themeColorLighterShade) !important",
                  }}
                  inputStyle={{
                    WebkitBoxShadow: darkMode
                      ? "0 0 0 100px rgb(22, 22, 22) inset !important"
                      : "0 0 0 100px rgb(255, 255, 255) inset !important",
                    WebkitTextFillColor: "var(--themeFontColor) !important",
                  }}
                  // className="custom-date-picker"
                  onChange={(range) => {
                    setDateRange(range);
                  }}
                  defaultCalendarValue={[new Date(), new Date()]}
                />
                {/* </div> */}
              </FormControl>
            </Grid>
          )}

          {filterColumn?.map((value, index) =>
            value?.displayOn ? (
              filter?.[value?.displayOn] && (
                <Grid
                  item
                  xs={10}
                  sm={4}
                  md={3}
                  lg={
                    filterColumn?.length >= 2
                      ? (filterColumn?.length > 5 ? 12 : 10) /
                        (filterColumn?.length + (isDateRangeFilter ? 2 : 1))
                      : 2
                  }
                  key={index + "filter"}
                >
                  <FormControl fullWidth size="small">
                    <Autocomplete
                      disablePortal
                      id="demo-simple-select-label"
                      options={
                        value?.dependentField2
                          ? value.options
                              .map(
                                (subcategory) =>
                                  subcategory?.[value?.dependentField]?.[
                                    value?.dependentField2
                                  ] == filter?.[value?.displayOn] &&
                                  subcategory?.[value?.requredField]
                              )
                              .filter((e) => e)
                          : value.options
                              .map(
                                (subcategory) =>
                                  subcategory?.[value?.dependentField] ==
                                    filter?.[value?.displayOn] &&
                                  subcategory?.[value?.requredField]
                              )
                              .filter((e) => e)
                      }
                      name={value.name}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      // size="small"
                      value={filter?.[value.name] || ""}
                      onChange={(event, newValue) => {
                        setFilter({
                          ...filter,
                          [value.name]: newValue?.value || newValue,
                        });
                      }}
                      defaultValue=""
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={value.title}
                          size="small"
                          InputProps={{
                            ...params.InputProps,
                            sx: {
                              borderRadius: 2,
                              backgroundColor: "var(--themeColorLighterShade)",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor:
                                  "var(--themeColorLighterShade)  !important",
                              },
                            },
                          }}
                          inputProps={{
                            ...params.inputProps,
                            style: {
                              paddingLeft: "10px", // Placeholder padding
                              color: darkMode ? "#ffffff" : "#151515",
                              // color: form?.[value.name]
                              //   ? "#151515"
                              //   : "rgba(21, 21, 21, 1)", // Light grey placeholder color
                            },
                          }}
                          sx={{
                            "& .MuiInputBase-root": {
                              color: darkMode ? "#ffffff" : "#151515",
                            },
                          }}
                        />
                      )}
                      PaperComponent={({ children }) => (
                        <div
                          style={{
                            backgroundColor: darkMode
                              ? "rgba(100, 206, 70, 0.2)"
                              : "rgba(100, 206, 70, 0.1)",
                            color: darkMode ? "#ffffff" : "#151515",
                            "&:hover": {
                              backgroundColor: darkMode ? "#333333" : "#f0f0f7",
                            },
                          }}
                        >
                          <Paper
                            sx={{
                              backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
                              color: darkMode ? "#ffffff" : "#151515",
                              "& .MuiAutocomplete-option": {
                                "&:hover": {
                                  backgroundColor: darkMode
                                    ? "#333333"
                                    : "#f5f5fa",
                                },
                                '&[aria-selected="true"]': {
                                  backgroundColor: darkMode
                                    ? "rgba(100, 206, 70, 0.2)"
                                    : "rgba(100, 206, 70, 0.1)",
                                },
                                '&[aria-selected="true"].Mui-focused': {
                                  backgroundColor: darkMode
                                    ? "rgba(100, 206, 70, 0.3)"
                                    : "rgba(100, 206, 70, 0.2)",
                                },
                              },
                            }}
                          >
                            {children}
                          </Paper>
                        </div>
                      )}
                    />
                  </FormControl>
                </Grid>
              )
            ) : (
              <Grid
                item
                xs={10}
                sm={4}
                md={3}
                lg={
                  filterColumn?.length >= 2
                    ? (filterColumn?.length > 5 ? 12 : 10) /
                      (filterColumn?.length + (isDateRangeFilter ? 2 : 1))
                    : 2
                }
                key={index + "filter"}
              >
                <FormControl fullWidth size="small">
                  <Autocomplete
                    disablePortal
                    id="demo-simple-select-label"
                    options={value.options}
                    name={value.name}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    size="small"
                    value={filter?.[value.name] || ""}
                    onChange={(event, newValue) => {
                      setFilter({
                        ...filter,
                        [value.name]: newValue?.value || newValue,
                      });
                    }}
                    defaultValue=""
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={value.title}
                        InputProps={{
                          ...params.InputProps,
                          sx: {
                            borderRadius: 2,
                            backgroundColor: "var(--themeColorLighterShade)",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor:
                                "var(--themeColorLighterShade)  !important",
                            },
                          },
                        }}
                        inputProps={{
                          ...params.inputProps,
                          style: {
                            paddingLeft: "10px", // Placeholder padding
                            color: darkMode ? "#ffffff" : "#151515",
                            // color: form?.[value.name]
                            //   ? "#151515"
                            //   : "rgba(21, 21, 21, 1)", // Light grey placeholder color
                          },
                        }}
                        sx={{
                          "& .MuiInputBase-root": {
                            color: darkMode ? "#ffffff" : "#151515",
                          },
                        }}
                        size="small"
                      />
                    )}
                    PaperComponent={({ children }) => (
                      <div
                        style={{
                          backgroundColor: darkMode
                            ? "rgba(100, 206, 70, 0.2)"
                            : "rgba(100, 206, 70, 0.1)",
                          color: darkMode ? "#ffffff" : "#151515",
                          "&:hover": {
                            backgroundColor: darkMode ? "#333333" : "#f0f0f7",
                          },
                        }}
                      >
                        <Paper
                          sx={{
                            backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
                            color: darkMode ? "#ffffff" : "#151515",
                            "& .MuiAutocomplete-option": {
                              "&:hover": {
                                backgroundColor: darkMode
                                  ? "#333333"
                                  : "#f5f5fa",
                              },
                              '&[aria-selected="true"]': {
                                backgroundColor: darkMode
                                  ? "rgba(100, 206, 70, 0.2)"
                                  : "rgba(100, 206, 70, 0.1)",
                              },
                              '&[aria-selected="true"].Mui-focused': {
                                backgroundColor: darkMode
                                  ? "rgba(100, 206, 70, 0.3)"
                                  : "rgba(100, 206, 70, 0.2)",
                              },
                            },
                          }}
                        >
                          {children}
                        </Paper>
                      </div>
                    )}
                  />
                </FormControl>
              </Grid>
            )
          )}

          <Grid
            item
            xs={10}
            sm={4}
            md={3}
            lg={
              filterColumn?.length >= 2
                ? (filterColumn?.length > 5 ? 12 : 10) /
                  (filterColumn?.length + (isDateRangeFilter ? 2 : 1))
                : 3
            }
            key={"Search"}
          >
            <TextField
              id="search-bar"
              className="text"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              label="Search"
              variant="outlined"
              placeholder="Search..."
              size="small"
              value={search}
              InputProps={{
                // endAdornment : (
                //   <InputAdornment color ='red'></InputAdornment>
                // ),

                sx: {
                  borderRadius: 2,
                  backgroundColor: "var(--themeColorLighterShade)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--themeColorLighterShade)  !important",
                  },
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: darkMode
                      ? "0 0 0 100px rgb(22, 22, 22) inset"
                      : "0 0 0 100px rgb(255, 255, 255) inset", // Red background for autofill
                    WebkitTextFillColor: "var(--themeFontColor)", // Text color for autofilled content
                  },
                },
                inputProps: {
                  style: {
                    color: "var(--themeFontColor)", // Placeholder color to light grey
                    paddingLeft: "10px", // Left padding for the placeholder
                  },
                },
              }}
              sx={{
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: darkMode
                    ? "0 0 0 100px rgb(22, 22, 22) inset"
                    : "0 0 0 100px rgb(255, 255, 255) inset", // Red background for autofill
                  WebkitTextFillColor: "var(--themeFontColor)", // Text color for autofilled content
                },
              }}
            />
          </Grid>
          {addButton && <Grid item>{addButton}</Grid>}

          {resetButton && <Grid item>{resetButton}</Grid>}
        </Grid>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  deleteRows: PropTypes.func.isRequired,
  column_sum: PropTypes.string,
  setSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  filterColumn: PropTypes.array.isRequired,
  person_name: PropTypes.object,
  isDateRangeFilter: PropTypes.string,
  setDateRange: PropTypes.func,
  dateRange: PropTypes.object,
  addButton: PropTypes.object,
  exportButton: PropTypes.object,
  resetButton: PropTypes.object,
};

export default function ListTable({
  setTableData,
  tableData,
  setForm,
  setIsEdit,
  setContent,
  addButton,
  exportButton,
  setIsModalOpen,
  formStructure,
  isModalOpen,
  onSubmit,
  notShowDelete,
  loadApi,
  form,
  resetButton,
  isLoadingData,
  callApi,
  setCallApi,
  isPopUpNewTable,
  isConfirmBtn,
  save,
  setSave,
  totalCount,
  hideAddBtn,
  canEdit,
  create_new,
  initialData,
  total_transaction_amount,
  formTitle,
  handleConfirmSubmit,
  searchApi,
  isDrawerForm,
  openDrawer,
  setOpenDrawer,
  isEdit,
  handleSubmit,
  sendMultiNotification,
  isMultiNotificationSend,
  isCountry,
  setUsedCountries,
}) {
  console.log(canEdit, "canEdit4444");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.layout.profile);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const darkMode = JSON.parse(sessionStorage.getItem("darkMode"));
  const [rowsPerPage, setRowsPerPage] = React.useState(
    tableData?.rowsPerPage || 10
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event, rows) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => !n.edit && n.id).filter((e) => e);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  console.log(selected, "Sdadasdsadsadsada");
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(newPage, "check124");
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    console.log(
      parseInt(event.target.value, 10),
      event.target.value,
      "check1245"
    );
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - tableData.tableBody.length)
      : 0;

  //Delete row/rows
  const [openAccess, setOpenAccess] = useState(false);
  const [contentAccess, setContentAccess] = useState();
  const [open, setOpen] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [content, setPopupContent] = useState("");
  const [result, setResult] = useState(undefined);
  const deleteRows = () => {
    // if (tableData.deleteAccess) {
    setOpen(true);
    setPopupType("Delete");
    setPopupContent(tableData.onDeleteText);
  };

  const [changeRow, setChangeRow] = useState({});
  const [changeValue, setChangeValue] = useState({});
  const updateStatus = (row, value) => {
    console.log(
      row,
      row?.status !== "Expiring Soon",
      row?.status !== "Expired",
      "newjdfifsdiosdfds"
    );
    if (row?.status !== "Expiring Soon" && row?.status !== "Expired") {
      setOpen(true);
      setPopupType("Update");
      setPopupContent(
        tableData?.customisedStatusUpdateMessage
          ? row?.status?.toLowerCase() == "inactive"
            ? tableData?.onActiveText
            : tableData?.onInactiveText
          : tableData.onUpdateText
      );
      setChangeRow({ ...row });
      setChangeValue({ ...value });
    }
  };
  useEffect(() => {
    if (popupType == "Delete") {
      if (result) {
        const tempTableData = tableData;
        const tempTableBody = [];

        tempTableData.tableBody.map((value) => {
          if (selected.includes(value.id)) {
            if (tableData?.deletePayload) {
              const dataDisplay = async () =>{

                var temp = {};
                tableData?.deletePayload?.map(
                  (ele) => (temp[ele?.id] = value[ele?.value_id] || ele?.constant)
                );
                await dispatch(tableData.deleteRecord(temp));
                setTimeout(() => {
                  setSave(!save);
                }, 1000);
              }
              dataDisplay()
            } else {
              const dataDisplay = async () =>{

                const data = new FormData();
                data.append("user", user?.id);
                data.append("id", value.id);
                await dispatch(tableData.deleteRecord({ id: value?.id }));
                setTimeout(() => {
                  setSave(!save);
                }, 1000);
              }
              dataDisplay()
            }
          } else tempTableBody.push(value);
        });
        tempTableData.tableBody = tempTableBody;
        setSelected([]);
        setTableData({ ...tempTableData });
      } else {
        setSelected([]);
      }
    } else if (popupType == "Update") {
      if (result) {
        const data = new FormData();
        data.append("user", user?.id);
        const temp = tableData;
        if (
          changeRow[changeValue.id] == (changeValue.keywords?.[0] || "Active")
        ) {
          Object.keys(changeRow).map((key) =>
            key == "status"
              ? data.append(key, changeValue.keywords?.[1] || "Inactive")
              : data.append(key, changeRow?.[key])
          );

          temp.tableBody.map(
            (tempValue, index) =>
              tempValue.id == changeRow.id &&
              (temp.tableBody[index]["status"] =
                changeValue.keywords?.[1] || "Inactive")
          );

          dispatch(tableData.updateRecord(data));
          setSave(!save);
        } else {
          Object.keys(changeRow).map((key) =>
            key == "status"
              ? data.append(key, changeValue.keywords?.[0] || "Active")
              : data.append(key, changeRow?.[key])
          );
          temp.tableBody.map(
            (tempValue, index) =>
              tempValue.id == changeRow.id &&
              (temp.tableBody[index]["status"] =
                changeValue.keywords?.[0] || "Active")
          );
          dispatch(tableData.updateRecord(data));
          setSave(!save);
        }

        setTableData({ ...temp });
        setChangeRow({});
        setChangeValue({});
      }
    }
    setResult(undefined);
  }, [result]);

  //Search
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({});

  const [dateRange, setDateRange] = useState();
  const [results, setResults] = useState([...tableData.tableBody]);
  useMemo(() => {
    // setTableData({ ...tableData, exportData: [...tableData.tableBody] });
    setResults([...tableData.tableBody]);
  }, [tableData.tableBody]);
  const formatDateToDDMMYYYY = (inputDate) => {
    const date = new Date(inputDate);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const day = String(date.getDate()).padStart(2, "0"); // e.g., "01"
    const month = String(date.getMonth() + 1).padStart(2, "0"); // e.g., "09"
    const year = date.getFullYear(); // e.g., "2025"

    return `${day}-${month}-${year}`;
  };

  useMemo(() => {
    if (!isLoadingData) {
      if (search || dateRange || Object.keys(filter).length !== 0) {
        const dateFilteredArray = tableData.tableBody.filter((item) => {
          let date = new Date(item?.[tableData.isDateRangeFilter]);
          if (dateRange && !(dateRange[0] < date && date < dateRange[1])) {
            return false;
          }

          return true;
        });

        const filteredArray = dateFilteredArray.filter((item) => {
          for (let i = 0; i < tableData?.filterColumn?.length || 0; i++) {
            let name = tableData?.filterColumn[i]?.name;
            if (
              filter?.[name] != undefined &&
              // !String(item?.[name]).includes(filter?.[name])
              String(item?.[name]) !== filter?.[name]
            ) {
              return false;
            }
          }
          return true;
        });

        const temp = filteredArray.filter((item) => {
          let found = false;
          Object.entries(item).map(([key, value]) => {
            if (String(value).toLowerCase().includes(search.toLowerCase())) {
              found = true;
            }
          });
          return found;
        });
        console.log("filter", filter, dateRange);

        setResults([...temp]);
        setTableData({ ...tableData, exportData: [...temp] });
      } else {
        setTableData({ ...tableData });
      }
    }
  }, [search, filter, dateRange, isLoadingData, save]);
  useEffect(() => {
    const tempFilter = filter;

    tableData?.filterColumn?.map((value) => {
      if (value?.default != undefined) {
        tempFilter[value?.name] = value?.default;
      }
    });
    setTimeout(() => {
      setFilter({ ...tempFilter });
    }, 900);
  }, [tableData?.filterColumn]);
  useEffect(() => {
    if (isLoadingData) {
      // Check if dateRange is a valid array with at least two date values
      let formattedData = {};
      if (Array.isArray(dateRange) && dateRange.length >= 2) {
        formattedData = {
          start_date: new Date(dateRange[0]).toISOString().split("T")[0],
          end_date: new Date(dateRange[1]).toISOString().split("T")[0],
        };
      }

      // Dispatch API call or perform other actions
      console.log("checkNewParth", {
        ...filter,
        ...formattedData,
        page_number: page + 1,
        row_size: rowsPerPage,
        search_key: search,
      });

      // Example dispatch call (uncomment if needed)
      dispatch(
        loadApi({
          ...filter,
          ...formattedData,
          page_number: page + 1,
          row_size: rowsPerPage,
          search_key: search,
        })
      );
    }
  }, [isLoadingData, page, rowsPerPage, search, filter, save, dateRange]);
  useEffect(() => {
    if (isLoadingData && callApi) {
      // Check if dateRange is a valid array with at least two date values
      let formattedData = {};
      if (Array.isArray(dateRange) && dateRange.length >= 2) {
        formattedData = {
          start_date: new Date(dateRange[0]).toISOString().split("T")[0],
          end_date: new Date(dateRange[1]).toISOString().split("T")[0],
        };
      }

      // Dispatch API call or perform other actions
      console.log("checkNewParth", {
        ...filter,
        ...formattedData,
        page_number: page + 1,
        row_size: rowsPerPage,
        search_key: search,
      });

      // Example dispatch call (uncomment if needed)
      dispatch(
        loadApi({
          ...filter,
          ...formattedData,
          page_number: page + 1,
          row_size: rowsPerPage,
          search_key: search,
        })
      );
      setCallApi(false);
    }
  }, [callApi, save]);
  useMemo(() => {
    if (search || filter || dateRange) {
      setPage(0);
      setRowsPerPage(10);
    }
  }, [search, filter, dateRange]);

  useMemo(() => {
    if (selected.length != 0) {
      const tempTableData = tableData;
      const tempTableBody = [];

      tempTableData.tableBody.map(
        (value) => selected.includes(value.id) && tempTableBody.push(value)
      );

      setTableData({ ...tableData, exportData: [...tempTableBody] });
    } else if (tableData?.exportData) {
      setTableData({ ...tableData, exportData: tableData.tableBody });
    }
  }, [selected]);
  console.log(
    !tableData.disableDelete && canEdit,
    !tableData.disableDelete,
    canEdit,
    "sdsadasdasdas"
  );

  return (
    <>
      <EnlargedView
        open={openAccess}
        setOpen={setOpenAccess}
        content={contentAccess}
      />
      <Popup
        open={open}
        setOpen={setOpen}
        content={content}
        setResult={setResult}
      />
      {isPopUpNewTable && (
        <>
          <div
            style={{
              width: "100%",
              textAlign: "right",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              gap: "10px",
              marginBottom: "1rem",
            }}
          >
            {!hideAddBtn && canEdit && (
              <Button
                variant="contained"
                style={{
                  background:
                    "linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)",
                }}
                sx={{
                  textTransform: "capitalize",
                  borderRadius: "10px",
                  // mt: "10px",
                  p: "10px 30px",
                  fontSize: "14px",
                  color: "#fff !important",
                }}
                onClick={() => {
                  // setEditingIndex(null);
                  setIsModalOpen(true);
                  setIsEdit(false);
                }}
              >
                <AddIcon sx={{ marginRight: "5px" }} /> Add
              </Button>
            )}
            {/* {exportButton && <Grid item>{exportButton}</Grid>} */}
          </div>
          <DynamicFormModal
            open={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setForm({});
              setIsEdit(false);
            }}
            formStructure={formStructure}
            onSubmit={onSubmit}
            formData={form}
            setFormData={setForm}
            title={formTitle}
            initialData={initialData}
            isEdit={isEdit}
          />
        </>
      )}
      {isDrawerForm && (
        <>
          {!hideAddBtn && canEdit && (
            <div
              style={{
                width: "100%",
                textAlign: "right",
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                gap: "10px",
                marginBottom: "1rem",
              }}
            >
              <Button
                variant="contained"
                style={{
                  background:
                    "linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)",
                }}
                sx={{
                  textTransform: "capitalize",
                  borderRadius: "10px",
                  // mt: "10px",
                  p: "10px 30px",
                  fontSize: "14px",
                  color: "#fff !important",
                }}
                onClick={() => {
                  // setEditingIndex(null);
                  setOpenDrawer(true);
                  setIsEdit(false);
                }}
              >
                <AddIcon sx={{ marginRight: "5px" }} /> Add
              </Button>
              {/* {exportButton && <Grid item>{exportButton}</Grid>} */}
            </div>
          )}
          <NewForm
            open={openDrawer}
            setOpen={setOpenDrawer}
            onClose={() => {
              setOpenDrawer(false);
              setForm({});
              setIsEdit(false);
            }}
            formStructure={formStructure}
            isConfirmBtn={isConfirmBtn}
            handleSubmit={handleSubmit}
            handleConfirmSubmit={handleConfirmSubmit}
            formData={form}
            setFormData={setForm}
            isCountry={isCountry}
            setIsEdit={setIsEdit}
            title={formTitle}
            isEdit={isEdit}
            setUsedCountries={setUsedCountries}
          />
        </>
      )}
      <Card
        sx={{
          boxShadow: "var(--themeShadow)",
          backgroundColor: "var(--themeColor)",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            title={
              tableData.tableTitle +
              " : " +
              (!isLoadingData ? results?.length : totalCount)
            }
            column_sum={
              !isLoadingData
                ? tableData?.column_sum &&
                  tableData?.column_sum?.title +
                    " : " +
                    "$ " +
                    results
                      ?.map((ele) => Number(ele?.[tableData?.column_sum?.name]))
                      .reduce((sum, i) => sum + i, 0)
                      .toFixed(2)
                : tableData?.column_sum &&
                  "Total Amount" +
                    " : " +
                    "$ " +
                    parseFloat(total_transaction_amount).toFixed(2)
            }
            person_name={
              tableData?.person_name &&
              tableData?.person_name?.title +
                " : " +
                tableData?.person_name?.name
            }
            deleteRows={deleteRows}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            filterColumn={tableData?.filterColumn || []}
            search={search}
            isMultiNotificationSend={isMultiNotificationSend}
            selected={selected}
            setSelected={setSelected}
            sendMultiNotification={sendMultiNotification}
            isDateRangeFilter={tableData?.isDateRangeFilter}
            dateRange={dateRange}
            isPopUpNewTable={isPopUpNewTable}
            tableData={tableData}
            isModalOpen={isModalOpen}
            notShowDelete={notShowDelete}
            setForm={setForm}
            setIsEdit={setIsEdit}
            setIsModalOpen={setIsModalOpen}
            formStructure={formStructure}
            onSubmit={onSubmit}
            form={form}
            initialData={initialData}
            // isPopUpNewTable ={isPopUpNewTable}
            setDateRange={setDateRange}
            addButton={addButton}
            exportButton={exportButton}
            resetButton={resetButton}
            isLoadingData={isLoadingData}
            searchApi={searchApi}
          />
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "none",
            }}
          >
            <Table
              // sx={{ minWidth: 950 }}
              aria-labelledby="tableTitle"
              className="dark-table sorting-selecting-table"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={(event) =>
                  handleSelectAllClick(event, results)
                }
                canEdit={canEdit}
                onRequestSort={handleRequestSort}
                rowCount={results?.length}
                headCells={tableData.tableHead}
                disableDelete={!tableData.disableDelete}
              />
              {results.length != 0 ? (
                <TableBody>
                  {isLoadingData
                    ? stableSort(results || [], getComparator(order, orderBy))
                        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const isItemSelected = isSelected(row.id);
                          const labelId = `enhanced-table-checkbox-${index}`;
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={index + "TableRow"}
                              selected={isItemSelected}
                              sx={{
                                backgroundColor:
                                  row?.color || "var(--themeColor)",
                              }}
                            >
                              {!tableData.disableDelete && canEdit && (
                                <TableCell
                                  padding="checkbox"
                                  key={row.id + "TableCell"}
                                  sx={{
                                    fontWeight: "500",
                                    borderBottom: "1px solid  rgb(97 97 97)",
                                    padding: "8px 10px",
                                    fontSize: "13px",
                                  }}
                                >
                                  <Checkbox
                                    sx={{
                                      color: row["edit"] && "grey !important",
                                    }}
                                    key={row.id + "Checkbox"}
                                    onClick={(event) =>
                                      !row["edit"] && handleClick(event, row.id)
                                    }
                                    checked={isItemSelected}
                                    inputProps={{
                                      "aria-labelledby": labelId,
                                    }}
                                  />
                                </TableCell>
                              )}
                              {!tableData.tableHead[0]?.isSpecial &&
                              tableData.tableHead[0]?.isFirstImage ? (
                                <TableCell
                                  sx={{
                                    borderBottom: "1px solid rgb(97 97 97)",
                                    padding:
                                      tableData.tableHead[0]?.padding ||
                                      "8px 8px",
                                    fontSize: "13px",
                                    width:
                                      tableData.tableHead[0]?.width || "auto",
                                    cursor:
                                      tableData.tableHead[0]?.isModal &&
                                      row[tableData.tableHead[0].id] &&
                                      "pointer",
                                  }}
                                  align="left"
                                  key={index}
                                  onClick={() => {
                                    if (
                                      tableData.tableHead[0]?.isModal &&
                                      row[tableData.tableHead[0].id]
                                    ) {
                                      setContent(
                                        <img
                                          src={
                                            IMAGE +
                                            row[tableData.tableHead[0].id]
                                          }
                                        />
                                      );
                                      tableData.openModal();
                                    }
                                  }}
                                >
                                  {row[tableData.tableHead[0].id] ? (
                                    tableData.tableHead[0]?.isModal ? (
                                      <img
                                        src="https://i.ibb.co/3RxybqZ/photo.png"
                                        height={"30px"}
                                      />
                                    ) : (
                                      <img
                                        src={
                                          IMAGE + row[tableData.tableHead[0].id]
                                        }
                                      />
                                    )
                                  ) : (
                                    <p
                                      style={{
                                        color: "var(--themeFontColor)",
                                      }}
                                    >
                                      _
                                    </p>
                                  )}
                                </TableCell>
                              ) : (
                                !tableData.tableHead[0]?.isSpecial && (
                                  <TableCell
                                    component="th"
                                    id={labelId}
                                    key={labelId}
                                    scope="row"
                                    sx={{
                                      borderBottom: "1px solid  rgb(97 97 97)",
                                      padding: "8px 10px",
                                      width:
                                        tableData.tableHead[0]?.width || "auto",
                                    }}
                                  >
                                    {/* <Link
                                    style={{ color: "inherit" }}
                                    to={tableData.tableHead[0].link}
                                    state={{ id: row.id, name: row.name }}
                                  > */}
                                    <p
                                      style={{
                                        color:
                                          tableData.tableHead[0].color ||
                                          "var(--themeFontColor)",
                                      }}
                                    >
                                      {row[tableData.tableHead[0].id]}
                                    </p>
                                    {tableData.tableHead[0]?.subText &&
                                      row[tableData.tableHead[0]?.subText] && (
                                        <span
                                          style={{
                                            color: "var(--themeFontColor)",
                                          }}
                                        >
                                          (
                                          {row[tableData.tableHead[0]?.subText]}
                                          )
                                        </span>
                                      )}
                                    {/* </Link> */}
                                  </TableCell>
                                )
                              )}
                              {tableData.tableHead.map((value, index) => {
                                if (value.isSpecial) {
                                  return (
                                    <TableCell
                                      sx={{
                                        borderBottom:
                                          "1px solid  rgb(97 97 97)",
                                        padding: "8px 10px",
                                        fontSize: "13px",
                                        width: value?.width || "auto",
                                      }}
                                      align={value?.align || "center"}
                                      key={index}
                                    >
                                      {row[value.id]}
                                    </TableCell>
                                  );
                                } else if (value.isDate) {
                                  return (
                                    <TableCell
                                      sx={{
                                        borderBottom:
                                          "1px solid  rgb(97 97 97)",
                                        padding: "8px 10px",
                                        fontSize: "13px",
                                        width: value?.width || "auto",
                                        color:
                                          "var(--themeFontColor) !important;",
                                        // textAlign : "center !important;"
                                      }}
                                      align={"left"}
                                      key={index}
                                    >
                                      {formatDateToDDMMYYYY(row[value.id])}
                                    </TableCell>
                                  );
                                } else if (value.isImage) {
                                  return (
                                    <TableCell
                                      sx={{
                                        borderBottom: "1px solid rgb(97 97 97)",
                                        padding: value?.padding || "8px 8px",
                                        fontSize: "13px",
                                        width: value?.width || "auto",
                                        cursor:
                                          value?.isModal &&
                                          row[value.id] &&
                                          "pointer",
                                      }}
                                      align="center"
                                      key={index}
                                      onClick={() => {
                                        if (value?.isModal && row[value.id]) {
                                          setContent(
                                            <img src={IMAGE + row[value.id]} />
                                          );
                                          tableData.openModal();
                                        }
                                      }}
                                    >
                                      {row[value.id] ? (
                                        value?.isModal ? (
                                          <img
                                            src="https://i.ibb.co/3RxybqZ/photo.png"
                                            height={"30px"}
                                          />
                                        ) : (
                                          <img src={IMAGE + row[value.id]} />
                                        )
                                      ) : (
                                        <p
                                          style={{
                                            color: "var(--themeFontColor)",
                                          }}
                                        >
                                          _
                                        </p>
                                      )}
                                    </TableCell>
                                  );
                                } else if (value.isButtonDisplay) {
                                  const test = row[value.id]?.trim();
                                  console.log(test, "newTestk");
                                  return (
                                    <TableCell
                                      sx={{
                                        borderBottom:
                                          "1px solid  rgb(97 97 97)",
                                        padding: "8px 10px",
                                        fontSize: "13px",
                                        width: value?.width || "auto",
                                      }}
                                      align="left"
                                      key={index}
                                    >
                                      <span
                                        style={{
                                          cursor: "pointer",
                                          fontWeight: "500",
                                        }}
                                        variant="contained"
                                        className={
                                          row[value.id]?.trim() + "Badge"
                                        }
                                      >
                                        {row[value.id]}
                                      </span>
                                    </TableCell>
                                  );
                                } else if (
                                  value.id == "sequence" &&
                                  value.isEditable
                                ) {
                                  return (
                                    <TableCell
                                      sx={{
                                        borderBottom:
                                          "1px solid  rgb(97 97 97)",
                                        padding: "8px 10px",
                                        fontSize: "13px",
                                        width: value?.width || "auto",
                                      }}
                                      align={value?.align || "center"}
                                      key={index}
                                    >
                                      <TextField
                                        type="number"
                                        value={row[value.id] || ""}
                                        onChange={(e) => {
                                          const newValue = e.target.value;
                                          // Update local state first for immediate UI feedback
                                          const updatedTableBody =
                                            tableData.tableBody.map((item) =>
                                              item.id === row.id
                                                ? {
                                                    ...item,
                                                    [value.id]: newValue,
                                                  }
                                                : item
                                            );
                                          setTableData({
                                            ...tableData,
                                            tableBody: updatedTableBody,
                                          });

                                          // Call API to update sequence
                                          dispatch(
                                            value.apiAction({
                                              id: row.id,
                                              sequence: newValue,
                                            })
                                          ).then(() => {
                                            // Optional: Refresh data after successful update
                                            setSave(!save);
                                          });
                                        }}
                                        inputProps={{
                                          style: {
                                            textAlign: "center",
                                            color: "var(--themeFontColor)",
                                            padding: "5px",
                                            width: "60px",
                                          },
                                          ...(navigator.userAgent.includes(
                                            "Firefox"
                                          )
                                            ? {}
                                            : {
                                                "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button":
                                                  {
                                                    WebkitAppearance: "none",
                                                    margin: 0,
                                                  },
                                              }),
                                        }}
                                        sx={{
                                          "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                              borderColor:
                                                "rgba(255, 255, 255, 0.23)",
                                            },
                                            "&:hover fieldset": {
                                              borderColor:
                                                "rgba(255, 255, 255, 0.5)",
                                            },
                                          },
                                          "& input[type=number]": {
                                            MozAppearance: "textfield",
                                          },
                                          "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                                            {
                                              WebkitAppearance: "none",
                                              margin: 0,
                                            },
                                        }}
                                      />
                                    </TableCell>
                                  );
                                } else if (value.id == "status") {
                                  return (
                                    <TableCell
                                      sx={{
                                        borderBottom:
                                          "1px solid  rgb(97 97 97)",
                                        padding: "8px 10px",
                                        fontSize: "13px",
                                      }}
                                      align="left"
                                      key={index}
                                    >
                                      <span
                                        style={{
                                          cursor: "pointer",
                                          fontWeight: "500",
                                        }}
                                        variant="contained"
                                        className={
                                          row[value.id]?.toLowerCase() ==
                                          (value.keywords?.[0]?.toLowerCase() ||
                                            "active" ||
                                            "approved")
                                            ? "successBadge"
                                            : "dangerBadge"
                                        }
                                        //  color={row[value.id]==(value.keywords?.[0]||"Create")?"success":row[value.id]==(value.keywords?.[1]||"Update")?"info":"error"}
                                        onClick={() => {
                                          if (
                                            row[value.id] !=
                                              value.nonEditableState &&
                                            !row["edit"] &&
                                            canEdit
                                          )
                                            updateStatus(
                                              {
                                                id: row?.id,
                                                status: row?.status,
                                              },
                                              value
                                            );
                                        }}
                                      >
                                        {row[value.id]}
                                      </span>
                                    </TableCell>
                                  );
                                } else if (value.id != "edit" && index != 0) {
                                  return (
                                    <TableCell
                                      sx={{
                                        borderBottom:
                                          "1px solid  rgb(97 97 97)",
                                        padding: value?.padding || "8px 8px",
                                        fontSize: "13px",
                                        width: value?.width || "auto",
                                        cursor: value?.isModal && "pointer",
                                      }}
                                      align={value?.align || "left"}
                                      key={index}
                                      onClick={() => {
                                        if (value?.isModal) {
                                          setContent(
                                            <p
                                              style={{
                                                color: "var(--themeFontColor)",
                                              }}
                                            >
                                              {row[value.id]}
                                              {/* {console.log(
                                            row[value.n_id],
                                            "newDispoe"
                                          )} */}
                                            </p>
                                          );
                                          tableData.openModal();
                                        }
                                        if (
                                          value?.readNotification &&
                                          value?.isModal
                                        ) {
                                          const data = new FormData();
                                          data.append("user", user?.id);
                                          data.append(
                                            "notification",
                                            row[value.n_id]
                                          );
                                          dispatch(
                                            tableData.readNotification(data)
                                          );
                                        }
                                      }}
                                    >
                                      <p
                                        style={{
                                          color: "var(--themeFontColor)",
                                        }}
                                      >
                                        {value?.isModal
                                          ? value?.default ||
                                            row[value.id].substring(0, 15) +
                                              "..."
                                          : typeof row[value.id] == "object"
                                          ? row[value.id]?.toString()
                                          : row[value.id]}
                                      </p>
                                      {row[value?.subText] && (
                                        <span
                                          style={{
                                            color: "var(--themeFontColor)",
                                          }}
                                        >
                                          ({row[value?.subText]})
                                        </span>
                                      )}
                                      {row[value?.subText1] && (
                                        <p
                                          style={{
                                            color: "var(--themeFontColor)",
                                          }}
                                        >
                                          {row[value?.subText1]}
                                        </p>
                                      )}
                                      {row[value?.subText2] && (
                                        <p
                                          style={{
                                            color: "var(--themeFontColor)",
                                          }}
                                        >
                                          {row[value?.subText2]}
                                        </p>
                                      )}
                                      {row[value?.subText3] && (
                                        <p
                                          style={{
                                            color: "var(--themeFontColor)",
                                          }}
                                        >
                                          {row[value?.subText3]}
                                        </p>
                                      )}
                                      {row[value?.subText4] && (
                                        <p
                                          style={{
                                            color: "var(--themeFontColor)",
                                          }}
                                        >
                                          {row[value?.subText4]}
                                        </p>
                                      )}
                                    </TableCell>
                                  );
                                } else if (value.id == "edit") {
                                  return (
                                    <TableCell
                                      sx={{
                                        borderBottom:
                                          "1px solid  rgb(97 97 97)",
                                        padding: "8px 10px",
                                        fontSize: "13px",
                                        width: value?.width || "auto",
                                      }}
                                      align="left"
                                      key={index}
                                    >
                                      <img
                                        src={EditTwoToneIcon}
                                        style={{
                                          cursor: "pointer",
                                          borderRadius: "0",
                                          verticalAlign: "baseline",
                                          height: "20px",
                                        }}
                                        // height={"20px"}
                                        onClick={() => {
                                          if (canEdit) {
                                            if (!row["edit"]) {
                                              const temp = { ...row };
                                              if (value?.isNewPopUpForm) {
                                                setIsModalOpen(true);
                                                setForm(row);
                                                setIsEdit(true);
                                              } else if (value?.isNewForm) {
                                                setOpenDrawer(true);
                                                setForm(row);
                                                setIsEdit(true);
                                              } else {
                                                Object.keys(temp).map(
                                                  (key) =>
                                                    temp[key]?.["$$typeof"] &&
                                                    delete temp[key]
                                                );
                                                // setForm({ ...row });
                                                // setIsEdit(true);

                                                location?.pathname !=
                                                  create_new &&
                                                  navigate(create_new, {
                                                    state: {
                                                      view: "create_new",
                                                      form: JSON.stringify({
                                                        ...temp,
                                                      }),
                                                      isEdit: true,
                                                    },
                                                  });
                                              }
                                            } else {
                                              setContentAccess(
                                                <p
                                                  style={{
                                                    color:
                                                      "var(--themeFontColor)",
                                                  }}
                                                >
                                                  {value.ErrorMsg ||
                                                    "You do not have permission to Edit data"}
                                                </p>
                                              );
                                              setOpenAccess(true);
                                            }
                                          } else {
                                            setContentAccess(
                                              <div
                                                style={{
                                                  textAlign: "center",
                                                  padding: "40px 30px",
                                                  maxWidth: "450px",
                                                  margin: "0 auto",
                                                  borderRadius: "8px",
                                                }}
                                              >
                                                <LockIcon
                                                  style={{
                                                    fontSize: "80px",
                                                    color: "#ff6b6b",
                                                    marginBottom: "20px",
                                                  }}
                                                />
                                                <h2
                                                  style={{
                                                    marginBottom: "15px",
                                                    color: "#333",
                                                    fontSize: "24px",
                                                    fontWeight: "600",
                                                  }}
                                                >
                                                  Access Denied
                                                </h2>
                                                <p
                                                  style={{
                                                    color: "#666",
                                                    fontSize: "16px",
                                                    marginBottom: "10px",
                                                    lineHeight: "1.6",
                                                  }}
                                                >
                                                  You don't have permission to
                                                  access{" "}
                                                  {/* <strong></strong>. */}
                                                </p>
                                                <p
                                                  style={{
                                                    color: "#888",
                                                    fontSize: "14px",
                                                    marginTop: "15px",
                                                    lineHeight: "1.5",
                                                  }}
                                                >
                                                  Please contact your
                                                  administrator to request
                                                  access to this feature.
                                                </p>
                                              </div>
                                            );
                                            setOpenAccess(true);
                                          }
                                        }}
                                      />
                                    </TableCell>
                                  );
                                }
                              })}
                            </TableRow>
                          );
                        })
                    : stableSort(results || [], getComparator(order, orderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          const isItemSelected = isSelected(row.id);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={index + "TableRow"}
                              selected={isItemSelected}
                              sx={{
                                backgroundColor:
                                  row?.color || "var(--themeColor)",
                              }}
                            >
                              {!tableData.disableDelete && canEdit && (
                                <TableCell
                                  padding="checkbox"
                                  key={row.id + "TableCell"}
                                  sx={{
                                    fontWeight: "500",
                                    borderBottom: "1px solid  rgb(97 97 97)",
                                    padding: "8px 10px",
                                    fontSize: "13px",
                                  }}
                                >
                                  <Checkbox
                                    sx={{
                                      color: row["edit"] && "grey !important",
                                    }}
                                    key={row.id + "Checkbox"}
                                    onClick={(event) =>
                                      !row["edit"] && handleClick(event, row.id)
                                    }
                                    checked={isItemSelected}
                                    inputProps={{
                                      "aria-labelledby": labelId,
                                    }}
                                  />
                                </TableCell>
                              )}
                              {!tableData.tableHead[0]?.isSpecial && (
                                <TableCell
                                  component="th"
                                  id={labelId}
                                  key={labelId}
                                  scope="row"
                                  sx={{
                                    borderBottom: "1px solid  rgb(97 97 97)",
                                    padding: "8px 10px",
                                    width:
                                      tableData.tableHead[0]?.width || "auto",
                                  }}
                                >
                                  {/* <Link
                                    style={{ color: "inherit" }}
                                    to={tableData.tableHead[0].link}
                                    state={{ id: row.id, name: row.name }}
                                  > */}
                                  <p
                                    style={{
                                      color:
                                        tableData.tableHead[0].color ||
                                        "var(--themeFontColor)",
                                    }}
                                  >
                                    {row[tableData.tableHead[0].id]}
                                  </p>
                                  {tableData.tableHead[0]?.subText &&
                                    row[tableData.tableHead[0]?.subText] && (
                                      <span
                                        style={{
                                          color: "var(--themeFontColor)",
                                        }}
                                      >
                                        ({row[tableData.tableHead[0]?.subText]})
                                      </span>
                                    )}
                                  {/* </Link> */}
                                </TableCell>
                              )}
                              {tableData.tableHead.map((value, index) => {
                                if (value.isSpecial) {
                                  return (
                                    <TableCell
                                      sx={{
                                        borderBottom:
                                          "1px solid  rgb(97 97 97)",
                                        padding: "8px 10px",
                                        fontSize: "13px",
                                        width: value?.width || "auto",
                                      }}
                                      align={value?.align || "center"}
                                      key={index}
                                    >
                                      {row[value.id]}
                                    </TableCell>
                                  );
                                } else if (value.isDate) {
                                  return (
                                    <TableCell
                                      sx={{
                                        borderBottom:
                                          "1px solid  rgb(97 97 97)",
                                        padding: "8px 10px",
                                        fontSize: "13px",
                                        width: value?.width || "auto",
                                        color:
                                          "var(--themeFontColor)  !important;",
                                        // textAlign : "center !important"
                                      }}
                                      align={"left"}
                                      key={index}
                                    >
                                      {formatDateToDDMMYYYY(row[value.id])}
                                    </TableCell>
                                  );
                                } else if (value.isImage) {
                                  return (
                                    <TableCell
                                      sx={{
                                        borderBottom: "1px solid rgb(97 97 97)",
                                        padding: value?.padding || "8px 8px",
                                        fontSize: "13px",
                                        width: value?.width || "auto",
                                        cursor:
                                          value?.isModal &&
                                          row[value.id] &&
                                          "pointer",
                                      }}
                                      align="center"
                                      key={index}
                                      onClick={() => {
                                        if (value?.isModal && row[value.id]) {
                                          setContent(
                                            <img src={IMAGE + row[value.id]} />
                                          );
                                          tableData.openModal();
                                        }
                                      }}
                                    >
                                      {row[value.id] ? (
                                        value?.isModal ? (
                                          <img
                                            src="https://i.ibb.co/3RxybqZ/photo.png"
                                            height={"30px"}
                                          />
                                        ) : (
                                          <img src={IMAGE + row[value.id]} />
                                        )
                                      ) : (
                                        <p
                                          style={{
                                            color: "var(--themeFontColor)",
                                          }}
                                        >
                                          _
                                        </p>
                                      )}
                                    </TableCell>
                                  );
                                } else if (value.isButtonDisplay) {
                                  const test = row[value.id]?.replaceAll(
                                    " ",
                                    ""
                                  );
                                  return (
                                    <TableCell
                                      sx={{
                                        borderBottom:
                                          "1px solid  rgb(97 97 97)",
                                        padding: "8px 10px",
                                        fontSize: "13px",
                                        width: value?.width || "auto",
                                      }}
                                      align="left"
                                      key={index}
                                    >
                                      <span
                                        style={{
                                          cursor: "pointer",
                                          fontWeight: "500",
                                        }}
                                        variant="contained"
                                        className={test + "Badge"}
                                      >
                                        {row[value.id]}
                                      </span>
                                    </TableCell>
                                  );
                                } else if (
                                  value.id == "sequence" &&
                                  value.isEditable
                                ) {
                                  // Debounce function to limit API calls
                                  const debounce = (func, delay) => {
                                    let timer;
                                    return function (...args) {
                                      clearTimeout(timer);
                                      timer = setTimeout(
                                        () => func.apply(this, args),
                                        delay
                                      );
                                    };
                                  };

                                  const handleSequenceChange = debounce(
                                    (id, newValue) => {
                                      dispatch(
                                        value.apiAction({
                                          id: id,
                                          sequence: newValue,
                                        })
                                      ).then((response) => {
                                        if (response?.error) {
                                          // Revert to old value if API call fails
                                          const revertedTableBody =
                                            tableData.tableBody.map((item) =>
                                              item.id === row.id
                                                ? {
                                                    ...item,
                                                    [value.id]: row[value.id],
                                                  }
                                                : item
                                            );
                                          setTableData({
                                            ...tableData,
                                            tableBody: revertedTableBody,
                                          });

                                          // Show error message
                                          setContentAccess(
                                            <p
                                              style={{
                                                color: "var(--themeFontColor)",
                                              }}
                                            >
                                              Failed to update sequence:{" "}
                                              {response.payload.message ||
                                                "Unknown error"}
                                            </p>
                                          );
                                          setOpenAccess(true);
                                        }
                                      });
                                      setSave(!save);
                                    },
                                    500
                                  ); // 500ms debounce delay

                                  return (
                                    <TableCell
                                      sx={{
                                        borderBottom:
                                          "1px solid  rgb(97 97 97)",
                                        padding: "8px 10px",
                                        fontSize: "13px",
                                        width: value?.width || "auto",
                                      }}
                                      align={value?.align || "center"}
                                      key={index}
                                    >
                                      <TextField
                                        type="number"
                                        value={row[value.id] || ""}
                                        onChange={(e) => {
                                          const newValue = e.target.value;
                                          // Update local state first for immediate UI feedback
                                          const updatedTableBody =
                                            tableData.tableBody.map((item) =>
                                              item.id === row.id
                                                ? {
                                                    ...item,
                                                    [value.id]: newValue,
                                                  }
                                                : item
                                            );
                                          setTableData({
                                            ...tableData,
                                            tableBody: updatedTableBody,
                                          });

                                          // Call debounced API update
                                          if (newValue !== "" || 0) {
                                            handleSequenceChange(
                                              row.id,
                                              newValue
                                            );
                                          }
                                        }}
                                        onWheel={(e) => e.target.blur()}
                                        onBlur={(e) => {
                                          // Validate the input
                                          if (
                                            e.target.value === "" ||
                                            isNaN(e.target.value)
                                          ) {
                                            // Revert to original value if invalid
                                            const revertedTableBody =
                                              tableData.tableBody.map((item) =>
                                                item.id === row.id
                                                  ? {
                                                      ...item,
                                                      [value.id]: row[value.id],
                                                    }
                                                  : item
                                              );
                                            setTableData({
                                              ...tableData,
                                              tableBody: revertedTableBody,
                                            });
                                          }
                                        }}
                                        inputProps={{
                                          min: 1,
                                          style: {
                                            textAlign: "center",
                                            color: "var(--themeFontColor)",
                                            padding: "5px",
                                            width: "60px",
                                          },
                                          ...(navigator.userAgent.includes(
                                            "Firefox"
                                          )
                                            ? {}
                                            : {
                                                "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button":
                                                  {
                                                    WebkitAppearance: "none",
                                                    margin: 0,
                                                  },
                                              }),
                                        }}
                                        sx={{
                                          "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                              borderColor:
                                                "rgba(255, 255, 255, 0.23)",
                                            },
                                            "&:hover fieldset": {
                                              borderColor:
                                                "rgba(255, 255, 255, 0.5)",
                                            },
                                          },
                                          "& input[type=number]": {
                                            MozAppearance: "textfield",
                                          },
                                          "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                                            {
                                              WebkitAppearance: "none",
                                              margin: 0,
                                            },
                                        }}
                                      />
                                    </TableCell>
                                  );
                                } else if (value.id == "status") {
                                  return (
                                    <TableCell
                                      sx={{
                                        borderBottom:
                                          "1px solid  rgb(97 97 97)",
                                        padding: "8px 10px",
                                        fontSize: "13px",
                                      }}
                                      align="left"
                                      key={index}
                                    >
                                      <span
                                        style={{
                                          cursor: "pointer",
                                          fontWeight: "500",
                                        }}
                                        variant="contained"
                                        className={
                                          row[value.id]?.toLowerCase() ==
                                          (value.keywords?.[0]?.toLowerCase() ||
                                            "active" ||
                                            "approved")
                                            ? "successBadge"
                                            : "dangerBadge"
                                        }
                                        onClick={() => {
                                          if (
                                            row[value.id] !=
                                              value.nonEditableState &&
                                            !row["edit"] &&
                                            canEdit
                                          )
                                            updateStatus(
                                              {
                                                id: row?.id,
                                                status: row?.status,
                                              },
                                              value
                                            );
                                        }}
                                      >
                                        {row[value.id]}
                                      </span>
                                    </TableCell>
                                  );
                                } else if (value.id != "edit" && index != 0) {
                                  return (
                                    <TableCell
                                      sx={{
                                        borderBottom:
                                          "1px solid  rgb(97 97 97)",
                                        padding: value?.padding || "8px 8px",
                                        fontSize: "13px",
                                        width: value?.width || "auto",
                                        cursor: value?.isModal && "pointer",
                                      }}
                                      align={value?.align || "left"}
                                      key={index}
                                      onClick={() => {
                                        if (value?.isModal) {
                                          setContent(
                                            <p
                                              style={{
                                                color: "var(--themeFontColor)",
                                              }}
                                            >
                                              {row[value.id]}
                                              {/* {console.log(
                                            row[value.n_id],
                                            "newDispoe"
                                          )} */}
                                            </p>
                                          );
                                          tableData?.openModal();
                                        }
                                        if (
                                          value?.readNotification &&
                                          value?.isModal
                                        ) {
                                          const data = new FormData();
                                          data.append("user", user?.id);
                                          data.append(
                                            "notification",
                                            row[value.n_id]
                                          );
                                          dispatch(
                                            tableData.readNotification(data)
                                          );
                                        }
                                      }}
                                    >
                                      <p
                                        style={{
                                          color: "var(--themeFontColor)",
                                        }}
                                      >
                                        {value?.isModal
                                          ? value?.default ||
                                            row[value.id].substring(0, 15) +
                                              "..."
                                          : typeof row[value.id] == "object"
                                          ? row[value.id]?.toString()
                                          : row[value.id]}
                                      </p>
                                      {row[value?.subText] && (
                                        <span
                                          style={{
                                            color: "var(--themeFontColor)",
                                          }}
                                        >
                                          ({row[value?.subText]})
                                        </span>
                                      )}
                                      {row[value?.subText1] && (
                                        <p
                                          style={{
                                            color: "var(--themeFontColor)",
                                          }}
                                        >
                                          {row[value?.subText1]}
                                        </p>
                                      )}
                                      {row[value?.subText2] && (
                                        <p
                                          style={{
                                            color: "var(--themeFontColor)",
                                          }}
                                        >
                                          {row[value?.subText2]}
                                        </p>
                                      )}
                                      {row[value?.subText3] && (
                                        <p
                                          style={{
                                            color: "var(--themeFontColor)",
                                          }}
                                        >
                                          {row[value?.subText3]}
                                        </p>
                                      )}
                                      {row[value?.subText4] && (
                                        <p
                                          style={{
                                            color: "var(--themeFontColor)",
                                          }}
                                        >
                                          {row[value?.subText4]}
                                        </p>
                                      )}
                                    </TableCell>
                                  );
                                } else if (value.id == "edit") {
                                  return (
                                    <TableCell
                                      sx={{
                                        borderBottom:
                                          "1px solid  rgb(97 97 97)",
                                        padding: "8px 10px",
                                        fontSize: "13px",
                                        width: value?.width || "auto",
                                      }}
                                      align="left"
                                      key={index}
                                    >
                                      <img
                                        src={EditTwoToneIcon}
                                        style={{
                                          cursor: "pointer",
                                          borderRadius: "0",
                                          verticalAlign: "baseline",
                                          height: "20px",
                                        }}
                                        // height={"20px"}
                                        onClick={() => {
                                          if (canEdit) {
                                            if (!row["edit"]) {
                                              const temp = { ...row };
                                              if (value?.isNewPopUpForm) {
                                                setIsModalOpen(true);
                                                setForm(row);
                                                setIsEdit(true);
                                              } else if (value?.isNewForm) {
                                                setOpenDrawer(true);
                                                setForm(row);
                                                setIsEdit(true);
                                              } else {
                                                Object.keys(temp).map(
                                                  (key) =>
                                                    temp[key]?.["$$typeof"] &&
                                                    delete temp[key]
                                                );
                                                // setForm({ ...row });
                                                // setIsEdit(true);

                                                location?.pathname !=
                                                  create_new &&
                                                  navigate(create_new, {
                                                    state: {
                                                      view: "create_new",
                                                      form: JSON.stringify({
                                                        ...temp,
                                                      }),
                                                      isEdit: true,
                                                    },
                                                  });
                                              }
                                            } else {
                                              setContentAccess(
                                                <p
                                                  style={{
                                                    color:
                                                      "var(--themeFontColor)",
                                                  }}
                                                >
                                                  {value.ErrorMsg ||
                                                    "You do not have permission to Edit data"}
                                                </p>
                                              );
                                              setOpenAccess(true);
                                            }
                                          } else {
                                            setContentAccess(
                                              <div
                                                style={{
                                                  textAlign: "center",
                                                  padding: "40px 30px",
                                                  maxWidth: "450px",
                                                  margin: "0 auto",
                                                  borderRadius: "8px",
                                                }}
                                              >
                                                <LockIcon
                                                  style={{
                                                    fontSize: "80px",
                                                    color: "#ff6b6b",
                                                    marginBottom: "20px",
                                                  }}
                                                />
                                                <h2
                                                  style={{
                                                    marginBottom: "15px",
                                                    color: "#333",
                                                    fontSize: "24px",
                                                    fontWeight: "600",
                                                  }}
                                                >
                                                  Access Denied
                                                </h2>
                                                <p
                                                  style={{
                                                    color: "#666",
                                                    fontSize: "16px",
                                                    marginBottom: "10px",
                                                    lineHeight: "1.6",
                                                  }}
                                                >
                                                  You don't have permission to
                                                  access{" "}
                                                  {/* <strong></strong>. */}
                                                </p>
                                                <p
                                                  style={{
                                                    color: "#888",
                                                    fontSize: "14px",
                                                    marginTop: "15px",
                                                    lineHeight: "1.5",
                                                  }}
                                                >
                                                  Please contact your
                                                  administrator to request
                                                  access to this feature.
                                                </p>
                                              </div>
                                            );
                                            setOpenAccess(true);
                                          }
                                        }}
                                      />
                                    </TableCell>
                                  );
                                }
                              })}
                            </TableRow>
                          );
                        })}
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={"12"}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: "2rem",
                          backgroundColor: "var(--themeColor)",
                        }}
                      >
                        {" "}
                        <img src={empty} alt="empty" />
                        <p
                          style={{
                            color: "var(--themeFontColor)",
                            textAlign: "center",
                          }}
                        >
                          No data found for this module{" "}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[tableData?.rowsPerPage || 10, 25, 50]}
            component="div"
            // count={results?.length}
            count={!isLoadingData ? results?.length : totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="ss-table-table-pagination"
          />
        </Box>
      </Card>
    </>
  );
}
