import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddLead.css'

function AddLead() {
  const navigate = useNavigate();

  const [lead, setLead] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    course: "",
    source: "",
    status: "New",
    employee: "",
    created_date: "",
  });

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://lead-management-zkkf.onrender.com/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lead),
    })
      .then((response) => response.json())
      .then((result) => {
        alert(result.message);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="form-container">
      <h2>Add Lead</h2>

      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={lead.name}
          onChange={handleChange}
        />
      </div>
        <br /><br />

      <div className="form-group">
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={lead.mobile}
          onChange={handleChange}
        />
      </div>  

        <br /><br />

      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={lead.email}
          onChange={handleChange}
        />
      </div>
        <br /><br />

      <div className="form-group">
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={lead.address}
          onChange={handleChange}
        />
      </div>
        <br /><br />

     <div className="form-group">
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={lead.course}
          onChange={handleChange}
        />
      </div>
        <br /><br />

     <div className="form-group">
        <input
          type="text"
          name="source"
          placeholder="Source"
          value={lead.source}
          onChange={handleChange}
        />
      </div>
        <br /><br />
      <div className="form-group">
        <select
          name="status"
          value={lead.status}
          onChange={handleChange}
        >
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Follow Up</option>
          <option>Closed</option>
        </select>
      </div>
        <br /><br />

      <div className="form-group">
        <input
          type="text"
          name="employee"
          placeholder="Employee"
          value={lead.employee}
          onChange={handleChange}
        />
      </div>
        <br /><br />
      <div className="form-group">
        <input
          type="date"
          name="created_date"
          value={lead.created_date}
          onChange={handleChange}
        />
      </div>
        <br /><br />

    <div className="form-buttons">
        <button className="save-btn"> Save Lead </button>
        <button type="button" className="cancel-btn" onClick={()=>navigate("/")}>Cancel</button>
     </div>


      </form>
    </div>
  );
}

export default AddLead;