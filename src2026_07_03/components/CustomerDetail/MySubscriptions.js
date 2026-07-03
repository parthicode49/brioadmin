import React from "react";
import { Box, Typography } from "@mui/material";
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
import dayjs from "dayjs";
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
    budget
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

const MyTasks = ({data}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "var(--themeShadow)",
          background:"var(--themeColor)",
          borderRadius: "10px",
          p: "25px 20px 15px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            paddingBottom: "10px",
          }}
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Subscription History
          </Typography>
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
            <TableHead sx={{ background:
          "linear-gradient(225deg,  var(--gradientColorLighter1) 0%, var(--gradientColorLighter2) 91.25%)"  }}>
              <TableRow>
                <TableCell
                  sx={{
                    borderBottom: "1px solid var(--themeFontColor)",
                    fontSize: "13.5px", 
                  }}
                >
                  Plan Name
                </TableCell>

                <TableCell
                  sx={{
                    borderBottom: "1px solid var(--themeFontColor)",
                    fontSize: "13.5px", 
                  }}
                >
                  Amount
                </TableCell>

                <TableCell
                  sx={{
                    borderBottom: "1px solid var(--themeFontColor)",
                    fontSize: "13.5px", 
                  }}
                >
                  	Purchased on
                </TableCell>

                {/* <TableCell
                  align="center"
                  sx={{
                    borderBottom: "1px solid var(--themeFontColor)",
                    fontSize: "13.5px", 
                  }}
                >
                  	Purchased by
                </TableCell> */}
                <TableCell
                  align="center"
                  sx={{
                    borderBottom: "1px solid var(--themeFontColor)",
                    fontSize: "13.5px", 
                  }}
                >
                 	Promocode
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    borderBottom: "1px solid var(--themeFontColor)",
                    fontSize: "13.5px", 
                  }}
                >
                 	Expierd on
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? data?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              )?.map((row) => (
                <TableRow key={row?.id}>
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      fontSize: "13px",
                      borderBottom: "1px solid var(--themeFontColor)",
                      color: "#260944", 
                      pt: '16px',
                      pb: '16px',
                    }}
                  >
                    <p style={{color:"var(--themeFontColor)"}}>{row?.plan}</p>
                  </TableCell>

                  <TableCell
                    sx={{
                      borderBottom: "1px solid var(--themeFontColor)", 
                      fontSize: "13px",
                      pt: '16px',
                      pb: '16px',
                    }}
                  >
                     <p style={{color:"var(--themeFontColor)"}}>{parseFloat(row?.payment_amount).toFixed(2)}</p>
                  </TableCell>

                  <TableCell
                    sx={{
                      borderBottom: "1px solid var(--themeFontColor)", 
                      fontSize: "13px",
                      pt: '16px',
                      pb: '16px',
                    }}
                  >
                     <p style={{color:"var(--themeFontColor)"}}>{dayjs(row.created_at).format("DD-MM-YYYY")}</p>
                  </TableCell>
                  {/* <TableCell
                    align="center"
                    sx={{
                      fontWeight: 500,
                      borderBottom: "1px solid var(--themeFontColor)",
                      fontSize: "11px", 
                      pt: '16px',
                      pb: '16px',
                    }}
                  >
                <p style={{color:"var(--themeFontColor)"}}>{row?.user?.firstName+" "+row?.user?.lastName}</p>
                  </TableCell> */}
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 500,
                      borderBottom: "1px solid var(--themeFontColor)",
                      fontSize: "11px", 
                      pt: '16px',
                      pb: '16px',
                    }}
                  >
                    <span className={row.badgeClass} style={{color:"var(--themeFontColor)"}}>{row.promocode || "-"}</span>
                  </TableCell>

                  <TableCell
                    sx={{
                      borderBottom: "1px solid var(--themeFontColor)", 
                      fontSize: "13px",
                      pt: '16px',
                      pb: '16px',
                    }}
                    align="center"
                  >
                     <p style={{color:"var(--themeFontColor)"}}>{dayjs(row.expiry_date).format("DD-MM-YYYY")}</p>
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
