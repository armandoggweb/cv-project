import React from 'react';
import { format, studiesFormat, getData } from '../helper'
export default class Form extends React.Component {
  state = {
    name: '',
    email: '',
    phone: '',
    studies: [],
    experience: []
  };

  savePersonalInfo = (event) => {
    const data = event.target.elements;
    this.setState({
      name: data.name.value,
      email: data.email.value,
      phone: data.phone.value,
    });
    event.preventDefault();
  }

  saveEducationalInfo = (event) => {
    const data = event.target.elements;
    const formattedData = {
      school: data.school.value,
      titleStudy: data.titleStudy.value,
      dateStudy: data.dateStudy.value,
    }
    this.setState({
      studies: this.state.studies.concat(formattedData)
    });
    console.log(this.state.studies)
    event.preventDefault();
  }

  savePracticalInfo = (event) => {
    const data = event.target.elements;
    const formattedData = {
      company: data.company.value,
      position: data.position.value,
      tasks: `${getData(data.tasks)}`,
      startDate: data.startDate.value,
      endDate: data.endDate.value
    }
    this.setState({
      experience: this.state.experience.concat(formattedData)
    });
    console.log(this.state.experience);
    event.preventDefault();
  }

  handleRemove = (event) =>{
    console.log(event.target.parentNode)
    event.target.parentNode.remove();
  }
  render() {
    return (
      <div>
        <div>
          <p>{this.state.name}</p>
          <p>{this.state.email}</p>
          <p>{this.state.phone}</p>
        </div>

        <form onSubmit={this.savePersonalInfo}>
          <h3>Personal information</h3>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" /><br />
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" /><br />
          <label htmlFor="phone">Phone number:</label>
          <input type="tel" name="phone" id="phone" />
          <input type="submit" value="Save" />
        </form>

        <h3>Educational Experience</h3>

        <EducationalForm onSave={this.saveEducationalInfo} onRemove={this.handleRemove}/><br />
        {/* <EducationalForm onSave={this.saveEducationalInfo} /> */}

        <h3>Practical Experience</h3>
        <PracticalForm onSave={this.savePracticalInfo} />
      </div>
    );
  }
}

class EducationalForm extends Form {
  state = {
    school: '',
    btnName: 'Save',
  }
  handleClick = (event) => {
    if (this.state.btnName === 'Save') {
      this.setState({ btnName: 'Edit' });
    } else {
      this.setState({ btnName: 'Save' });
    }
  }
  handleChange = (event) => {
    this.setState({ school: event.target.value })
  }
  render() {
    const btnName = this.state.btnName;
    return (
      <form onSubmit={this.props.onSave} className="educational">
        <label htmlFor="school">School:</label>
        <input type="text" name="school" onChange={this.handleChange} value={this.state.school} /><br />
        <label htmlFor="title-study">Title of study:</label>
        <input type="text" name="titleStudy" /><br />
        <label htmlFor="date-study">Date of study:</label>
        <input type="date" name="dateStudy" /><br />
        <input type="submit" value={btnName} onClick={this.handleClick} />

        {
          btnName === 'Edit' &&
          <button onClick={this.props.onRemove}>Remove</button>
        }

      </form>
    )
  }
}

class PracticalForm extends Form {
  render() {
    return (
      <form onSubmit={this.props.onSave} className="practical">
        <label htmlFor="company">Company:</label>
        <input type="text" name="company" /><br />
        <label htmlFor="position">Title of study:</label>
        <input type="text" name="position" /><br />
        <label htmlFor="tasks">Main tasks:</label>
        <div className="tasks">
          <ExtensibleField name="tasks" />
          <ExtensibleField name="tasks" />
        </div>
        <label htmlFor="start-date">From:</label>
        <input type="date" name="startDate" />
        <label htmlFor="end-date">Until:</label>
        <input type="date" name="endDate" /><br />
        <input type="submit" name="Save" />
      </form >
    );
  }
}

class ExtensibleField extends Form {
  render() {
    return (
      <input type="text" name={this.props.name} />
    );
  }
}