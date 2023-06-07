import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/atoms/Navbar/NavBar';
import Card from './components/atoms/Card';
import Page from './components/pages/Page';

function App() {
  return (
    <BrowserRouter>
      {/* <div className='App'>
        <NavBar/>
        <Card/>
      </div> */}
      <Routes>
        <Route path='/' element={<div>Hello</div>}></Route>
        <Route path="/task/:id" element={<div>{"sfsffs"}</div>}></Route>
        <Route path='/page' element={<Page />}></Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
