import './App.css';
import React from 'react';
import Form from './components/Form';
class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Curriculum Vitae</h1>
        <Form />
      </div>
    );
  }
}

export default App;
