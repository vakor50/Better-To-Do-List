import React from 'react';

import {
  Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem,
  Modal, ModalHeader, ModalBody, ModalFooter,
  FormGroup, Label
} from 'reactstrap';



class AddItemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button type="button" className="btn btn-primary" id="add_card" onClick={this.toggle}>+</Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
          	<Input placeholder="Task" />
          </ModalHeader>
          <ModalBody>
          	  <Form>
          	  	<FormGroup row>
		          <Label for="checkbox2" sm={9}>On a date</Label>
		          <Col sm={{ size: 3 }}>
		            <FormGroup check>
		              <Label check className="switch">
		                <Input type="checkbox" id="checkbox2" />
		                <span class="slider round"></span>
		              </Label>
		            </FormGroup>
		          </Col>
		        </FormGroup>
		        <FormGroup row>
		          <Label for="dueDate" sm={6}>Date</Label>
		          <Col sm={6}>
		            <Input type="text" name="dueDate" id="dueDate" />
		          </Col>
		        </FormGroup>
		        <FormGroup row>
		          <Label for="exampleSelect" sm={6}>Repeat</Label>
		          <Col sm={6}>
		            <Input type="select" name="select" id="exampleSelect">
		            	<option>Daily</option>
		            	<option>Monthly</option>
		            	<option>Yearly</option>
		            </Input>
		          </Col>
		        </FormGroup>
		        <FormGroup>
		        	<Nav tabs className="nav-justified">
		        		<NavItem>
				            <NavLink href="#" active>Notes</NavLink>
				        </NavItem>
				        <NavItem>
				            <NavLink href="#">Checklist</NavLink>
				        </NavItem>
		        	</Nav>
		        	<Input type="textarea" name="text" id="addTaskText" placeholder="Add a note" />
		        </FormGroup>
          	  </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default AddItemModal;