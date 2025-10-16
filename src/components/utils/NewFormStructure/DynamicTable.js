import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  useTheme,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const DynamicTable = ({ data, columns, onEdit, onDelete }) => {
  const theme = useTheme();
  const darkMode = JSON.parse(sessionStorage.getItem("darkMode"));

  // Theme-based styles
  const tableContainerStyles = {
    border: "1px solid var(--formBorderLineColor)",
    mt: 2,
    backgroundColor: "var(--themeColor)",
  };

  const tableHeaderStyles = {
    backgroundColor: "var(--themeColor)",
    "& .MuiTableCell-root": {
      color: "var(--themeFontColor)",
      fontWeight: "bold",
      borderBottom: "1px solid var(--formBorderLineColor)",
    },
  };

  const tableBodyStyles = {
    "& .MuiTableCell-root": {
      color: "var(--themeFontColor)",
      backgroundColor: "var(--themeColor)",
      borderBottom: "1px solid var(--formBorderLineColor)",
    },
    "& .MuiTableRow-root:hover": {
      backgroundColor: "var(--themeColorLighterShade)",
    },
  };

  const iconButtonStyles = {
    color: "rgba(26, 160, 83,1)",
    backgroundColor: "var(--themeColor)",
    "&:hover": {
      backgroundColor: "var(--themeColorLighterShade)",
    },
  };

  const deleteButtonStyles = {
    color: "rgba(192, 50, 33,1)",
    backgroundColor: "var(--themeColor)",
    "&:hover": {
      backgroundColor: "var(--themeColorLighterShade)",
    },
  };
  const renderCellContent = (row, column) => {
    const value = row[column.field];

    // Use custom render function if provided
    if (column.render) {
      
      return column.render(row);
    }

    // Handle File object (like audio or image)
    if (value instanceof File) {
      if (value.type.startsWith("audio/")) {
        return (
          <div>
            <p>{value.name}</p>
            <audio controls src={URL.createObjectURL(value)} />
          </div>
        );
      } else if (value.type.startsWith("image/")) {
        return (
          <div>
            <p>{value.name}</p>
            <img
              src={URL.createObjectURL(value)}
              alt={value.name}
              style={{ maxWidth: "100px", maxHeight: "80px" }}
            />
          </div>
        );
      } else {
        return <p>{value.name}</p>;
      }
    }

    return value || "-";
  };

  return (
    <TableContainer component={Paper} sx={tableContainerStyles}>
      <Table>
        <TableHead sx={tableHeaderStyles}>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                sx={{
                  color: "var(--themeFontColor) !important",
                  borderRight:
                    index < columns.length - 1
                      ? "1px solid var(--formBorderLineColor)"
                      : "none",
                      fontWeight : "400 !important"
                }}
              >
                {column.title} { column?.required &&<span style={{color:"red" , paddingLeft:"5px"}}>*</span>}
              </TableCell>
            ))}
            <TableCell
              sx={{
                color: "var(--themeFontColor) !important",
                borderLeft: "1px solid var(--formBorderLineColor)",
                borderBottom: "1px solid var(--formBorderLineColor)",
                 fontWeight : "400 !important"
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={tableBodyStyles}>
          {data?.map((row, rowIndex) => (
            <TableRow key={rowIndex} hover>
              {columns?.map((column, colIndex) => (
                <TableCell
                  key={colIndex}
                  sx={{
                    color: "var(--themeFontColor) !important",
                    borderRight:
                      colIndex < columns?.length - 1
                        ? "1px solid var(--formBorderLineColor)"
                        : "none",
                  }}
                >
                  {/* {column.render ? column.render(row) : row[column.field]} */}
                      {renderCellContent(row, column)}
                </TableCell>
              ))}
              <TableCell
                sx={{
                  borderLeft: "1px solid var(--formBorderLineColor)",
                  borderBottom: "1px solid var(--formBorderLineColor)",
                }}
              >
                <IconButton
                  onClick={() => onEdit(rowIndex, row)}
                  sx={iconButtonStyles}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(rowIndex)}
                  sx={deleteButtonStyles}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
