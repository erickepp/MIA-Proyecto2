import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Turista from './components/Turista/Turista';
import Recepcionista from './components/Recepcionista/Recepcionista';
import Administrador from './components/Administrador/Administrador';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/turista' element={<Turista />} />
        <Route path='/recepcionista' element={<Recepcionista />} />
        <Route path='/administrador' element={<Administrador />} />
        <Route path='*' element={<Navigate to='/' replace={true} />} exact={true} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
