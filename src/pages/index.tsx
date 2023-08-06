import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SummonerCard from "~/pages/SummonerCard/SummonerCard";


export default function IndexPage() {
    const [summonerName, setSummonerName] = useState<string>();
    return (
        <Container>
            <Row>
                <Col>
                    <Form.Label htmlFor="summonerName">Summoner</Form.Label>
                    <Form.Control
                        type="text"
                        id="summonerName"
                        aria-describedby="Summoner Name"
                        onBlur={(e) => {
                            setSummonerName(e.target.value);
                        }}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                        Enter your summoner name.
                    </Form.Text>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col xs={{span: 12, offset: 0}} md={{span: 6, offset: 3}}>
                    <SummonerCard summonerName={summonerName}/>
                </Col>
            </Row>
        </Container>
    );
}
