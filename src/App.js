import React from 'react';
import './App.css';
import FiltersProvider from './FiltersProvider';
import Gallery from './Gallery';
import ThemeProvider from './ThemeProvider';

function App() {
  return (
    <div className="App">
      <FiltersProvider>
        <ThemeProvider>
          <Gallery/>
        </ThemeProvider>
      </FiltersProvider>
    </div>
  );
}

export default App;
