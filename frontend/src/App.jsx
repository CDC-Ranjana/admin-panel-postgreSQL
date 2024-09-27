import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
// import Dashboard from './pages/Dashboard';
// import Email from './pages/Email';
// import Compose from './pages/Compose';
// import Calendar from './pages/Calendar';
// import Charts from './pages/Charts';
// import Tables from './pages/Tables';
// import Maps from './pages/Maps';
import Table from './components/AdminTable';
import Email from './Pages/Bulletine';
import RecentActivites from './Pages/RecentActivites';
import Bulletine from './Pages/Bulletine';
import AllActivities from './Pages/AllActivities';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Router>
      <div className="flex" >
        <Sidebar isCollapsed={isCollapsed} />
        <div className="flex-1">
          <Header toggleSidebar={toggleSidebar} />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Table isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>} />
              <Route path="/bulletine" element={<Bulletine />} />
              <Route path="/recent-activities" element={<RecentActivites isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>} />
              <Route path='/all-activities' element={<AllActivities />}/>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
