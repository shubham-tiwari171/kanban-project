import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Page from './components/pages/Page';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div>Hello</div>}></Route>
        <Route path="/task/:id" element={<div>{"sfsffs"}</div>}></Route>
        <Route path='/page' element={<Page />}></Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
