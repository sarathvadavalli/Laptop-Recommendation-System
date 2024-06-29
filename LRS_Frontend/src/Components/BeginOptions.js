import './BeginOptions.css'
import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function BeginOptions() {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [activeHeader, setActiveHeader] = useState(null);

  const headers = [
    "What Do You Use Your Laptop For?",
    "Do You Have Brand Preference?",
    "How Often Do You Travel?",
    "What Is Your Budget For Laptop?",
    "Do You Store A Lot Of Things?"
  ];

  const options = {
    "What Do You Use Your Laptop For?": [
      "Casual Use/Work",
      "Coding",
      "Gaming/Rendering"
    ],
    "Do You Have Brand Preference?": ["Top Brands", "Any Serviceable Brand"],
    "How Often Do You Travel?": ["Very Often", "Sometimes"],
    "What Is Your Budget For Laptop?": ["$100 - $499", "$500 - $999", "$1000 - $1499","$1500 - $1999","$2000+"],
    "Do You Store A Lot Of Things?": ["Yes", "Not Much","Very Little"]
  };

  const handleHeaderClick = (header) => {
    setActiveHeader(header === activeHeader ? null : header);
  };

  const handleOptionClick = (header, option) => {
    const newSelectedOptions = { ...selectedOptions };
    if (newSelectedOptions[header] === option) {
      delete newSelectedOptions[header];
    } else {
      newSelectedOptions[header] = option;
    }
    setSelectedOptions(newSelectedOptions);
  };

  const [laptops, setNames] = useState([]);

  const handleSubmit = async () => {
    try {
      const selectedData = Object.keys(selectedOptions).map((header) => ({
        header,
        option: selectedOptions[header],
      }));
      const response = await axios.post("/api/begin", {
        selectedData,
      });
      const len = response.data.length;
      if (len === 0) {
        setNames(response.data);
        alert("NO data found");
      } else {
        setNames(response.data);
      }
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const senddata = async (e, param) => {
    try {
      console.log(param);
      await axios.post("/api/laptopdata", {
        param,
      });
      e.stopPropagation();
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="left-side">
          <div className="checkbox">
            {headers.map((header) => (
              <div key={header} className="headbox" onMouseEnter={() => handleHeaderClick(header)}>
                {header}
                {activeHeader === header && (
                  <div className="optionsbox">
                    {options[header].map((option) => (
                      <div key={option} onClick={() => handleOptionClick(header, option)}>
                        <input type="checkbox" id={option} name={option} checked={selectedOptions[header] === option} readOnly />
                        <label htmlFor={option}>{option}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button className='submitbutton' onClick={handleSubmit}>Submit</button>
          </div>
        </div>
        <div className="right-side">
      <div className="laptop-list">
        {laptops.map(lapi => (
          <div key={lapi.id} className="laptop-wrapper">
            <div className="laptop">
              <Link to={'/Laptopshow'}>
                <img
                  src={lapi.imgurl}
                  alt={lapi.LapName}
                  style={{ height: '200px', width: '250px', marginLeft: '15px' }}
                  onClick={(e) => { senddata(e, lapi.id) }}
                />
                <h2 style={{ marginLeft: '15%', marginTop: '10px' }}>{lapi.LapName}</h2>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
      </div>
    </div>
  );
}

export default BeginOptions;