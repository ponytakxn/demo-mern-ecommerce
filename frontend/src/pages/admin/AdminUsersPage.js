import { Button, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinkComponents from "../../components/admin/AdminLinksComponent";

const deleteHandler = () => {
    if(window.confirm("Are you sure?")) alert("Product deleted!")
}

const AdminUsersPage = () => {
    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinkComponents />
            </Col>

            <Col md={10}>
                <h1>Users list</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Is Admin</th>
                        <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map((item,idx) => (
                            <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>Juan</td>
                            <td>Pérez</td>
                            <td>jperez@gmail.com</td>
                            <td>@elCallawawa3000</td>
                            <td><i className={item}></i></td>
                            <td>
                                <LinkContainer to="/admin/edit-user">
                                    <Button className="btn-sm">
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                </LinkContainer> {" / "}
                                <Button variant="danger" className="btn-sm" onClick={deleteHandler}>
                                        <i className="bi bi-x-circle"></i>
                                </Button>
                            </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default AdminUsersPage;