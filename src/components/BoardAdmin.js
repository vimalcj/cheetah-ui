import React, { useState, useEffect } from "react";
import EmployeeSearch from "./EmployeeSearch";
import XmlUpload from "./XmlUpload";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className="padding-0">
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#F5F5F5",
    width: "100%",
    fontSize: "13px !important",
  },
}));

const BoardAdmin = () => {
  const [content, setContent] = useState("");

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <section className={`${classes.root} `}>
      <AppBar
        position="static"
        color="default"
        className="bx-shawdow-n bg-white"
        style={{ position: "relative" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="#ff1a1a"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            label="Employees"
            {...a11yProps(0)}
            className="flex-grow-0 min-width-100 text-trans-L"
          />
          <Tab
            label="Onboard"
            {...a11yProps(1)}
            className="flex-grow-0 text-trans-L"
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <EmployeeSearch style={{ width: "100%" }} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <XmlUpload style={{ width: "100%" }} />
        </TabPanel>
      </SwipeableViews>
    </section>
  );
};

export default BoardAdmin;
