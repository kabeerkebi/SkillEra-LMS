import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaChartPie,
  FaChartLine,
  FaChartBar,
  FaMap,
  FaCalendarAlt,
  FaShoppingCart,
  FaGem,
  FaBook,
} from "react-icons/fa";
import "./dashboard.css";
import AllCourses from "./AllCourses";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios"
const Dashboard = () => {
  const [visible, setVisible] = useState(true);
const navigate = useNavigate()
  const toggleSidebar = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    const fecthdata = async () => {
      try {
        const response = await axios.get("/auth/checkadmin");
        console.log(response);
        if (!response.data.success) {
          navigate("/admin")
                }
      } catch (error) {
        console.log(error);
      }
    };
    fecthdata();

  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <Sidebar className={`pro-sidebar ${visible ? "visible" : "hidden"}`}>
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: "#1e88e5",
                color: "#ffffff",
              },
            },
          }}
        >
          <SubMenu label="Charts" icon={<FaChartPie />} className="mt-20">
            <MenuItem component={<Link to="#" />}>
              <FaChartPie />
              <span className="thehiddentext">Pie charts</span>
            </MenuItem>
            <MenuItem component={<Link to="#e" />}>
              <span className="thehiddentext">Line charts</span>
              <FaChartLine />
            </MenuItem>
            <MenuItem component={<Link to="#" />}>
              <span className="thehiddentext">Bar charts</span>
              <FaChartBar />
            </MenuItem>
          </SubMenu>
          <MenuItem component={<Link to="#" />} icon={<FaMap />}>
            Maps
          </MenuItem>

          <MenuItem component={<Link to="#" />} icon={<FaGem />}>
            Components
          </MenuItem>
          <MenuItem component={<Link to="#" />} icon={<FaShoppingCart />}>
            E-commerce
          </MenuItem>
          <MenuItem component={<Link to="#" />} icon={<FaCalendarAlt />}>
            Calendar <span className="badge new">NEW</span>
          </MenuItem>
          <MenuItem component={<Link to="#" />} icon={<FaBook />}>
            Documentation
          </MenuItem>
        </Menu>
      </Sidebar>
      <div className="main-content">
        <h1>
          <AllCourses />
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
