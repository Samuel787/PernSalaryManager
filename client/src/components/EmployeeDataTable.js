import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from "react-redux";
import changePageAction from "../actions/changePageAction";
import displayItemsAction from "../actions/displayItemsAction";
import totalPageCountAction from "../actions/totalPageCountAction";

const EmployeeDataTable = () => {

    const [items, setItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const dispatch = useDispatch();
    const NUM_RECORDS_PER_PAGE = 30;
    const currentPageNumber = useSelector(root => root.currPage);
    const displayItems = useSelector(root => root.displayItems)
    const totalPageCount = useSelector(root => root.totalPageCount);
    var minSalary = useSelector(root => root.minSalary);
    var maxSalary = useSelector(root => root.maxSalary);
    var filter = useSelector(root => root.filter);
    var pageNum = useSelector(root => root.currPage);

    useEffect(() => {
        const getEmployeesData = async () => {
            const res = await fetch("http://localhost:5000/users?minSalary=0&maxSalary=1000000&offset=0&limit=30&sort=+id");
            const data = await res.json();
            const res2 = await fetch("http://localhost:5000/count?minSalary=0&maxSalary=1000000&offset=0&limit=30&sort=+id");
            const data2 = await res2.json();
            dispatch(totalPageCountAction(Math.ceil(data2.count / NUM_RECORDS_PER_PAGE)))
            dispatch(displayItemsAction(data.results))
        }
        getEmployeesData();
    }, []);

    const handlePageClick = async (pageNum) => {
        dispatch(changePageAction(pageNum.selected + 1))
        try {
            const res = await fetch("http://localhost:5000/users?" + createApiSuffix(pageNum.selected + 1))
            const data = await res.json();
            dispatch(displayItemsAction(data.results))
        } catch (error) {
            alert("Something went wrong")
        }
    }

    const createApiSuffix = (pgNum) => {
        var suffix = ""
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
        const offSet = (pgNum - 1) * 30
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
        return suffix;
    }

    return(
        <div>
            <h2 style={{paddingTop: "12px", paddingBottom: "12px"}}>Employees</h2>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col"></th> 
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Login</th>
                        <th scope="col">Salary (S$)</th>
                        <th scope="col">Action</th>
                    </tr>

                    {
                        displayItems.map((item) => {
                            return (
                                <tr>
                                    <td></td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.login}</td>
                                    <td>{item.salary}</td>
                                    <td></td>
                                </tr>
                            );
                        })
                    }
                </thead>

            </table>

            {/* pagination */}
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel = {"Next"}
                breakLabel = {" . . . "}
                pageCount = {totalPageCount}
                marginPagesDisplayed = {3}
                pageRangeDisplayed = {4}
                onPageChange = {handlePageClick}
                containerClassName = {"pagination justify-content-center"}
                pageClassName = {"page-item"}
                pageLinkClassName = {"page-link"}
                previousClassName = {"page-item"}
                previousLinkClassName = {"page-link"}
                nextClassName = {"page-item"}
                nextLinkClassName = {"page-link"}
                breakClassName = {"page-item"}
                breakLinkClassName = {"page-link"}
                activeClassName = {"active"}
                forcePage={currentPageNumber - 1}
            />
        </div>
    );
};

export default EmployeeDataTable;