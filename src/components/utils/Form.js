import React, { useMemo, useState, useRef } from "react";
import {
  Alert,
  Box,
  Chip,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import imageJPG from "./../../images/file1.png";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // For date-fns
// import { DatePicker } from '@mui/x-date-pickers';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import profileSym from "../assets/images/profileSym.png";
// import { useDropzone } from "react-dropzone";
import { RichTextEditor } from "@mantine/rte";
import dayjs from "dayjs";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
// import ReactDatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { DateRangePicker } from "rsuite";
import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import imageField from "../assets/images/imageField.png";
import "rsuite/dist/rsuite.css";
import { IMAGE } from "../../api";
import { CloudUpload, Delete } from "@mui/icons-material";
// import { IMAGE } from "../api";
export default function Form({
  formStructure,
  formTitle,
  setForm,
  form,
  isEdit,
  handleSubmit,
  isMulti,
  formType,
  isView,
  errorMessage,
  setAllowNext,
  isCart,
  rescheduleBut,
  isDateSelection,
  isCallToHr,
  isReschedule,
  setIsReschedule,
  holidayRanges,
}) {
  const [openAdError, setOpenAdError] = useState(false);
  const [content, setPopupContent] = useState("");
  const [dateRange_report, setDateRange_report] = useState("");
  const [addingNew, setAddingNew] = useState(false); // Track if user is adding a new company
  const [newCompany, setNewCompany] = useState(""); // Store new company value
  const [options, setOptions] = useState([]);
  const [dob, setDob] = useState(null);
  const [file123, setFile123] = useState(null);
  let localfile = null;
  const [selectedDate, setSelectedDate] = useState({});
  const [isFileChange, setIsFileChange] = useState(false);
  const [isFilterView, setIsFilterView] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const datePickerRefs = useRef({}); // Object to hold multiple refs dynamically
 const theme = useTheme();
   const darkMode = JSON.parse(sessionStorage.getItem("darkMode"));
  const handleDatePickerOpen = (fieldName) => {
    // Open the specific date picker by its name
    datePickerRefs.current[fieldName]?.setOpen(true);
  };

  const isDateInHolidayRange = (date) => {
    const currentDate = new Date(date?.setHours(0, 0, 0, 0));
    return holidayRanges?.some((range) => {
      const start = new Date(range?.start?.setHours(0, 0, 0, 0));
      const end = new Date(range?.end?.setHours(0, 0, 0, 0));
      return currentDate >= start && currentDate <= end;
    });
  };

  const handleSubmit123 = (event) => {
    event.preventDefault();
    if (dob) {
      // console.log("Selected DOB:", dayjs(dob).format("DD/MM/YYYY"));
    } else {
      // console.log("DOB is required");
    }
  };
  const dateToYMD = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };
  // console.log("formType", !isMulti, formType == "View", formType);
  const handleClose = () => {
    setOpenAdError(false);
  };
  const currentYear = new Date().getFullYear();
  const startYear = 1975; // Adjust this as per your application's requirement
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  ).reverse();

  const handleDateChange = (date, keyword) => {
    setSelectedDate((prev) => ({ ...prev, [keyword]: date }));
  };

  // function dateToYMD(date) {
  //   var d = date.getDate();
  //   var m = date.getMonth() + 1; //Month from 0 to 11
  //   var y = date.getFullYear();
  //   return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
  // }
  // function dateToYMD(date) {
  //   var d = date.getDate();
  //   var m = date.getMonth() + 1; //Month from 0 to 11
  //   var y = date.getFullYear();
  //   return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
  // }
  function makePassword(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  // const button = formStructure[formStructure?.length - 1];

  function getDateFromHours(time) {
    time = time.split(":");
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
  }
  const [focused, setFocused] = useState(false);
  const [lockedInputs, setLockedInputs] = useState();
  const [displayCount, setDisplayCount] = useState(0);
  useMemo(() => {
    const temp = {};
    setDisplayCount(0);
    formStructure?.map((ele) => {
      if (ele?.type == "lockedInput") temp[ele?.name] = true;
      if (ele?.display != "none") setDisplayCount((prev) => prev + 1);
    });
    setLockedInputs({ ...temp });
  }, [formStructure]);
  const handleLockedinput = (name) => {
    const temp = lockedInputs;
    temp[name] = !temp[name];
    setLockedInputs({ ...temp });
  };
  const [allowSubmit, setAllowSubmit] = useState(true);
  // const handleFormSubmit = (e) => {
  //   var requiredFieldCount = 0;
  //   var requiredFieldFilledCount = 0;
  //   formStructure.map((value) => {
  //     if (value.required && value.display != "none") {
  //       requiredFieldCount = requiredFieldCount + 1;
  //       if (
  //         Object.keys(form).includes(value.name) &&
  //         form[value.name] != "" &&
  //         form[value.name] != [] &&
  //         form[value.name] != null &&
  //         form[value.name]
  //       ) {
  //         requiredFieldFilledCount = requiredFieldFilledCount + 1;
  //       }
  //     }
  //   });
  //   if (requiredFieldFilledCount == requiredFieldCount) {
  //     handleSubmit(e);
  //     setAllowSubmit(true);
  //     // setSub(true)
  //   } else setAllowSubmit(false);
  //   // setSub(false)
  //   // allowSubmit && handleSubmit(e)
  //   // setSub(!sub)
  // };

  //   const handleFormSubmit = (e) => {
  //   e.preventDefault(); // Prevent default submission
  //   let requiredFieldCount = 0;
  //   let requiredFieldFilledCount = 0;
  //   let emailValid = true;
  //   let isMobileValid = true;
  //   formStructure.forEach((value) => {
  //     if (value.required && value.display !== "none") {
  //       requiredFieldCount++;
  //       if (
  //         form[value.name] &&
  //         form[value.name] !== "" &&
  //         form[value.name] !== null
  //       ) {
  //         requiredFieldFilledCount++;
  //       }

  //       // Validate email if applicable
  //       if (value.isEmail && form[value.name]) {
  //         const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //         if (!emailRegex.test(form[value.name])) {
  //           emailValid = false;
  //         }
  //       }
  //       if (value.isMobile && form[value.name]) {
  //         // Validate mobile number (check for 10 digits after +91)
  //         const digits = form[value.name].replace(/\D/g, "").slice(2);
  //         if (digits.length === 10) {
  //           requiredFieldFilledCount++;
  //         } else {
  //           isMobileValid = false;
  //         }
  //       } else {
  //         requiredFieldFilledCount++;
  //       }
  //     }
  //   });

  //   if (
  //     requiredFieldCount === requiredFieldFilledCount &&
  //     emailValid && isMobileValid
  //   ) {
  //     handleSubmit(e);
  //     setAllowSubmit(true);
  //   } else {
  //     setAllowSubmit(false);
  //   }
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault(); // Prevent default submission
  //   let requiredFieldCount = 0; // Count of required fields
  //   let requiredFieldFilledCount = 0; // Count of filled required fields
  //   let emailValid = true; // Email validity flag
  //   let isMobileValid = true; // Mobile number validity flag

  //   formStructure.forEach((value) => {
  //     if (value.required && value.display !== "none") {
  //       requiredFieldCount++; // Increment the required field count

  //       const fieldValue = String(form[value.name] || "").trim(); // Ensure value is a string and trim it

  //       if (fieldValue) {
  //         requiredFieldFilledCount++; // Increment if the field is not empty

  //         // Validate email if applicable
  //         if (value.isEmail) {
  //           const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //           if (!emailRegex.test(fieldValue)) {
  //             emailValid = false; // Mark email as invalid
  //           }
  //         }

  //         // Validate mobile number if applicable
  //         if (value.isMobile) {
  //           const digits = fieldValue.replace(/\D/g, "").slice(2); // Extract digits after +91
  //           if (digits.length !== 10) {
  //             isMobileValid = false; // Mark mobile as invalid
  //           }
  //         }
  //       }
  //     }
  //   });

  //   // Check overall validation
  //   if (
  //     requiredFieldCount === requiredFieldFilledCount &&
  //     emailValid &&
  //     isMobileValid
  //   ) {
  //     setAllowSubmit(true); // Allow submission
  //     handleSubmit(e); // Submit the form
  //   } else {
  //     setAllowSubmit(false); // Prevent submission
  //     console.error({
  //       emailValid,
  //       isMobileValid,
  //       requiredFieldCount,
  //       requiredFieldFilledCount,
  //     }); // Debugging information
  //   }
  // };
  // const fieldValue = String(form[field.name] || "").trim();
  // console.log(fieldValue ,)
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default submission

    let requiredFieldCount = 0; // Total required fields count
    let requiredFieldFilledCount = 0; // Filled required fields count
    let emailValid = true; // Email validity flag
    let mobileValid = true; // Mobile number validity flag
    let pancardValid = true; // PAN validity flag
    let gstValid = true; // GST validity flag

    formStructure?.forEach((field) => {
      console.log(field.required, formStructure, "Hiii Parth Check THis");
      if (field.required && field.display !== "none") {
        requiredFieldCount++; // Count all required fields
        const fieldValue = String(form[field.name] || "").trim(); // Ensure the field value is a string
        // console.log(fieldValue, "dsfdfsdd");
        // General required field check
        if (fieldValue) {
          // Email validation
          if (field?.isEmail) {
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailRegex.test(fieldValue)) {
              emailValid = false; // Email is invalid
            } else {
              requiredFieldFilledCount++; // Increment count for valid email
            }
          }

          // Mobile validation
          if (field?.isMobile) {
            const digits = fieldValue.replace(/\D/g, "").slice(2); // Extract digits after +91
            if (digits.length === 10) {
              requiredFieldFilledCount++; // Increment count for valid mobile number
            } else {
              mobileValid = false; // Mobile number is invalid
            }
          }

          // PAN validation
          if (field?.isPancard) {
            const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
            if (!panRegex.test(fieldValue)) {
              pancardValid = false; // PAN is invalid
            } else {
              requiredFieldFilledCount++; // Increment count for valid PAN
            }
          }

          // GST validation
          if (field?.isGst) {
            const gstRegex =
              /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/;
            if (!gstRegex.test(fieldValue)) {
              gstValid = false; // PAN is invalid
            } else {
              requiredFieldFilledCount++; // Increment count for valid PAN
            }
          }

          // For other fields
          if (
            !field.isEmail &&
            !field.isMobile &&
            !field?.isGst &&
            !field?.isPancard
          ) {
            requiredFieldFilledCount++; // Increment count if field is filled
          }
        }
      }
    });

    // Validate the form
    const isFormValid =
      requiredFieldCount === requiredFieldFilledCount &&
      emailValid &&
      mobileValid &&
      pancardValid &&
      gstValid;
    // console.log(isFormValid, "grretertert");
    console.log(
      "chchhchchchcch",
      isFormValid,
      requiredFieldCount,
      requiredFieldFilledCount
    );

    if (isFormValid) {
      console.log("chchhchchchcch12");
      setAllowSubmit(true); // Allow submission
      handleSubmit(e); // Call submit handler
    } else {
      setAllowSubmit(false); // Block submission
      console.error({
        requiredFieldCount,
        requiredFieldFilledCount,
        emailValid,
        mobileValid,
        pancardValid,
        form,
      }); // Log detailed debug info
    }
  };

  const handleMobileChange = (e) => {
    // console.log(e.target, "chce");
    const { name, value } = e.target;

    // if (name === "mobile_number") {
    // Prepend +91 and limit the number of digits to 10 (after +91)
    let formattedValue = value;

    if (!formattedValue.startsWith("+91 ")) {
      formattedValue = "+91 " + formattedValue;
    }

    const digits = formattedValue.replace(/\D/g, "").slice(2); // Remove non-digits, keep only the 10 digits after +91
    if (digits.length <= 10) {
      setForm((prev) => ({
        ...prev,
        [name]: "+91 " + digits,
      }));
    }
    // } else {
    //   // Handle other input fields
    //   setForm((prev) => ({
    //     ...prev,
    //     [name]: value,
    //   }));
    // }
  };
    const [filePreviews, setFilePreviews] = useState({});
    const fileInputRefs = useRef({});
   const handleChange = (name, value) => {
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
    const inputLabelStyles = {
    color: darkMode ? theme.palette.text.secondary : theme.palette.text.primary
  };

  const fileUploadStyles = {
    border: `2px dashed ${darkMode ? theme.palette.grey[700] : theme.palette.grey[400]}`,
    borderRadius: 2,
    padding: 3,
    textAlign: 'center',
    display :"flex",
    gap : "1rem",
    alignItems : "center",
    cursor: 'pointer',
    backgroundColor: darkMode ? theme.palette.grey[800] : theme.palette.grey[100],
    '&:hover': {
      borderColor: theme.palette.primary.main,
      backgroundColor: darkMode ? theme.palette.grey[700] : theme.palette.grey[200]
    }
  };

    const handleFileChange = (fieldName, event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Store the file object
    handleChange(fieldName, file);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreviews(prev => ({
          ...prev,
          [fieldName]: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreviews(prev => ({
        ...prev,
        [fieldName]: file.name
      }));
    }
  };

  const removeFile = (fieldName) => {
    handleChange(fieldName, null);
    setFilePreviews(prev => {
      const newPreviews = {...prev};
      delete newPreviews[fieldName];
      return newPreviews;
    });
    if (fileInputRefs.current[fieldName]) {
      fileInputRefs.current[fieldName].value = '';
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openAdError}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert severity="info" variant="filled" color="success">
          {content}
        </Alert>
      </Snackbar>
      <Card
        sx={{
          boxShadow: isMulti
            ? "none"
            : "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          borderRadius: "10px",
          p: "25px 20px 15px",
          mb: "15px",
          color: "black",

          backgroundColor: "#f8fcff",
          position: "relative",
        }}
      >
        <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: "15px",
          }}
        >
          {formTitle}
        </Typography>

        <Box
          component="form"
          sx={{ minHeight: isMulti ? "30vh" : "40vh" }}
          // onSubmit={handleSubmit}
        >
          <Grid
            container
            alignItems="flex-center"
            justifyContent={displayCount > 2 ? "start" : "center"}
            key={"container-grid"}
            spacing={3}
          >
            {formStructure?.map((value, index) => {
              if (value.type == "inputBox") {
                return (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={value?.size || 6}
                    key={index + "-grid"}
                    display={value.display || "block"}
                  >
                    <TextField
                      autoComplete={value.title}
                      name={value.name}
                      fullWidth
                      id={value.id}
                      type={value.variant || "text"}
                      required={value?.required}
                      rows={value.row}
                      multiline={value?.multiline}
                      // variant="standard"
                      placeholder={value.placeholder}
                      label={value.title}
                      value={form?.[value.name] || value?.default || ""}
                      helperText={
                        (((isMulti && errorMessage) || !allowSubmit) &&
                          value.required &&
                          !form?.[value.name] && (
                            <p
                              style={{
                                // textAlign: "right",
                                marginTop: "-3px",
                                color: "#DE4444",
                              }}
                            >
                              Please fill this field
                            </p>
                          )) ||
                        (value.isEmail &&
                          form?.[value.name] &&
                          !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
                            form[value.name]
                          ) && (
                            <p
                              style={{
                                // textAlign: "right",
                                marginTop: "-3px",
                                color: "#DE4444",
                              }}
                            >
                              Invalid email format
                            </p>
                          )) ||
                        (value.isPancard &&
                          form?.[value.name] &&
                          !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(
                            form[value.name]
                          ) && (
                            <p
                              style={{
                                // textAlign: "right",
                                marginTop: "-3px",
                                color: "#DE4444",
                              }}
                            >
                              Invalid PAN format
                            </p>
                          )) ||
                        (value.isGst &&
                          form?.[value.name] &&
                          !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/.test(
                            form[value.name]
                          ) && (
                            <p
                              style={{
                                // textAlign: "right",
                                marginTop: "-3px",
                                color: "#DE4444",
                              }}
                            >
                              Invalid GST number format
                            </p>
                          ))
                      }
                      onChange={(event) => {
                        const updatedValue = event.target.value;
                        if (value.regex) {
                          if (
                            event.target.value !== "" &&
                            !value.regex.test(event.target.value)
                          ) {
                            return;
                          }
                        }
                        if (value.isEmail) {
                          const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                          if (
                            !emailRegex.test(event.target.value) &&
                            event.target.value !== ""
                          ) {
                            setForm({
                              ...form,
                              [event.target.name]: event.target.value,
                            });
                            return; // Exit if invalid to prevent updating the state
                          }
                        }
                        // setForm({
                        //   ...form,
                        //   [event.target.name]: value.isCaps
                        //     ? event.target.value.toUpperCase()
                        //     : value?.isCapitalise
                        //       ? event.target.value.charAt(0).toUpperCase() +
                        //         event.target.value.slice(1)
                        //       : event.target.value,
                        // });
                        setForm((prev) => ({
                          ...prev,
                          [event.target.name]: value.isCaps
                            ? updatedValue.toUpperCase()
                            : value.isCapitalise
                            ? updatedValue.charAt(0).toUpperCase() +
                              updatedValue.slice(1)
                            : updatedValue,
                        }));
                      }}
                      // onChangeCapture={(event) => {
                      //   if (value.variant == "email") {
                      //     !validator.isEmail(event.target.value)
                      //       ? event.target.setCustomValidity("Invalid Email")
                      //       : event.target.setCustomValidity("");
                      //   }
                      // }}
                      // label={
                      //   <span style={{ color: "#151515" }}>
                      //     {" "}
                      //     {/* Label color change */}
                      //     {value.title}
                      //     {value?.required && (
                      //       <span style={{ color: "#de4444" }}> Mandatory</span>
                      //     )}
                      //   </span>
                      // }
                      InputProps={{
                        startAdornment: value?.symbol && (
                          <InputAdornment color="secondary">
                            {value?.symbol}
                          </InputAdornment>
                        ),
                        style: {
                          borderRadius: 8,
                          color: form?.[value.name] ? "#151515" : "#BEBEBE", // Font color for the input field
                          // backgroundColor: value.disabled
                          //   ? "#f2f2f2"
                          //   : "transparent", // Disabled background color
                          // paddingLeft: "10px", // Padding for the input field
                        },
                        inputProps: {
                          min: value?.min,
                          max: value?.max,
                          step: value?.step || 1,
                          maxLength: value?.maxLength,
                          style: {
                            color: form?.[value.name]
                              ? "#151515"
                              : "rgba(21, 21, 21, 1)", // Placeholder color to light grey
                            paddingLeft: "10px", // Left padding for the placeholder
                          },
                        },
                      }}
                      // InputLabelProps={{
                      //   shrink: true, // Keeps the label at the top when focused
                      //   style: {
                      //     fontWeight: "bold", // Bold label style
                      //     marginBottom: "10px",
                      //   },
                      // }}
                      // sx={{
                      //   "& .MuiInput-underline:before": {
                      //     borderBottomColor: "#151515", // Default bottom border color (before focus)
                      //   },
                      //   "& .MuiInput-underline:after": {
                      //     borderBottomColor: "#151515", // Black bottom border color (after focus)
                      //   },
                      //   "& .MuiInput-underline:hover:before": {
                      //     borderBottomColor: "#151515", // Black bottom border on hover
                      //   },
                      //   "& .MuiInput-underline:disabled:before": {
                      //     borderBottomStyle: "solid", // Ensure solid underline when disabled
                      //     borderBottomColor: "#151515", // Set bottom border color for disabled
                      //   },
                      //   "& input:-webkit-autofill": {
                      //     WebkitBoxShadow: "0 0 0 100px #FAFFF3 inset", // Red background for autofill
                      //     WebkitTextFillColor: "#151515", // Text color for autofilled content
                      //   },
                      // }}

                      sx={{
                        "& .MuiInput-underline:before": {
                          borderBottomColor: "#151515", // Default bottom border
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor: "#151515", // Focused bottom border
                        },
                        "& .MuiInput-underline:hover:before": {
                          borderBottomColor: "#151515", // Hover bottom border
                        },
                        "& .MuiInput-underline:disabled:before": {
                          borderBottomStyle: "solid  !important", // Ensure solid line for disabled
                          borderBottomColor: "#151515  !important", // Disabled underline color
                        },
                        "& .Mui-disabled:before": {
                          borderBottomColor: "#151515  !important", // Disabled underline color
                          borderBottomStyle: "solid  !important", // Ensure a solid line for disabled
                          cursor: "not-allowed !important",
                        },
                        "& input:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0 100px #FAFFF3 inset", // Red background for autofill
                          WebkitTextFillColor: "#151515", // Text color for autofilled content
                        },
                        // "& .MuiInput-underline:disabled": {
                        //   cursor: "not-allowed", // Optional: change the cursor style for disabled
                        // },
                      }}
                      disabled={
                        value.disabled || formType == "View" ? true : false
                      }
                    />
                    {(value.isLimit == "Description" || value.showLimit) && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <p style={{ color: "var(--themeFontColor)" }}>
                          {form?.[value.name]?.length}/
                          {value?.maxLength || "200"}{" "}
                          {form?.[value.name]?.length >= value?.maxLength && (
                            <span style={{ color: "#DE4444" }}>
                              Maximum limit reached
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </Grid>
                );
              }
              if (value.type == "description") {
                return (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    key={index + "-grid"}
                    display={value.display || "block"}
                  >
                    <Typography
                      as="h5"
                      sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "12px",
                      }}
                    >
                      {value.title}
                      {value.required && (
                        <span style={{ color: "red", fontSize: "16px" }}>
                          {" "}
                          *
                        </span>
                      )}
                    </Typography>

                    <RichTextEditor
                      id="rte"
                      value={form?.[value.name]}
                      onChange={(content) =>
                        setForm({ ...form, [value.name]: content })
                      }
                      controls={[
                        ["bold", "italic", "underline"],
                        ["unorderedList", "h1", "h2", "h3", "h4"],
                        ["sup", "sub"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["alignLeft", "alignCenter", "alignRight"],
                      ]}
                    />
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      {/* <p>
                        {form?.[value.name]?.length}/{value?.limit || "200"}
                      </p> */}
                    </div>
                    <p
                      style={{ fontSize: "10px", color: "red", width: "100%" }}
                    >
                      {!allowSubmit &&
                        (form[value.name] == "" ||
                          form[value.name] == [] ||
                          form[value.name] == null ||
                          form?.[value.name]?.length <= 0) &&
                        value?.required &&
                        "Please fill this field"}
                    </p>
                    <p
                      style={{ fontSize: "10px", color: "red", width: "100%" }}
                    >
                      {isMulti &&
                        errorMessage &&
                        (form?.[value.name] == undefined ||
                          form?.[value.name]?.length <= 0) &&
                        value?.required &&
                        "Please fill this field"}
                    </p>
                  </Grid>
                );
              }
              if (value.type == "packageList") {
                return value?.packageList();
              }

              if (value.type == "toggle") {
                return (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    key={index + "-grid"}
                    lg={value?.size || 6}
                    container
                    direction="row"
                    alignItems={"center"}
                    display={value.display || "block"}
                    style={{ marginTop: "1rem" }}
                  >
                    <FormControl>
                      <Box sx={{ marginTop: "20px" }}>
                        <InputLabel
                          shrink={true}
                          style={{
                            fontWeight: "bold",
                            color: "#151515",
                            marginLeft: "-10px",
                          }}
                        >
                          {/* Label with Mandatory */}
                          <span>
                            {value.title}
                            {value?.required && !value?.notShowTag ? (
                              <span
                                style={{
                                  color: "#de4444",
                                  marginLeft: "4px",
                                  opacity: "50%",
                                }}
                              >
                                Mandatory
                              </span>
                            ) : (
                              <span
                                style={{
                                  color: "#2E59C8",
                                  marginLeft: "5px",
                                  opacity: "50%",
                                }}
                              >
                                Optional
                              </span>
                            )}
                          </span>
                        </InputLabel>
                      </Box>

                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        {value.options.map((option, index) => (
                          <FormControlLabel
                            key={value.name + index}
                            value={option.value}
                            name={value.name}
                            required={value?.required}
                            disabled={
                              value.disabled || formType == "View"
                                ? true
                                : false
                            }
                            onChange={(event) => {
                              setForm({
                                ...form,
                                [event.target.name]: event.target.value,
                              });
                            }}
                            control={
                              <Radio
                                style={{ color: "#64ce46" }}
                                // required

                                checked={
                                  form?.[value.name] != undefined
                                    ? form?.[value.name] == option.value
                                    : option.value == value?.default
                                }
                              />
                            }
                            label={option.value}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <div>
                      {((isMulti && errorMessage) || !allowSubmit) &&
                        value.required &&
                        !form?.[value.name] && (
                          <p
                            style={{
                              // textAlign: "right",
                              marginTop: "-1px",
                              fontSize: "0.75rem",
                              color: "#DE4444",
                            }}
                          >
                            Please fill this field
                          </p>
                        )}
                    </div>
                  </Grid>
                );
              }
              if (value.type == "select") {
                return (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    // lg={12}
                    key={value.name + "-grid"}
                    lg={value?.size || 6}
                    display={value.display || "block"}
                  >
                    <InputLabel
                      shrink={true}
                      style={{
                        fontWeight: "bold",
                        marginBottom: "12px", // Space between label and input
                        color: "#151515",
                      }}
                    >
                      <span>
                        {value.title}
                        {value?.required && !value?.notShowTag ? (
                          <span
                            style={{
                              color: "#de4444",
                              marginLeft: "4px",
                              opacity: "50%",
                            }}
                          >
                            Mandatory
                          </span>
                        ) : (
                          <span
                            style={{
                              color: "#2E59C8",
                              marginLeft: "5px",
                              opacity: "50%",
                            }}
                          >
                            Optional
                          </span>
                        )}
                      </span>
                    </InputLabel>

                    <Autocomplete
                      id={value.name} // Unique ID for the input
                      size="small"
                      options={value.options || []} // Array of objects with label and value
                      getOptionLabel={(option) => option.label} // Display the label
                      isOptionEqualToValue={(option, selectedValue) =>
                        option.value === selectedValue?.value
                      } // Compare by value
                      value={
                        value?.options?.find(
                          (opt) => opt?.value === form?.[value.name]
                        ) || null
                      } // Set the selected value (only the value stored)
                      disabled={
                        value?.disabled || formType == "View" ? true : false
                      }
                      onChange={(event, newValue) => {
                        setForm({
                          ...form,
                          [value.name]: newValue?.value || "", // Ensure we don't set undefined values
                        });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required={value?.required}
                          variant="standard"
                          placeholder={value?.placeholder} // Placeholder fallback
                          helperText={
                            ((isMulti && errorMessage) || !allowSubmit) &&
                            (form?.[value.name] == undefined ||
                              form?.[value.name]?.length <= 0) &&
                            value?.required && (
                              <p
                                style={{
                                  // textAlign: "right",
                                  marginTop: "-3px",
                                  color: "#DE4444",
                                }}
                              >
                                Please fill this field
                              </p>
                            )
                          }
                          InputLabelProps={{
                            shrink: true,
                            style: {
                              fontWeight: "bold", // Bold label
                            },
                          }}
                          InputProps={{
                            ...params.InputProps,
                            style: {
                              // paddingTop: "10px",
                              color: "#151515", // Text color in input
                            },
                          }}
                          inputProps={{
                            ...params.inputProps,
                            style: {
                              paddingLeft: "10px", // Placeholder padding
                              color: form?.[value.name]
                                ? "#151515"
                                : "rgba(21, 21, 21, 1)", // Light grey placeholder color
                            },
                          }}
                          sx={{
                            "& .MuiInput-underline:before": {
                              borderBottomColor: "#151515", // Default bottom border color (before focus)
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor: "#151515", // Black bottom border color (after focus)
                            },
                            "& .MuiInput-underline:hover:before": {
                              borderBottomColor: "#151515", // Black bottom border on hover
                            },
                            "& .MuiInput-underline:disabled:before": {
                              borderBottomStyle: "solid  !important", // Ensure solid line for disabled
                              borderBottomColor: "#151515  !important", // Disabled underline color
                            },
                            "& .Mui-disabled:before": {
                              borderBottomColor: "#151515  !important", // Disabled underline color
                              borderBottomStyle: "solid  !important", // Ensure a solid line for disabled
                              cursor: "not-allowed !important",
                            },
                          }}
                        />
                      )}
                      PaperComponent={({ children }) => (
                        <div
                          style={{
                            padding: "10px",
                            background: "#fff", // Set background color without !important
                            boxShadow: "#1B3720 2px 4px 0px 1px", // Apply box shadow
                            boxSizing: "border-box", // Ensure padding and border are included in width/height
                          }}
                        >
                          <Paper
                            sx={{
                              color: "#151515", // Text color for dropdown options
                              maxHeight: "240px", // Scroll if options exceed max height
                              boxShadow: "none", // Remove Paper shadow to avoid extra outlines
                              border: "none", // Remove border for seamless look
                              overflowY: "auto", // Enable vertical scrolling
                              "::-webkit-scrollbar": {
                                width: "6px", // Scrollbar width
                              },
                              "::-webkit-scrollbar-track": {
                                background: "#f1f1f1", // Scrollbar track color
                              },
                              "::-webkit-scrollbar-thumb": {
                                background: "#1D3B25", // Scrollbar thumb color
                              },
                              "::-webkit-scrollbar-thumb:hover": {
                                background: "#0f2a14", // Hover color for scrollbar thumb
                              },
                            }}
                          >
                            {children}
                          </Paper>
                        </div>
                      )}
                    />
                  </Grid>
                );
              }
              if (value.type == "select_multiple") {
                return (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    key={index + "-grid"}
                    lg={value?.size || 6}
                    display={value.display || "block"}

                    // sx={{ display: value.display || "block" }}
                  >
                    <InputLabel
                      shrink={true}
                      style={{
                        fontWeight: "bold",
                        marginBottom: "12px", // Space between label and input
                        color: "#151515",
                      }}
                    >
                      <span>
                        {value.title}
                        {value?.required && !value?.notShowTag ? (
                          <span
                            style={{
                              color: "#de4444",
                              marginLeft: "5px",
                              opacity: "50%",
                            }}
                          >
                            Mandatory
                          </span>
                        ) : (
                          <span
                            style={{
                              color: "#2E59C8",
                              marginLeft: "5px",
                              opacity: "50%",
                            }}
                          >
                            Optional
                          </span>
                        )}
                      </span>
                    </InputLabel>

                    {/* <Autocomplete
                      multiple
                      size="small"
                      id="demo-simple-select-label"
                      options={value.options || []} // Array of objects with label and value
                      getOptionLabel={(option) => option.label} // Display the label
                      isOptionEqualToValue={(option, selectedValue) =>
                        option.value === selectedValue?.value
                      } // Compare by value property
                      filterSelectedOptions // Automatically removes selected options from the list
                      value={
                        value.options.filter((opt) =>
                          form?.[value.name]?.includes(opt.value)
                        ) || [] // Map stored values to corresponding options for display
                      }
                      disabled={
                        value?.disabled || formType == "View" ? true : false
                      }
                      onChange={(event, newValue) => {
                        // Map selected options to their values
                        setForm({
                          ...form,
                          [value.name]: newValue.map((item) => item.value),
                        });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          // label={value.title}
                          variant="standard"
                          required={value?.required}
                          placeholder={value?.placeholder} // Placeholder fallback
                          helperText={
                            (form?.[value.name]?.length === 0 &&
                              value?.required && (
                                <p style={{ textAlign: "left" }}>
                                  Please fill this field
                                </p>
                              )) ||
                            (form?.[value.name]?.length ===
                              (value?.maxSelections || 10) &&
                              (value?.errorText || (
                                <p style={{ textAlign: "left" }}>
                                  Maximum number of selections have been made.
                                </p>
                              )))
                          }
                          InputLabelProps={{
                            shrink: true,
                            style: {
                              fontWeight: "bold", // Bold label
                            },
                          }}
                          InputProps={{
                            ...params.InputProps,
                            style: {
                              // paddingTop: "10px",
                              color: "#151515", // Text color in input
                            },
                          }}
                          inputProps={{
                            ...params.inputProps,
                            style: {
                              paddingLeft: "10px", // Placeholder padding
                              color: form?.[value.name]
                                ? "#151515"
                                : "rgba(21, 21, 21, 1)", // Light grey placeholder color
                            },
                          }}
                          sx={{
                            "& .MuiInput-underline:before": {
                              borderBottomColor: "#151515", // Default bottom border color (before focus)
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor: "#151515", // Black bottom border color (after focus)
                            },
                            "& .MuiInput-underline:hover:before": {
                              borderBottomColor: "#151515", // Black bottom border on hover
                            },
                            "& .MuiInput-underline:disabled:before": {
                              borderBottomStyle: "solid  !important", // Ensure solid line for disabled
                              borderBottomColor: "#151515  !important", // Disabled underline color
                            },
                            "& .Mui-disabled:before": {
                              borderBottomColor: "#151515  !important", // Disabled underline color
                              borderBottomStyle: "solid  !important", // Ensure a solid line for disabled
                              cursor: "not-allowed !important",
                            },
                          }}
                        />
                      )}
                      PaperComponent={({ children }) => (
                        <div
                          style={{
                            padding: "10px",
                            background: "#fff", // Set background color without !important
                            boxShadow: "#1B3720 2px 4px 0px 1px", // Apply box shadow
                            boxSizing: "border-box", // Ensure padding and border are included in width/height
                          }}
                        >
                          <Paper
                            sx={{
                              color: "#151515", // Text color for dropdown options
                              maxHeight: "240px", // Scroll if options exceed max height
                              boxShadow: "none", // Remove Paper shadow to avoid extra outlines
                              border: "none", // Remove border for seamless look
                              overflowY: "auto", // Enable vertical scrolling
                              "::-webkit-scrollbar": {
                                width: "6px", // Scrollbar width
                              },
                              "::-webkit-scrollbar-track": {
                                background: "#f1f1f1", // Scrollbar track color
                              },
                              "::-webkit-scrollbar-thumb": {
                                background: "#1D3B25", // Scrollbar thumb color
                              },
                              "::-webkit-scrollbar-thumb:hover": {
                                background: "#0f2a14", // Hover color for scrollbar thumb
                              },
                            }}
                          >
                            {children}
                          </Paper>
                        </div>
                      )}
                    /> */}
                    <Autocomplete
                      multiple
                      size="small"
                      id="demo-simple-select-label"
                      options={value.options || []} // Array of objects with label and value
                      getOptionLabel={(option) => option.label} // Display the label
                      isOptionEqualToValue={(option, selectedValue) =>
                        option.value === selectedValue?.value
                      } // Compare by value property
                      filterSelectedOptions // Automatically removes selected options from the list
                      value={
                        value.options.filter((opt) =>
                          form?.[value.name]?.includes(opt.value)
                        ) || [] // Map stored values to corresponding options for display
                      }
                      disabled={value?.disabled || formType === "View"}
                      onChange={(event, newValue) => {
                        // Map selected options to their values
                        setForm({
                          ...form,
                          [value.name]: newValue.map((item) => item.value),
                        });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          required={value?.required}
                          placeholder={value?.placeholder} // Placeholder fallback
                          helperText={
                            (form?.[value.name]?.length === 0 &&
                              value?.required && (
                                <p style={{ textAlign: "left" }}>
                                  Please fill this field
                                </p>
                              )) ||
                            (form?.[value.name]?.length ===
                              (value?.maxSelections || 10) &&
                              (value?.errorText || (
                                <p style={{ textAlign: "left" }}>
                                  Maximum number of selections have been made.
                                </p>
                              )))
                          }
                          InputLabelProps={{
                            shrink: true,
                            style: {
                              fontWeight: "bold", // Bold label
                            },
                          }}
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: null, // Hides selected values inside input
                            style: {
                              color: "#151515",
                            },
                          }}
                          inputProps={{
                            ...params.inputProps,
                            // value: "", // Keeps input field empty after selection
                            style: {
                              paddingLeft: "10px", // Placeholder padding
                              color: form?.[value.name]
                                ? "#151515"
                                : "rgba(21, 21, 21, 1)",
                            },
                          }}
                          sx={{
                            "& .MuiInput-underline:before": {
                              borderBottomColor: "#151515", // Default bottom border color
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor: "#151515", // Black bottom border color (after focus)
                            },
                            "& .MuiInput-underline:hover:before": {
                              borderBottomColor: "#151515", // Black bottom border on hover
                            },
                            "& .MuiInput-underline:disabled:before": {
                              borderBottomStyle: "solid !important",
                              borderBottomColor: "#151515 !important",
                            },
                            "& .Mui-disabled:before": {
                              borderBottomColor: "#151515 !important",
                              borderBottomStyle: "solid !important",
                              cursor: "not-allowed !important",
                            },
                          }}
                        />
                      )}
                      PaperComponent={({ children }) => (
                        <div
                          style={{
                            padding: "10px",
                            background: "#fff",
                            boxShadow: "#1B3720 2px 4px 0px 1px",
                            boxSizing: "border-box",
                          }}
                        >
                          <Paper
                            sx={{
                              color: "#151515",
                              maxHeight: "240px",
                              boxShadow: "none",
                              border: "none",
                              overflowY: "auto",
                              "::-webkit-scrollbar": { width: "6px" },
                              "::-webkit-scrollbar-track": {
                                background: "#f1f1f1",
                              },
                              "::-webkit-scrollbar-thumb": {
                                background: "#1D3B25",
                              },
                              "::-webkit-scrollbar-thumb:hover": {
                                background: "#0f2a14",
                              },
                            }}
                          >
                            {children}
                          </Paper>
                        </div>
                      )}
                    />
                    {/* Selected values displayed below input */}
                    <div
                      style={{
                        marginTop: "8px",
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      {form?.[value.name]?.map((selectedValue) => {
                        const option = value?.options?.find(
                          (opt) => opt?.value === selectedValue
                        );
                        return (
                          <Chip
                            key={option?.value}
                            label={option?.label}
                            onDelete={() => {
                              setForm({
                                ...form,
                                [value.name]: form[value.name]?.filter(
                                  (v) => v !== selectedValue
                                ),
                              });
                            }}
                            sx={{
                              backgroundColor: "#64CE461A",
                              color: "#1B3720",
                              fontSize: "12px",
                              margin: "2px",
                              padding: "4px 4px 4px 10px",
                              borderRadius: "1px",
                              border: "1px solid #64CE46",
                              "& .MuiChip-deleteIcon": {
                                color: "#1B3720",
                              },
                            }}
                          />
                        );
                      })}
                    </div>
                  </Grid>
                );
              }
              if (value.type == "select_fix") {
                return (
                  <Grid item xs={12} md={12} lg={12} key={value.name + "-grid"}>
                    <InputLabel
                      shrink={true}
                      style={{
                        fontWeight: "bold",
                        marginBottom: "12px", // Space between label and input
                        color: "#151515",
                      }}
                    >
                      <span>
                        {value.title}
                        {value?.required && !value?.notShowTag ? (
                          <span
                            style={{
                              color: "#de4444",
                              marginLeft: "5px",
                              opacity: "50%",
                            }}
                          >
                            Mandatory
                          </span>
                        ) : (
                          <span
                            style={{
                              color: "#2E59C8",
                              marginLeft: "5px",
                              opacity: "50%",
                            }}
                          >
                            Optional
                          </span>
                        )}
                      </span>
                    </InputLabel>

                    <Autocomplete
                      // id={value.name} // Unique ID for the input
                      size="small"
                      // options={value.options || []} // Expecting an array of strings
                      // value={form?.[value.name] || ""}
                      disabled={
                        value?.disabled || formType == "View" ? true : false
                      }
                      // options={value.options || []} // Array of objects with label and value
                      // getOptionLabel={(option) => option.label} // Display the label
                      // isOptionEqualToValue={(option, selectedValue) => option.value === selectedValue?.value} // Compare by value
                      // value={value.options.find(opt => opt.value === form?.[value.name]?.value) || null} // Set the selected value

                      id="demo-simple-select-label"
                      options={value.options}
                      name={value.name}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                      label={value.title}
                      value={form?.[value.name] || ""}
                      onChange={(event, newValue) => {
                        setForm({
                          ...form,
                          [value.name]: newValue?.value || newValue,
                        });
                      }}
                      defaultValue={value?.defaultValue}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required={value?.required}
                          variant="standard"
                          placeholder={value?.placeholder} // Placeholder fallback
                          helperText={
                            ((isMulti && errorMessage) || !allowSubmit) &&
                            (form?.[value.name] == undefined ||
                              form?.[value.name]?.length <= 0) &&
                            value?.required && (
                              <p
                                style={{
                                  // textAlign: "right",
                                  marginTop: "-3px",
                                  color: "#DE4444",
                                }}
                              >
                                Please fill this field
                              </p>
                            )
                          }
                          InputLabelProps={{
                            shrink: true,
                            style: {
                              fontWeight: "bold", // Bold label
                            },
                          }}
                          InputProps={{
                            ...params.InputProps,
                            style: {
                              // paddingTop: "10px",
                              color: "#151515", // Text color in input
                            },
                          }}
                          inputProps={{
                            ...params.inputProps,
                            style: {
                              paddingLeft: "10px", // Placeholder padding
                              color: form?.[value.name]
                                ? "#151515"
                                : "rgba(21, 21, 21, 1)", // Light grey placeholder color
                            },
                          }}
                          sx={{
                            "& .MuiInput-underline:before": {
                              borderBottomColor: "#151515", // Default bottom border color (before focus)
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor: "#151515", // Black bottom border color (after focus)
                            },
                            "& .MuiInput-underline:hover:before": {
                              borderBottomColor: "#151515", // Black bottom border on hover
                            },
                          }}
                        />
                      )}
                      // PaperComponent={({ children }) => (
                      //   // <div style={{padding:"10px" , background:"#fff"}}>
                      //   <Paper
                      //     sx={{
                      //       backgroundColor: "#FFF", // Background color for dropdown options
                      //       color: "#151515", // Text color for dropdown options
                      //       maxHeight: "200px", // Scroll if options exceed max height
                      //       overflowY: "auto",
                      //       boxShadow: "#1B3720 2px 4px 0px 1px",
                      //       // paddingRight: "10px",
                      //       "::-webkit-scrollbar": {
                      //         width: "6px",
                      //       },
                      //       "::-webkit-scrollbar-track": {
                      //         background: "#f1f1f1",
                      //       },
                      //       "::-webkit-scrollbar-thumb": {
                      //         background: "#1D3B25", // Dark green scrollbar thumb
                      //         borderRadius: "10px",
                      //       },
                      //       "::-webkit-scrollbar-thumb:hover": {
                      //         background: "#0f2a14",
                      //       },
                      //     }}
                      //   >
                      //     {children}
                      //   </Paper>
                      //   // </div>
                      // )}
                      PaperComponent={({ children }) => (
                        <div
                          style={{
                            padding: "10px",
                            background: "#fff", // Set background color without !important
                            boxShadow: "#1B3720 2px 4px 0px 1px", // Apply box shadow
                            boxSizing: "border-box", // Ensure padding and border are included in width/height
                          }}
                        >
                          <Paper
                            sx={{
                              color: "#151515", // Text color for dropdown options
                              maxHeight: "240px", // Scroll if options exceed max height
                              boxShadow: "none", // Remove Paper shadow to avoid extra outlines
                              border: "none", // Remove border for seamless look
                              overflowY: "auto", // Enable vertical scrolling
                              "::-webkit-scrollbar": {
                                width: "6px", // Scrollbar width
                              },
                              "::-webkit-scrollbar-track": {
                                background: "#f1f1f1", // Scrollbar track color
                              },
                              "::-webkit-scrollbar-thumb": {
                                background: "#1D3B25", // Scrollbar thumb color
                              },
                              "::-webkit-scrollbar-thumb:hover": {
                                background: "#0f2a14", // Hover color for scrollbar thumb
                              },
                            }}
                          >
                            {children}
                          </Paper>
                        </div>
                      )}
                    />
                  </Grid>
                );
              }

              if (value.type == "select3") {
                // const [options, setOptions] = useState(value.options || []); // Store new company value
                const handleSaveNewCompany = async () => {
                  if (newCompany.trim()) {
                    try {
                      // Make an API call to save the new parent company
                      const response = await axios.post("/api/parent-company", {
                        name: newCompany,
                      });
                      if (response.status === 200) {
                        // Add the new company to options list on success
                        setOptions([...options, newCompany]);
                        setForm({
                          ...form,
                          [value.name]: newCompany, // Set the new company as the selected value
                        });
                        setAddingNew(false); // Hide the input field and reset state
                        setNewCompany(""); // Reset the input field
                      }
                    } catch (error) {
                      console.error("Error saving the new company:", error);
                      // Handle the error, like showing an error message
                    }
                  }
                };

                return (
                  <Grid item xs={12} md={12} lg={12} key={value.name + "-grid"}>
                    <InputLabel
                      shrink={true}
                      style={{
                        fontWeight: "bold",
                        marginBottom: "12px", // Space between label and input
                        color: "#151515",
                      }}
                    >
                      <span>
                        {value.title}
                        {value?.required && !value?.notShowTag ? (
                          <span
                            style={{
                              color: "#de4444",
                              marginLeft: "5px",
                              opacity: "50%",
                            }}
                          >
                            Mandatory
                          </span>
                        ) : (
                          <span
                            style={{
                              color: "#2E59C8",
                              marginLeft: "5px",
                              opacity: "50%",
                            }}
                          >
                            Optional
                          </span>
                        )}
                      </span>
                    </InputLabel>

                    <Autocomplete
                      id={value.name} // Unique ID for the input
                      size="small"
                      options={options} // Use options state
                      value={form?.[value.name] || ""}
                      disabled={value?.disabled}
                      onChange={(event, newValue) => {
                        setForm({
                          ...form,
                          [value.name]: newValue || "", // Set the selected value
                        });
                      }}
                      disableCloseOnSelect // Prevent dropdown from closing on select
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required={value?.required}
                          variant="standard"
                          placeholder={value?.placeholder} // Placeholder fallback
                          InputLabelProps={{
                            shrink: true,
                            style: {
                              fontWeight: "bold", // Bold label
                            },
                          }}
                          InputProps={{
                            ...params.InputProps,
                            style: {
                              // paddingTop: "10px",
                              color: "#151515", // Text color in input
                            },
                          }}
                          inputProps={{
                            ...params.inputProps,
                            style: {
                              paddingLeft: "10px", // Placeholder padding
                              color: "rgba(21, 21, 21, 1)", // Light grey placeholder color
                            },
                          }}
                          sx={{
                            "& .MuiInput-underline:before": {
                              borderBottomColor: "#151515", // Default bottom border color (before focus)
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor: "#151515", // Black bottom border color (after focus)
                            },
                            "& .MuiInput-underline:hover:before": {
                              borderBottomColor: "#151515", // Black bottom border on hover
                            },
                          }}
                        />
                      )}
                      PaperComponent={({ children }) => (
                        <Paper
                          sx={{
                            backgroundColor: "#FFF", // Background color for dropdown options
                            color: "#151515", // Text color for dropdown options
                            maxHeight: "150px", // Scroll if options exceed max height
                            overflowY: "auto",
                            "::-webkit-scrollbar": {
                              width: "6px",
                            },
                            "::-webkit-scrollbar-track": {
                              background: "#f1f1f1",
                            },
                            "::-webkit-scrollbar-thumb": {
                              background: "#1D3B25", // Dark green scrollbar thumb
                              borderRadius: "10px",
                            },
                            "::-webkit-scrollbar-thumb:hover": {
                              background: "#0f2a14",
                            },
                          }}
                        >
                          {children}

                          {/* Always show "+ Add Parent Company" option */}
                          <MenuItem
                            onClick={(event) => {
                              event.stopPropagation(); // Prevent dropdown from closing
                              setAddingNew(true); // Show input field for new company
                            }}
                            style={{ color: "#2E59C8" }}
                          >
                            + Add Parent Company
                          </MenuItem>

                          {/* Show input and save button if adding new parent company */}
                          {addingNew && (
                            <div
                              style={{
                                padding: "10px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <TextField
                                variant="standard"
                                value={newCompany}
                                placeholder="Type Parent Company"
                                onChange={(e) => setNewCompany(e.target.value)}
                                style={{ flex: 1 }}
                              />
                              <Button
                                onClick={(event) => {
                                  event.stopPropagation(); // Prevent dropdown from closing
                                  handleSaveNewCompany();
                                }}
                                style={{
                                  color: "#1D3B25",
                                  marginLeft: "10px",
                                  textTransform: "none",
                                }}
                              >
                                Save
                              </Button>
                            </div>
                          )}
                        </Paper>
                      )}
                    />
                  </Grid>
                );
              }
              if (value.type == "mobile") {
                return (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={value?.size || 6}
                    key={index + "-grid"}
                    display={value.display || "block"}
                  >
                    <TextField
                      autoComplete={value.title}
                      // error={false}
                      name={value.name}
                      fullWidth
                      type={value.variant || "text"}
                      id={value.id}
                      required={value?.required}
                      // placeholder={value.placeholder}d
                      variant="outlined"
                      label={value.title}
                      value={form?.[value.name] || value?.default || ""}
                      helperText={
                        (((isMulti && errorMessage) || !allowSubmit) &&
                          (form?.[value.name] == undefined ||
                            form?.[value.name]?.length <= 0) &&
                          value?.required && (
                            <p
                              style={{
                                // textAlign: "right",
                                marginTop: "-3px",
                                color: "#DE4444",
                              }}
                            >
                              Please fill this field
                            </p>
                          )) ||
                        (((isMulti && errorMessage) || !allowSubmit) &&
                          (form?.[value.name] == undefined ||
                            form?.[value.name]?.length < 14) &&
                          value?.required && (
                            <p
                              style={{
                                // textAlign: "right",
                                marginTop: "-3px",
                                color: "#DE4444",
                              }}
                            >
                              Mobile number must be 10 digits long.
                            </p>
                          ))
                      }
                      // focused
                      // value={mobileNumber}
                      onChange={handleMobileChange}
                      InputProps={{
                        startAdornment: value?.symbol && (
                          <InputAdornment color="secondary">
                            {value?.symbol}
                          </InputAdornment>
                        ),
                        style: {
                          borderRadius: 8,
                          color: form?.[value.name] ? "#151515" : "#BEBEBE", // Font color for the input field
                          // backgroundColor: value.disabled
                          //   ? "#f2f2f2"
                          //   : "transparent", // Disabled background color
                          // paddingLeft: "10px", // Padding for the input field
                        },
                        inputProps: {
                          min: value?.min,
                          max: value?.max,
                          step: value?.step || 1,
                          maxLength: value?.maxLength,
                          style: {
                            color: form?.[value.name]
                              ? "#151515"
                              : "rgba(21, 21, 21, 1)", // Placeholder color to light grey
                            paddingLeft: "10px", // Left padding for the placeholder
                          },
                        },
                      }}
                      // InputLabelProps={{
                      //   shrink: true, // Keeps the label at the top when focused
                      //   style: {
                      //     fontWeight: "bold", // Bold label style
                      //     marginBottom: "10px",
                      //   },
                      // }}
                      sx={{
                        "& .MuiInput-underline:before": {
                          borderBottomColor: "#151515", // Default bottom border
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor: "#151515", // Focused bottom border
                        },
                        "& .MuiInput-underline:hover:before": {
                          borderBottomColor: "#151515", // Hover bottom border
                        },
                        "& .MuiInput-underline:disabled:before": {
                          borderBottomStyle: "solid  !important", // Ensure solid line for disabled
                          borderBottomColor: "#151515  !important", // Disabled underline color
                        },
                        "& .Mui-disabled:before": {
                          borderBottomColor: "#151515  !important", // Disabled underline color
                          borderBottomStyle: "solid  !important", // Ensure a solid line for disabled
                          cursor: "not-allowed !important",
                        },
                        "& input:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0 100px #FAFFF3 inset", // Red background for autofill
                          WebkitTextFillColor: "#151515", // Text color for autofilled content
                        },
                        // "& .MuiInput-underline:disabled": {
                        //   cursor: "not-allowed", // Optional: change the cursor style for disabled
                        // },
                      }}
                      disabled={
                        value.disabled || formType == "View" ? true : false
                      }
                    />
                  </Grid>
                );
              }
              if (value.type == "label") {
                return (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    key={index + "-grid"}
                    display={value.display || "block"}
                  >
                    <div
                      style={{
                        color: "#1B3720",
                        fontWeight: "700",
                        textAlign: "left",
                        marginLeft: "1rem",
                      }}
                    >
                      {value?.label}
                    </div>
                  </Grid>
                );
              }
              if (value.type == "labelBtn") {
                return (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    key={index + "-grid"}
                    display={value.display || "block"}
                  >
                    <div
                      style={{
                        color: value?.color || "#1B3720",
                        fontWeight: "700",
                        textAlign: "center",
                        marginLeft: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onClick={(e) => value?.handleClick()}
                    >
                      <span style={{ marginTop: "5px" }}>{value?.icon}</span>
                      <span>{value?.text}</span>
                    </div>
                  </Grid>
                );
              }
              if (value.type == "image") {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    xl={value?.size || 2}
                    key={index + "-grid"}
                    display={value.display || "block"}
                  >
                    <label htmlFor={index + value?.name} className="btn">
                      {" "}
                      <Box
                        sx={{
                          background: "#F3F6F9",
                          borderRadius: "10px",
                          padding: "10px 5px",
                          paddingBottom: "0px",
                          textAlign: "center",
                        }}
                        className="dark-BG-101010"
                      >
                        <img
                          src={
                            form?.[value.name]
                              ? typeof form?.[value.name] == "string"
                                ? IMAGE + form?.[value.name]
                                : URL.createObjectURL(form?.[value.name])
                              : value?.image || imageJPG
                          }
                          alt="Icon"
                          style={{ borderRadius: "10px" }}
                          height={value?.imageHeight || "150px"}
                        />

                        <Typography mt={1} fontWeight="500" fontSize="13px">
                          {value?.title}
                          {value?.required === true ? (
                            <span
                              style={{
                                fontSize: "15px",
                                color: "red",
                                marginLeft: "10px",
                              }}
                            >
                              *
                            </span>
                          ) : (
                            ""
                          )}
                        </Typography>
                        {value?.subtitle && (
                          <>
                            <span style={{ fontSize: "9px", color: "red" }}>
                              {value?.subtitle}
                            </span>
                            <br />
                          </>
                        )}
                        {value?.subsubtitle && (
                          <>
                            <span style={{ fontSize: "9px", color: "red" }}>
                              {value?.subsubtitle}
                            </span>
                            <br />
                          </>
                        )}
                        {value?.subsubsubtitle && (
                          <>
                            <span style={{ fontSize: "9px", color: "red" }}>
                              {value?.subsubsubtitle}
                            </span>{" "}
                            <br />
                          </>
                        )}

                        <input
                          type="file"
                          id={index + value?.name}
                          name={value.name}
                          required={value?.required && !isEdit}
                          crossOrigin="true"
                          placeholder="Choose Image"
                          style={{
                            visibility: "hidden",
                            position: "relative",
                            zIndex: "10",
                            height: "100%",
                          }}
                          accept={value?.accept || ".jpeg,.png,.jpg,.srt"}
                          onClick={(event) => {
                            event.target.value = [];
                          }}
                          onChange={(event) => {
                            if (
                              Math.round(event.target.files[0]?.size / 1024) >
                              1024
                            ) {
                              setOpenAdError(true);
                              setPopupContent(
                                "File size should not be more than 1 MB."
                              );
                            } else if (
                              ![
                                "image/jpeg",
                                "image/png",
                                "image/jpg",
                                "text/srt",
                                "application/pdf",
                                "",
                              ].includes(event.target.files[0]?.type)
                            ) {
                              setOpenAdError(true);

                              setPopupContent(
                                "Please Upload Valid file Format 1"
                              );
                            } else {
                              setForm({
                                ...form,
                                [event.target.name]: event.target.files[0],
                              });
                            }
                          }}
                        />
                      </Box>
                    </label>
                    <p
                      style={{
                        fontSize: "10px",
                        color: "red",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      {!allowSubmit &&
                        (form[value.name] == "" ||
                          form[value.name] == [] ||
                          form[value.name] == null ||
                          form?.[value.name]?.length <= 0) &&
                        value?.required &&
                        "Please fill this field"}
                    </p>
                    <p
                      style={{
                        fontSize: "10px",
                        color: "red",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      {isMulti &&
                        errorMessage &&
                        (form?.[value.name] == undefined ||
                          form?.[value.name]?.length <= 0) &&
                        value?.required &&
                        "Please fill this field"}
                    </p>
                  </Grid>
                );
              }
              if (value.type == "image5") {
                return (
                  <Grid item xs={12} md={value.size || 6} key={index}>
                    <InputLabel shrink sx={inputLabelStyles}>
                      {value.title}
                    </InputLabel>
                    <input
                      type="file"
                      id={`file-upload-${value.name}`}
                      ref={(el) => (fileInputRefs.current[value.name] = el)}
                      onChange={(e) => handleFileChange(value.name, e)}
                      accept={value.accept || "*"}
                      style={{ display: "none" }}
                    />
                    {!filePreviews[value.name] ? (
                      <Box
                        component="label"
                        htmlFor={`file-upload-${value.name}`}
                        sx={fileUploadStyles}
                      >
                        <CloudUpload
                          fontSize="large"
                          sx={{
                            color: darkMode
                              ? theme.palette.text.secondary
                              : theme.palette.text.primary,
                            mb: 1,
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            color: darkMode
                              ? theme.palette.text.secondary
                              : theme.palette.text.primary,
                          }}
                        >
                          Click to upload or drag and drop
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: darkMode
                              ? theme.palette.text.secondary
                              : theme.palette.text.primary,
                          }}
                        >
                          {value.description ||
                            "Supported formats: " + (value.accept || "Any")}
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          border: `1px solid ${
                            darkMode
                              ? theme.palette.grey[700]
                              : theme.palette.grey[300]
                          }`,
                          borderRadius: 1,
                          p: 2,
                          position: "relative",
                        }}
                      >
                        {typeof filePreviews[value.name] === "string" &&
                        filePreviews[value.name].startsWith("data:image") ? (
                          <img
                            src={filePreviews[value.name]}
                            alt="Preview"
                            style={{
                              maxWidth: "100%",
                              maxHeight: "150px",
                              display: "block",
                              margin: "0 auto",
                            }}
                          />
                        ) : (
                          <Typography
                            sx={{
                              color: darkMode
                                ? theme.palette.text.primary
                                : theme.palette.text.primary,
                            }}
                          >
                            {filePreviews[value.name]}
                          </Typography>
                        )}
                        <IconButton
                          size="small"
                          onClick={() => removeFile(value.name)}
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            color: darkMode
                              ? theme.palette.error.light
                              : theme.palette.error.main,
                            backgroundColor: darkMode
                              ? theme.palette.grey[800]
                              : theme.palette.grey[200],
                            "&:hover": {
                              backgroundColor: darkMode
                                ? theme.palette.grey[700]
                                : theme.palette.grey[300],
                            },
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                        <Button
                          size="small"
                          variant="outlined"
                          component="label"
                          htmlFor={`file-upload-${value.name}`}
                          sx={{
                            mt: 1,
                            color: darkMode
                              ? theme.palette.text.secondary
                              : theme.palette.text.primary,
                            borderColor: darkMode
                              ? theme.palette.grey[600]
                              : theme.palette.grey[400],
                          }}
                        >
                          Change File
                        </Button>
                      </Box>
                    )}
                  </Grid>
                );
              }
              if ((value?.type == "button" && value?.forceShow) || !isMulti) {
                return (
                  <Grid
                    item
                    xs={value?.size || 12}
                    lg={value?.size}
                    key={index + "-grid"}
                    textAlign={value?.align || "center"}
                    display={value?.display || "block"}
                  >
                    <Button
                      type={value.forceShow && "button"}
                      variant="contained"
                      disabled={value?.disabled}
                      style={{
                        background: value?.noBg
                          ? ""
                          : "linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)",
                      }}
                      sx={{
                        mt: 1,
                        textTransform: "capitalize",
                        borderRadius: "8px",
                        fontWeight: "500",
                        fontSize: "13px",
                        padding: value?.padding || "12px 20px",
                        minWidth: "0",
                        minHeight: "0",
                        color: "var(--tableHeadFontColor) !important",
                      }}
                      onClick={(e) =>
                        value.forceShow
                          ? value?.handleClick()
                          : handleFormSubmit(e)
                      }
                    >
                      {value.forceShow
                        ? value.title
                        : isEdit
                        ? "Update"
                        : value.title}
                    </Button>
                    {/* <LoadingButton
                                    type={value?.forceShow && "button"}
                                    variant="contained"
                                    disabled={value?.disabled}
                                    loading={loading}
                                    // endIcon={<SendIcon />}
                        // loading={loading}
                                     loadingPosition="end"
                                    style={{
                                      background:value?.noBg
                                        ? ""
                                        : "linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)",
                                    }}
                                    sx={{
                                      mt: 1,
                                      textTransform: "capitalize",
                                      borderRadius: "8px",
                                      fontWeight: "500",
                                      fontSize: "13px",
                                      padding: value?.padding || "12px 20px",
                                      minWidth: "0",
                                      minHeight: "0",
                                      color: "var(--tableHeadFontColor) !important",
                                    }}
                                    onClick={(e) =>
                                      value?.forceShow
                                        ? value?.handleClick()
                                        : handleFormSubmit(e)
                                    }
                                  >
                                    {loading ? <span style={{paddingRight:"1rem"}}>Sending...</span> : value?.forceShow? value?.title: isEdit? "Update": value?.title}
                                  </LoadingButton> */}
                  </Grid>
                );
              }
            })}
          </Grid>
        </Box>
      </Card>
    </>
  );
}
