import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
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
        <Box p={3} className="padding-0">
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
    marginTop: 50,  
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
    // if(localStorage.getItem('storeImageIntoLocal')!==''){
    //   let output = document.getElementById('output_image');
    //   // output.src = localStorage.getItem('storeImageIntoLocal')
    // }
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    // <div className="container-fluid" style={{ padding: "50px" }}>
    //   <ul class="nav nav-tabs">
    //     <li class="nav-item">
    //       <a class="nav-link active" aria-current="page" href="#">
    //         My Profile
    //       </a>
    //       <div style={{ width: "100%" }}>
    //         <EmployeeSearch style={{ width: "100%" }} />
    //       </div>
    //     </li>
    //     <li class="nav-item">
    //       <a class="nav-link" href="#">
    //         XML Upload
    //       </a>
    //       <div style={{ width: "100%" }}>
    //         <XmlUpload style={{ width: "100%" }} />
    //       </div>
    //     </li>
    //   </ul>
    // </div>
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
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            label="My Profile"
            {...a11yProps(0)}
            className="flex-grow-0 min-width-100 text-trans-L"
          />
          <Tab
            label="XML Upload"
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
