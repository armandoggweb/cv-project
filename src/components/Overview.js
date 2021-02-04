import React from 'react';
import uniqid from 'uniqid';
import '../index.css';
export default class Overview extends React.Component {

  render() {
    const data = this.props.info;
    const type = this.props.typeInfo;
    if (type === 'personal') {
      const { userName, email, phone } = data;
      return (
        <div>
          <p><span className="field">Name:</span> {userName}</p>
          <p><span className="field">Email address:</span> {email}</p>
          <p><span className="field">Phone number:</span> {phone}</p>
        </div>
      );
    } else if (type === 'studies') {
      const { school, titleStudy, dateStudy } = data;
      return (
        <div className="render-info">
          <p><span className="field">Date of study:</span> {dateStudy}</p>
          <p><span className="field">School:</span> {school}</p>
          <p><span className="field">Title of study:</span> {titleStudy}</p>
        </div>);
    } else if (type === 'experience') {
      const { company, position, tasks, startDate, endDate } = data;
      return (
        <div className="render-info">
          <p><span className="field">From:</span> {startDate} <span className="field">Until:</span> {endDate}</p>
          <p><span className="field">Company:</span> {company}</p>
          <p><span className="field">Position:</span> {position}</p>
          <p><span className="field">Tasks:</span> </p>
          <ul className="render-expand-list">
            {tasks.map((e) => <li key={uniqid()}>{e}</li>)}
          </ul>
          
        </div>
      );
    }
  }
}