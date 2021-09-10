import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import changePageAction from "../actions/changePageAction";
import displayItemsAction from "../actions/displayItemsAction";
import maxSalaryAction from "../actions/maxSalaryAction";
import minSalaryAction from "../actions/minSalaryAction";
import totalPageCountAction from "../actions/totalPageCountAction";

const SalaryRange = () => {

    const dispatch = useDispatch()
    var filter = useSelector(root => root.filter)
    var pageNum = useSelector(root => root.currPage)
    // var minSalary = useSelector(root => root.minSalary)
    // var maxSalary = useSelector

    const[minSalary, setMinSalary] = useState(0)
    const[maxSalary, setMaxSalary] = useState(100000000000000)

    const minSalaryInputHandler = (e) => {
        setMinSalary(e.target.value)
    }

    const maxSalaryInputHandler = (e) => {
        setMaxSalary(e.target.value)
    }

    const handleFormSubmit = () => {
        if (minSalary !== "") {
            console.log("This is the min salary: ", minSalary)
            dispatch(minSalaryAction(minSalary))
        }
        if (maxSalary !== "") {
            console.log("This is max salary: ", maxSalary)
            dispatch(maxSalaryAction(maxSalary))
        }
        updateItems()
    }

    const updateItems = () => {
        var apiURL = "http://localhost:5000/users?"
        var apiCountURL = "http://localhost:5000/count?"
        var suffix = ""
        if (+maxSalary < +minSalary) {
            alert("Max Salary cannot be lesser than Min Salary")
            return
        }
        if (minSalary !== "" && minSalary !== undefined) {
            suffix += "minSalary=" + minSalary
        } else {
            suffix += "minSalary=" + 0
        }
        if (maxSalary !== "" && maxSalary !== undefined) {
            suffix += "&maxSalary=" + maxSalary
        } else {
            suffix += "&maxSalary=" + 100000000000000
        }
        const offSet = 0
        suffix += "&offset=" + offSet
        suffix += "&limit=30"
        if (filter === 0) {
            suffix += "&sort=+id"
        } else if (filter === 1) {
            suffix += "&sort=-id"
        } else if (filter === 2) {
            suffix += "&sort=+name"
        } else if (filter === 3) {
            suffix += "&sort=-name"
        } else if (filter === 4) {
            suffix += "&sort=+login"
        } else if (filter === 5) {
            suffix += "&sort=-login"
        } else if (filter === 6) {
            suffix += "&sort=+salary"
        } else if (filter === 7) {
            suffix += "&sort=-salary"
        } else {
            suffix += "&sort=+id"
        }
        apiURL += suffix
        apiCountURL += suffix
        console.log("Calling this endpoint: ", apiURL)
        fetch(apiCountURL)
        .then(res1 => {
            res1.json()
            .then(data1 => {
                const numPages = Math.ceil(data1.count / 30)
                fetch(apiURL)
                .then(res => {
                    res.json()
                    .then(data => {
                        dispatch(totalPageCountAction(numPages))
                        dispatch(displayItemsAction(data.results))
                        dispatch(changePageAction(1))
                    })
                    .catch(err => {
                        console.log("Error: ", err)
                    })
                })
                .catch(err => {
                    console.log("Error: ", err)
                })
            })
            .catch(err => console.log("Err: ", err))
        })
        .catch(err => console.log("Error: ", err))
    }

    return (
        <div style={{display: "flex", flexDirection: "row", height: "50px"}}>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Minimum Salary ($)</span>
                </div>
                <input type="number" name="minSalary" onChange={minSalaryInputHandler} min="0" step="0.01" class="form-control" placeholder="Enter Amount" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <h4 style={{paddingLeft:"20px", paddingRight:"20px"}}> - </h4>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Maximum Salary ($)</span>
                </div>
                <input type="number" name="maxSalary" onChange={maxSalaryInputHandler} min="0" step="0.01" class="form-control" placeholder="Enter amount" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <button type="button" onClick={() => handleFormSubmit()} class="btn btn-success" style={{height: "39px", marginLeft: "20px", width: "200px"}}> <b> Filter </b> </button>
        </div>
    );
}

export default SalaryRange