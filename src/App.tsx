import React from 'react';
import Todos from "./components/Todos";

function App() {
  return (
    <div className="App">
      <header className="header">
        <span className="header__logo" data-testid="header-logo">todos</span>
      </header>
      <Todos/>
    </div>
  );
}

export default App;
