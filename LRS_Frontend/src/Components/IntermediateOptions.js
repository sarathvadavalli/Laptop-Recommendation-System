import './Options.css'
import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function IntermediateOptions() {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [activeHeader, setActiveHeader] = useState(null);
  const headers = [
    "LapName",
    "OS",
    "RAM",
    "GPU",
    "CPU",
    "Disk",
    "price"
  ];
  const options = {
    LapName:["Asus","Dell","Acer","HP","Lenovo","MSI","Gigabyte","Apple","Microsoft","LG"],
    GPU: [
      "INTEL ",
      "AMD ",
      "NVIDIA ",
      "APPLE "
    ],
    RAM: [
      "4 GB", 
      "8 GB",  
      "12 GB", 
      "16 GB", 
      "32 GB", 
      "64 GB",  
      "24 GB", 
      "20 GB", 
      "40 GB"
    ],
    OS: [
      "Windows 11 Home",
      "Windows 11 Pro",
      "Windows 10 Home",
      "Windows 10 Pro",
      "MacOS",
      "Chrome OS",
      "No OS"
    ],
    CPU: [
      "INTEL",
      "AMD",
      "ARM-based Apple"
    ],
    Disk: [
      "16 GB ",
      "32 GB ",
      "64 GB ",
      "128 GB ",
      "256 GB ",
      "512 GB ",
      "1000 GB ",
      "1024 GB ", 
      "2048 GB ",
      "4096 GB ",
      "8192 GB "
    ],
    price:[
      "$100 - $499",
      "$500 - $999",
      "$1000 - $1499",
      "$1500 - $1999",
      "$2000+"
    ]
  };

  const handleHeaderClick = (header) => {
    setActiveHeader(header === activeHeader ? null : header);
  };

  const handleOptionClick = (e, option) => {
    e.stopPropagation();
    setSelectedOptions({
      ...selectedOptions,
      [option]: !selectedOptions[option],
    });
    
  };
  const [laptops, setNames] = useState([]);
  const handleSubmit = async () => {
    try {

      const selectedCheckboxes = Object.keys(selectedOptions).filter(
        (checkbox) => selectedOptions[checkbox]
      );
      const selectedData = selectedCheckboxes.map((checkbox) => ({
        header: headers.find((header) => options[header].includes(checkbox)),
        option: checkbox,
      }));
      const response = await axios.post("/api/names", {
        selectedData,
      });
      const len=(response.data.length);
      if(len===0){
        setNames(response.data);
        // laptops.textContent=" ";
        alert("NO data found");
      }
      else{
        setNames(response.data);
      }
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  }
  const senddata = async(e,param) => {
    try {
      console.log(param);
      await axios.post("/api/laptopdata", {
      param,
      });
      e.stopPropagation();
         }
    catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
        <div className="container">
  <div className="left-side">
    <div className="checkbox">
      {headers.map((header) => (
        <div key={header} className="headbox"  onMouseEnter={() => handleHeaderClick(header)}>
          {header} 
          {activeHeader === header && (
            <div className="optionsbox">
              {options[header].map((option) => (
                <div key={option} onClick={(e) => handleOptionClick(e, option)}>
                  <input type="checkbox" id={option} name={option} checked={selectedOptions[option]} readOnly />
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

export default IntermediateOptions;