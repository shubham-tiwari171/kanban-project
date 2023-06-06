import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import List from './components/molecules/List/List';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<List />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
