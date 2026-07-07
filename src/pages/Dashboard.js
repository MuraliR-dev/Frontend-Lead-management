import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [leads, setLeads] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [employee, setEmployee] = useState("");

  const [page, setPage] = useState(1);

  const limit = 5;

 
  const getLeads = () => {
    fetch(`https://lead-management-zkkf.onrender.com/api/leads/page/${page}/${limit}`)
      .then((response) => response.json())
      .then((result) => {
        setLeads(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

useEffect(() => {
  getLeads();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [page]);



  const deleteLead = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete?"
    );

    if (!confirmDelete) {
      return;
    }

    fetch(`https://lead-management-zkkf.onrender.com/api/leads/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        alert(result.message);
        getLeads();
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const searchLead = () => {
    if (search === "") {
      getLeads();
      return;
    }

    fetch(`https://lead-management-zkkf.onrender.com/api/leads/search/${search}`)
      .then((response) => response.json())
      .then((result) => {
        setLeads(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const filterStatus = (value) => {
    setStatus(value);

    if (value === "") {
      getLeads();
      return;
    }

    fetch(`https://lead-management-zkkf.onrender.com/api/leads/status/${value}`)
      .then((response) => response.json())
      .then((result) => {
        setLeads(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const filterEmployee = (value) => {
    setEmployee(value);

    if (value === "") {
      getLeads();
      return;
    }

    fetch(`https://lead-management-zkkf.onrender.com/api/leads/employee/${value}`)
      .then((response) => response.json())
      .then((result) => {
        setLeads(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    setPage(page + 1);
  };

    return (
    <div className="container">

      <h1>Lead Management System</h1>

      <br />

      <Link to="/add">
        <button>Add Lead</button>
      </Link>

      <br />
      <br />

      {/* //Search  */}

      <input
        type="text"
        placeholder="Search By Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={searchLead}>Search</button>

      <button
        onClick={() => {
          setSearch("");
          getLeads();
        }}
      >
        Reset
      </button>

      <br />
      <br />

      {/* Status Filter */}

      <select
        value={status}
        onChange={(e) => filterStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Follow Up">Follow Up</option>
        <option value="Closed">Closed</option>
      </select>

      &nbsp;&nbsp;

      {/* Employee Filter */}

      <select
        value={employee}
        onChange={(e) => filterEmployee(e.target.value)}
      >
        <option value="">All Employees</option>
        <option value="Rahul">Rahul</option>
        <option value="Karthik">Karthik</option>
        <option value="Ajay">Ajay</option>
        <option value="Priya">Priya</option>
        <option value="Deepak">Deepak</option>
      </select>

      <br />
      <br />

      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Course</th>
            <th>Source</th>
            <th>Status</th>
            <th>Employee</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leads.length > 0 ? (
            leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.mobile}</td>
                <td>{lead.email}</td>
                <td>{lead.course}</td>
                <td>{lead.source}</td>
                <td>{lead.status}</td>
                <td>{lead.employee}</td>
                <td>{lead.created_date}</td>

                <td className="btn">
                  <Link to={`/view/${lead.id}`}>
                    <button>View</button>
                  </Link>

                  {" "}

                  <Link to={`/edit/${lead.id}`}>
                    <button>Edit</button>
                  </Link>

                  {" "}

                  <button
                    onClick={() => deleteLead(lead.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" align="center">
                No Leads Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <br />

      <button onClick={previousPage}>
        Previous
      </button>

      &nbsp;&nbsp;

      <strong>Page {page}</strong>

      &nbsp;&nbsp;

      <button onClick={nextPage}>
        Next
      </button>

    </div>
  );
}

export default Dashboard;
