import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

import { Container, Row, Col, Button } from 'reactstrap';

import Post from './components/Post';
import Task from './components/Task';
import Header from './components/Header';
import SideCard from './components/SideCard';
import AddItemModal from './components/AddItemModal';

var tasks = [
  {
    id: 1,
    due_date: 1534996800000,
    created: 1534251600000,
    title: 'Coffee with Karan',
    details: 'Coffee shop in town',
    checklist: '',
    status: 'Active',
    repeat: 'None'
  },
  {
    id: 2,
    due_date: 1535083200000,
    created: 1534258800000,
    title: 'Pay bills',
    details: '',
    checklist: ['Student loans', 'Credit cards'],
    status: 'Active',
    repeat: 'Monthly'
  },
  {
    id: 3,
    due_date: null,
    created: 1534260800831,
    title: 'Buy groceries',
    details: '',
    checklist: ['Milk', 'Eggs', 'Tomatoes', 'Green peppers'],
    status: 'Active',
    repeat: 'None'
  },
  {
    id: 4,
    due_date: 1534165200000,
    created: 1534158000000,
    title: 'Jai\'s Birthday',
    details: '',
    checklist: [],
    status: 'Active',
    repeat: 'None'
  },
]

var your_week = [
  [],             // 0 = on the burner (already past)
  [],             // 1 = today
  [],             // 2 = tomorrow
  [],             // 3
  [],             // 4
  [],             // 5
  [],             // 6
]

function isSameDay(one, two, increment = 0) {
  var temp1 = new Date(one),
    d1 = new Date(temp1.setDate(temp1.getDate() + increment)),
    d2 = new Date(two);

  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

function dateCompare(date1, date2){
  return new Date(date2) > new Date(date1);
}

function getIncrementDate(d, num) {
  var t = new Date(d);
  return t.setDate(t.getDate() + num);
}

function getDayOfWeek(d) {
  var day_name = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return day_name[ new Date(d).getDay() ]
}

function sortTasks() {
  var today = new Date()

  for (var task of tasks) {

    if (!task.due_date || dateCompare(task.due_date, today.toDateString())) {                       // no due date set or due_date before today
      your_week[0].push(task)
    } else if (isSameDay(today, task.due_date)) {
      your_week[1].push(task)
    } else if (isSameDay(today, task.due_date, 1)) {
      your_week[2].push(task)
    } else if (isSameDay(today, task.due_date, 2)) {
      your_week[3].push(task)
    } else if (isSameDay(today, task.due_date, 3)) {
      your_week[4].push(task)
    } else if (isSameDay(today, task.due_date, 4)) {
      your_week[5].push(task)
    }
  }

}


function getTitle(index) {
  var today = new Date();

  switch(index) {
    case 0:
      return `In Your Stack`
    case 1:
      return `Today`
    case 2:
      return `Tomorrow`
    case 3:
      return getDayOfWeek( getIncrementDate(today, 2) )
    case 4:
      return getDayOfWeek( getIncrementDate(today, 3) )
    case 5:
      return getDayOfWeek( getIncrementDate(today, 4) )
  }
}

function TaskGroupDate (props) {
  return (
    <Col xs={{ size: 12, offset: 0 }} md={{ size: 12, offset: 0 }} tag="section" className="task-date-group pt-5 py-md-0 mb-md-0">
      <h6>{props.title}</h6>
      {props.date_items.map((item, index) => (
        <Task key={item.id}
          id={item.id}
          due_date={item.due_date}
          created={item.created}
          title={item.title}
          details={item.details}
          checklist={item.checklist}
          status={item.status}
          repeat={item.repeat} />
      ))}
    </Col>
  )
}

class App extends Component {
  constructor() {
    super();
    sortTasks();
  }
  render() {
    return (
      <Fragment>

        <Header />

        
        <main className="my-5 py-5">
          <Container className="px-0">
            <Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
              <Col xs={{ order: 1 }} md={{ size: 4, offset: 4 }} tag="section" className="py-md-0 mb-md-0">
                <AddItemModal />
              </Col>
            </Row>
            <Row noGutters className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
              {your_week.map((date, index) => (
                (date.length > 0) 
                  ? <TaskGroupDate key={index} title={getTitle(index)} date_items={date} />
                  : ``
              ))}
            </Row>




            <Row noGutters className="d-none pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
            
              <Col xs={{ order: 2 }} md={{ size: 4, order: 1 }} tag="aside" className="pb-5 mb-5 pb-md-0 mb-md-0 mx-auto mx-md-0">
                <SideCard />
              </Col>
              
              <Col xs={{ order: 1 }} md={{ size: 7, offset: 1 }} tag="section" className="py-5 mb-5 py-md-0 mb-md-0">
                <Post />
              </Col>

            </Row>
          </Container>
        </main>
        
      </Fragment>

    );
  }
}

export default App;
