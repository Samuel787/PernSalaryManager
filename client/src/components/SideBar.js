import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBView,
} from 'cdbreact';
import { useSelector, useDispatch } from 'react-redux';
import filterIdAscending from '../actions/filterIdAscending';
import openUploadModal from '../actions/openUploadModal';

const SideBar = () => {

  const filter = useSelector(root => root.filter);
  const dispatch = useDispatch();
  const isModalOpen = useSelector(root => root.isModalOpen);

  return (
<div
      style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
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
            <CDBSidebarMenuItem icon="chart-line" onClick={() => dispatch(openUploadModal())}>
                Upload CSV
            </CDBSidebarMenuItem>

            <CDBView>Sort List By:</CDBView> 

            <CDBSidebarMenuItem icon="chart-line">
                No Filters {filter}
            </CDBSidebarMenuItem> 

            <CDBSidebarMenuItem icon="chart-line" onClick={() => dispatch(filterIdAscending())}>
                Employee ID
            </CDBSidebarMenuItem> 

            <CDBSidebarMenuItem icon="chart-line">
                Employee Name
            </CDBSidebarMenuItem> 

            <CDBSidebarMenuItem icon="chart-line">
                Employee Login
            </CDBSidebarMenuItem> 

            <CDBSidebarMenuItem icon="chart-line">
                Employee Salary
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
