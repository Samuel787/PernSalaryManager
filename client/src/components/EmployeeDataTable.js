import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from "react-redux";

const EmployeeDataTable = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getEmployeesData = async () => {
            const res = await fetch("https://api.instantwebtools.net/v1/airlines");
            const data = await res.json();
            setItems(data);
        }

        getEmployeesData();
    }, []);

    const handlePageClick = (pageNum) => {
        console.log(pageNum.selected)
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
                        <th scope="col">Salary</th>
                        <th scope="col">Action</th>
                    </tr>

                    {
                        items.slice(1, 10).map((item) => {
                            return (
                                <tr>
                                    <td></td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.country}</td>
                                    <td>{item.established}</td>
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
                pageCount = {25}
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
            />
        </div>
    );
};

export default EmployeeDataTable;