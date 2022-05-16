function DeleteFieldAgent({ fieldAgent, handleDelete, handleCancel }) {

    const handleSubmit = () => {
  
      const init = {
        method: 'DELETE'
      }
      
      fetch(`http://localhost:8080/api/agent/${fieldAgent.agentId}`, init)
        .then(response => {
          if (response.status === 204) {
            handleDelete(fieldAgent.agentId);
            return;
          }
      
          return Promise.reject('Something went wrong :)');
        })
        .catch(err => console.error(err));
    }
  
    return (
      <>
        <h2>FieldAgent Delete</h2>
        <div className="alert alert-warning">
          <div>Are you sure you want to delete this todo?</div>
          <div>FieldAgent: {fieldAgent.firstName + " " + fieldAgent.middleName + " " + fieldAgent.lastName}</div>
          <div>Date of Birth: {fieldAgent.dob}</div>
          <div>Height in Inches: {fieldAgent.heightInInches}</div>
        </div>
        <button className="btn btn-primary" type="button" onClick={handleSubmit}>Delete</button>
        &nbsp;
        <button className="btn btn-secondary" type="button" onClick={handleCancel}>Cancel</button>
      </>
    );
  
  
  }
  
  export default DeleteFieldAgent;