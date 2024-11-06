import React, { useState } from "react";
import Orders from "./Orders";
import Positions from "./Positions";
import Transfers from "./Transfers";
import { Tabs, Tab, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface ActivityProps {
  token: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div>
      {value === index && (
        <Box>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const Activity = ({ token }: ActivityProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newVal: number) => {
    setValue(newVal);
  };

  return (
    <div>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="activity tabs">
          <Tab label="Orders" />
          <Tab label="Positions" />
          <Tab label="Transfers" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Orders />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Positions />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Transfers token={token} />
      </TabPanel>
    </div>
  );
};

export default Activity;
