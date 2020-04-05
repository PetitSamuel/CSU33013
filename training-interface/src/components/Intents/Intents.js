import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import IntentForm from './components/IntentForm'
import '../../App.css';

const axios = require('axios').default; 

class Intents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intent: '',
      string: '',
      obj:null,
      arrString: null,
      addExpressions:[],
      removeList:[],
      edit : false,
      editState : null,
    };

    this.generateTable = this.generateTable.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  
  componentDidMount(){
    this.generateTable();
  }

  getData(){
     var getDatas = axios.get('http://localhost:5000/api/intents')
      .then((response) => { 
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return error;
        
      });
      return getDatas;
  }

  handleEdit(intent){
   this.setState({edit: true});
   this.setState({editState: intent});
   console.log('Now state is', this.state.edit)
  }

  handleCheck(e){
    var inList = false;
    var arr = this.state.removeList;
    for(var i = 0; i< arr.length; i++){
      //Remove if unchecked
      if(arr[i]== e.target.name){
        inList = true;
        arr.splice(i, 1)
        console.log('Removed', e.target.name)
      }
    }
    if(!inList){
      arr.push(e.target.name);
      console.log('Added', e.target.name);
    }
    this.setState({removeList: arr})
    console.log('Updated', arr)
 }

 handleRemove(e){
  var promiseArr = [];
  var arr = this.state.removeList;
  console.log('Trying to remove:', arr);

  arr.forEach(e => {
    var req = 'http://localhost:5000/api/intents/' + e.toString();
    console.log('removing', req);
    promiseArr.push(axios.delete(req))
  })
  Promise.all(promiseArr)
    .then(function (response) {
      console.log(response);
      window.location.reload(true);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
 
  

    // Similar to entities, if I was to work more on this there would be a table component to prevent dupe
  generateTable(){
    this.getData()
      .then((response) => { 
        console.log("response", response);
        var x = response;
        var arr = [];
        
        for (var i=0; i<x.length; i++) {
          var element = (
            <div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id={x[i]._id} onClick={this.handleCheck} name={x[i].name}></input>
              <label className="custom-control-label" for={x[i]._id}> {x[i].name} </label>
              <Button variant="outline-warning" size="sm" style={{align: "right", marginLeft:"10px",lineHeight: "1.1" , borderRadius: "10px"}} 
                onClick={()=>{this.handleEdit(x[i])}}>
                + 
              </Button>
            </div>
            
          </div>
          )
          arr.push(element);
        }
        this.setState({arrString: arr}) 
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  
  //The form information is supposed to see by
  //run 'json-server db.json -w -p 8000' in /server directory
  //go 'http://localhost:8000/intents'
  render () {
    return (
    <div>
      <InputGroup style = {{padding:"20px"}}>
        <InputGroup.Prepend>
          <InputGroup.Text id="btnGroupAddon">@</InputGroup.Text>
        </InputGroup.Prepend>
          <FormControl
            type="text"
            placeholder="Search for an intent"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
          />
      </InputGroup>

      <Row style = {{padding:"20px"}}>
        <Col lg={5}>
          <Container fluid className="tile-glow">
            <h4> Intents: </h4>
            <div style ={{height:"70%", overflow:"auto", borderStyle: "solid", borderWeight:"0.1px", borderColor: "#13beb1", padding:"3px"}}>
              {this.state.arrString}
            </div>
            <Button onClick = {this.handleRemove} variant="outline-danger" style={{ float:"right", width:"20%", margin:"30px"}}>Remove</Button>
          </Container>
        </Col>
        
        <Col lg={7}>
          <Jumbotron fluid style = {{width:"50%" ,padding:"20px"}}>
            {/*This intent form is for creating intents*/}
            
             <IntentForm edit={this.state.edit} editState={this.state.edit}/>
          </Jumbotron>
        </Col>
      </Row>
    </div>
    )
  }
}
export default Intents;

