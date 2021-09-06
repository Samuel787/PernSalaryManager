import { CDBBox, CDBContainer, CDBInputGroup, CDBBtn } from "cdbreact";

const SalaryRange = () => {
    return (
        <CDBContainer>
            <CDBBox  display="flex" flex="row">
                <CDBInputGroup
                containerClassName="mb-2 mt-0"
                prepend="Minimum Salary ($)"
                hint = "Enter Amount"
                size="sm"
                type = "Number"
                />
                <div style={{width: "20px"}}></div>
                <p><b> to </b></p>
                <div style={{width: "20px"}}></div>
                <CDBInputGroup
                containerClassName="mb-2 mt-0"
                prepend="Maximum Salary ($)"
                hint = "Enter Amount"
                size="sm"
                type = "Number"
                />
                <div style={{width: "20px"}}></div>
                <button type="button" class="btn btn-primary">Filter</button>
            </CDBBox>
        </CDBContainer>
    );
}

export default SalaryRange