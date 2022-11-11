import { Button, Col, Form, Row, Table } from "react-bootstrap";

const AdminAnalyticsPage = () => {
    return (
        <Row className="m-5">
            <Col>
                <h1>Encuesta de satisfacción - Experiencia Guardería DuocUC</h1>
                <p>Esta encuesta es para cuantificar la experiencia de los usuarios con el prototipo presentado en las pruebas de software realizadas.
                Las siguientes afirmaciones debe responderlas en una escala del 1 al 5, siendo 1 la nota más baja (muy insatisfecho) y 5 la nota más alta (muy satisfecho)</p>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th/>
                        <th>1 (muy insatisfecho)</th>
                        <th>2 (insatisfecho)</th>
                        <th>3 (no sabe)</th>
                        <th>4 (satisfecho)</th>
                        <th>5 (muy satisfecho)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {["La aplicación era fácil de entender desde el ingreso a ella", 
                        "Pude acceder a todas las herramientas de la app de fácil manera",
                        "La aplicación me permitía consultar los distintos horarios disponibles",
                        "La aplicación era visualmente atractiva para el usuario",
                        "El agendamiento de hora fue sencillo",
                        "El agendamiento de hora fue expedito"].map((item,idx) => (
                        <tr>
                            <td>{idx+1}. {item}</td>
                            <td><Form.Check type="checkbox" id="default-radio" label=""/></td>
                            <td><Form.Check type="checkbox" id="default-radio" label=""/></td>
                            <td><Form.Check type="checkbox" id="default-radio" label=""/></td>
                            <td><Form.Check type="checkbox" id="default-radio" label=""/></td>
                            <td><Form.Check type="checkbox" id="default-radio" label=""/></td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
                <br/>
                <Button variant="primary">Enviar respuestas</Button>
            </Col>
            
        </Row>
    )
}

export default AdminAnalyticsPage;