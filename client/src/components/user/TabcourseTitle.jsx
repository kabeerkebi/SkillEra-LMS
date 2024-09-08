import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";

const TabcourseTitle = ({ onTabClick }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onTabClick(tabLabels[newValue]); // Pass the label name to the onTabClick function
  };

  // Check if the screen width is greater than or equal to 960px (adjust as needed)
  const isLargeDevice = useMediaQuery("(min-width:960px)");

  const tabLabels = [
    "Web Development",
    "Data Science",
    "Desing",
    "Leadership",
    "Communication",
    "marketing",
  ];

  return (
    <Box
      sx={{
        width: isLargeDevice ? "100%" : { xs: 320, sm: 480 },
        display: "flex",
        justifyContent: "center", // Center the tabs horizontally
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        sx={{
          "& .MuiTabs-scroller": {
            "& .MuiTabs-flexContainer": {
              "& .MuiTab-root": {
                color: "rgba(97, 97, 97, 0.87)", // Dark black text color
              },
              "& .Mui-selected": {
                color: "rgba(0, 0, 0, 0.87)", // Dark black text color for selected tab
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "rgba(0, 0, 0, 0.87)", // Dark black indicator color
            },
          },
        }}
      >
        {tabLabels.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabcourseTitle;
