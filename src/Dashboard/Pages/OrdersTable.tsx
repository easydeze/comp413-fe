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
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandMore";
//import PackagedOrder from "./PackagedOrder";

interface PackagedOrder {
  date: Date;
  symbol: string;
  symbol_desc: string;
  type: string;
  shares: number;
  price: number;
  amount: number;
  cash_balance: number;
  settlement_date: Date;
}

function packageOrder(
  date: Date,
  symbol: string,
  symbol_desc: string,
  type: string,
  shares: number,
  price: number,
  amount: number,
  cash_balance: number,
  settlement_date: Date
) {
  const packagedOrder: PackagedOrder = {
    date: date,
    symbol: symbol,
    symbol_desc: symbol_desc,
    type: type,
    shares: shares,
    price: price,
    amount: amount,
    cash_balance: cash_balance,
    settlement_date: settlement_date,
  };
  return packagedOrder;
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
        <TableCell align="left">{order.date.toString()}</TableCell>
        <TableCell align="left">{`YOU BOUGHT ${order.symbol_desc} (${order.symbol}) (${order.type})`}</TableCell>
        <TableCell align="left">{`$${order.amount}`}</TableCell>
        <TableCell align="left">{`$${order.cash_balance}`}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <Collapse in={status} timeout="auto" unmountOnExit>
            <Box>
              <Table size="small" aria-label="order info">
                <TableBody>
                  <TableRow>
                    <TableCell component="th">{"Date: "}</TableCell>
                    <TableCell align="left">{order.date.toString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">{"Symbol: "}</TableCell>
                    <TableCell align="left">{order.symbol}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">
                      {"Symbol description: "}
                    </TableCell>
                    <TableCell align="left">{order.symbol_desc}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">{"Type: "}</TableCell>
                    <TableCell align="left">{order.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">{"Shares: "}</TableCell>
                    <TableCell align="left">{order.shares}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">{"Price: "}</TableCell>
                    <TableCell align="left">{order.price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">{"Amount: "}</TableCell>
                    <TableCell align="left">{order.amount}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">{"Settlement date:"}</TableCell>
                    <TableCell align="left">
                      {order.settlement_date.toString()}
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

const orders_list: PackagedOrder[] = [
  packageOrder(
    new Date(Date.now()),
    "AAPL",
    "APPLE INC",
    "CASH",
    3.6,
    220.59,
    -900,
    90000,
    new Date(Date.now())
  ),
  packageOrder(
    new Date(Date.now()),
    "ABC",
    "APPLE INC",
    "CASH",
    3.6,
    220.59,
    -900,
    90000,
    new Date(Date.now())
  ),
  packageOrder(
    new Date(Date.now()),
    "DEF",
    "APPLE INC",
    "CASH",
    3.6,
    220.59,
    -900,
    90000,
    new Date(Date.now())
  ),
];

const OrdersTable = () => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="orders table">
          <colgroup>
            <col style={{ width: "8%" }} />
            <col style={{ width: "23%" }} />
            <col style={{ width: "23%" }} />
            <col style={{ width: "23%" }} />
            <col style={{ width: "23%" }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">Date</TableCell>
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
    </div>
  );
};

export default OrdersTable;
