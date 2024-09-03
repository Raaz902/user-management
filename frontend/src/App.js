// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import UserList from './components/UserList';
import SearchBar from './components/SearchBar';  // Ensure these components exist
import Filters from './components/Filters';      // Ensure these components exist
import TeamCreation from './components/TeamCreation'; // Ensure these components exist

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>User Management</h1>
        <SearchBar />
        <Filters />
        <UserList />
        <TeamCreation />
      </div>
    </Provider>
  );
}

export default App;
