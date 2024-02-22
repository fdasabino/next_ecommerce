import { Button, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
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
        id: "1",
        numeric: false,
        disablePadding: true,
        label: "Order Total",
    },
    {
        id: "2",
        numeric: false,
        disablePadding: false,
        label: "Payment method",
    },
    {
        id: "3",
        numeric: false,
        disablePadding: false,
        label: "Paid",
    },
    {
        id: "4",
        numeric: false,
        disablePadding: false,
        label: "Status",
    },
    {
        id: "5",
        numeric: false,
        disablePadding: false,
        label: "Order Date",
    },
    {
        id: "6",
        numeric: false,
        disablePadding: false,
        label: "View Order",
    },
];

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

const getComparator = (order, orderBy) => {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
};

const EnhancedTableHead = (props) => {
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
                        align={"center"}
                        padding={"normal"}
                        sortDirection={orderBy === headCell.id ? order : false}>
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
};

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const OrderList = ({ rows }) => {
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("3");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const router = useRouter();

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleClick = (name) => {
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

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const goToORder = (id) => router.push(`/order/${id}`);

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
                                className={styles.table}>
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    rowCount={rows.length}
                                />
                                <TableBody>
                                    {visibleRows.map((row, index) => {
                                        const isItemSelected = isSelected(row._id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

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
                                                {/* total */}
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    align={"center"}>
                                                    {new Intl.NumberFormat("en-US", {
                                                        style: "currency",
                                                        currency: "USD",
                                                    }).format(row.total)}
                                                </TableCell>

                                                {/* payment method */}
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    align={"center"}>
                                                    {row.paymentMethod}
                                                </TableCell>

                                                {/* is paid */}
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
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
                                                    id={labelId}
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
                                                    }}>
                                                    {row.status}
                                                </TableCell>

                                                {/* Date */}
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    align={"center"}>
                                                    {row.createdAt.substring(0, 10)}
                                                </TableCell>

                                                {/* View Order Button */}
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
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
                </Box>
            )}
        </div>
    );
};

export default OrderList;
