import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './viewlead.css'

function ViewLead() {
  const { id } = useParams();

  const [lead, setLead] = useState({});
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  // Get Lead Details
  const getLead = () => {
    fetch(`https://lead-management-zkkf.onrender.com/api/leads/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setLead(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get Notes
  const getNotes = () => {
    fetch(`https://lead-management-zkkf.onrender.com/api/notes/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setNotes(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

useEffect(() => {
  getLead();
  getNotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]);

  // Add Note
  const addNote = () => {
    if (note === "" || createdBy === "") {
      alert("Please fill all fields");
      return;
    }

    const data = {
      lead_id: id,
      note: note,
      created_by: createdBy,
    };

    fetch("https://lead-management-zkkf.onrender.com/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        alert(result.message);

        setNote("");
        setCreatedBy("");

        getNotes();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="view-container">

<div className="lead-card">

<h2>Lead Details</h2>

<div className="details">

<div className="item">
<span>Name</span><br/>
{lead.name}
</div>

<div className="item">
<span>Mobile</span><br/>
{lead.mobile}
</div>

<div className="item">
<span>Email</span><br/>
{lead.email}
</div>

<div className="item">
<span>Address</span><br/>
{lead.address}
</div>

<div className="item">
<span>Course</span><br/>
{lead.course}
</div>

<div className="item">
<span>Source</span><br/>
{lead.source}
</div>

<div className="item">
<span>Status</span><br/>
{lead.status}
</div>

<div className="item">
<span>Employee</span><br/>
{lead.employee}
</div>

<div className="item">
<span>Created Date</span><br/>
{lead.created_date}
</div>

</div>

</div>


   <div className="note-card">

<h2>Notes</h2>

<input
type="text"
placeholder="Enter Note"
value={note}
onChange={(e)=>setNote(e.target.value)}
/>

<input
type="text"
placeholder="Created By"
value={createdBy}
onChange={(e)=>setCreatedBy(e.target.value)}
/>

<button onClick={addNote}>
Add Note
</button>

<table>

<thead>

<tr>
<th>ID</th>
<th>Note</th>
<th>Created By</th>
<th>Date</th>
</tr>

</thead>

<tbody>

{notes.map((item)=>(
<tr key={item.id}>

<td>{item.id}</td>

<td>{item.note}</td>

<td>{item.created_by}</td>

<td>{item.created_date}</td>

</tr>
))}

</tbody>

</table>

<Link to="/">
<button className="back-btn">
Back
</button>
</Link>

</div>
 </div>
  );
}

export default ViewLead;
