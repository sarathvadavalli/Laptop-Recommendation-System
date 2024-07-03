 ## Overview
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  Laptop Recommendation system is a website that recommends laptops to the users who are in a state of confusion which laptop to choose. It facilitates the users to go through the various features of the laptop which includes all types of system specifications and various brands and gives recommendations as per their inputs.</p>

## Features
<h4>a) Choosing the level of user:</h4> The user can choose a level either beginner, intermediate or pro based on their knowledge on specifications and other aspects of laptop.
<h4>a) Selecting the options:</h4> Once the user selects their level, user can select the available options of various features like laptop name, RAM size, disc space, weight, resolution etc. and click on submit.
<h4>c) View details of a laptop:</h4> After user selects the options and click submit, all the laptops matched with thir preferences are displayed. Now user can click on any laptop to view its complete details.

## Technologies
* <b>Front-End:</b> The front-end technology used is REACT. With the help of React, we have created a user-friendly interface for all the three types of users which includes selection of various features.
* <b>Back-End:</b> The back-end technology used is NODEJS. With the help of Node, we have created a server and connected to the frontend. It recieves the request and gives a web response.
* <b>Database:</b> We have used a MySQL database in our project which consists of a table which stores details of different laptops and their details.
  The fields present in table are:
  ```
    Id INT AUTO_INCREMENT PRIMARY KEY,
    LapName VARCHAR(255),
    ScreenSize DECIMAL(5, 3),
    ScreenResolution VARCHAR(20),
    CPU VARCHAR(255),
    GPU VARCHAR(255),
    RAM VARCHAR(20),
    Disk VARCHAR(50),
    Weight VARCHAR(20),
    OS VARCHAR(50),
    Battery VARCHAR(20),
    imgurl VARCHAR(255),
    price VARCHAR(20)
## References

1.	https://www.noteb.com/

2.	https://react.dev/reference/react 
