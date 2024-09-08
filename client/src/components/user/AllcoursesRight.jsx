import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import WindowIcon from "@mui/icons-material/Window";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import "./css/AllcoursesRight.css";
import AllcoursesLeft from "./AllcoursesLeft";
import AllcoursesCards from "./AllcoursesCards";

const AllcoursesRight = ({ Ratting, Level, AllData, IsThereQuery }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  return (
    <>
      <div className="the-allcourses-heading">
        <h2 className="allcourses-heading">
        
          {!IsThereQuery ? " All courses " : IsThereQuery}
        </h2>
      </div>
      <div className="allcourses-Right-main">
        <div className="big-screen-icon-div d-none d-lg-block">
          <div className="allcourses-left-icons p-3">
            <div className="icon-container">
              <SortIcon className="icon me-2" />
              <WindowIcon className="icon me-2" />
              <FormatListBulletedIcon className="icon me-2" />
            </div>
          </div>
        </div>

        <div className="small-screen-icon-div d-lg-none">
          <div
            className="the-filter-icon pt-1 m-2"
            onClick={toggleDrawer(true)}
            role="button"
            tabIndex={0}
            onKeyDown={toggleDrawer(true)}
          >
            <FilterListIcon /> <span>Filter</span>
          </div>
        </div>
        <div className="maped-allcourses-div " style={{height:"600px"}}>
          <AllcoursesCards FilteredData={AllData} />
        </div>
      </div>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <div role="presentation" style={{ width: 300 }}>
          <Button onClick={toggleDrawer(false)}>Close</Button>
          <AllcoursesLeft Ratting={Ratting} Level={Level} />
        </div>
      </Drawer>
    </>
  );
};

export default AllcoursesRight;
