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
        <Route path="/" element={<Page />} />
        <Route
          path="/description/:taskId/:taskName/"
          element={<Desc />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
