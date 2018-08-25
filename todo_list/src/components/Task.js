import React from 'react';

import {
  Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem
} from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
library.add(faStroopwafel)
library.add(faCheckCircle)
library.add(faEdit)
library.add(faUsers)
library.add(faEllipsisH)

function TaskBody(props) {
	const details = props.details;
	const checklist = props.checklist;
	if (details) {
		return <p>{details}</p>
	} else if (checklist.length > 0) {
		return (
			<ul>
				{checklist.map((e, i) => (
					<li key={i}>{e}</li>
				))}
			</ul>
		)
	} else {
		return ``
	}
}

function TaskButton(props) {
	switch (props.type) {
		case 'check':
			return (
				<button type="button" className="btn btn-card-options">
					<FontAwesomeIcon icon="check-circle" />
				</button>
			)
		case 'edit':
			return (
				<button type="button" className="btn btn-card-options">
					<FontAwesomeIcon icon="edit" />
				</button>
			)
		case 'share':
			return (
				<button type="button" className="btn btn-card-options">
					<FontAwesomeIcon icon="users" />
				</button>
			)
		case 'other':
			return (
				<button type="button" className="btn btn-card-options">
					<FontAwesomeIcon icon="ellipsis-h" />
				</button>
			)
	}
}

function TaskButtonContainer(props) {
	return (
		<Col xs={{ size: 3, offset: 0 }} md={{ size: 3, offset: 0 }} tag="section" className="">
			<TaskButton type={props.type} />
		</Col>
	)
}

class Task extends React.Component {
	constructor(props) {
		super(props);
		this.due_date = new Date(props.due_date).toDateString()
		this.created = new Date(props.created).toDateString()
	}
	state = {
				id: this.props.id,
				due_date: this.props.due_date,
				created: this.props.created,
				title: this.props.title,
				details: this.props.details,
				checklist: this.props.checklist,
				status: this.props.status,
				repeat: this.props.repeat
			}
	render() {
		const values = this.state
		return (
			<div className='card mb-3 border-0' key={values.id}>
				<div className='card-body'>
					<h5 className='card-title'>{values.title}</h5>
					<p className="card-subtitle mb-2 text-muted">
						{(values.due_date) 
							? `Due ${this.due_date}` 
							: `Created ${this.created}`
						}
					</p>
					<div className="card-text">
						<TaskBody key={values.id} details={values.details} checklist={values.checklist} />
					</div>
				</div>
				<div className="card-footer text-muted" style={{padding: 0}}>
					<Row noGutters role="group" className="w-100 px-xl-0 position-relative text-center btn-group" aria-label="Task options">
						<TaskButtonContainer type={'check'} />
						<TaskButtonContainer type={'edit'} />
						<TaskButtonContainer type={'share'} />
						<TaskButtonContainer type={'other'} />
					</Row>
				</div>
			</div>
		)
	}
}

export default Task;