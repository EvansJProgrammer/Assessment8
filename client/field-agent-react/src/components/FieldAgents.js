import { useEffect, useState } from "react";
import AddFieldAgent from "./AddFieldAgent";
import DeleteFieldAgent from "./DeleteFieldAgent";
import UpdateFieldAgent from "./UpdateFieldAgent";


const VIEW = {
  LIST: 'list',
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete'
};



function FieldAgents() {

  const [fieldAgents, setFieldAgents] = useState([]);
  const [fieldAgent, setFieldAgent] = useState({});
  const [view, setView] = useState(VIEW.LIST);

  const getFieldAgent = () => {
    fetch('http://localhost:8080/api/agent')
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }

        return Promise.reject('Something went wrong on the server :)');
      })
      .then(body => {
        setFieldAgents(body);
      })
      .catch(err => console.error(err));
  }

  useEffect(() =>{
    getFieldAgent();
  }, []);


  const handleAdd = (newFieldAgent) => {
    setFieldAgents([...fieldAgents, newFieldAgent]);
    setView(VIEW.LIST);
  }

  const handleAddSelect = () => {
    setView(VIEW.ADD);
  }

  const handleDelete = (id) => {
    const filteredList = [...fieldAgents].filter(fa => fa.agentId !== id);
    setFieldAgents(filteredList);
    setFieldAgent({});
    setView(VIEW.LIST);
  }

  const handleUpdate = (replacementFieldAgent) => {
    const replacementIndex = fieldAgents.findIndex(fa => fa.agentId === replacementFieldAgent.agentId);

    const replacementList = [...fieldAgents];
    replacementList.splice(replacementIndex, 1, replacementFieldAgent);

    setFieldAgents(replacementList);
    setView(VIEW.LIST);
  }

  const handleEditSelect = (fieldAgent) => {
    setFieldAgent(fieldAgent);
    setView(VIEW.EDIT);
  }

  const handleDeleteSelect = (fieldAgent) => {
    setFieldAgent(fieldAgent);
    setView(VIEW.DELETE);
  }

  const handleCancel = () => {
    setFieldAgent({});
    setView(VIEW.LIST);
  }

  return (
    <>
      {view === VIEW.LIST ? (<>
        <h2 className="mt-5">FieldAgents List</h2>
        <button className="btn btn-outline-light mb-3 mt-4" type="button" onClick={handleAddSelect}>Add FieldAgent</button>
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col" class="text-danger bg-dark"> Full Name</th>
              <th scope="col" class="text-danger bg-dark"> Date of Birth</th>
              <th scope="col" class="text-danger bg-dark"> Modify</th>
            </tr>
          </thead>
          <tbody>
            {fieldAgents.map((fa, i) => (
              <tr key={fa.agentId}>
                <td>
                <div class="p-3 mb-2 bg-dark text-white">
                  {fa.firstName + " " + fa.middleName + " " + fa.lastName}
                  </div>
                </td>
                <td>
                  <div class="p-3 mb-2 bg-dark text-white">
                  {fa.dob}
                  </div>
                </td>
                
                <td>
                &nbsp;
                  <button type="button" class="btn btn-outline-light" data-container="body" data-toggle="popover" data-placement="top" title="Edit Popover" data-content="Clicking will allow editing to Agent" onClick={() => handleEditSelect(fa)} >Edit</button>
                  &nbsp;
                  <button className="btn btn-outline-light" type="button" size="lg" onClick={() => handleDeleteSelect(fa)} >Delete</button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </>) : null}
      {view === VIEW.ADD ? <AddFieldAgent handleAdd={handleAdd} handleCancel={handleCancel} /> : null}
      {view === VIEW.EDIT ? <UpdateFieldAgent fieldAgent={fieldAgent} handleUpdate={handleUpdate} handleCancel={handleCancel} /> : null}
      {view === VIEW.DELETE ? <DeleteFieldAgent fieldAgent={fieldAgent} handleDelete={handleDelete} handleCancel={handleCancel} /> : null}
    </>
  )

}

export default FieldAgents;