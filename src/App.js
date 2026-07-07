import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard.js";
import AddLead from "./pages/AddLead.js";
import EditLead from "./pages/EditLead.js";
import ViewLead from "./pages/ViewLead.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddLead />} />
        <Route path="/edit/:id" element={<EditLead />} />
        <Route path="/view/:id" element={<ViewLead />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;