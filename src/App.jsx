import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Menu from './componentes/Menu'
import Home from './componentes/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react';
import Predio from './componentes/telas/predio/Predio'
import Sala from './componentes/telas/sala/Sala'
function App() {

  return (
    <Router>
      <Routes>


        <Route  path="/" element={<Menu/>}  >
          <Route index   element={<Home />} />
          <Route exact="true" path="predios" element={<Predio />} />
          <Route exact="true" path="salas" element={<Sala />} />
        </Route>        
      </Routes>
    </Router>
  );
}

export default App;