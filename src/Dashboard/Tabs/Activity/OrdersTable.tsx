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
//import PackagedOrder from "./PackagedOrder";

interface PackagedOrder {
  timestamp: Date;
  // placed_date: Date;
  // executed_date: Date;
  symbol: string;
  // symbol_desc: string;
  type: string;
  // shares: number;
  quantity: number;
  price: number;
  amount: number;
  cash_balance: number;
  settlement_date: Date;
}

function OrderRow({ order }: { order: PackagedOrder }) {
  const [status, setStatus] = useState(false);
  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand" onClick={() => setStatus(!status)}>
            {status ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">
          {new Date(order.timestamp).toDateString()}
        </TableCell>
        <TableCell align="left">
          {new Date(order.timestamp).toDateString()}
        </TableCell>
        <TableCell align="left">{`YOU BOUGHT ${order.symbol}`}</TableCell>
        <TableCell align="left">{`$${order.quantity * order.price}`}</TableCell>
        <TableCell align="left">{`$${order.cash_balance}`}</TableCell>
      </TableRow>
      <TableRow>
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
                  <TableRow>
                    <TableCell component="th">{"Executed Date: "}</TableCell>
                    <TableCell align="left">
                      {new Date(order.timestamp).toDateString()}
                    </TableCell>
                  </TableRow>
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
              <col style={{ width: "8%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "23%" }} />
              <col style={{ width: "23%" }} />
              <col style={{ width: "23%" }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="left">Placed Date</TableCell>
                <TableCell align="left">Executed Date</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Amount</TableCell>
                <TableCell align="left">Cash Balance</TableCell>
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
