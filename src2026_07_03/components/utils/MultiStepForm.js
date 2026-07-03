// import React, { useState } from "react";
// import { Stepper, Step, StepLabel, Button } from "@mui/material";
// import "./stepper.css";

// export default function MultiStepForm({ formStructure,
//   formTitle,
//   setForm,
//   formTitleNew,
//   form,
//   isEdit,
//   handleSubmit }) {
//     const [currentStep, setCurrentStep] = useState(1);

//     const steps = ["Step 1", "Step 2", "Step 3"];

//     const handleNext = () => {
//       if (currentStep < steps.length) {
//         setCurrentStep(currentStep + 1);
//       }
//     };

//     const handlePrevious = () => {
//       if (currentStep > 1) {
//         setCurrentStep(currentStep - 1);
//       }
//     };

//     return(
//       <div className="stepper-container">
//       <div className="stepper">
//         {steps.map((step, index) => (
//           <span
//             key={index}
//             className={`step ${currentStep === index + 1 ? "active" : ""} ${
//               currentStep > index + 1 ? "visited" : ""
//             }`}
//           >
//             {step}
//           </span>
//         ))}
//       </div>
//       <div className="buttons">
//         <button onClick={handlePrevious} disabled={currentStep === 1}>
//           Back
//         </button>
//         <button onClick={handleNext} disabled={currentStep === steps.length}>
//           Next
//         </button>
//       </div>
//     </div>
//     )
//   }

// import React, { useState } from 'react';
// import { Stepper, Step, StepLabel, Button, Box, Card } from '@mui/material';
// import Form from "./Form";

// // import { LoadingButton } from '@mui/lab';

import React, { useState, useMemo, useEffect } from "react";
import { Box, Button, Card } from "@mui/material";
import Arrow from "../assets/images/common/Arrow.png";
import Form from "./Form"; // Assuming you have a Form component
import "./Stepper.css"; // Import your custom CSS
import { useDispatch, useSelector } from "react-redux";
import { service_wise_package_list_employee } from "../action/employee";
import {
  employee_dependent_list,
  package_list_employee,
  individual_dependent_list,
  package_list_individual,
} from "../action/package";
import reverseArrow from "../assets/images/common/ReverseArrow.png";
import AddIcon from "@mui/icons-material/Add";
import AddDependent from "../Componants/Employee/AddDependent";
import * as Action from "../action/appointment";
import centerImg from "../assets/images/centerImg.gif";
import RightArrow from "../assets/images/employee/right-arrow.png";
import RightArrowHover from "../assets/images/employee/right-green.png";
import * as CartApi from "../action/addToCart";
import { bindActionCreators } from "redux";
import Cart from "../assets/images/cart.png";
import InfoDrawer from "../Common/Drawer/InfoDrawer";

