import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddLead.css";

function EditLead() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    course: "",
    source: "",
    status: "",
    employee: "",
    created_date: "",
  });

  useEffect(() => {
    fetch(`https://lead-management-zkkf.onrender.com/api/leads/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setLead(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://lead-management-zkkf.onrender.com/api/leads/${id}`, {
      method: "PUT",
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

<h2>Edit Lead</h2>

<form onSubmit={handleSubmit}>

<div className="form-group">
<label>Name</label>
<input
type="text"
name="name"
value={lead.name}
onChange={handleChange}
/>
</div>

<div className="form-group">
<label>Mobile</label>
<input
type="text"
name="mobile"
value={lead.mobile}
onChange={handleChange}
/>
</div>

<div className="form-group">
<label>Email</label>
<input
type="email"
name="email"
value={lead.email}
onChange={handleChange}
/>
</div>

<div className="form-group">
<label>Address</label>
<input
type="text"
name="address"
value={lead.address}
onChange={handleChange}
/>
</div>

<div className="form-group">
<label>Course</label>
<input
type="text"
name="course"
value={lead.course}
onChange={handleChange}
/>
</div>

<div className="form-group">
<label>Source</label>
<input
type="text"
name="source"
value={lead.source}
onChange={handleChange}
/>
</div>

<div className="form-group">
<label>Status</label>

<select
name="status"
value={lead.status}
onChange={handleChange}
>

<option value="New">New</option>
<option value="Contacted">Contacted</option>
<option value="Qualified">Qualified</option>
<option value="Follow Up">Follow Up</option>
<option value="Closed">Closed</option>

</select>

</div>

<div className="form-group">
<label>Employee</label>

<input
type="text"
name="employee"
value={lead.employee}
onChange={handleChange}
/>

</div>

<div className="form-group">
<label>Created Date</label>

<input
type="date"
name="created_date"
value={lead.created_date}
onChange={handleChange}
/>

</div>

<div className="form-buttons">

<button type="submit" className="save-btn" >Update Lead</button>
<button type="button" className="cancel-btn" onClick={() => navigate("/")} >Cancel</button>

</div>

</form>

</div>
  );
}

export default EditLead;