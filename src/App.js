import React from 'react';
import './App.css';
import Gallery from './Gallery';
import ThemeProvider from './ThemeProvider';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Gallery/>
      </ThemeProvider>
    </div>
  );
}

export default App;
