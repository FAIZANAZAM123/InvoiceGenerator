import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import InvoiceGenerator from "./components/InvoiceGenerator";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<InvoiceGenerator />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
