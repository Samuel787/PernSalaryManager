import { Button, Form, Modal } from 'react-bootstrap';
// import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux';
import closeUploadModal from '../actions/closeUploadModal';
import openUploadModal from '../actions/openUploadModal';
import axios from "axios";

const UploadModal = () => {

    const isModalOpen = useSelector(root => root.isModalOpen);
    const dispatch = useDispatch()

    const uploadFileAction = (event) => {
        event.preventDefault();
        const file = event.target[0].files[0]
        if (file === null) {
            console.log("There is no file")
            return;
        }
        let formData = new FormData()
        formData.append("file", file)
        axios.post(
            "http://localhost:5000/users/upload",
            formData,
            {
                headers: {
                    "Content-type": "multipart/form-data"
                },
            }
        )
        .then (res => {
            console.log("This is the response: ", res);
            alert("Successfully uploaded. You may refresh page")
        })
        .catch (err => {
            console.log(err);
            alert("Error occurred when uploading.")
        })
    }

    return (
        <div>

        <Modal show={isModalOpen} onHide={() => dispatch(closeUploadModal())}>
            <Modal.Header closeButton>
            <Modal.Title>Upload CSV File</Modal.Title>
            </Modal.Header>
            <Form onSubmit={(event) => uploadFileAction(event)}>
                <Modal.Body>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Choose a csv file with the employee data to add to database</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="success" type="submit" onClick={() => dispatch(closeUploadModal())}>
                    Upload
                </Button>
                <Button variant="danger" onClick={() => dispatch(closeUploadModal())}>
                    Cancel
                </Button>
                </Modal.Footer>
            </Form>
        </Modal>


        </div>
    );
}

export default UploadModal