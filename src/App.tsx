import React from 'react';
import SearchBar from './features/searchBar/searchBar';

import './App.css';

function App() {
  return (
    <div className="container">
      <header className="">
        <SearchBar />
      </header>
      <section className="grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-1">1</div>
        <div className="col-span-1">2</div>
        <div className="col-span-1">3</div>
        <div className="col-span-1">4</div>
      </section>
    </div>
  );
}

export default App;
