import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/atoms/Navbar/NavBar';
import Card from './components/atoms/Card';
import Page from './components/pages/Page';
import { useSelector } from 'react-redux';
import Desc from './components/atoms/Navbar/Desc';

function App() {
  const card = useSelector((state) => state.kanbanData.card);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Hello</div>} />
        <Route
          path="/description/:taskId"
          element={<Desc/>}
        />
        <Route path="/page" element={<Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
