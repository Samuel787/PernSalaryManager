import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { useSelector, useDispatch } from 'react-redux';
import openUploadModal from '../actions/openUploadModal';
import filterModeAction from '../actions/filterModeAction';
import displayItemsAction from '../actions/displayItemsAction';

const SideBar = () => {

  var filter = useSelector(root => root.filter);
  const dispatch = useDispatch();
  const isModalOpen = useSelector(root => root.isModalOpen);
  const minSalary = useSelector(root => root.minSalary)
  const maxSalary = useSelector(root => root.maxSalary)
  var pageNum = useSelector(root => root.currPage)

  const createApiUrl = () => {
    var apiURL = "http://localhost:5000/users?"
      if (minSalary !== "" && minSalary !== undefined) {
          apiURL += "minSalary=" + minSalary
      } else {
          apiURL += "minSalary=" + 0
      }
      if (maxSalary !== "" && maxSalary !== undefined) {
          apiURL += "&maxSalary=" + maxSalary
      } else {
          apiURL += "&maxSalary=" + 100000000000000
      }
      const offSet = (pageNum - 1) * 30
      apiURL += "&offset=" + offSet
      apiURL += "&limit=30"
      if (filter === 0) {
          apiURL += "&sort=+id"
      } else if (filter === 1) {
          apiURL += "&sort=-id"
      } else if (filter === 2) {
          apiURL += "&sort=+name"
      } else if (filter === 3) {
          apiURL += "&sort=-name"
      } else if (filter === 4) {
          apiURL += "&sort=+login"
      } else if (filter === 5) {
          apiURL += "&sort=-login"
      } else if (filter === 6) {
          apiURL += "&sort=+salary"
      } else if (filter === 7) {
          apiURL += "&sort=-salary"
      } else {
          apiURL += "&sort=+id"
      }
      return apiURL;
  }
  
  const handleEmployeeIdClick = () => {
    if (filter === 0) {
      dispatch(filterModeAction(1))
      filter = 1
    } else {
      dispatch(filterModeAction(0))
      filter = 0
    }
    makeAPICall()
  }

  const handleEmployeeNameClick = () => {
    if (filter === 2) {
      dispatch(filterModeAction(3))
      filter = 3
    } else {
      dispatch(filterModeAction(2))
      filter = 2
    }
    makeAPICall()
  }

  const handleEmployeeLoginClick = () => {
    if (filter === 4) {
      dispatch(filterModeAction(5))
      filter = 5
    } else {
      dispatch(filterModeAction(4))
      filter = 4
    }
    makeAPICall()
  }

  const handleEmployeeSalaryClick = () => {
    if (filter === 6) {
      dispatch(filterModeAction(7))
      filter = 7
    } else {
      dispatch(filterModeAction(6))
      filter = 6
    }
    makeAPICall()
  }

  const makeAPICall = () => {
    console.log("Filter value is: ", filter)
    const apiURL = createApiUrl()
    console.log("This is the apiUrl: ", apiURL)
    fetch(apiURL)
    .then(res => {
      res.json()
      .then(data => {
        console.log("This is the data: ", data)
        dispatch(displayItemsAction(data.results))
      })
      .catch(err => console.log("Error: ", err))
    })
    .catch(err => console.log("Error: ", err))
  }

  return (
<div
      style={{ display: 'flex', height: '100vh', overflow: 'scroll initial'}}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}
          >
            Employee Manager
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          
          <CDBSidebarMenu>
            <CDBSidebarMenuItem icon="upload" onClick={() => dispatch(openUploadModal())}>
                Upload CSV
            </CDBSidebarMenuItem>

            <CDBSidebarMenuItem icon={(filter === 0 || filter === 1) ? "check-circle" : "circle"} style={(filter > 1) ? {color: "white"} : (filter === 0) ? {color: "green"} : {color: "red"}} onClick={() => handleEmployeeIdClick()}>
                Sort by ID
            </CDBSidebarMenuItem> 

            <CDBSidebarMenuItem icon={(filter === 2 || filter === 3) ? "check-circle" : "circle"} style={(filter === 2) ? {color: "green"} : (filter === 3) ? {color: "red"} : {color: "white"}} onClick={() => handleEmployeeNameClick()}>
                Sort by Name
            </CDBSidebarMenuItem> 

            <CDBSidebarMenuItem icon={(filter === 4 || filter === 5) ? "check-circle" : "circle"} style={(filter === 4) ? {color: "green"} : (filter === 5) ? {color: "red"} : {color: "white"}} onClick={() => handleEmployeeLoginClick()}>
                Sort by Login
            </CDBSidebarMenuItem> 

            <CDBSidebarMenuItem icon={(filter === 6 || filter === 7) ? "check-circle" : "circle"} style={(filter === 6) ? {color: "green"} : (filter === 7) ? {color: "red"} : {color: "white"}} onClick={() => handleEmployeeSalaryClick()}>
                Sort by Salary
            </CDBSidebarMenuItem>
  
          </CDBSidebarMenu>

        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '20px 5px',
            }}
          >
            GovTech
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default SideBar;
