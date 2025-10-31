import React, { useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import "./FormSection.css";
import {
  Autocomplete,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { CloudUpload, Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import DynamicFormModal from "./DynamicFormModal";
import DynamicTable from "./DynamicTable";
import { IMAGE } from "../../../api";
import dayjs from "dayjs";
import { DatePicker, TimeField } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useSelector } from "react-redux";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
const NewForm = ({
  open,
  setOpen,
  formStructure,
  handleSubmit,
  formData,
  setFormData,
  onClose,
  title,
  isCountry,
  isConfirmBtn,
  isEdit,
  handleConfirmSubmit,
  setUsedCountries,
}) => {
  const darkMode = JSON.parse(sessionStorage.getItem("darkMode"));
  // console.log(darkMode, "newDarkMode");
  const theme = useTheme();
  const toggleDrawer = (anchor, open) => (event) => {
    setOpen(false);
  };

  // console.log(formData, setFormData, "fgdggfgdffdfddffgfd");
  const casts = useSelector((state) => state?.masters?.casts);
  const countries = useSelector((state) => state?.masters?.countries);
  const language = useSelector((state) => state?.masters?.languages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenSubTitle, setIsModalOpenSubTitle] = useState(false);
  const [isModalOpenAudio, setIsModalOpenAudio] = useState(false);
  const [isModalOpenCountry, setIsModalOpenCountry] = useState(false);
  const [tableData1, setTableData1] = useState([]);
  const [tableDataCountry, setTableDataCountry] = useState([]);
  const [tableDataSubTitle, setTableDataSubTitle] = useState([]);
  const [tableDataAudio, setTableDataAudio] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingIndexSubtitle, setEditingIndexSubtitle] = useState(null);
  const [editingIndexAudio, setEditingIndexAudio] = useState(null);
  const [editingIndexCountry, setEditingIndexCountry] = useState(null);
  const [allowSubmit, setAllowSubmit] = useState(true);
  const [form, setForm] = useState({});
  const [formSubTitle, setFormSubTitle] = useState({});
  const [formAudioFile, setFormAudioFile] = useState({});
  const [formCountry, setFormCountry] = useState({});
  const [imageDimensions, setImageDimensions] = useState({});

  // const [formData, setFormData] = useState({});

  // function getDateFromHours(time) {
  //   time = time.split(":");
  //   let now = new Date();
  //   return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
  // }
  function getDateFromHours(timeStr) {
    // Example input: "13:45:00"
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    const now = new Date();
    now.setHours(hours, minutes, seconds || 0, 0);
    return now;
  }
  useEffect(() => {
    if (editingIndex !== null && tableData1[editingIndex]) {
      setForm(tableData1[editingIndex]);
    } else {
      setForm({});
    }
  }, [editingIndex, tableData1]);
  useEffect(() => {
    if (editingIndexCountry !== null && tableDataCountry[editingIndexCountry]) {
      setFormCountry(tableDataCountry[editingIndexCountry]);
    } else {
      setFormCountry({});
    }
  }, [editingIndexCountry, tableDataCountry]);
  useEffect(() => {
    if (editingIndexAudio !== null && tableDataAudio[editingIndexAudio]) {
      setFormAudioFile(tableDataAudio[editingIndexAudio]);
    } else {
      setFormAudioFile({});
    }
  }, [editingIndexAudio, tableDataAudio]);
  useEffect(() => {
    if (
      editingIndexSubtitle !== null &&
      tableDataSubTitle[editingIndexSubtitle]
    ) {
      setFormSubTitle(tableDataSubTitle[editingIndexSubtitle]);
    } else {
      setFormSubTitle({});
    }
  }, [editingIndexSubtitle, tableDataSubTitle]);

  const [filePreviews, setFilePreviews] = useState({});
  const fileInputRefs = useRef({});
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const inputLabelStyles = {
    color: darkMode ? theme.palette.text.secondary : theme.palette.text.primary,
  };

  const fileUploadStyles = {
    border: `2px dashed ${
      darkMode ? theme.palette.grey[700] : theme.palette.grey[400]
    }`,
    borderRadius: 2,
    padding: 3,
    textAlign: "center",
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "var(--themeColorLighterShade)",

    "&:hover": {
      borderColor: theme.palette.primary.main,
      // backgroundColor: darkMode
      //   ? theme.palette.grey[700]
      //   : theme.palette.grey[200],
    },
  };

  // const handleFileChange = (fieldName, event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   // Store the file object
  //   handleChange(fieldName, file);

  //   // Create preview for images
  //   if (file.type.startsWith("image/")) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setFilePreviews((prev) => ({
  //         ...prev,
  //         [fieldName]: e.target.result,
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setFilePreviews((prev) => ({
  //       ...prev,
  //       [fieldName]: file.name,
  //     }));
  //   }
  // };

  useEffect(() => {
    if (!open) {
      setFilePreviews({});
      setImageDimensions({});
      // setFormData({});
      // setAllowSubmit(true); // Reset submit state
      // setFilePreviews({});
      setTableData1([]);
      // setTableDataSubTitle([]);
      // setTableDataAudio([]);
      setTableDataCountry([]);
    }
  }, [open]);
  useEffect(() => {
    Object.keys(formData).forEach((key) => {
      const fileValue = formData[key];

      // Only process string paths (i.e., image URLs from the API)
      if (typeof fileValue === "string") {
        const fileExtension = fileValue.split(".").pop().toLowerCase();
        const isImage = ["jpg", "jpeg", "png", "gif"].includes(fileExtension);

        if (isImage && !imageDimensions[key]) {
          const img = new Image();
          img.onload = () => {
            setImageDimensions((prev) => ({
              ...prev,
              [key]: {
                width: img.width,
                height: img.height,
              },
            }));
          };
          img.src = `${IMAGE}${fileValue}`;
        }
      }
    });
  }, [formData, IMAGE]); // IMAGE is your base path

  const handleFileChange = (fieldName, event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Store the file object
    handleChange(fieldName, file);

    // Create preview
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImageDimensions((prev) => ({
            ...prev,
            [fieldName]: {
              width: img.width,
              height: img.height,
            },
          }));
        };
        img.src = e.target.result;

        setFilePreviews((prev) => ({
          ...prev,
          [fieldName]: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreviews((prev) => ({
        ...prev,
        [fieldName]: file.name,
      }));
    }
  };
  const renderFilePreview = (fieldName) => {
    // Case 1: New file upload (preview available)
    if (filePreviews[fieldName]) {
      if (typeof filePreviews[fieldName] === "string") {
        if (filePreviews[fieldName].startsWith("data:image")) {
          return (
            <img
              src={filePreviews[fieldName]}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "150px",
                display: "block",
                margin: "0 auto",
                borderRadius: "10px",
              }}
            />
          );
        }
        return (
          <Typography
            sx={{
              color: darkMode
                ? theme.palette.text.primary
                : theme.palette.text.primary,
            }}
          >
            {filePreviews[fieldName]}
          </Typography>
        );
      }
    }

    // Case 2: Existing file from API
    if (formData[fieldName]) {
      // If it's a File object (new selection)
      if (formData[fieldName] instanceof File) {
        return (
          <Typography
            sx={{
              color: darkMode
                ? theme.palette.text.primary
                : theme.palette.text.primary,
            }}
          >
            {formData[fieldName].name}
          </Typography>
        );
      }

      // If it's a string path from API
      if (typeof formData[fieldName] === "string") {
        const fileExtension = formData[fieldName]
          .split(".")
          .pop()
          .toLowerCase();
        const isImage = ["jpg", "jpeg", "png", "gif"].includes(fileExtension);

        if (isImage) {
          return (
            <img
              src={`${IMAGE}${formData[fieldName]}`}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "150px",
                display: "block",
                margin: "0 auto",
                borderRadius: "10px",
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "path_to_fallback_image.jpg";
              }}
            />
          );
        } else {
          return (
            <Typography
              sx={{
                color: darkMode
                  ? theme.palette.text.primary
                  : theme.palette.text.primary,
              }}
            >
              {formData[fieldName].split("/").pop()}
            </Typography>
          );
        }
      }
    }

    // Default case
    return (
      <Typography
        sx={{
          color: darkMode
            ? theme.palette.text.primary
            : theme.palette.text.primary,
        }}
      >
        File selected
      </Typography>
    );
  };
  // useMemo(() => {
  //   if (!open) {
  //     // setFilePreviews({})
  //   }
  // }, [open]);
  console.log(filePreviews, "zdfsaaasasa");
  const handleClose = () => {
    // onClose();
    // toggleDrawer("right", false);
    setTimeout(() => {
      setFormData({});
      setAllowSubmit(true); // Reset submit state
      setFilePreviews({});
      setTableData1([]);
      setTableDataSubTitle([]);
      setTableDataAudio([]);
      setTableDataCountry([]);
    }, 100);
  };

  const removeFile = (fieldName) => {
    handleChange(fieldName, null);
    setFilePreviews((prev) => {
      const newPreviews = { ...prev };
      delete newPreviews[fieldName];
      return newPreviews;
    });
    if (fileInputRefs.current[fieldName]) {
      fileInputRefs.current[fieldName].value = "";
    }
  };
  const tableColumns = [
    { title: "Name", field: "name" },
    { title: "Role", field: "role" },
    { title: "Character", field: "character" },
  ];

  const handleSubmitCast = (data) => {
    if (editingIndex !== null) {
      // Update existing item
      const updatedData = [...tableData1];
      updatedData[editingIndex] = data;
      setTableData1(updatedData);
      setEditingIndex(null);
      setIsModalOpen(false);
    } else {
      // Add new item
      setTableData1([...tableData1, data]);
      setIsModalOpen(false);
    }
  };
  const handleSubmitCountry = (data) => {
    if (editingIndexCountry !== null) {
      // Update existing item
      const updatedData = [...tableDataCountry];
      updatedData[editingIndexCountry] = data;
      setTableDataCountry(updatedData);
      setEditingIndexCountry(null);
      setIsModalOpenCountry(false);
    } else {
      // Add new item
      setTableDataCountry([...tableDataCountry, data]);
      setIsModalOpenCountry(false);
    }
  };
  const handleSubmitSubtitle = (data) => {
    if (editingIndexSubtitle !== null) {
      // Update existing item
      const updatedData = [...tableDataSubTitle];
      updatedData[editingIndexSubtitle] = data;
      setTableDataSubTitle(updatedData);
      setEditingIndexSubtitle(null);
      setIsModalOpenSubTitle(false);
    } else {
      // Add new item
      setTableDataSubTitle([...tableDataSubTitle, data]);
      setIsModalOpenSubTitle(false);
    }
  };
  const handleSubmitAudio = (data) => {
    if (editingIndexAudio !== null) {
      // Update existing item
      const updatedData = [...tableDataAudio];
      updatedData[editingIndexAudio] = data;
      setTableDataAudio(updatedData);
      setEditingIndexAudio(null);
      setIsModalOpenAudio(false);
    } else {
      // Add new item
      setTableDataAudio([...tableDataAudio, data]);
      setIsModalOpenAudio(false);
    }
  };

  // Handle edit
  const handleEdit = (index, row) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = (index) => {
    const newData = tableData1.filter((_, i) => i !== index);
    setTableData1(newData);
  };
  const handleFormSubmit = (e, isConfirmBtn) => {
    e.preventDefault(); // Prevent default submission

    let requiredFieldCount = 0; // Total required fields count
    let requiredFieldFilledCount = 0; // Filled required fields count
    let emailValid = true; // Email validity flag
    let mobileValid = true; // Mobile number validity flag
    let pancardValid = true; // PAN validity flag
    let gstValid = true; // GST validity flag

    formStructure?.forEach((section, id) => {
      section?.fields?.forEach((field) => {
        if (field.required && field.display !== "none") {
          requiredFieldCount++; // Count all required fields
          const fieldValue = String(formData[field.name] || "").trim(); // Ensure the field value is a string
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
      // console.log(field.required ,formStructure,"Hiii Parth Check THis")
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
      isConfirmBtn ? handleConfirmSubmit(e) : handleSubmit(e); // Call submit handler
    } else {
      setAllowSubmit(false); // Block submission
      console.error({
        requiredFieldCount,
        requiredFieldFilledCount,
        emailValid,
        mobileValid,
        pancardValid,
        formData,
      }); // Log detailed debug info
    }
  };

  // useMemo(() => {
  //   if (tableData1) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       cast: tableData1,
  //     }));
  //   }
  // }, [tableData1]);
  useMemo(() => {
    if (tableData1 && casts?.data) {
      const updatedCast = tableData1?.map((item) => {
        const matchedCast = casts.data.find((c) => c.cast_name === item.cast);
        return {
          ...item,
          cast_id: matchedCast?.id || null, // Assign null if not found
        };
      });

      setFormData((prev) => ({
        ...prev,
        cast: updatedCast,
      }));
    }
  }, [tableData1, casts]);
  useMemo(() => {
    if (isEdit && open) {
      console.log(isEdit, open, formData?.cast, "Heyyy Parth");

      setTableData1(formData?.cast);
      setTableDataCountry(formData?.countrys);
    }
  }, [isEdit]);
  useMemo(() => {
    if (tableDataCountry && countries?.data) {
      const updatedCountry = tableDataCountry?.map((item) => {
        const matchedCountry = countries?.data?.find(
          (c) => c.country_name === item.country
        );
        return {
          ...item,
          country_id: matchedCountry?.id || null, // Assign null if not found
        };
      });

      setFormData((prev) => ({
        ...prev,
        countrys: updatedCountry,
      }));
    }
  }, [tableDataCountry, countries]);
  useMemo(() => {
    if (tableDataAudio && language?.data) {
      const updatedAudio = tableDataAudio?.map((item) => {
        const matchedLanguage = language?.data?.find(
          (c) => c.language_name === item.language
        );
        return {
          ...item,
          language_id: matchedLanguage?.id || null, // Assign null if not found
        };
      });

      setFormData((prev) => ({
        ...prev,
        audio_file: updatedAudio,
      }));
    }
  }, [tableDataAudio, language]);

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
      setFormData((prev) => ({
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
  // const sections = CreateFormstr();
  const list = () => (
    <Box
      sx={{
        height: "60px", // fixed height for header
        flexShrink: 0,
        color: "var(--themeFontColor)",
        padding: "15px",
        letterSpacing: "2px",
        fontSize: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>{title}</span>
      <span onClick={() => (handleClose(), onClose())}>
        <CloseIcon />
      </span>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={"right"}
          open={open}
          // onClose={handleClose}
          PaperProps={{
            sx: {
              width: "80%",
              backgroundColor: "var(--themeColor)",
              boxShadow: "var(--themeShadow)",
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              padding: "10px",
            },
          }}
        >
          {list()}

          {/* Scrollable middle content */}
          <Box
            className={`scrollable-content ${
              darkMode ? "dark-scrollbar" : "light-scrollbar"
            }`}
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              // backgroundColor: "red",
              paddingRight: "12px",
            }}
          >
            {/* Add your scrollable content here */}
            <div className="form-container">
              {formStructure?.map((section, idx) => (
                <fieldset
                  key={idx}
                  className="form-section"
                  style={{
                    border: darkMode
                      ? "3px solid rgba(255, 255, 255, 0.1)"
                      : "2px solid #dbdfe7",
                  }}
                >
                  <legend className="form-legend">{section?.title}</legend>
                  <Grid container spacing={2}>
                    {/* <div className="inputs-grid"> */}
                    {/* {console.log(section, "Heehehehehehehehe")} */}
                    {section?.fields?.map((value, index) => {
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
                            <InputLabel
                              shrink
                              style={{
                                // fontWeight: "bold",
                                marginBottom: "12px",
                                color: "#151515",
                                fontSize: "16px",
                                lineHeight: "26px",
                                textAlign: "left",
                              }}
                            >
                              {value?.title}
                              {value?.required && (
                                <span
                                  style={{ color: "red", paddingLeft: "5px" }}
                                >
                                  *
                                </span>
                              )}
                            </InputLabel>
                            <TextField
                              // autoComplete={value.title}
                              name={value.name}
                              fullWidth
                              id={value.id}
                              type={value.variant || "text"}
                              required={value?.required}
                              rows={value.row}
                              multiline={value?.multiline}
                              // variant="standard"
                              placeholder={value.placeholder}
                              // label={value.title}
                              value={
                                formData?.[value.name] || value?.default || ""
                              }
                              helperText={
                                (!allowSubmit &&
                                  value.required &&
                                  !formData?.[value.name] && (
                                    <p
                                      style={{
                                        // textAlign: "right",
                                        marginTop: "-3px",
                                        color: "red",
                                      }}
                                    >
                                      Please fill this field
                                    </p>
                                  )) ||
                                (value.isEmail &&
                                  formData?.[value.name] &&
                                  !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
                                    formData[value.name]
                                  ) && (
                                    <p
                                      style={{
                                        // textAlign: "right",
                                        marginTop: "-3px",
                                        color: "red",
                                      }}
                                    >
                                      Invalid email format
                                    </p>
                                  )) ||
                                (value.isPancard &&
                                  formData?.[value.name] &&
                                  !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(
                                    formData[value.name]
                                  ) && (
                                    <p
                                      style={{
                                        // textAlign: "right",
                                        marginTop: "-3px",
                                        color: "red",
                                      }}
                                    >
                                      Invalid PAN format
                                    </p>
                                  )) ||
                                (value.isGst &&
                                  formData?.[value.name] &&
                                  !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/.test(
                                    formData[value.name]
                                  ) && (
                                    <p
                                      style={{
                                        // textAlign: "right",
                                        marginTop: "-3px",
                                        color: "red",
                                      }}
                                    >
                                      Invalid GST number format
                                    </p>
                                  )) ||
                                  (value?.displayText && 
                                    <p>{value?.displayText}</p>
                                  )
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
                                  const emailRegex =
                                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                                  if (
                                    !emailRegex.test(event.target.value) &&
                                    event.target.value !== ""
                                  ) {
                                    setFormData({
                                      ...formData,
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
                                setFormData((prev) => ({
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
                                // endAdornment : (
                                //   <InputAdornment color ='red'></InputAdornment>
                                // ),
                                startAdornment: value?.symbol && (
                                  <InputAdornment color="secondary">
                                    {value?.symbol}
                                  </InputAdornment>
                                ),

                                sx: {
                                  borderRadius: 2,
                                  backgroundColor:
                                    "var(--themeColorLighterShade)",
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor:
                                      "var(--themeColorLighterShade)  !important",
                                  },
                                  "& input:-webkit-autofill": {
                                    WebkitBoxShadow: darkMode
                                      ? "0 0 0 100px rgb(22, 22, 22) inset"
                                      : "0 0 0 100px rgb(255, 255, 255) inset", // Red background for autofill
                                    WebkitTextFillColor:
                                      "var(--themeFontColor)", // Text color for autofilled content
                                  },
                                },
                                inputProps: {
                                  min: value?.min,
                                  max: value?.max,
                                  step: value?.step || 1,
                                  maxLength: value?.maxLength,
                                  style: {
                                    color: "var(--themeFontColor)", // Placeholder color to light grey
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

                              // sx={{
                              //   "& .MuiInput-underline:before": {
                              //     borderBottomColor: "#151515", // Default bottom border
                              //   },
                              //   "& .MuiInput-underline:after": {
                              //     borderBottomColor: "#151515", // Focused bottom border
                              //   },
                              //   "& .MuiInput-underline:hover:before": {
                              //     borderBottomColor: "#151515", // Hover bottom border
                              //   },
                              //   "& .MuiInput-underline:disabled:before": {
                              //     borderBottomStyle: "solid  !important", // Ensure solid line for disabled
                              //     borderBottomColor: "#151515  !important", // Disabled underline color
                              //   },
                              //   "& .Mui-disabled:before": {
                              //     borderBottomColor: "#151515  !important", // Disabled underline color
                              //     borderBottomStyle: "solid  !important", // Ensure a solid line for disabled
                              //     cursor: "not-allowed !important",
                              //   },
                              //   "& input:-webkit-autofill": {
                              //     WebkitBoxShadow: "0 0 0 100px #FAFFF3 inset", // Red background for autofill
                              //     WebkitTextFillColor: "#151515", // Text color for autofilled content
                              //   },
                              //   // "& .MuiInput-underline:disabled": {
                              //   //   cursor: "not-allowed", // Optional: change the cursor style for disabled
                              //   // },
                              // }}
                              disabled={value.disabled ? true : false}
                            />
                            {(value.isLimit == "Description" ||
                              value.showLimit) && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <p style={{ color: "var(--themeFontColor)" }}>
                                  {formData?.[value.name]?.length}/
                                  {value?.maxLength || "200"}{" "}
                                  {formData?.[value.name]?.length >=
                                    value?.maxLength && (
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
                      if (value.type === "date") {
                        return (
                          <Grid
                            item
                            xs={12}
                            md={12}
                            lg={value?.size || 6}
                            key={index + "-grid"}
                            display={value.display || "block"}
                          >
                            <InputLabel
                              shrink={true}
                              style={{
                                marginBottom: "12px",
                                color: darkMode ? "#ffffff" : "#151515",
                              }}
                            >
                              <span>{value.title}</span>
                              {value?.required && (
                                <span
                                  style={{ color: "red", paddingLeft: "5px" }}
                                >
                                  *
                                </span>
                              )}
                            </InputLabel>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                // label={value.placeholder || value.title}
                                value={
                                  formData?.[value.name]
                                    ? dayjs(formData?.[value.name])
                                    : null
                                }
                                minDate={
                                  value.min ? dayjs(value.min) : undefined
                                }
                                maxDate={
                                  value.max ? dayjs(value.max) : undefined
                                }
                                defaultValue={
                                  formData?.[value.name]
                                    ? undefined
                                    : value.default
                                    ? dayjs(value.default)
                                    : undefined
                                }
                                onChange={(newValue) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    [value.name]: newValue
                                      ? dayjs(newValue).format("YYYY-MM-DD")
                                      : "",
                                  }));
                                }}
                                slots={{
                                  openPickerIcon: CalendarTodayIcon,
                                }}
                                slotProps={{
                                  textField: {
                                    fullWidth: true,
                                    required: value?.required,
                                    placeholder: value.placeholder,
                                    InputProps: {
                                      startAdornment: value?.symbol && (
                                        <InputAdornment position="start">
                                          {value.symbol}
                                        </InputAdornment>
                                      ),
                                      sx: {
                                        borderRadius: 2,
                                        backgroundColor:
                                          "var(--themeColorLighterShade)",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                          borderColor:
                                            "var(--themeColorLighterShade) !important",
                                        },
                                        "& input:-webkit-autofill": {
                                          WebkitBoxShadow: darkMode
                                            ? "0 0 0 100px rgb(22, 22, 22) inset"
                                            : "0 0 0 100px rgb(255, 255, 255) inset",
                                          WebkitTextFillColor:
                                            "var(--themeFontColor)",
                                        },
                                      },
                                    },
                                  },
                                  openPickerIcon: {
                                    sx: { color: "#DE4444" },
                                  },
                                }}
                              />
                            </LocalizationProvider>
                            {!allowSubmit &&
                              value.required &&
                              !formData[value.name] && (
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: "red !important",
                                    display: "block",
                                    mb: 1,
                                  }}
                                >
                                  Please fill this field
                                </Typography>
                              )}
                          </Grid>
                        );
                      }
                      if (value.type === "time") {
                        return (
                          <Grid
                            item
                            xs={12}
                            md={12}
                            lg={value?.size || 6}
                            key={index + "-grid"}
                            display={value.display || "block"}
                          >
                            <InputLabel
                              shrink={true}
                              style={{
                                marginBottom: "12px",
                                color: darkMode ? "#ffffff" : "#151515",
                              }}
                            >
                              <span>{value.title}</span>
                              {value?.required && (
                                <span
                                  style={{ color: "red", paddingLeft: "5px" }}
                                >
                                  *
                                </span>
                              )}
                            </InputLabel>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                // label={value.placeholder || value.title}
                                value={
                                  formData?.[value.name]
                                    ? dayjs(
                                        `2000-01-01T${formData?.[value.name]}`
                                      )
                                    : null
                                }
                                defaultValue={
                                  formData?.[value.name]
                                    ? undefined
                                    : value.default
                                    ? dayjs(`2000-01-01T${value.default}`)
                                    : undefined
                                }
                                onChange={(newValue) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    [value.name]: newValue
                                      ? newValue.format("HH:mm:ss")
                                      : "",
                                  }));
                                }}
                                slots={{
                                  openPickerIcon: AccessTimeIcon,
                                }}
                                slotProps={{
                                  textField: {
                                    fullWidth: true,
                                    required: value?.required,
                                    placeholder:
                                      value.placeholder || "Select time",
                                    InputProps: {
                                      startAdornment: value?.symbol && (
                                        <InputAdornment position="start">
                                          {value.symbol}
                                        </InputAdornment>
                                      ),
                                      sx: {
                                        borderRadius: 2,
                                        backgroundColor:
                                          "var(--themeColorLighterShade)",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                          borderColor:
                                            "var(--themeColorLighterShade) !important",
                                        },
                                        // "& input:-webkit-autofill": {
                                        //   WebkitBoxShadow: darkMode
                                        //     ? "0 0 0 100px rgb(22, 22, 22) inset"
                                        //     : "0 0 0 100px rgb(255, 255, 255) inset",
                                        //   WebkitTextFillColor:
                                        //     "var(--themeFontColor)",
                                        // },
                                      },
                                    },
                                  },
                                  openPickerIcon: {
                                    sx: { color: "#DE4444" },
                                  },
                                }}
                              />
                            </LocalizationProvider>
                            {!allowSubmit &&
                              value.required &&
                              !formData[value.name] && (
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: "red !important",
                                    display: "block",
                                    mb: 1,
                                  }}
                                >
                                  Please fill this field
                                </Typography>
                              )}
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
                                marginBottom: "12px",
                                color: darkMode ? "#ffffff" : "#151515",
                              }}
                            >
                              <span>{value.title}</span>
                              {value?.required && (
                                <span
                                  style={{ color: "red", paddingLeft: "5px" }}
                                >
                                  *
                                </span>
                              )}
                            </InputLabel>

                            <Autocomplete
                              id={value.name} // Unique ID for the input
                              // size="small"
                              options={value.options || []} // Array of objects with label and value
                              getOptionLabel={(option) => option.label} // Display the label
                              isOptionEqualToValue={(option, selectedValue) =>
                                option.value === selectedValue?.value
                              } // Compare by value
                              value={
                                value?.options?.find(
                                  (opt) => opt?.value === formData?.[value.name]
                                ) || null
                              } // Set the selected value (only the value stored)
                              disabled={value?.disabled ? true : false}
                              onChange={(event, newValue) => {
                                setFormData({
                                  ...formData,
                                  [value.name]: newValue?.value || "", // Ensure we don't set undefined values
                                });
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  required={value?.required}
                                  // variant="standard"
                                  placeholder={value?.placeholder} // Placeholder fallback
                                  helperText={
                                    !allowSubmit &&
                                    (formData?.[value.name] == undefined ||
                                      formData?.[value.name]?.length <= 0) &&
                                    value?.required && (
                                      <p
                                        style={{
                                          textAlign: "left",
                                          color: "red",
                                        }}
                                      >
                                        Please fill this field
                                      </p>
                                    )
                                  }
                                  // InputLabelProps={{
                                  //   shrink: true,
                                  //   style: {
                                  //     fontWeight: "bold", // Bold label
                                  //   },
                                  // }}
                                  InputProps={{
                                    ...params.InputProps,
                                    sx: {
                                      borderRadius: 2,
                                      backgroundColor:
                                        "var(--themeColorLighterShade)",
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
                                      backgroundColor: darkMode
                                        ? "#333333"
                                        : "#f0f0f7",
                                    },
                                  }}
                                >
                                  <Paper
                                    sx={{
                                      backgroundColor: darkMode
                                        ? "#1a1a1a"
                                        : "#ffffff",
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
                            <InputLabel
                              shrink={true}
                              style={{
                                // fontWeight: "bold",
                                marginBottom: "12px",
                                color: "#151515",
                                fontSize: "16px",
                                lineHeight: "26px",
                                textAlign: "left",
                              }}
                            >
                              <span>{value.title}</span>
                              {value?.required && (
                                <span
                                  style={{ color: "red", paddingLeft: "5px" }}
                                >
                                  *
                                </span>
                              )}
                            </InputLabel>
                            <TextField
                              // autoComplete={value.title}
                              // error={false}
                              name={value.name}
                              fullWidth
                              type={value.variant || "text"}
                              id={value.id}
                              required={value?.required}
                              placeholder={value.placeholder}
                              // variant="outlined"
                              // label={value.title}
                              value={
                                formData?.[value.name] || value?.default || ""
                              }
                              helperText={
                                (!allowSubmit &&
                                  (formData?.[value.name] == undefined ||
                                    formData?.[value.name]?.length <= 0) &&
                                  value?.required && (
                                    <p
                                      style={{
                                        // textAlign: "right",
                                        marginTop: "-3px",
                                        color: "red",
                                      }}
                                    >
                                      Please fill this field
                                    </p>
                                  )) ||
                                (!allowSubmit &&
                                  (formData?.[value.name] == undefined ||
                                    formData?.[value.name]?.length < 14) &&
                                  value?.required && (
                                    <p
                                      style={{
                                        // textAlign: "right",
                                        marginTop: "-3px",
                                        color: "red",
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
                                sx: {
                                  borderRadius: 2,
                                  backgroundColor:
                                    "var(--themeColorLighterShade)",
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor:
                                      "var(--themeColorLighterShade)  !important",
                                  },
                                  "& input:-webkit-autofill": {
                                    WebkitBoxShadow: darkMode
                                      ? "0 0 0 100px rgb(22, 22, 22) inset"
                                      : "0 0 0 100px rgb(255, 255, 255) inset", // Red background for autofill
                                    WebkitTextFillColor:
                                      "var(--themeFontColor)", // Text color for autofilled content
                                  },
                                },
                                inputProps: {
                                  min: value?.min,
                                  max: value?.max,
                                  step: value?.step || 1,
                                  maxLength: value?.maxLength,
                                  style: {
                                    color: "#151515", // Placeholder color to light grey
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
                              //     borderBottomColor: "#151515", // Default bottom border
                              //   },
                              //   "& .MuiInput-underline:after": {
                              //     borderBottomColor: "#151515", // Focused bottom border
                              //   },
                              //   "& .MuiInput-underline:hover:before": {
                              //     borderBottomColor: "#151515", // Hover bottom border
                              //   },
                              //   "& .MuiInput-underline:disabled:before": {
                              //     borderBottomStyle: "solid  !important", // Ensure solid line for disabled
                              //     borderBottomColor: "#151515  !important", // Disabled underline color
                              //   },
                              //   "& .Mui-disabled:before": {
                              //     borderBottomColor: "#151515  !important", // Disabled underline color
                              //     borderBottomStyle: "solid  !important", // Ensure a solid line for disabled
                              //     cursor: "not-allowed !important",
                              //   },
                              //   "& input:-webkit-autofill": {
                              //     WebkitBoxShadow: "0 0 0 100px #FAFFF3 inset", // Red background for autofill
                              //     WebkitTextFillColor: "#151515", // Text color for autofilled content
                              //   },
                              //   // "& .MuiInput-underline:disabled": {
                              //   //   cursor: "not-allowed", // Optional: change the cursor style for disabled
                              //   // },
                              // }}
                              disabled={value.disabled ? true : false}
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
                          >
                            <InputLabel
                              shrink={true}
                              style={{
                                marginBottom: "12px",
                                color: darkMode ? "#ffffff" : "#151515",
                              }}
                            >
                              <span>{value.title}</span>
                              {value?.required && (
                                <span
                                  style={{ color: "red", paddingLeft: "5px" }}
                                >
                                  *
                                </span>
                              )}
                            </InputLabel>
                            <Autocomplete
                              multiple
                              id={`multi-select-${value.name}`}
                              options={value.options || []}
                              getOptionLabel={(option) => option.label}
                              isOptionEqualToValue={(option, selectedValue) =>
                                option.value === selectedValue?.value
                              }
                              filterSelectedOptions
                              value={
                                value.options.filter((opt) =>
                                  formData?.[value.name]?.includes(opt.value)
                                ) || []
                              }
                              disabled={value?.disabled}
                              onChange={(event, newValue) => {
                                setFormData({
                                  ...formData,
                                  [value.name]: newValue.map(
                                    (item) => item.value
                                  ),
                                });
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  required={value?.required}
                                  placeholder={value?.placeholder}
                                  helperText={
                                    (!allowSubmit &&
                                      (formData?.[value.name] == undefined ||
                                        formData?.[value.name]?.length <= 0) &&
                                      value?.required && (
                                        <p
                                          style={{
                                            textAlign: "left",
                                            color: "red",
                                          }}
                                        >
                                          Please fill this field
                                        </p>
                                      )) ||
                                    (formData?.[value.name]?.length ===
                                      (value?.maxSelections || 10) &&
                                      (value?.errorText || (
                                        <p
                                          style={{
                                            textAlign: "left",
                                            color: "red",
                                          }}
                                        >
                                          Maximum number of selections have been
                                          made.
                                        </p>
                                      )))
                                  }
                                  InputProps={{
                                    ...params.InputProps,
                                    sx: {
                                      borderRadius: 2,
                                      backgroundColor:
                                        "var(--themeColorLighterShade)",
                                      "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor:
                                          "var(--themeColorLighterShade)  !important",
                                      },
                                      // backgroundColor: darkMode
                                      //   ? "#0d0d0d"
                                      //   : "#e6e6ef",
                                      // "& .MuiOutlinedInput-notchedOutline": {
                                      //   borderColor: darkMode
                                      //     ? "#333333"
                                      //     : "#d1d1e0 !important",
                                      // },
                                      // "&:hover .MuiOutlinedInput-notchedOutline":
                                      //   {
                                      //     borderColor: darkMode
                                      //       ? "#555555"
                                      //       : "#a1a1b5 !important",
                                      //   },
                                    },
                                  }}
                                  inputProps={{
                                    ...params.inputProps,
                                    style: {
                                      paddingLeft: "10px",
                                      color: darkMode ? "#ffffff" : "#151515",
                                    },
                                  }}
                                  sx={{
                                    "& .MuiInputBase-root": {
                                      color: darkMode ? "#ffffff" : "#151515",
                                    },
                                  }}
                                />
                              )}
                              renderOption={(props, option, { selected }) => (
                                <li
                                  {...props}
                                  style={{
                                    ...props.style,
                                    backgroundColor: selected
                                      ? darkMode
                                        ? "rgba(100, 206, 70, 0.2)"
                                        : "rgba(100, 206, 70, 0.1)"
                                      : null,
                                    color: darkMode ? "#ffffff" : "#151515",
                                    "&:hover": {
                                      backgroundColor: darkMode
                                        ? "#333333"
                                        : "#f0f0f7",
                                    },
                                  }}
                                >
                                  {option.label}
                                </li>
                              )}
                              renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                  <Chip
                                    {...getTagProps({ index })}
                                    key={option.value}
                                    label={option.label}
                                    style={{
                                      backgroundColor: darkMode
                                        ? "rgba(100, 206, 70, 0.3)"
                                        : "rgba(100, 206, 70, 0.2)",
                                      color: darkMode ? "#ffffff" : "#1B3720",
                                      border: darkMode
                                        ? "1px solid rgba(100, 206, 70, 0.5)"
                                        : "1px solid #64CE46",
                                      margin: "4px",
                                    }}
                                    // deleteIcon={
                                    //   <CancelIcon
                                    //     style={{
                                    //       color: darkMode
                                    //         ? "#ffffff"
                                    //         : "#1B3720",
                                    //       fontSize: "16px",
                                    //     }}
                                    //   />
                                    // }
                                  />
                                ))
                              }
                              PaperComponent={({ children }) => (
                                <Paper
                                  sx={{
                                    backgroundColor: darkMode
                                      ? "#1a1a1a"
                                      : "#ffffff",
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
                              )}
                            />
                          </Grid>
                        );
                      }
                      if (value.type == "headind_ad") {
                        return (
                          <Grid
                            item
                            xs={12}
                            md={12}
                            key={index + "-grid"}
                            lg={value?.size || 6}
                            display={value.display || "block"}
                          >
                            <p
                              style={{
                                marginTop: value?.margin || "-1.5rem",
                                fontWeight: "500",
                                color: "var(--themeFontColor)",
                              }}
                            >
                              {value.title}
                            </p>
                          </Grid>
                        );
                      }
                      if (value.type == "image") {
                        // return (
                        //   <Grid item xs={12} md={value?.size || 12} key={index}>
                        //     <InputLabel shrink sx={inputLabelStyles}>
                        //       {value.title}
                        //       {value.required && (
                        //         <span
                        //           style={{ color: "red", marginLeft: "4px" }}
                        //         >
                        //           *
                        //         </span>
                        //       )}
                        //     </InputLabel>

                        //     <input
                        //       type="file"
                        //       id={`file-upload-${value.name}`}
                        //       ref={(el) =>
                        //         (fileInputRefs.current[value.name] = el)
                        //       }
                        //       onChange={(e) => handleFileChange(value?.name, e)}
                        //       accept={value?.accept || "*"}
                        //       style={{ display: "none" }}
                        //     />

                        //     {!filePreviews[value?.name] &&
                        //     !formData[value?.name] ? (
                        //       <Box
                        //         component="label"
                        //         htmlFor={`file-upload-${value?.name}`}
                        //         sx={fileUploadStyles}
                        //       >
                        //         <CloudUpload
                        //           fontSize="large"
                        //           sx={{
                        //             color: darkMode
                        //               ? theme.palette.text.secondary
                        //               : theme.palette.text.primary,
                        //             mb: 1,
                        //           }}
                        //         />
                        //         <Typography
                        //           variant="body1"
                        //           sx={{
                        //             color: darkMode
                        //               ? theme.palette.text.secondary
                        //               : theme.palette.text.primary,
                        //           }}
                        //         >
                        //           Click to upload or drag and drop
                        //         </Typography>
                        //         <Typography
                        //           variant="caption"
                        //           sx={{
                        //             color: darkMode
                        //               ? theme.palette.text.secondary
                        //               : theme.palette.text.primary,
                        //           }}
                        //         >
                        //           {value.description ||
                        //             "Supported formats: " +
                        //               (value?.accept || "Any")}
                        //           {value?.maxSize &&
                        //             ` | Max size: ${value?.maxSize}MB`}
                        //         </Typography>
                        //       </Box>
                        //     ) : (
                        //       <Box
                        //         sx={{
                        //           border: `1px solid ${
                        //             darkMode
                        //               ? theme.palette.grey[700]
                        //               : theme.palette.grey[300]
                        //           }`,
                        //           borderRadius: 1,
                        //           p: 2,
                        //           position: "relative",
                        //         }}
                        //       >
                        //         {/* Handle both local previews and API URLs */}
                        //         {typeof filePreviews[value?.name] ===
                        //         "string" ? (
                        //           filePreviews[value?.name].startsWith(
                        //             "data:image"
                        //           ) ? (
                        //             <img
                        //               src={filePreviews[value?.name]}
                        //               alt="Preview"
                        //               style={{
                        //                 maxWidth: "100%",
                        //                 maxHeight: "150px",
                        //                 display: "block",
                        //                 margin: "0 auto",
                        //               }}
                        //             />
                        //           ) : (
                        //             <Typography
                        //               sx={{
                        //                 color: darkMode
                        //                   ? theme.palette.text.primary
                        //                   : theme.palette.text.primary,
                        //               }}
                        //             >
                        //               {filePreviews[value?.name]}
                        //             </Typography>
                        //           )
                        //         ) : typeof formData[value?.name] ===
                        //           "string" ? (
                        //           <img
                        //             src={`${IMAGE}${formData[value?.name]}`}
                        //             alt="Preview"
                        //             style={{
                        //               maxWidth: "100%",
                        //               maxHeight: "150px",
                        //               display: "block",
                        //               margin: "0 auto",
                        //             }}
                        //             onError={(e) => {
                        //               e.target.onerror = null;
                        //               e.target.src =
                        //                 "path_to_fallback_image.jpg";
                        //             }}
                        //           />
                        //         ) : (
                        //           <Typography
                        //             sx={{
                        //               color: darkMode
                        //                 ? theme.palette.text.primary
                        //                 : theme.palette.text.primary,
                        //             }}
                        //           >
                        //             {formData[value.name]?.name ||
                        //               "File selected"}
                        //           </Typography>
                        //         )}

                        //         <IconButton
                        //           size="small"
                        //           onClick={() => removeFile(value.name)}
                        //           sx={{
                        //             position: "absolute",
                        //             top: 4,
                        //             right: 4,
                        //             color: darkMode
                        //               ? theme.palette.error.light
                        //               : theme.palette.error.main,
                        //             backgroundColor: darkMode
                        //               ? theme.palette.grey[800]
                        //               : theme.palette.grey[200],
                        //             "&:hover": {
                        //               backgroundColor: darkMode
                        //                 ? theme.palette.grey[700]
                        //                 : theme.palette.grey[300],
                        //             },
                        //           }}
                        //         >
                        //           <Delete fontSize="small" />
                        //         </IconButton>

                        //         <Button
                        //           size="small"
                        //           variant="outlined"
                        //           component="label"
                        //           htmlFor={`file-upload-${value.name}`}
                        //           sx={{
                        //             mt: 1,
                        //             color: darkMode
                        //               ? theme.palette.text.secondary
                        //               : theme.palette.text.primary,
                        //             borderColor: darkMode
                        //               ? theme.palette.grey[600]
                        //               : theme.palette.grey[400],
                        //           }}
                        //         >
                        //           Change File
                        //         </Button>
                        //       </Box>
                        //     )}

                        //     {!allowSubmit &&
                        //       value.required &&
                        //       !formData[value.name] && (
                        //         <Typography
                        //           variant="caption"
                        //           sx={{
                        //             color: "red !important",
                        //             display: "block",
                        //             mb: 1,
                        //           }}
                        //         >
                        //           Please upload a file
                        //         </Typography>
                        //       )}
                        //   </Grid>
                        // );

                        return (
                          <Grid item xs={12} md={value?.size || 12} key={index}>
                            <InputLabel shrink sx={inputLabelStyles}>
                              {value.title}
                              {value.required && (
                                <span
                                  style={{ color: "red", marginLeft: "4px" }}
                                >
                                  *
                                </span>
                              )}
                            </InputLabel>

                            <input
                              type="file"
                              id={`file-upload-${value.name}`}
                              ref={(el) =>
                                (fileInputRefs.current[value.name] = el)
                              }
                              onChange={(e) => handleFileChange(value?.name, e)}
                              accept={value?.accept || "image/*"}
                              style={{ display: "none" }}
                            />

                            {!filePreviews[value?.name] &&
                            !formData[value?.name] ? (
                              <Box
                                component="label"
                                htmlFor={`file-upload-${value?.name}`}
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
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  {value.description ||
                                    "Supported formats: " +
                                      (value?.accept || "Any")}
                                  {value?.maxSize &&
                                    ` | Max size: ${value?.maxSize}MB`}
                                  {(
                                    <span
                                      style={{ color: "#d71717 !important" }}
                                    >
                                      {value.image_size}
                                    </span>
                                  ) && (
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        color: "#d71717 !important",
                                        fontWeight: "700",
                                      }}
                                    >
                                      {value.image_size}
                                    </Typography>
                                  )}
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
                                {/* Handle all cases: */}
                                {renderFilePreview(value.name)}

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
                                {/* <Typography
                                  variant="caption"
                                  sx={{
                                    mt: 1,
                                    color: darkMode
                                      ? theme.palette.text.secondary
                                      : theme.palette.text.primary,
                                    fontWeight: 700,
                                    textAlign: "center",
                                    display: "block",
                                  }}
                                >
                                  {imageDimensions[value.name]
                                    ? `Actual: ${
                                        imageDimensions[value.name].width
                                      } × ${
                                        imageDimensions[value.name].height
                                      }px / Expected: ${value.image_size}`
                                    : value.image_size}
                                </Typography> */}
                                {imageDimensions[value.name] && (
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      mt: 1,
                                      color: "#d71717 !important",
                                      fontWeight: 700,
                                      textAlign: "center",
                                      display: "block",
                                    }}
                                  >
                                    Actual: {imageDimensions[value.name].width}{" "}
                                    * {imageDimensions[value.name].height}px /
                                    Expected: {value.image_size}
                                  </Typography>
                                )}
                              </Box>
                            )}

                            {!allowSubmit &&
                              value.required &&
                              !formData[value.name] && (
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: "red !important",
                                    display: "block",
                                    mb: 1,
                                  }}
                                >
                                  Please upload a file
                                </Typography>
                              )}
                          </Grid>
                        );
                      }
                      if (value.type == "table") {
                        return (
                          <Grid
                            item
                            xs={12}
                            md={12}
                            key={index + "-grid"}
                            lg={12}
                            display={value.display || "block"}
                          >
                            <div>
                              <div
                                style={{ width: "100%", textAlign: "right" }}
                              >
                                <Button
                                  variant="contained"
                                  sx={{
                                    background: "var(--gradientColor2)",
                                    color: "#fff",
                                    // padding: "0.5rem 1rem",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    textAlign: "right",
                                    mb: 2,
                                    mt: 2,
                                    "&:hover": {
                                      backgroundColor: "var(--gradientColor2)",
                                      opacity: "70%",
                                    },
                                  }}
                                  onClick={() => {
                                    setEditingIndex(null);
                                    setIsModalOpen(true);
                                    isCountry &&
                                      setUsedCountries((prev) => {
                                        const newIds = Array.isArray(
                                          formData?.countrys
                                        )
                                          ? formData.countrys.map(
                                              (item) => item.country_id
                                            )
                                          : [];

                                        const merged = [...prev, ...newIds];
                                        return [...new Set(merged)]; // Remove duplicates
                                      });
                                  }}
                                >
                                  <AddIcon sx={{ marginRight: "5px" }} /> Add
                                  {isCountry ? " Country" : " Cast"}
                                </Button>
                              </div>
                              <DynamicFormModal
                                open={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                formStructure={value?.castCrewFormStructure}
                                onSubmit={handleSubmitCast}
                                formData={form}
                                setFormData={setForm}
                                title={value?.formTitle}
                                initialData={
                                  editingIndex !== null
                                    ? tableData1[editingIndex]
                                    : {}
                                }
                              />

                              <DynamicTable
                                data={tableData1}
                                columns={value?.tableColumns}
                                onEdit={(index, row) => {
                                  setEditingIndex(index);
                                  setIsModalOpen(true);
                                  // setFormData(row)
                                }}
                                onDelete={(index) => {
                                  setTableData1(
                                    tableData1.filter((_, i) => i !== index)
                                  );
                                }}
                              />
                            </div>
                          </Grid>
                        );
                      }
                      if (value.type == "country_table") {
                        return (
                          <Grid
                            item
                            xs={12}
                            md={12}
                            key={index + "-grid"}
                            lg={12}
                            display={value.display || "block"}
                          >
                            <div>
                              <div
                                style={{ width: "100%", textAlign: "right" }}
                              >
                                <Button
                                  variant="contained"
                                  sx={{
                                    background: "var(--gradientColor2)",
                                    color: "#fff",
                                    // padding: "0.5rem 1rem",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    textAlign: "right",
                                    mb: 2,
                                    mt: 2,
                                    "&:hover": {
                                      backgroundColor: "var(--gradientColor2)",
                                      opacity: "70%",
                                    },
                                  }}
                                  onClick={() => {
                                    setEditingIndexCountry(null);
                                    setIsModalOpenCountry(true);
                                    setUsedCountries((prev) => {
                                      const newIds = Array.isArray(
                                        formData?.countrys
                                      )
                                        ? formData.countrys.map(
                                            (item) => item.country_id
                                          )
                                        : [];

                                      const merged = [...prev, ...newIds];
                                      return [...new Set(merged)]; // Remove duplicates
                                    });
                                  }}
                                >
                                  <AddIcon sx={{ marginRight: "5px" }} /> Add
                                  {" Country"}
                                </Button>
                              </div>
                              <DynamicFormModal
                                open={isModalOpenCountry}
                                onClose={() => setIsModalOpenCountry(false)}
                                formStructure={value?.countryFormStructure}
                                onSubmit={handleSubmitCountry}
                                formData={formCountry}
                                setFormData={setFormCountry}
                                title={value?.formTitle}
                                initialData={
                                  editingIndexCountry !== null
                                    ? tableDataCountry[editingIndexCountry]
                                    : {}
                                }
                              />

                              <DynamicTable
                                data={tableDataCountry}
                                columns={value?.tableColumns}
                                onEdit={(index, row) => {
                                  setEditingIndexCountry(index);
                                  setIsModalOpenCountry(true);
                                  // setFormData(row)
                                }}
                                onDelete={(index) => {
                                  setTableDataCountry(
                                    tableDataCountry.filter(
                                      (_, i) => i !== index
                                    )
                                  );
                                }}
                              />
                            </div>
                            {!allowSubmit &&
                              value.required &&
                              (tableDataCountry == undefined ||
                                tableDataCountry?.length <= 0) && (
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: "red !important",
                                    display: "block",
                                    mb: 1,
                                  }}
                                >
                                  Please Add Country
                                </Typography>
                              )}
                          </Grid>
                        );
                      }
                      if (value.type == "subtitle_table") {
                        return (
                          <Grid
                            item
                            xs={12}
                            md={12}
                            key={index + "-grid"}
                            lg={12}
                            display={value.display || "block"}
                          >
                            <div>
                              <div
                                style={{ width: "100%", textAlign: "right" }}
                              >
                                <Button
                                  variant="contained"
                                  sx={{
                                    background: "var(--gradientColor2)",
                                    color: "#fff",
                                    // padding: "0.5rem 1rem",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    textAlign: "right",
                                    mb: 2,
                                    mt: 2,
                                    "&:hover": {
                                      backgroundColor: "var(--gradientColor2)",
                                      opacity: "70%",
                                    },
                                  }}
                                  onClick={() => {
                                    setEditingIndexSubtitle(null);
                                    setIsModalOpenSubTitle(true);
                                  }}
                                >
                                  <AddIcon sx={{ marginRight: "5px" }} /> Add
                                  Sub Title
                                </Button>
                              </div>
                              <DynamicFormModal
                                open={isModalOpenSubTitle}
                                onClose={() => setIsModalOpenSubTitle(false)}
                                formStructure={value?.subTitleFormStructure}
                                onSubmit={handleSubmitSubtitle}
                                formData={formSubTitle}
                                setFormData={setFormSubTitle}
                                title={value?.formTitle}
                                initialData={
                                  editingIndexSubtitle !== null
                                    ? tableDataSubTitle[editingIndexSubtitle]
                                    : {}
                                }
                              />

                              <DynamicTable
                                data={tableDataSubTitle}
                                columns={value?.tableColumns}
                                onEdit={(index, row) => {
                                  setEditingIndexSubtitle(index);
                                  setIsModalOpenSubTitle(true);
                                  // setFormData(row)
                                }}
                                onDelete={(index) => {
                                  setTableDataSubTitle(
                                    tableDataSubTitle.filter(
                                      (_, i) => i !== index
                                    )
                                  );
                                }}
                              />
                            </div>
                          </Grid>
                        );
                      }
                      if (value.type == "audio_table") {
                        return (
                          <Grid
                            item
                            xs={12}
                            md={12}
                            key={index + "-grid"}
                            lg={12}
                            display={value.display || "block"}
                          >
                            <div>
                              <div
                                style={{ width: "100%", textAlign: "right" }}
                              >
                                <Button
                                  variant="contained"
                                  sx={{
                                    background: "var(--gradientColor2)",
                                    color: "#fff",
                                    // padding: "0.5rem 1rem",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    textAlign: "right",
                                    mb: 2,
                                    mt: 2,
                                    "&:hover": {
                                      backgroundColor: "var(--gradientColor2)",
                                      opacity: "70%",
                                    },
                                  }}
                                  onClick={() => {
                                    setEditingIndexAudio(null);
                                    setIsModalOpenAudio(true);
                                  }}
                                >
                                  <AddIcon sx={{ marginRight: "5px" }} /> Add
                                  Audio File
                                </Button>
                              </div>
                              <DynamicFormModal
                                open={isModalOpenAudio}
                                onClose={() => setIsModalOpenAudio(false)}
                                formStructure={value?.audioFormStructure}
                                onSubmit={handleSubmitAudio}
                                formData={formAudioFile}
                                setFormData={setFormAudioFile}
                                title={value?.formTitle}
                                initialData={
                                  editingIndexAudio !== null
                                    ? tableDataAudio[editingIndexAudio]
                                    : {}
                                }
                              />

                              <DynamicTable
                                data={tableDataAudio}
                                columns={value?.tableColumns}
                                onEdit={(index, row) => {
                                  setEditingIndexAudio(index);
                                  setIsModalOpenAudio(true);
                                  // setFormData(row)
                                }}
                                onDelete={(index) => {
                                  setTableDataAudio(
                                    tableDataAudio.filter((_, i) => i !== index)
                                  );
                                }}
                              />
                            </div>
                          </Grid>
                        );
                      }
                      if (value.type == "duration") {
                        return (
                          <Grid
                            item
                            xs={12}
                            md={12}
                            key={index + "-grid"}
                            lg={value?.size || 6}
                            display={value.display || "block"}
                          >
                            <InputLabel
                              shrink
                              style={{
                              
                                marginBottom: "12px",
                                color: "#151515",
                                fontSize: "16px",
                                lineHeight: "26px",
                                textAlign: "left",
                              }}
                            >
                              {value?.title}
                              {value?.required && (
                                <span
                                  style={{ color: "red", paddingLeft: "5px" }}
                                >
                                  *
                                </span>
                              )}
                            </InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimeField
                                name={value?.name}
                                style={{ width: "100%" }}
                                disabled={value.disabled || false}

                                value={
                                  formData?.[value.name]
                                    ? dayjs(
                                        getDateFromHours(formData?.[value.name])
                                      )
                                    : null
                                }
            
                                onChange={(newValue) => {
                                  setFormData({
                                    ...formData,
                                    [value?.name]:
                                      new Date(newValue)?.getHours() +
                                      ":" +
                                      new Date(newValue)?.getMinutes() +
                                      ":" +
                                      new Date(newValue)?.getSeconds(),
                                    // &&(newValue?.getHours()+":"+newValue?.getMinutes()+":"+newValue?.getSeconds())
                                  });
                                }}
                                slotProps={{
                                  textField: {
                                    fullWidth: true,
                                    required: value?.required,
                                    placeholder: value.placeholder,
                                    InputProps: {
                                      startAdornment: value?.symbol && (
                                        <InputAdornment position="start">
                                          {value.symbol}
                                        </InputAdornment>
                                      ),
                                      sx: {
                                        borderRadius: 2,
                                        backgroundColor:
                                          "var(--themeColorLighterShade)",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                          borderColor:
                                            "var(--themeColorLighterShade) !important",
                                        },
                                        "& input:-webkit-autofill": {
                                          WebkitBoxShadow: darkMode
                                            ? "0 0 0 100px rgb(22, 22, 22) inset"
                                            : "0 0 0 100px rgb(255, 255, 255) inset",
                                          WebkitTextFillColor:
                                            "var(--themeFontColor)",
                                        },
                                      },
                                    },
                                  },
                                  openPickerIcon: {
                                    sx: { color: "#DE4444" },
                                  },
                                }}
                                InputProps={{
                                  // style: {
                                  //   "-webkit-text-fill-color": value?.color,
                                  // },
                                  sx: {
                                    borderRadius: 2,
                                    backgroundColor:
                                      "var(--themeColorLighterShade)",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                      borderColor:
                                        "var(--themeColorLighterShade)  !important",
                                    },
                                    "& input:-webkit-autofill": {
                                      WebkitBoxShadow: darkMode
                                        ? "0 0 0 100px rgb(22, 22, 22) inset"
                                        : "0 0 0 100px rgb(255, 255, 255) inset", // Red background for autofill
                                      WebkitTextFillColor:
                                        "var(--themeFontColor)", // Text color for autofilled content
                                    },
                                  },
                                }}
                                format="HH:mm:ss"
                                placeholder={value?.placeholder}
                              />
                            </LocalizationProvider>
                            {!allowSubmit &&
                              value.required &&
                              (!formData[value.name] ||
                                formData?.[value.name]?.length <= 0) && (
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: "red !important",
                                    display: "block",
                                    mb: 1,
                                  }}
                                >
                                  Please upload a file
                                </Typography>
                              )}
                          </Grid>
                        );
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
                              {!value?.noHeading && (
                                <Box sx={{ marginTop: "20px" }}>
                                  <InputLabel
                                    shrink={true}
                                    style={{
                                      // fontWeight: "bold",
                                      color: "#151515",
                                      marginLeft: "-10px",
                                    }}
                                  >
                                    {/* Label with Mandatory */}
                                    <span>{value.title}</span>
                                  </InputLabel>
                                </Box>
                              )}

                              <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                              >
                                {value?.options?.map((option, index) => (
                                  <FormControlLabel
                                    key={value.name + index}
                                    value={option.value}
                                    name={value.name}
                                    required={value?.required}
                                    disabled={value.disabled ? true : false}
                                    onChange={(event) => {
                                      setFormData({
                                        ...formData,
                                        [event.target.name]: event.target.value,
                                      });
                                    }}
                                    control={
                                      <Radio
                                        color={option.color}
                                        // required

                                        checked={
                                          formData?.[value.name] != undefined
                                            ? formData?.[value.name] ==
                                              option.value
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
                              {!allowSubmit &&
                                value.required &&
                                !formData?.[value.name] && (
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
                      return null;
                    })}
                    {/* </div> */}
                  </Grid>
                </fieldset>
              ))}
            </div>
          </Box>

          {/* Fixed footer */}
          <Box
            sx={{
              height: "60px", // fixed height for footer
              color: "var(--themeFontColor)",
              display: "flex",
              alignItems: "center",
              borderTop: "1px solid var(--themeColorLightestShade)",
              padding: "1rem",
              marginTop: "10px",
              // backgroundColor: "blue",
              flexShrink: 0,
            }}
          >
            <div
              style={{ display: "flex", alignContent: "center", gap: "15px" }}
            >
              <Button
                disableFocusRipple={false}
                sx={{
                  background: "var(--gradientColor2)",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
                onClick={(e) => handleFormSubmit(e)}
              >
                <SaveIcon /> <span style={{ paddingLeft: "5px" }}>save</span>
              </Button>
              {isConfirmBtn && (
                <Button
                  disableFocusRipple={false}
                  sx={{
                    background: "green",
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                  onClick={(e) => handleFormSubmit(e, isConfirmBtn)}
                >
                  <ThumbUpOffAltIcon />{" "}
                  <span style={{ paddingLeft: "5px" }}>Confirm</span>
                </Button>
              )}
              <Button
                disableFocusRipple
                sx={{
                  border: "1px solid var(--gradientColor2)",
                  color: "var(--gradientColor2)",
                  padding: "0.5rem 1rem",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
                onClick={() => (handleClose(), onClose())}
              >
                <ChevronLeftIcon />{" "}
                <ChevronLeftIcon style={{ marginLeft: "-10px" }} />{" "}
                <span style={{ paddingLeft: "5px" }}>Back</span>
              </Button>
            </div>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default NewForm;
