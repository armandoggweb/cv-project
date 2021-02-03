import React from 'react';
import uniqid from 'uniqid';
import {format} from '../helper'
import Overview from './Overview';
import '../index.css';
export default class Form extends React.Component {
  state = {
    personal: [{}],
    studies: [],
    experience: [],
    studiesForms: [],
    experienceForms: []
  };

  saveInfo = (event) => {
    const name = event.target.name;
    const data = this.state[name];
    const index = parseInt(event.target.elements.index.value);
    const formattedData = format(event.target.elements, name);
    if (data[index]) {
      const temp = data.map((e, i) => {
        if (i === index) {
          e = formattedData;
        }
        return e;
      });
      this.setState({ [name]: temp });
    } else {
      this.setState({ [name]: data.concat(formattedData) });
    }
    event.preventDefault();
  }

  handleEdit = (event) => {
    const name = event.target.name;
    const index = parseInt(event.target.parentNode.getElementsByTagName('input')[0].value);
    let temp = this.state[name];
    temp[index].submitted = false;
    this.setState({ [name]: temp });
  }

  handleRemove = (event) => {
    const name = event.target.name;
    const forms = this.state[name + 'Forms'];
    const index = parseInt(event.target.parentNode.getElementsByTagName('input')[0].value);
    forms.pop();
    this.setState({ [name + 'Forms']: forms });
    this.setState({ [name]: this.state[name].filter((e, i) => i !== index) })

  }

  addForm = (event) => {
    const name = event.target.name + 'Forms';

    this.setState({ [name]: this.state[name].concat('') });
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: [event.target.value] })
  }
  render() {
    const { studiesForms, experienceForms } = this.state;
    const studiesFormsList = studiesForms.map((id, index) => {
      return (
        <EducationalForm
          key={uniqid()}
          index={index}
          onSave={this.saveInfo}
          onEditBtn={this.handleEdit}
          onRemoveBtn={this.handleRemove}
          info={this.state.studies[index] ? this.state.studies[index] : {}}
        />)
    })
    const expFormsList = experienceForms.map((id, index) => {
      return <ExperienceForm
        key={uniqid()}
        index={index}
        onSave={this.saveInfo}
        onEditBtn={this.handleEdit}
        onRemoveBtn={this.handleRemove}
        info={this.state.experience[index] ? this.state.experience[index] : {}}
      />
    })
    return (
      <div>

        <h3>Personal information</h3>
        <PersonalForm
          key={uniqid()}
          onSave={this.saveInfo}
          onEditBtn={this.handleEdit}
          onRemoveBtn={this.handleRemove}
          info={this.state.personal[0]}
        />

        <h3>Educational information</h3>
        <div>
          {studiesFormsList}
        </div>
        <button type="button" name="studies" onClick={this.addForm}>Add studies</button>

        <h3>Practical Experience</h3>
        <div>
          {expFormsList}
        </div>
        <button type="button" name="experience" onClick={this.addForm}>Add experience</button>

      </div>
    );
  }
}

class PersonalForm extends Form {
  componentDidMount() {
    const { submitted, userName, email, phone } = this.props.info;
    this.setState({
      userName: userName,
      email: email,
      phone: phone,
      submitted: submitted
    })
  }
  render() {
    const name = 'personal';
    const { info, onEditBtn, onSave } = this.props;
    const { submitted, userName, email, phone } = this.state;
    
    if (submitted) {
      return (
        <div name={name} >
          <input type="hidden" name="index" value="0" />
          <Overview info={info} typeInfo={name} />
          <button type="button" name={name} onClick={onEditBtn}>Edit</button>
        </div>
      );
    } else {
      return (
        <form name={name} onSubmit={onSave}>
          <input type="hidden" name="index" value="0" />
          <label htmlFor="userName">Name:</label>
          <input type="text" name="userName" defaultValue={userName} onChange={this.handleChange} /><br />
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" defaultValue={email} onChange={this.handleChange} /><br />
          <label htmlFor="phone">Phone number:</label>
          <input type="tel" name="phone" defaultValue={phone} onChange={this.handleChange} /><br />
          <input type="submit" value="Save" />
        </form>
      );
    }
  }
}

