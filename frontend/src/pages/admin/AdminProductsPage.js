import { Button, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinkComponents from "../../components/admin/AdminLinksComponent";

const deleteHandler = () => {
    if(window.confirm("Are you sure?")) alert("Product deleted!")
}

const AdminProductsPage = () => {
    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinkComponents />
            </Col>

            <Col md={10}>
                <h1>Product List {" "}
                    <LinkContainer to="/admin/create-new-product">
                        <Button variant="primary" size="lg">
                            Create new
                        </Button>
                    </LinkContainer>
                </h1>
                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Product name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[  {name: "Panasonic", price: "$250", category: "TV"},
                            {name: "LG", price: "$150", category: "TV"}, 
                            {name: "HP", price: "$550", category: "Laptop"}
                        ].map((item,idx) => (

                            <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.category}</td>
                            <td>
                                <LinkContainer to="/admin/edit-product">
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

export default AdminProductsPage;