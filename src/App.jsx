import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './styles/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Chat from './components/Chat';

function App() {
  return (
    <div className="app">
      <Router>
        <Header />

        <div className="app__body">
          <Sidebar />
          <Switch>
            <Route path="/room/:roomId">
              <Chat />
            </Route>
            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
