import { Col, Row } from "react-bootstrap";
import AdminChatRoomComponent from "../../components/admin/AdminChatRoomComponent";
import AdminLinkComponents from "../../components/admin/AdminLinksComponent";

const AdminChatsPage = () => {
    return (
        <Row className="m-5">
            <Col md={2}>
                <AdminLinkComponents />
            </Col>

            <Col md={10}>
                <AdminChatRoomComponent />
            </Col>
        </Row>
    )
}

export default AdminChatsPage;