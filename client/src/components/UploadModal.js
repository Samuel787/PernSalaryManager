import { Button, Form, Modal } from 'react-bootstrap';
// import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux';
import closeUploadModal from '../actions/closeUploadModal';
import openUploadModal from '../actions/openUploadModal';

const UploadModal = () => {

    const isModalOpen = useSelector(root => root.isModalOpen);
    const dispatch = useDispatch()

    const uploadFileAction = (event) => {
        event.preventDefault()
        const file = event.target[0].files[0]
        fetch("http://localhost:5000/users/upload", {
            mode: "no-cors",
            method: "POST",
            body: file
        }).then((res) => {
            if (res.ok) {
                console.log("Server said ok")
            } else {
                console.log("Server said not okay", res)
            }
        }, (e) => {
            console.log("Not okay")
        });
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