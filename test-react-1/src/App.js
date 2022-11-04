  // import logo from './logo.svg';
  // import './App.css';

  // function App() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <p>
  //           Edit <code>src/App.js</code> and save to reload.
  //         </p>
  //         <a
  //           className="App-link"
  //           href="https://reactjs.org"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Learn React
  //         </a>
  //       </header>
  //     </div>
  //   );
  // }

  // export default App;

import React, { useState } from "react";
import "./App.css";

function City({city, state, startPoint, endPoint, population, totalWages} ) {
  return (
    <div className="mb-5">
      <div className="info-header"> 
        {city},{state} {/* This passes it as a parameter  */}
      </div>
      <div className="info-body">
        <ul>
          <li>State: {state}</li>
          <li>Location: ({startPoint}, {endPoint})</li>
          <li>Population (estimate) : {population}</li>
          <li>Total Wages: {totalWages}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField({change, value}) {
  return (
    <div className="mb-5">
      <label htmlFor="zip-code">zip-code:</label>
      <input
        className="form-control"
        id="zip-code"
        type="text"
        onChange={change}
        value={value}
        />
    </div>
  );
}

function App() {
  const [zipCode, searchZipCode] = useState("");
  const [codeResult, searchResult] = useState([]);
  const changedCode = (event) => {
    const newZipCode = event.target.value;
    console.log(newZipCode);
    searchZipCode(newZipCode);
    if (newZipCode.length === 5) {
      fetch(`https://ctp-zip-api.herokuapp.com/zip/${newZipCode}`)
        .then((res) => res.json())
        .then((body) => searchResult(body))
        .catch(() => searchResult([]));
    } else {
      searchResult([]);
    }
  };
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>
      <div className="mx-auto" style={{ maxWidth:300}}>
        <ZipSearchField value={zipCode} change={changedCode} />
        <div>
          {codeResult.map((zipData) => (
            <City
              city={zipData.City}
              state={zipData.State}
              startPoint={zipData.Lat}
              endPoint={zipData.Long}
              population={zipData.EstimatedPopulation}
              totalWages={zipData.TotalWages}
              key={zipData.RecordNumber}
            />
          ))}
          {codeResult.length === 0 && <strong>No results found</strong>}
        </div>
      </div>
    </div>
  );
}

export default App;

