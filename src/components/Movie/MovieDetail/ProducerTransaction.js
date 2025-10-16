import React, { useMemo, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import PopupForm from "../../utils/PopupForm";
// import { transaction_create } from "../../actions/transaction";
import { useDispatch, useSelector } from "react-redux";
// import { bank_detail_list } from "../../actions/bankdetails";
// import { proxy_payouts } from "../../actions/payment";
import { distributor_producer_transaction } from "../../../actions/payment";
import { RAZORPAYRES } from "../../../constants/actionTypes";
import { movie_details } from "../../../actions/Movie/movie";
import * as TransactionAction from "../../../actions/bankdetails";
import * as PaymentAction from "../../../actions/payment"
import { bindActionCreators } from "redux";

function MyTask(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

MyTask.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, startDate, endDate, status, badgeClass, budget) {
  return {
    name,
    startDate,
    endDate,
    status,
    badgeClass,
    budget,
  };
}

const rows = [
  createData(
    "Public Beta Release",
    "1 Jan 2022",
    "1 Apr 2022",
    "Completed",
    "successBadge",
    "$1250"
  ),
  createData(
    "Fix Platform Errors",
    "1 Mar 2022",
    "1 May 2022",
    "Completed",
    "successBadge",
    "$1550"
  ),
  createData(
    "Launch our Mobile App",
    "15 Apr 2022",
    "15 Jun 2022",
    "On Going",
    "primaryBadge",
    "$2500"
  ),
].sort((a, b) => (a.name < b.name ? -1 : 1));

const MyTasks = ({
  history,
  producer_earning,
  producer_id,
  movie_id,
  pending_money,
  received_money,
}) => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const user = useSelector((state) => state.layout.profile);
  const [form, setForm] = useState({});
  const [otp, setOpt] = useState();
  const [razorData , setRazorData] = useState({})
  const [isClick , setIsClick] = useState(false)
  const [openAdError, setOpenAdError] = useState(false);

  const [bankDetails , setBankDetails] = useState([])
	const role = useSelector((state) => state.layout.role)

  // const [content , setContent] = useState()
  const dispatch = useDispatch();

  const { bank_detail_list } = bindActionCreators(TransactionAction, dispatch);
  useMemo(() => {
    (async () => {
      if (producer_id) {
        const data = new FormData();
        data.append("user", producer_id);
        // dispatch(bank_detail_list(data));
        const resData = await bank_detail_list(data);
        setBankDetails(resData)
      } 
    })();
  }, [producer_id]);
  const handleChangeOtp = () => {

  };

  const razorpayRes = useSelector((state) => state?.payment?.razorpayRes);
  const message = useSelector((state) => state.layout.message);


  const [openPopUp, setOpenPopUp] = useState(false);
  const [openOtpPopUp, setOpenOtpPopUp] = useState(false);
  const { proxy_payouts } = bindActionCreators(PaymentAction, dispatch);

  const [formStructure, setFormStructure] = useState([
    {
      id: "1",
      type: "inputBox",
      title: "Customer Name",
      name: "customer",
      required: true,
      disabled: true,
      size: "12",
    },
    {
      id: "2",
      type: "inputBox",
      title: "Customer Number",
      name: "acc_number",
      required: true,
      disabled: true,
      size: "12",
    },
    {
      id: "3",
      type: "inputBox",
      title: "Customer Number",
      name: "acc_ifsc",
      required: true,
      disabled: true,
      size: "12",
    },

    {
      id: "5",
      type: "inputBox",
      title: "Payment Mode",
      name: "payment_mode",
      required: true,
      disabled: true,
      size: "12",
    },
    {
      id: "4",
      type: "inputBox",
      title: "Amount",
      name: "amount",
      required: true,
      regex: /^[0-9\s]+$/,
      // disabled: true,
      size: "12",
    },

    {
      id: "6",
      type: "button",
      title: "Submit",
    },
  ]);
  useMemo(() => {
    if (openPopUp) {
      setForm({
        ...form,
        customer: bankDetails?.data[0]?.acc_holder_name,
        acc_number: bankDetails?.data[0]?.acc_number,
        acc_ifsc: bankDetails?.data[0]?.ifsc_code,
        // amount: parseFloat(pending_money).toFixed(2),
        payment_mode: "IMPS",
      });
    }
  }, [openPopUp, bankDetails]);
  //   const handleSubmit = (event) => {
  //     event.preventDefault();

  //     setForm({});
  //     setOpenPopUp(false);
  //   };
  useMemo(()=>{
    if(Number(form?.amount) > Number(pending_money)){
     setOpenAdError(true)
    }
  
  },[form?.amount])

  // const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     const username = 'rzp_test_8m3Fho730KwaLV';
  //     const password = 'FZUA11NsmlVrsfwKZvIVywkc';

  //     const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');

  //     const data_bank = {
  //         "account_number":"2323230098943654",
  //         "amount":form?.amount * 100,
  //         "currency":"INR",
  //         "mode":form?.payment_mode,
  //         "purpose":"refund",
  //         "fund_account":{
  //             "account_type":"bank_account",
  //             "bank_account":{
  //                 "name":form?.customer,
  //                 "ifsc":form?.acc_ifsc,
  //                 "account_number":form?.acc_ifsc
  //             },
  //             "contact":{
  //                 "name":form?.customer,
  //                 // "email":"gaurav.kumar@example.com",
  //                 "contact":"9876543210",
  //                 "type":"Distributor",
  //                 "reference_id":"Acme Contact ID 12345",
  //                 "notes":{
  //                     "notes_key_1":"Payment for this movie",
  //                     // "notes_key_2":"Tea, Earl Grey… decaf."
  //                 }
  //             }
  //         },
  //         "queue_if_low_balance":true,
  //         "reference_id":"Acme Transaction ID 12345",
  //         "narration":"Acme Corp Fund Transfer",
  //         // "notes":{
  //         //     "notes_key_1":"Beam me up Scotty",
  //         //     "notes_key_2":"Engage"
  //         // }
  //     }
  //     try {
  //         const response = await fetch('https://api.razorpay.com/v1/payouts', {
  //             method: 'POST', mode: 'no-cors',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 'Authorization': `Basic ${base64Credentials}`, // Adding Basic Auth header
  //                 // Add any additional headers if required
  //             },
  //             body: JSON.stringify(data_bank), // Assuming form contains the data you want to send
  //         });

  //         if (!response.ok) {
  //             // Handle error responses
  //             throw new Error('Network response was not ok');
  //         }

  //         // Handle success response
  //         const data = await response.json();
  //         setForm({});
  //         setOpenPopUp(false);
  //     } catch (error) {
  //         // Handle fetch error
  //         console.error('Error while fetching data:', error.message);
  //     }
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = "rzp_test_8m3Fho730KwaLV";
    const password = "FZUA11NsmlVrsfwKZvIVywkc";

    const base64Credentials = btoa(`${username}:${password}`);

    const data_bank = {
      account_number: "2323230098943654",
      amount: form?.amount * 100,
      currency: "INR",
      mode: form?.payment_mode,
      purpose: "refund",
      fund_account: {
        account_type: "bank_account",
        bank_account: {
          name: form?.customer,
          ifsc: form?.acc_ifsc,
          account_number: form?.acc_ifsc,
        },
        contact: {
          name: form?.customer,
          contact: "9876543210",
          type: "Producer",
          reference_id: "Acme Contact ID 12345",
          notes: {
            notes_key_1: "Payment for this movie",
          },
        },
      },
      queue_if_low_balance: true,
      reference_id: "Acme Transaction ID 12345",
      narration: "Acme Corp Fund Transfer",
    };

    // const response = await fetch( proxy_payouts, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data_bank)
    //   });
     
     
    if(Number(form?.amount) > Number(pending_money)){
      setOpenAdError(true)
      setForm({...form,amount : ""});
    }else{
      const razorRES = await proxy_payouts(JSON.stringify(data_bank));
      setRazorData(razorRES)
      setIsClick(true)
      setForm({});
    }
    // ;
  };

  useMemo(() => {
    if (isClick) {
      setTimeout(() => {
        const pay_data = new FormData();
        pay_data.append("userType", "Producer");
        pay_data.append("sender_user", user?.id);
        pay_data.append("receiver_user", producer_id);
        pay_data.append("payment_method", razorData?.Data?.mode);
        pay_data.append("payment_id", razorData?.Data?.id);
        pay_data.append("bank_acc" ,bankDetails?.data[0]?.acc_number)
        pay_data.append("payment_amount", razorData?.Data?.amount / 100);
        pay_data.append("movie", movie_id);
        dispatch(distributor_producer_transaction(pay_data));
        setOpenPopUp(false);
      }, 1000);
      setRazorData({})
      dispatch({ type: RAZORPAYRES, payload: undefined });
      setIsClick(false)
    }
  }, [isClick]);
  useMemo(() => {
    if (message?.statuscode == 200) {
      const formData = new FormData();
      formData.append("id", movie_id);
      dispatch(movie_details(formData));
    }
  }, [message]);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const convertDateFormat = (inputDate) => {
    const dateParts = inputDate.split("-");
    const formattedDate = new Date(
      Date.UTC(
        parseInt(dateParts[0]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[2])
      )
    );
    return formattedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }); // DD-MM-YYYY format
  };
  const handleClose = () => {
    setOpenAdError(false);
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
          {"You are unable to pay more than the outstanding balance. "}
        </Alert>
      </Snackbar>
      <PopupForm
        open={openPopUp}
        setOpen={setOpenPopUp}
        // content={content}
        formStructure={formStructure}
        handleSubmit={handleSubmit}
        formTitle={"Create Payment"}
        key={"Form"}
        setForm={setForm}
        form={form}
        // tableData={tableData}
        // setTableData={setTableData}
        // isEdit={isEdit}
        // setIsEdit={setIsEdit}
      />

      <Card
        sx={{
          boxShadow: "var(--themeShadow)",
          borderRadius: "10px",
          p: "25px 20px 15px",
          mb: "15px",
          backgroundColor: "var(--themeColor)",
        }}
      >
        <Box
          sx={{
            paddingBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Producer Payment History
          </Typography>
          <Box
            sx={{
              paddingBottom: "10px",
              display: "flex",
              gap: "1rem",
              // justifyContent:"space-between"
            }}
          >
            <Typography
              as="h3"
              sx={{
                fontSize: 18,
                fontWeight: 500,
                mt: 1,
              }}
            >
              Total Earning :{" "}
              <span style={{ color: "orange" }}>
                ₹ {parseFloat(producer_earning).toFixed(2)}
              </span>
            </Typography>
            <Typography
              as="h3"
              sx={{
                // mt:1,
                borderRight: "1px solid #b5b1b1",
              }}
            ></Typography>
            <Typography
              as="h3"
              sx={{
                fontSize: 18,
                fontWeight: 500,
                mt: 1,
              }}
            >
              Total Send Amount:{" "}
              <span style={{ color: "green" }}>
                ₹ {parseFloat(received_money).toFixed(2)}
              </span>
            </Typography>
            <Typography
              as="h3"
              sx={{
                // mt:1,
                borderRight: "1px solid #b5b1b1",
              }}
            ></Typography>
            <Typography
              as="h3"
              sx={{
                fontSize: 18,
                fontWeight: 500,
                mt: 1,
              }}
            >
              Pending Amount :{" "}
              <span style={{ color: "red" }}>
                ₹ {parseFloat(pending_money).toFixed(2)}
              </span>
            </Typography>
         {  role !=="Producer" && role !=="Distributor" && <Button
              type={"button"}
              variant="contained"
              style={{
                background:
                  "linear-gradient(225deg,  var(--gradientColor1) 0%, var(--gradientColor2) 91.25%)",
              }}
              sx={{
                // mt: 1,
                textTransform: "capitalize",
                borderRadius: "8px",
                fontWeight: "500",
                fontSize: "13px",
                padding: "12px 20px",
                minWidth: "0",
                minHeight: "0",
                color: "#fff !important",
              }}
              onClick={() => setOpenPopUp(true)}
            >
             Make Payment
            </Button>}
          </Box>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
          }}
        >
          <Table
            sx={{ minWidth: 600 }}
            aria-label="custom pagination table"
            className="dark-table"
          >
            <TableHead sx={{ background: "#F7FAFF" }}>
              <TableRow>
                <TableCell
                  sx={{
                    borderBottom: "1px solid var(--themeFontColor)",
                    fontSize: "13.5px",
                    color:"var(--themeFontColor)"
                  }}
                >
                 <p style={{ color: "var(--themeFontColor)" }}>Payment Date</p> 
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "1px solid var(--themeFontColor)",
                    fontSize: "13.5px",
                    color:"var(--themeFontColor)"
                  }}
                >
                 <p style={{ color: "var(--themeFontColor)" }}>Amount</p> 
                </TableCell>

                <TableCell
                  sx={{
                    borderBottom: "1px solid var(--themeFontColor)",
                    fontSize: "13.5px",
                    color:"var(--themeFontColor)"
                  }}
                >
                 <p style={{ color: "var(--themeFontColor)" }}>Payment Mode</p>
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "1px solid var(--themeFontColor)",
                    fontSize: "13.5px",
                    color:"var(--themeFontColor)"
                  }}
                >
                <p style={{ color: "var(--themeFontColor)" }}>Payment ID</p>  
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? history?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : history
              )?.map((row) => (
                <TableRow key={row?.id}>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid var(--themeFontColor)",
                      fontSize: "13px",
                      pt: "16px",
                      pb: "16px",
                    }}
                  >
                    <p style={{ color: "var(--themeFontColor)" }}>{convertDateFormat(row.date)}</p>
                   
                  </TableCell>
                  
                  <TableCell
                    sx={{
                      borderBottom: "1px solid var(--themeFontColor)",
                      fontSize: "13px",
                      pt: "16px",
                      pb: "16px",
                    }}
                  >
                    <p style={{ color: "var(--themeFontColor)" }}>
                      ₹ {parseFloat(row?.payment_amount).toFixed(2)}
                    </p>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      fontSize: "13px",
                      borderBottom: "1px solid var(--themeFontColor)",
                      color: "#260944",
                      pt: "16px",
                      pb: "16px",
                    }}
                  >
                    <p style={{ color: "var(--themeFontColor)" }}>
                      {row?.payment_method}
                    </p>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      fontSize: "13px",
                      borderBottom: "1px solid var(--themeFontColor)",
                      color: "#260944",
                      pt: "16px",
                      pb: "16px",
                    }}
                  >
                    <p style={{ color: "var(--themeFontColor)" }}>
                      {row?.payment_id}
                    </p>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell
                    colSpan={4}
                    style={{ borderBottom: "1px solid var(--themeFontColor)" }}
                  />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={8}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={MyTask}
                  style={{ borderBottom: "none" }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default MyTasks;
