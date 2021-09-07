import { CDBBox } from 'cdbreact';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SalaryRange from './components/SalaryRange';
import SideBar from './components/SideBar.js';
import EmployeeDataTable from './components/EmployeeDataTable';
import UploadModal from './components/UploadModal';

function App() {
  return (
    <div className="App">
      <div style={{flexDirection: "row", display: "flex"}}>
        <SideBar/>
        <div style={{display: "flex", flexDirection: "column", flex: 1, margin: "40px"}}>
          <SalaryRange/>
          <EmployeeDataTable/>
        </div>
      </div>
      <UploadModal/>
    </div>
  );
}

export default App;
