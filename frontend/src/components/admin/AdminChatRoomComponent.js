import { useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";


const AdminChatRoomComponent = () => {
    const [toast, closeToast] = useState(true);
    const close = () => closeToast(false);
    
    
    return (
        <>
            <Toast show={toast} onClose={close} className="ms-4 mb-5">
                <Toast.Header>
                    <strong className="me-auto">Chat with Juan Pérez</strong>
                </Toast.Header>
                <div style={{maxHeight: "500px", overflow: "auto"}}>
                    {Array.from({length: 10}).map((_,idx)=>(
                        <>
                            <Toast.Body>
                                <p className="bg-primary p-3 ms-4 text-light rounded-pill"><b>User wrote: </b> Hola chipamogli ke sucede</p>
                                <p><b>Admin wrote: </b> Un gusto estimado</p>
                            </Toast.Body>
                        </>
                    ))}
                </div>
                <Form className="ms-3 me-3 mb-3">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Write a message</Form.Label>
                        <Form.Control as="textarea" rows={2} />
                    </Form.Group>
                    <Button variant="success" type="submit">Submit</Button>
                </Form>
            </Toast>
        </>
    )
}

export default AdminChatRoomComponent;