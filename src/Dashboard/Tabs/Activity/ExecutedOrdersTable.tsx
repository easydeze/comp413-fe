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
import { getExecutedOrdersHTTP } from "../../../API/Dashboard/ExecutedOrderAPI";
//import PackagedOrder from "./PackagedOrder";

interface PackagedExecOrder {
  timestamp: Date;
  // placed_date: Date;
  // executed_date: Date;
  stockSymbol: string;
  // symbol_desc: string;
  transactionType: string;
  // shares: number;
  numShares: number;
  sharePrice: number;
  amount: number;
  cash_balance: number;
  settlement_date: Date;
}

function ExecOrderRow({ order }: { order: PackagedExecOrder }) {
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
          {(order.transactionType === "buy" &&
            `YOU BOUGHT ${order.stockSymbol} (EXECUTED)`) ||
            (order.transactionType === "sell" &&
              `YOU SOLD ${order.stockSymbol} (EXECUTED)`)}
        </TableCell>
        <TableCell align="left">{`$${
          order.numShares * order.sharePrice
        }`}</TableCell>
        {/* <TableCell align="left">{`$${order.cash_balance}`}</TableCell> */}
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
                  {/* <TableRow>
                      <TableCell component="th">{"Executed Date: "}</TableCell>
                      <TableCell align="left">
                        {new Date(order.timestamp).toDateString()}
                      </TableCell>
                    </TableRow> */}
                  <TableRow>
                    <TableCell component="th">{"Symbol: "}</TableCell>
                    <TableCell align="left">{order.stockSymbol}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">{"Shares: "}</TableCell>
                    <TableCell align="left">{order.numShares}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">{"Price: "}</TableCell>
                    <TableCell align="left">{`$${order.sharePrice}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">{"Amount: "}</TableCell>
                    <TableCell align="left">
                      {`$${order.numShares * order.sharePrice}`}
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

const ExecutedOrdersTable = () => {
  let [orders_list, setOrdersList] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        if (token) {
          const response = await getExecutedOrdersHTTP(token);

          if (response) {
            setOrdersList(response);

            console.log("Fetched Executed Orders.");
          } else {
            console.log("Invalid credentials. Please try again.");
          }
        }
      } catch (error: any) {
        console.log("Executed Order fetch failed. Please try again.");
      }
    })();
  }, []);

  return (
    <div>
      <Stack marginTop={5}>
        <TableContainer component={Paper}>
          <Table aria-label="executed-orders-table">
            <colgroup>
              <col style={{ width: "10%" }} />
              {/* <col style={{ width: "15%" }} /> */}
              <col style={{ width: "30%" }} />
              <col style={{ width: "30%" }} />
              {/* <col style={{ width: "23%" }} /> */}
              <col style={{ width: "30%" }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="left">Executed Date</TableCell>
                {/* <TableCell align="left">Executed Date</TableCell> */}
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Amount</TableCell>
                {/* <TableCell align="left">Cash Balance</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders_list.map((order) => (
                <ExecOrderRow order={order} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </div>
  );
};

export default ExecutedOrdersTable;