class EducationalForm extends Form {
  componentDidMount() {
    const { submitted, school, titleStudy, dateStudy } = this.props.info;
    this.setState({
      school: school,
      titleStudy: titleStudy,
      dateStudy: dateStudy,
      submitted: submitted
    })
  }

  render() {
    const name = 'studies';
    const { info, index, onEditBtn, onRemoveBtn, onSave } = this.props;
    const { submitted, school, titleStudy, dateStudy } = this.state;
    if (submitted) {
      return (
        <div className="study">
          <input type="hidden" name="index" value={index} />
          <Overview info={info} typeInfo={name} />
          <button type="button" name={name} onClick={onEditBtn}>Edit</button>
          <button type="button" name={name} onClick={onRemoveBtn}>Remove</button>
        </div>
      );
    } else {
      return (
        <form name={name} onSubmit={onSave} className="study">
          <input type="hidden" name="index" value={index} />
          <label htmlFor="school">School:</label>
          <input type="text" name="school" defaultValue={school} onChange={this.handleChange} /><br />
          <label htmlFor="title-study">Title of study:</label>
          <input type="text" name="titleStudy" defaultValue={titleStudy} onChange={this.handleChange} /><br />
          <label htmlFor="date-study">Date of study:</label>
          <input type="date" name="dateStudy" defaultValue={dateStudy} onChange={this.handleChange} /><br />
          <input type="submit" value="Save" />
          <button type="button" name={name} onClick={onRemoveBtn}>Remove</button>
        </form>
      )
    }
  }
}

class ExperienceForm extends Form {
  state = { tasksForms: [] }
  componentDidMount() {
    const { company, position, tasks, startDate, endDate, submitted } = this.props.info;
    const temp = tasks ? tasks : [];
    this.setState({
      company: company,
      position: position,
      tasks: temp,
      startDate: startDate,
      endDate: endDate,
      submitted: submitted,
      tasksForms: temp.map(() => '')
    })
  }
  render() {
    const name = 'experience';
    const { info, index, onEditBtn, onRemoveBtn, onSave } = this.props;
    const { submitted, company, position, tasks, startDate, endDate } = this.state;
    const tasksList = this.state.tasksForms.map((e, index) => {
      return <ExtensibleField
        key={uniqid()}
        name="tasks"
        onRemoveBtn={this.handleRemove}
        info={tasks[index] ? tasks[index] : ''} />
    })
    if (submitted) {
      return (
        <div className="experience">
          <input type="hidden" name="index" value={index} />
          <Overview info={info} typeInfo={name} />
          <button type="button" name={name} onClick={onEditBtn}>Edit</button>
          <button type="button" name={name} onClick={onRemoveBtn}>Remove</button>
        </div>
      );
    } else {
      return (
        <form name={name} onSubmit={onSave} className="experience">
          <input type="hidden" name="index" value={index} />
          <label htmlFor="company">Company:</label>
          <input type="text" name="company" defaultValue={company} onChange={this.handleChange} /><br />
          <label htmlFor="position">Title of study:</label>
          <input type="text" name="position" defaultValue={position} onChange={this.handleChange} /><br />
          <label htmlFor="tasks">Main tasks:</label>
          <div className="tasks">
            {tasksList}
            <button type="button" name="tasks" onClick={this.addForm}>Add task</button>
          </div>
          <label htmlFor="start-date">From:</label>
          <input type="date" name="startDate" defaultValue={startDate} onChange={this.handleChange} />
          <label htmlFor="end-date">Until:</label>
          <input type="date" name="endDate" defaultValue={endDate} onChange={this.handleChange} /><br />
          <input type="submit" value="Save" />
          <button type="button" name={name} onClick={onRemoveBtn}>Remove</button>
        </form >
      );
    }
  }
}

class ExtensibleField extends Form {
  state = {
    field: ''
  }
  componentDidMount() {
    this.setState({ field: this.props.info })
  }
  handleChange(event) {
    this.setState({ field: event.target.value })
  }
  render() {
    const { name, onRemoveBtn } = this.props;
    const { field } = this.state
    return (
      <div>
        <input type="text" name={name} defaultValue={field} onChange={this.handleChange} />
        <button type="button" name={name} onClick={onRemoveBtn}>Remove</button>
      </div>
    )
  }
}