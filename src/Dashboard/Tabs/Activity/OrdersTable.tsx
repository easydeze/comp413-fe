import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Stack,
  TableRow,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandMore";
import { getOrdersHTTP } from "../../../API/Dashboard/OrderAPI";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { cancelOrderHTTP } from "../../../API/Dashboard/CancelOrderAPI";
//import PackagedOrder from "./PackagedOrder";

interface PackagedOrder {
  timestamp: Date;
  // placed_date: Date;
  // executed_date: Date;
  symbol: string;
  // symbol_desc: string;
  type: string;
  id: string;
  // shares: number;
  quantity: number;
  price: number;
  amount: number;
  cash_balance: number;
  settlement_date: Date;
}

function OrderRow({ order }: { order: PackagedOrder }) {
  const [status, setStatus] = useState(false);
  const token2 = sessionStorage.getItem("token");

  const deleteOrderHandler = async (orderId: string) => {
    (async () => {
      try {
        if (token2) {
          const response = await cancelOrderHTTP(token2, orderId);

          if (response !== null) {
            if (response === true) {
              console.log("Canceled Order.");
              let row1 = document.getElementById(`order-row1-${order.id}`);
              if (row1 !== null) {
                row1.style.display = "none";
              }

              let row2 = document.getElementById(`order-row2-${order.id}`);
              if (row2 !== null) {
                row2.style.display = "none";
              }

              let delete_button = document.getElementById(
                `delete-order-${order.id}`
              );
              if (delete_button !== null) {
                delete_button.style.display = "none";
              }

              let delete_text = document.getElementById(
                `delete-order-text-${order.id}`
              );
              if (delete_text !== null) {
                delete_text.innerHTML = "Order Has Been Canceled.";
                delete_text.style.display = "block";
              }
              // const response2 = await getOrdersHTTP(token2);

              // if (response2) {
              //   setOrdersList(response2);

              //   console.log("Fetched Orders.");
              // } else {
              //   console.log("Invalid credentials. Please try again.");
              // }
            } else if (response === false) {
              console.log("Order could not be canceled.");

              let delete_button = document.getElementById(
                `delete-order-${order.id}`
              );
              if (delete_button !== null) {
                delete_button.style.display = "none";
              }

              let delete_text = document.getElementById(
                `delete-order-text-${order.id}`
              );
              if (delete_text !== null) {
                delete_text.innerHTML = "Order Could Not Be Canceled.";
                delete_text.style.display = "block";
              }
            }
          } else {
            console.log("Invalid credentials. Please try again.");
          }
        }
      } catch (error: any) {
        console.log("Order cancel fetch failed. Please try again.");
      }
    })();
  };

  return (
    <React.Fragment>
      <TableRow id={`order-row1-${order.id}`}>
        <TableCell>
          <IconButton aria-label="expand" onClick={() => setStatus(!status)}>
            {status ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">
          {new Date(order.timestamp).toDateString()}
        </TableCell>
        <TableCell align="left">
          {(order.type === "buy" && `YOU BOUGHT ${order.symbol} (PENDING)`) ||
            (order.type === "sell" && `YOU SOLD ${order.symbol} (PENDING)`)}
        </TableCell>
        <TableCell align="left">{`$${order.quantity * order.price}`}</TableCell>
        <TableCell align="left">
          <Button
            id={`delete-order-${order.id}`}
            key="order."
            startIcon={<DeleteIcon />}
            onClick={(e) => {
              deleteOrderHandler(order.id);
            }}
          >
            Cancel Order
          </Button>
          <Box id={`delete-order-text-${order.id}`} display={"none"}>
            Order Could Not Be Canceled.
          </Box>
        </TableCell>
        {/* <TableCell align="left">{`$${order.cash_balance}`}</TableCell> */}
      </TableRow>
      <TableRow id={`order-row2-${order.id}`}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={status} timeout="auto" unmountOnExit>
            <Box>
              <Table size="small" aria-label="order info">
                <TableBody>
                  <TableRow>
                    <TableCell component="th">{"Placed Date: "}</TableCell>
                    <TableCell align="left">
                      {new Date(order.timestamp).toDateString()}
                    </TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell component="th">{"Executed Date: "}</TableCell>
                    <TableCell align="left">
                      {new Date(order.timestamp).toDateString()}
                    </TableCell>
                  </TableRow> */}
                  <TableRow>
                    <TableCell component="th">{"Symbol: "}</TableCell>
                    <TableCell align="left">{order.symbol}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">{"Shares: "}</TableCell>
                    <TableCell align="left">{order.quantity}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">{"Price: "}</TableCell>
                    <TableCell align="left">{`$${order.price}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">{"Amount: "}</TableCell>
                    <TableCell align="left">
                      {`$${order.quantity * order.price}`}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const OrdersTable = () => {
  let [orders_list, setOrdersList] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        if (token) {
          const response = await getOrdersHTTP(token);

          if (response) {
            setOrdersList(response);

            console.log("Fetched Orders.");
          } else {
            console.log("Invalid credentials. Please try again.");
          }
        }
      } catch (error: any) {
        console.log("Order fetch failed. Please try again.");
      }
    })();
  }, []);

  return (
    <div>
      <Stack marginTop={5}>
        <TableContainer component={Paper}>
          <Table aria-label="orders table">
            <colgroup>
              <col style={{ width: "10%" }} />
              {/* <col style={{ width: "15%" }} /> */}
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="left">Placed Date</TableCell>
                {/* <TableCell align="left">Executed Date</TableCell> */}
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Amount</TableCell>
                {/* <TableCell align="left">Cash Balance</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders_list.map((order) => (
                <OrderRow order={order} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </div>
  );
};

export default OrdersTable;
