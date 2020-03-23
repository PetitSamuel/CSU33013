import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import '../../App.css';
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

class Dialog extends Component {




  render () {
    return (
      <div>

      <InputGroup style = {{padding:"20px"}}>
        <InputGroup.Prepend>
          <InputGroup.Text id="btnGroupAddon">@</InputGroup.Text>
        </InputGroup.Prepend>
          <FormControl
            type="text"
            placeholder="Search for a dialog"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
          />
      </InputGroup>

        <Row>
        <Col lg={5}>
        
          <ListGroup as="ul" style = {{padding:"20px"}}>
            <ListGroup.Item action variant="dark">
              Hi.
            </ListGroup.Item>
            <ListGroup.Item action variant="light">
              Hi, how are you?
            </ListGroup.Item>
            <ListGroup.Item action variant="dark">
              What are the charges for car parking?
            </ListGroup.Item>
            <ListGroup.Item action variant="light">
              The payment is ...
            </ListGroup.Item>
            <ListGroup.Item action variant="dark">
              Do I have to pay a booking fee?
            </ListGroup.Item>
            <ListGroup.Item action variant="light">
              No booking fees apply.
            </ListGroup.Item>
            <ListGroup.Item action variant="dark">
              Great, thanks.
            </ListGroup.Item>
            <ListGroup.Item action variant="light">
              You are welcome, have a good day!
            </ListGroup.Item>
          </ListGroup>
         
        </Col>

        

        </Row>

      </div>
    )
  }
}
export default Dialog;
