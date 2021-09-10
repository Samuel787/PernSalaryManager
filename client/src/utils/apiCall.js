// import { useDispatch, useSelector } from "react-redux"
// import displayItemsAction from "../actions/displayItemsAction";

// const filter = useSelector(root => root.filter);
// const dispatch = useDispatch();

// const apiCall = () => {
//     fetch("http://localhost:5000/users?minSalary=1&maxSalary=1500&offset=0&limit=5&sort=+name")
//     .then(res => {
//         res.json()
//         .then(data => {
//             dispatch(displayItemsAction(data.results))
//         })
//         .catch(err => {
//             console.log("An error occurred while making request: ", err)
//         })
//     })
//     .catch(err => {
//         console.log("An error occurred while making request: ", err)
//     })
// }

// export default apiCall