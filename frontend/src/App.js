import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import { ToastContainer } from 'react-toastify';
import Appheader from './Components/Appheader';
import Customer from './Components/Customer';

function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
        <Appheader></Appheader>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/customer' element={<Customer />}></Route>
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;