const MultiStepForm = ({
  formStructure,
  formTitle,
  setForm,
  title,
  formTitleNew,
  form,
  isEdit,
  handleSubmit,
  drawerOpen,
  setDrawerOpen,
  isPackageList,
  setIsPackageList,
  handleCart,
  isForCart,
  isCartBtn,
  setIsCartBtn,
  notShowingSteps,
  setHolidayRanges
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState(false);
  const [allowNext, setAllowNext] = useState(false);
  const [isListShow, setIsListShow] = useState(form?.package ? true : false);
  const [appointmentStep, setAppointmentStep] = useState(0);
  const [dependentList, setDependentList] = useState([]);
  const [isShowBack, setIsShowBack] = useState(isPackageList || false);
  const [opens, setOpens] = useState(false);
  const [centerListOption, setCenterListOption] = useState([]);
  const [isCallToHr, setIsCallToHr] = useState(true);
  const [isCenterHover, setIsCenterHover] = useState(null);
  const [open, setOpen] = useState(false);
  const [drawerInfo, setDrawerInfo] = useState(null);
  // const [selectedPkc, setSelectedPkc] = useState(null);
  const dispatch = useDispatch();

  // const [loading, setLoading] = useState(false);
  const { appoinment_data_check, package_wise_center , center_holiday_list } = bindActionCreators(
    Action,
    dispatch
  );
  const steps = formTitleNew ? formTitleNew : formTitle;
  console.log(appointmentStep, centerListOption, "New Appolintment List");
  // console.log(isPackageList, "isEdit");
  // useMemo(() => {
  //   var requiredFieldCount = 0;
  //   var requiredFieldFilledCount = 0;
  //   let emailValid = true;
  //   formStructure[activeStep].map((value) => {
  //     if (value.required && value.display != "none") {
  //       requiredFieldCount = requiredFieldCount + 1;
  //       if (
  //         Object.keys(form).includes(value.name) &&
  //         form[value.name] != "" &&
  //         form[value.name] != [] &&
  //         form[value.name] != null
  //       ) {
  //         requiredFieldFilledCount = requiredFieldFilledCount + 1;
  //       }
  //       if (value.isEmail && form[value.name]) {
  //         const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //         if (!emailRegex.test(form[value.name])) {
  //           emailValid = false;
  //         }
  //       }
  //     }
  //   });
  //   if (requiredFieldFilledCount == requiredFieldCount  &&
  //     emailValid) setAllowNext(true);
  //   else setAllowNext(false);
  // }, [form, activeStep]);

  useMemo(() => {
    let requiredFieldCount = 0; // Total required fields count
    let requiredFieldFilledCount = 0; // Filled required fields count
    let emailValid = true; // Email validity flag
    let mobileValid = true; // Mobile validity flag
    let pancardValid = true; // PAN validity flag
    let gstValid = true; // GST validity flag

    formStructure[activeStep].forEach((field) => {
      if (field.required && field.display !== "none") {
        requiredFieldCount++; // Count all required fields

        const fieldValue = String(form[field.name] || "").trim(); // Ensure the field value is a string

        if (fieldValue) {
          // Email validation
          if (field.isEmail) {
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailRegex.test(fieldValue)) {
              emailValid = false; // Email is invalid
            } else {
              requiredFieldFilledCount++; // Increment count for valid email
            }
          }

          // Mobile validation
          if (field.isMobile) {
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

          // Other fields
          if (
            !field.isEmail &&
            !field.isMobile &&
            !field?.isPancard &&
            !field?.isGst
          ) {
            requiredFieldFilledCount++; // Increment count if field is filled
          }
        }
      }
    });

    const isStepValid =
      requiredFieldCount === requiredFieldFilledCount &&
      emailValid &&
      mobileValid &&
      pancardValid;

    if (isStepValid) {
      setAllowNext(true); // Allow navigation to next step
    } else {
      setAllowNext(false); // Block navigation to next step
    }

    // console.log({
    //   requiredFieldCount,
    //   requiredFieldFilledCount,
    //   emailValid,
    //   mobileValid,
    //   form,
    //   isStepValid,
    // }); // Debugging log
  }, [form, activeStep, formStructure]);

  const handleNext = () => {
    if (allowNext) {
      setActiveStep((prev) => prev + 1);
      setErrorMessage(false);
      // Scroll the drawer content to the top
      const drawerContent = document.querySelector(".style-222"); // Replace with your drawer content's class or ID
      if (drawerContent) {
        drawerContent.scrollTo({ top: 0, behavior: "smooth" });
      }
      //     const drawerContent = document.querySelector(".font-family2");
      // if (drawerContent) {
      //   console.log("scrollHeight:", drawerContent.scrollHeight);
      //   console.log("clientHeight:", drawerContent.clientHeight);
      // }
    } else {
      setErrorMessage(true);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // const loadingBtn = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 10000);
  // };
  const handleStepClick = (index) => {
    // Only allow navigation if the step has been visited
    if (isEdit) {
      setActiveStep(index);
    } else if (activeStep > index) {
      // Set the active step to the clicked step
      setActiveStep(index);
    }
  };
  // console.log(allowNext, "cj123");
  const chec = () => {
    // console.log("why");
  };
  const chec2 = () => {
    // console.log("why2");
  };
  const user = useSelector((state) => state?.layout?.profile);
  const packages = useSelector(
    (state) => state?.packages?.active_package_list_employee
  );
  const dependent = useSelector(
    (state) => state?.packages?.employee_dependent_list?.data
  );
  // console.log(dependent ,"dis[[[")
  // console.log(form , isListShow , dependentList ,dependent, packages , "ChechFuuccll")

  const handleCheckboxChange = (dependent) => {
    setSelectedId(dependent?.id);
    setForm((pre) => ({
      ...pre,
      patient: dependent?.id,
      patient_name: dependent?.dependent_name,
      gender: dependent?.gender_name,
    }));
    // console.log("Selected ID:", dependent);
  };
  const [selectedId, setSelectedId] = useState(null);
  // console.log("dependentList", selectedId);
  // console.log(packages, "fggf");
  const showCenter = async (id) => {
    if (id) {
      const resData = await package_wise_center({ package: id });
      if (resData?.statuscode == 200) {
        setCenterListOption(resData?.data);
      }
    }
  };
  // console.log(dependentList ,dependent, "dependentList 123456")
  // const checkPackage =  async(data) => {
  //   // console.log(data, "dependentid");
  //   setDependentList(
  //    await  dependent
  //       ?.map((ele) =>
  //         // ele?.dependent_relation == data?.relation_with_employee &&  ele
  //         {
  //           // const isRelationMatching =
  //           //   ele?.dependent_relation === data?.relation_with_employee;
  //           const isRelationMatching = Array.isArray(
  //             data?.relation_with_employee
  //           )
  //             ? data?.relation_with_employee.includes(ele?.dependent_relation)
  //             : false; // Ensure safety if `data?.relation_with_employee` is not an array

  //           const age = ele?.date_of_birth
  //             ? calculateAge(ele.date_of_birth)
  //             : null;
  //           const isAgeConditionMet =
  //             (data.age_category_name === "Above 40" && age >= 40) ||
  //             (data.age_category_name === "Below 40" && age < 40);
  //           // console.log(isAgeConditionMet , isRelationMatching ,"isRelationMatching")
  //           return isRelationMatching && isAgeConditionMet ? ele : null;
  //         }
  //       )
  //       .filter((e) => e)
  //   );
  //   // setSelectedId(dependentId)
  //   setIsListShow(true);
  //   setAppointmentStep(1);
  //   showCenter(data?.id);
  //   setForm((pre) => ({
  //     ...pre,
  //     package: data?.id,
  //     package_name: data?.package_name,
  //     package_price: data?.offer_price,
  //     type_of_service: data?.type_of_service_name,
  //     type_of_visit: data?.type_of_visit_name,
  //     age_category: data?.age_category_name,
  //     // center: data?.center?.id,
  //     // center_name: data?.center?.center_name,
  //     // center_address: data?.center?.address,
  //     // center_pincode: data?.center?.pincode,
  //   }));
  // };
  // const dependent = useSelector(
  //   (state) => state?.packages?.employee_dependent_list?.data
  // );
  // const [dependentList, setDependentList] = useState([]);

  useEffect(() => {
    console.log(dependentList, dependent, "dependentList 123456");
  }, [dependentList, dependent]);

  const checkPackage = (data) => {
    setIsListShow(true);
    setAppointmentStep(1);
    showCenter(data?.id);
    setForm((pre) => ({
      ...pre,
      package: data?.id,
      package_name: data?.package_name,
      package_price: data?.offer_price,
      type_of_service: data?.type_of_service_name,
      type_of_visit: data?.type_of_visit_name,
      age_category: data?.age_category_name,
    }));
    if (!dependent || dependent.length === 0) {
      console.log("Waiting for dependent data...");
      return; // Prevent execution if data is not ready
    }
    const filteredList = dependent.filter((ele) => {
      const isRelationMatching = Array.isArray(data?.relation_with_employee)
        ? data?.relation_with_employee.includes(ele?.dependent_relation)
        : false;

      const age = ele?.date_of_birth ? calculateAge(ele.date_of_birth) : null;
      const isAgeConditionMet =
        (data?.age_category_name === "Above 40" && age >= 40) ||
        (data?.age_category_name === "Below 40" && age < 40) ||
        (data?.age_category_name === "All" && age >= 0);
      return isRelationMatching && isAgeConditionMet;
    });

    setDependentList(filteredList);
    console.log(dependentList, "Newekkkiiii");
  };

  const selectCenter = async (id) => {
    setAppointmentStep(2);
    const cetData = await centerListOption?.find((ele) => ele?.id == id);
    if (cetData) {
      setForm((pre) => ({
        ...pre,
        center: cetData?.id,
        center_name: cetData?.center_name,
        center_address: cetData?.address,
        center_pincode: cetData?.pincode,
      }));

      const resData = await center_holiday_list({center : id}) 
      if(resData?.statuscode == 200){
        const ranges = resData.data.map((item) => ({
        start: new Date(item?.start_date),
        end: new Date(item?.end_date),
    }));
        setHolidayRanges(ranges)
      }
    }
    console.log(cetData, id, "cetData123");
  };

  const calculateAge = (dateOfBirth) => {
    const [year, month, day] = dateOfBirth.split("-").map(Number);
    const birthDate = new Date(year, month - 1, day); // Month is 0-based
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Adjust age if the birth month/day hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };
  useEffect(() => {
    if (isPackageList) {
      (async () => {
        if (user?.user_type === "employee") {
          dispatch(package_list_employee({ employee: user?.id }));
          dispatch(employee_dependent_list({ employee: user?.id }));
        } else {
          dispatch(package_list_individual());
          dispatch(individual_dependent_list({ individual: user?.id }));
        }
      })();
    }
  }, [isPackageList]);
  const handleMoveForm = async () => {
    setIsPackageList(false);
    setIsShowBack(true);
    setForm((pre) => ({
      ...pre,
      patient: selectedId,
    }));
    if (user?.user_type === "employee") {
      // console.log(form , "newForm123")
      const resData = await appoinment_data_check({
        employee: user?.id,
        patient: selectedId,
        package: form?.package,
      });
      if (resData?.statuscode == 200) {
        // console.log(resData,"resData111")
        setIsCallToHr(resData?.first_time);
        // setForm({...form , is})
      }
    }
  };
  useMemo(() => {
    setForm({ ...form, isFirstTime: isCallToHr });
  }, [isCallToHr]);
  // console.log(drawerOpen ,isListShow,isPackageList, "dsffderwse")
  // useMemo(() => {
  //   if (formTitle == "Appointment" ) {
  //     setIsPackageList(true);
  //     setIsListShow(false);
  //     setAppointmentStep(0)
  //     console.log(isPackageList , isListShow , appointmentStep ,"CheckEippp")
  //   }

  //   // if(!drawerOpen )
  // }, [drawerOpen]);
  useMemo(() => {
    if (form?.exp && packages) {
      (async () => {
        const pkcData = await packages?.data?.find(
          (ele) => ele?.id == form?.package
        );
        checkPackage(pkcData);
        console.log("Cjgddfgtorytryerdgtred");
      })();
      // console.log(pkcData ,packages, "pkcData123")
      // setTimeout(()=>{

      // },2000)
    }
  }, [form?.exp, packages, dependent]);

  // console.log(isPackageList , isListShow, "isPackageList")
  console.log(user?.user_type, "formchek");
  return !isPackageList ? (
    <>
      {/* <InfoDrawer open={open} setOpen={setOpen} info={drawerInfo} /> */}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "90vh", // Full height to enable fixed positioning
        }}
      >
        {isShowBack && activeStep == 0 && (
          <p
            style={{
              color: "#1B3720",
              cursor: "pointer",
              margin: "20px 20px 0px 20px",
              display: "flex",
              alignItems: "center",
              gap: "2px",
              // justifyContent:"center"
            }}
            onClick={() => (
              setIsPackageList(true), setIsListShow(true), setAppointmentStep(2)
            )}
          >
            <img src={reverseArrow} alt="arrow" /> <span> Back</span>
          </p>
        )}
        <Box className="stepper-container">
          <div className="stepper">
            {steps?.map((label, index) => (
              <span
                key={index}
                className={`step ${activeStep === index ? (isEdit ? "active1" : "active") : ""} ${
                  activeStep > index ? "visited" : ""
                }`}
                style={{
                  fontSize: "14px",
                  fontWeight: "700 ",
                  cursor: "pointer",
                  display: notShowingSteps && "none",
                }}
                onClick={() => handleStepClick(index)}
              >
                {label}
              </span>
            ))}
          </div>
        </Box>

        <Box sx={{ flex: 1, overflowY: "scroll", scrollBehavior: "smooth" }}>
          <Form
            formStructure={formStructure[activeStep]}
            handleSubmit={handleSubmit}
            formTitle={formTitle[activeStep]}
            key={"Form"}
            setForm={setForm}
            form={form}
            isEdit={isEdit}
            isMulti={true}
            errorMessage={errorMessage}
            setAllowNext={setAllowNext}
            isCallToHr={isCallToHr}
          />
        </Box>

        <Box sx={{ padding: "1rem" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* {activeStep > 0 && (
          <Button variant="contained" onClick={handleBack} sx={{background:"#64CE46"}}>
            Back
          </Button>
        )} */}
            {/* {activeStep < steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                disableRipple
                className={isEdit ? "btn-class-edit-form" : "btn-class-form"}
                // sx={{
                //   background: isEdit ? "#f0903c" : "#64CE46",
                //   width: "100%",
                //   display: "flex",
                //   gap: "0.5rem",
                //   padding:"11px 30px",
                //   alignItems: "center",
                // }}
              >
                Next <img src={Arrow} alt="Arrow" />
              </Button>
            ) : (
              <Button
                variant="contained"
                disableRipple
                loadingPosition="end"
                className={isEdit ? "btn-class-edit-form" : "btn-class-form"}
                // sx={{
                //   '&:focus': {
                //     outline: 'none', // Remove the default focus outline
                //   },
                //   '&:active': {
                //     boxShadow: 'none', // Remove active state shadow
                //   },
                // }}
                // sx={{ background: isEdit ? "#f0903c" : "#64CE46", width: "100%"  ,  padding:"11px 30px",}}
                onClick={(e) =>
                  allowNext
                    ? (handleSubmit(e), setErrorMessage(false))
                    : setErrorMessage(true)
                }
              >
                {title == "Appointment" && user?.user_type === "individual"
                  ? "Pay Now"
                  : isCallToHr
                    ? "Submit"
                    : "Pay Now"}
              </Button>
            )} */}
            {activeStep < steps.length - 1 ? (
              title !== "Appointment" ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disableRipple
                  className={isEdit ? "btn-class-edit-form" : "btn-class-form"}
                >
                  Next <img src={Arrow} alt="Arrow" />
                </Button>
              ) : user?.user_type === "admin" ||
                user?.user_type === "vendor" ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disableRipple
                  className={isEdit ? "btn-class-edit-form" : "btn-class-form"}
                >
                  Next <img src={Arrow} alt="Arrow" />
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disableRipple
                    className="btn-class-form-cart"
                  >
                    {isCallToHr && user?.user_type === "employee"
                      ? "Next"
                      : "Proceed to Pay"}{" "}
                    <img
                      src={Arrow}
                      style={{ marginLeft: "1rem" }}
                      alt="Arrow"
                    />
                  </Button>
                  <Button
                    className="cart-icon"
                    disableRipple
                    loadingPosition="end"
                    onClick={(e) =>
                      allowNext
                        ? (setIsCartBtn(true),
                          handleSubmit(e),
                          setErrorMessage(false))
                        : setErrorMessage(true)
                    }
                  >
                    <img src={Cart} />
                  </Button>
                  {/* )  */}
                  {/* : null} */}
                </>
              )
            ) : title == "Appointment" && user?.user_type === "individual" ? (
              <>
                <Button
                  variant="contained"
                  disableRipple
                  loadingPosition="end"
                  className={
                    isEdit ? "btn-class-edit-form" : "btn-class-form-cart"
                  }
                  onClick={(e) =>
                    allowNext
                      ? (setIsCartBtn(false),
                      handleSubmit(e, false),
                        setErrorMessage(false))
                      : setErrorMessage(true)
                  }
                >
                  {/* Pay Now */}
                  Proceed to Pay
                </Button>
                <Button
                  className="cart-icon"
                  disableRipple
                  loadingPosition="end"
                  onClick={(e) =>
                    allowNext
                      ? (setIsCartBtn(true),
                      handleSubmit(e, true),
                        setErrorMessage(false))
                      : setErrorMessage(true)
                  }
                >
                  <img src={Cart} />
                </Button>
              </>
            ) : title !== "Appointment" ? (
              <Button
                variant="contained"
                disableRipple
                loadingPosition="end"
                className={
                  title == "Appointment"
                    ? isEdit
                      ? "btn-class-edit-form"
                      : "btn-class-form-cart"
                    : isEdit
                      ? "btn-class-edit-form"
                      : "btn-class-form"
                }
                onClick={(e) =>
                  allowNext
                    ? (handleSubmit(e), setErrorMessage(false))
                    : setErrorMessage(true)
                }
              >
                Submit
              </Button>
            ) : isCallToHr ? (
              <>
                <Button
                  variant="contained"
                  disableRipple
                  loadingPosition="end"
                  className={
                    isEdit ? "btn-class-edit-form" : "btn-class-form-cart"
                  }
                  onClick={(e) =>
                    allowNext
                      ? (setIsCartBtn(false),
                        handleSubmit(e , false),
                        setErrorMessage(false))
                      : setErrorMessage(true)
                  }
                >
                  Submit
                </Button>
                <Button
                  className="cart-icon"
                  disableRipple
                  loadingPosition="end"
                  onClick={(e) =>
                    allowNext
                      ? (setIsCartBtn(true),
                        handleSubmit(e , true),
                        setErrorMessage(false))
                      : setErrorMessage(true)
                  }
                >
                  <img src={Cart} />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  disableRipple
                  loadingPosition="end"
                  className={
                    isEdit ? "btn-class-edit-form" : "btn-class-form-cart"
                  }
                  onClick={(e) =>
                    allowNext
                      ? (setIsCartBtn(false),
                        handleSubmit(e , false),
                        setErrorMessage(false))
                      : setErrorMessage(true)
                  }
                >
                  Proceed to Pay{" "}
                  <img src={Arrow} style={{ marginLeft: "1rem" }} alt="Arrow" />
                </Button>
                <Button
                  className="cart-icon"
                  disableRipple
                  loadingPosition="end"
                  onClick={(e) =>
                    allowNext
                      ? (setIsCartBtn(true),
                        handleSubmit(e , true),
                        setErrorMessage(false))
                      : setErrorMessage(true)
                  }
                >
                  <img src={Cart} />
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  ) : (
    <Box>
      {isEdit ? (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "90vh", // Full height to enable fixed positioning
          }}
        >
          {isShowBack && activeStep == 0 && (
            <p
              style={{
                color: "#1B3720",
                cursor: "pointer",
                margin: "20px 20px 0px 20px",
                display: "flex",
                alignItems: "center",
                gap: "2px",
              }}
              onClick={() => (
                setIsPackageList(true),
                setIsListShow(true),
                setAppointmentStep(1)
              )}
            >
              <img src={reverseArrow} alt="arrow" /> <span> Back</span>
            </p>
          )}
          <Box className="stepper-container">
            <div className="stepper">
              {steps?.map((label, index) => (
                <span
                  key={index}
                  className={`step ${activeStep === index ? (isEdit ? "active1" : "active") : ""} ${
                    activeStep > index ? "visited" : ""
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  {label}
                </span>
              ))}
            </div>
          </Box>

          <Box sx={{ flex: 1, overflowY: "auto" }}>
            <Form
              formStructure={formStructure[activeStep]}
              handleSubmit={handleSubmit}
              formTitle={formTitle[activeStep]}
              key={"Form"}
              setForm={setForm}
              form={form}
              isEdit={isEdit}
              isMulti={true}
              errorMessage={errorMessage}
              setAllowNext={setAllowNext}
            />
          </Box>

          <Box sx={{ padding: "1rem" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {/* {activeStep > 0 && (
          <Button variant="contained" onClick={handleBack} sx={{background:"#64CE46"}}>
            Back
          </Button>
        )} */}

              {activeStep < steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disableRipple
                  sx={{
                    background: isEdit ? "#f0903c" : "#64CE46",
                    width: "100%",
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  Next <img src={Arrow} alt="Arrow" />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disableRipple
                  loadingPosition="end"
                  sx={{
                    background: isEdit ? "#f0903c" : "#64CE46",
                    width: "100%",
                  }}
                  onClick={(e) =>
                    allowNext
                      ? (handleSubmit(e), setErrorMessage(false))
                      : setErrorMessage(true)
                  }
                >
                  Submit
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <div
            id="style-2"
            style={{
              overflowY: "scroll",
              flex: 1,
              overflowX: "hidden",
              maxHeight: "90vh",
              margin: "1rem",
            }}
          >
            {appointmentStep == 0 &&
              packages &&
              packages?.data?.map((data, index) => {
                return (
                  <div key={index}>
                    <div
                      style={{
                        // minHeight: "390px",
                        position: "relative",
                        width: "480px",
                        height: "308px",
                        // width: isSidebarOpen ? "calc(100% - 10px)" : "300px",

                        backgroundColor: "var(--color-white)",
                        padding: "25px",
                        margin: "15px auto",
                        marginBottom: "7px",
                        border: "2px solid var(--primary-background)",
                        boxShadow: "#151515 4px 5px 0px 1px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "0",
                          background:
                            data?.tags_name == "Corporate pay"
                              ? "#1B3720"
                              : "#64CE46",
                          textAlign: "center",
                          borderRadius: "1px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "22px",
                          width:
                            data?.tags_name == "Corporate pay"
                              ? "103px"
                              : "66px",
                        }}
                      >
                        <span
                          style={{
                            color: "white",
                            fontSize: "12px",
                            textAlign: "center",
                          }}
                        >
                          {data?.tags_name}
                        </span>
                      </div>
                      <div style={{ textAlign: "left" }}>
                        <span className="discount-tag">
                          {Math.round(
                            (Number(data?.discount_price) / Number(data?.MRP)) *
                              100
                          ) +
                            "% " +
                            "Off"}
                        </span>
                      </div>
                      <div style={{ textAlign: "left", marginTop: "1rem" }}>
                        <div className="filter-heading">
                          {data?.package_name}
                        </div>
                        {/* <div className="filter-heading">Ayushman Wellness Package</div> */}
                      </div>
                      <div style={{ textAlign: "left", marginTop: "1rem" }}>
                        <div className="filter-price">
                          $ {data?.offer_price}
                        </div>
                        {/* <div className="filter-price">$ 2499</div> */}
                      </div>
                      <hr
                        style={{
                          backgroundColor: "var(--primary-background)",
                          height: "1.8px",
                        }}
                      />
                      <div style={{ textAlign: "left", marginTop: "1rem" }}>
                        <div style={{ display: "flex" }}>
                          <div>
                            {/* <img
         src={microscopeImg}
         alt="microscopeImg"
         className="active-bg-filter mr-1"
       /> */}
                          </div>
                          <div>
                            {/* <span>
                        {data?.description?.length <= 100
                          ? data?.description
                          : data?.description?.substring(0, 100) + "..."}{" "} */}
                            {/* Fasting Blood Glucose */}
                            <span
                              style={{
                                textDecoration: "underline",
                                color: "var(--view-bg)",
                                fontWeight: "900",
                              }}
                            >
                              90+ Test
                            </span>
                            {/* </span> */}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: "15px",
                          left: "0",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            marginTop: "1rem",
                            alignItems: "center",
                          }}
                        >
                          <div
                            className="filter-info-form"
                            onClick={() => {
                              setOpen(true);
                              setDrawerInfo(data);
                            }}
                          >
                            Know More
                          </div>
                          <div
                            className="filter-book-form"
                            onClick={() => checkPackage(data)}
                          >
                            Book Now
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {appointmentStep == 1 && (
            <div
              id="style-2"
              style={{
                overflowY: "scroll",
                flex: 1,
                overflowX: "hidden",
                maxHeight: "90vh",
                margin: "1rem",
              }}
            >
              {centerListOption &&
                centerListOption?.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        // minHeight: "390px",
                        position: "relative",
                        width: "480px",
                        minHeight: "190px",
                        // width: isSidebarOpen ? "calc(100% - 10px)" : "300px",

                        backgroundColor: "var(--color-white)",
                        padding: "25px",
                        margin: "15px auto",
                        marginBottom: "7px",
                        border: "2px solid var(--primary-background)",
                        boxShadow: "#151515 4px 5px 0px 1px",
                      }}
                    >
                      <div style={{ display: "flex", gap: "20px" }}>
                        <div>
                          <img src={centerImg} width={70} height={70} />
                        </div>
                        <div>
                          <p
                            style={{
                              fontSize: "20px",
                              fontWeight: "700",
                              color: "#1B3720",
                            }}
                          >
                            {ele?.center_name}
                          </p>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "400",
                              color: "#1B3720",
                            }}
                          >
                            {ele?.address +
                              " , " +
                              ele?.city +
                              " , " +
                              ele?.state +
                              " , " +
                              ele?.pincode}
                          </p>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "700",
                              color:
                                isCenterHover === index ? "#64CE46" : "#1B3720",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              gap: "10px",
                              cursor: "pointer",
                            }}
                            onMouseEnter={() => setIsCenterHover(index)}
                            onMouseLeave={() => setIsCenterHover(null)}
                            onClick={() => selectCenter(ele?.id)}
                          >
                            Book Appointment{" "}
                            <div style={{ width: "25px", height: "25px" }}>
                              <img
                                src={
                                  isCenterHover === index
                                    ? RightArrowHover
                                    : RightArrow
                                }
                                width={22}
                                alt="Arrow"
                              />
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
          {appointmentStep == 2 && (
            <div
              style={{
                margin: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1rem",
                height: "87vh",
              }}
            >
              <p
                style={{
                  color: "#1B3720",
                  cursor: "pointer ",
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                }}
                onClick={() => setAppointmentStep(1)}
              >
                <img src={reverseArrow} alt="arrow" /> <span> Back</span>
              </p>
              <div style={{ height: "90%", overflow: "scroll" }}>
                {dependentList &&
                  dependentList?.map((dependent, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        // border: `2px solid ${
                        //   selectedId === dependent.id ? "green" : "#ccc"
                        // }`,
                        // borderRadius: "8px",
                        padding: "12px",
                        marginBottom: "20px",
                        margin: "5px 5px 20px 5px",
                        cursor: "pointer",
                        boxShadow: "#151515 4px 6px 0px 1px",
                        background: "rgba(255, 255, 255, 1)",
                      }}
                      onClick={() => handleCheckboxChange(dependent)}
                    >
                      <div
                        style={{
                          position: "relative",
                          marginRight: "12px",
                          width: "20px",
                          height: "20px",
                          border:
                            selectedId === dependent?.id
                              ? ""
                              : "2px solid #0000001A",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          background: selectedId === dependent?.id && "#64CE46",
                          alignItems: "center",
                          boxShadow:
                            selectedId === dependent?.id
                              ? "#1B3720 1px 1px 0px 0px"
                              : "",
                        }}
                      >
                        {" "}
                        {selectedId === dependent?.id && (
                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              backgroundColor: "white",
                              // backgroundColor: "green",
                              borderRadius: "50%",
                            }}
                          ></div>
                        )}
                      </div>
                      {/* <input
            type="radio"
            name="dependent"
            style={{
              marginRight: "12px",
              accentColor: "green",
              transform: "scale(1.3)",
            }}
            checked={selectedId === dependent?.dependent_relation}
            onChange={() => handleCheckboxChange(dependent?.dependent_relation)}
          /> */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          // marginBottom:"20px"
                        }}
                      >
                        {/* Avatar */}
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: "var(--bg-green)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            // borderRadius: "50%",
                            fontWeight: "bold",
                            fontSize: "18px",
                            color: "rgba(250, 255, 243, 1)",
                            marginRight: "12px",
                            boxShadow: "#151515 4px 6px 0px 1px",
                          }}
                        >
                          {dependent.dependent_name[0].toUpperCase()}
                        </div>
                        {/* Details */}
                        <div>
                          <div
                            style={{
                              fontWeight: "bold",
                              fontSize: "20px",
                              marginBottom: "4px",
                            }}
                          >
                            {dependent?.dependent_name}
                          </div>
                          <div
                            style={{
                              color: "#6c757d",
                              fontSize: "16px",
                            }}
                          >
                            {dependent.dependent_relation_name}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                {/* <div style={{ marginTop: "40px" }}>
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  width: "100%",
                  textAlign: "center",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                  justifyContent: "center",
                  
                }}
                onClick={() => setOpens(true)}
              >
                <AddIcon /> Add Dependent{" "}
              </p>
            </div> */}
              </div>
              <AddDependent open={opens} setOpen={setOpens} />
              <div>
                <Button
                  variant="contained"
                  onClick={handleMoveForm}
                  disableRipple
                  className={isEdit ? "btn-class-edit-form" : "btn-class-form"}
                  disabled={selectedId !== null ? false : true}
                  // sx={{
                  //   background: isEdit ? "#f0903c" : "#64CE46",
                  //   width: "100%",
                  //   display: "flex",
                  //   gap: "0.5rem",
                  //   alignItems: "center",
                  // }}
                >
                  Next{" "}
                  <img
                    src={Arrow}
                    style={{ marginLeft: "0.5rem" }}
                    alt="Arrow"
                  />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
      <InfoDrawer open={open} setOpen={setOpen} info={drawerInfo} />
    </Box>
  );
};

export default MultiStepForm;
