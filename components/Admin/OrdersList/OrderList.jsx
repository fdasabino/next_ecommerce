import { Button, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import * as React from "react";
import { useState } from "react";
import { AiOutlineArrowRight, AiOutlineCheck, AiOutlineIssuesClose } from "react-icons/ai";
import styles from "./OrderList.module.scss";

const headCells = [
  {
    id: "user",
    numeric: false,
    disablePadding: true,
    label: "User",
  },
  {
    id: "total",
    numeric: false,
    disablePadding: true,
    label: "Total",
  },
  {
    id: "payment",
    numeric: false,
    disablePadding: false,
    label: "Payment",
  },
  {
    id: "paid",
    numeric: false,
    disablePadding: false,
    label: "Paid ?",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "view",
    numeric: false,
    disablePadding: false,
    label: "View",
  },
];

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
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              borderBottom: "1px solid #000000",
              fontWeight: "bold",
              fontSize: "12px",
            }}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box
                  component="span"
                  sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const UsersList = ({ rows }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("date");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const router = useRouter();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

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
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const goToORder = (id) => router.push(`/order/${id}`);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <div className={styles.order_list}>
      <div className={styles.header}>
        <h2>Current orders in database ({rows.length})</h2>
      </div>
      {rows.length === 0 ? (
        <p>No orders to show</p>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
                className={styles.table}>
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row._id);

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row._id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}>
                        {/* ordered by */}
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            fontSize: "12px",
                          }}
                          align={"center"}>
                          {rows[index].user.email}
                        </TableCell>
                        {/* total */}
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            fontSize: "12px",
                          }}
                          align={"center"}>
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(row.total)}
                        </TableCell>

                        {/* payment method */}
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            fontSize: "12px",
                          }}
                          align={"center"}>
                          {row.paymentMethod}
                        </TableCell>

                        {/* is paid */}
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            fontSize: "12px",
                          }}
                          align={"center"}>
                          {row.isPaid ? (
                            <AiOutlineCheck color="green" />
                          ) : (
                            <AiOutlineIssuesClose color="red" />
                          )}
                        </TableCell>

                        {/* status */}
                        <TableCell
                          component="th"
                          scope="row"
                          align={"center"}
                          style={{
                            color: "Not Processed"
                              ? "#ed4337"
                              : order.status == "Processing"
                              ? "#54b7d3"
                              : order.status == "Dispatched"
                              ? "#1e91cf"
                              : order.status == "Cancelled"
                              ? "#fac80f"
                              : order.status == "Completed"
                              ? "#6cc070"
                              : "",
                            fontSize: "12px",
                          }}>
                          {row.status}
                        </TableCell>

                        {/* Date */}
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            fontSize: "12px",
                          }}
                          align={"center"}>
                          {row.createdAt.substring(0, 10)}
                        </TableCell>

                        {/* View Order Button */}
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            fontSize: "12px",
                          }}
                          align={"center"}>
                          <Tooltip title="View Order">
                            <Button onClick={() => goToORder(row._id)}>
                              <AiOutlineArrowRight />
                            </Button>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={
              <Switch
                checked={dense}
                onChange={handleChangeDense}
              />
            }
            label="Dense padding"
          />
        </Box>
      )}
    </div>
  );
};

export default UsersList;
