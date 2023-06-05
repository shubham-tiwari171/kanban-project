import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Page from './components/pages/Page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/page' element={<Page />}></Route>
        <Route path='/' element={<div>Hello</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
