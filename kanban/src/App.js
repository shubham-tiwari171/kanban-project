import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/atoms/Navbar/NavBar';
import Card from './components/atoms/Card';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <NavBar/>
        <Card/>
      </div>
      <Routes>
        <Route path='/' element={<div>Hello</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
