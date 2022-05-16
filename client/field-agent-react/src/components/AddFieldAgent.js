import { useState } from "react";

function AddFieldAgent({ handleAdd, handleCancel }) {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [heightInInches, setHeightInInches] = useState('');
  const [errors, setErrors] = useState([]);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  }

  const handleMiddleNameChange = (event) => {
    setMiddleName(event.target.value);
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  }

  const handleDoBChange = (event) => {
    setDob(event.target.value);
  }

  const handleHeightInInchesChange = (event) => {
    setHeightInInches(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newFieldAgent = {
      firstName,
      middleName,
      lastName,
      dob,
      heightInInches
    };

    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFieldAgent)
    };

    fetch('http://localhost:8080/api/agent', init)
      .then(response => {
        if (response.status === 201 || response.status === 400) {
          return response.json();
        }

        return Promise.reject('Something went wrong on the server :)');
      })
      .then(json => {
        if (json.agentId) {
          handleAdd(json);
        } else {
          setErrors(json);
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <>
      <h2 className="mt-5">Add FieldAgent</h2>
      <form>
        <div className="form-group">
          <label htmlFor="firstName">Agents: First Name:</label>
          <input className="form-control" type="text" id="firstName" name="firstName" value={firstName} onChange={handleFirstNameChange} ></input>
          <label htmlFor="middleName">Agents: Middle Name:</label>
          <input className="form-control" type="text" id="middleName" name="middleName" value={middleName} onChange={handleMiddleNameChange} ></input>
          <label htmlFor="lastName">Last Name:</label>
          <input className="form-control" type="text" id="lastName" name="lastName" value={lastName} onChange={handleLastNameChange} ></input>
          <label htmlFor="dob">Agents: Date of Birth:</label>
          <input className="form-control" type="date" id="dob" name="dob" value={dob} onChange={handleDoBChange} ></input>
          <label htmlFor="heightInInches">Agents: Height in Inches:</label>
          <input className="form-control" type="number" id="heightInInches" name="heightInInches" value={heightInInches} onChange={handleHeightInInchesChange} ></input>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Add FieldAgent</button>
          &nbsp;
          <button className="btn btn-secondary" type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
      {errors.length ? (<>
          <div className="alert alert-danger">
            <span>The following Errors occurred:</span>
            <ul>
              {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
        </>) : null}
    </>
  )

}

export default AddFieldAgent;