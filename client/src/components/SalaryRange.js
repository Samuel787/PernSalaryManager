
const SalaryRange = () => {
    return (
        <div style={{display: "flex", flexDirection: "row", height: "50px"}}>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Minimum Salary ($)</span>
                </div>
                <input type="number" min="0" step="0.01" class="form-control" placeholder="Enter Amount" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <h4 style={{paddingLeft:"20px", paddingRight:"20px"}}> - </h4>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Maximum Salary ($)</span>
                </div>
                <input type="number" min="0" step="0.01" class="form-control" placeholder="Enter amount" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <button type="button" class="btn btn-success" style={{height: "39px", marginLeft: "20px", width: "200px"}}> <b> Filter </b> </button>
        </div>
    );
}

export default SalaryRange