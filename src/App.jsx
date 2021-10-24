import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      {/* Header */}
      <Header />
      <div className="app__body">
        {/* Sidebar */}
        <Sidebar />
        {/* React Router-> Chat Screen */}
      </div>
    </div>
  );
}

export default App;
