import { CDBBox } from 'cdbreact';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SalaryRange from './components/SalaryRange';
import SideBar from './components/SideBar.js';

function App() {
  return (
    <div className="App">
      <CDBBox display="flex" justifyContent="center">
        <SideBar/>
        <div style={{height:"200px", background:"red"}}></div>
        <SalaryRange/>
      </CDBBox>
    </div>
  );
}

export default App;
