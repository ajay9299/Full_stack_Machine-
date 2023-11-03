import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import HomePage from './pages/home';
import { Route, Routes } from 'react-router-dom';
import Product from './pages/product';
function App() {
  return (
    
    <div className="App">
      <div className="bg-image">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/product' element={<Product />} />
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
