import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import "../user/css/AllcoursesLeft.css";

const AllcoursesLeft = ({ Ratting, Level }) => { // Accessing props here
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
    Ratting(event.target.value); // Calling Ratting function from props
  };

  const [checkboxState, setCheckboxState] = useState({
    beginner: false,
    intermediate: false,
    advanced: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    Level({
      ...checkboxState,
      [name]: checked,
    }); // Calling Level function from props
  };

  return (
    <div className="main-allcoursesLeft-div">
      <div className="allcoursesLeft-border-div">
        <div className="allcoursesLeft-ratings mt-3">
          <FormControl component="fieldset">
            <FormLabel component="legend">
              <h3>Ratings</h3>
            </FormLabel>
            <RadioGroup
              aria-label="ratings"
              name="ratings"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="5"
                control={<Radio color="secondary" />}
                label={
                  <span>
                    <span className="stars">★★★★☆</span> 5
                  </span>
                }
              />
              <FormControlLabel
                value="4"
                control={<Radio color="secondary" />}
                label={
                  <span>
                    <span className="stars">★★★★☆</span> 4
                  </span>
                }
              />
              <FormControlLabel
                value="3"
                control={<Radio color="secondary" />}
                label={
                  <span>
                    <span className="stars">★★★☆☆</span> 3
                  </span>
                }
              />
              <FormControlLabel
                value="2"
                control={<Radio color="secondary" />}
                label={
                  <span>
                    <span className="stars">★★☆☆☆</span> 2
                  </span>
                }
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="allcoursesLeft-levels mt-3">
          <FormControl component="fieldset">
            <FormLabel component="legend">
              <h3>Levels</h3>
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxState.beginner}
                    onChange={handleCheckboxChange}
                    name="beginner"
                    color="secondary"
                  />
                }
                label="Beginner"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxState.intermediate}
                    onChange={handleCheckboxChange}
                    name="intermediate"
                    color="secondary"
                  />
                }
                label="Intermediate"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxState.advanced}
                    onChange={handleCheckboxChange}
                    name="advanced"
                    color="secondary"
                  />
                }
                label="Advanced"
              />
            </FormGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default AllcoursesLeft;
