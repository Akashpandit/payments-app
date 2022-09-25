import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Auth from './components/Auth';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/Index";
import Payments from './components/Payments';
import AddPayment from './components/AddPayment';
import PaymentDetail from './components/PaymentDetail';
import ClientDetail from './components/ClientDetail';
import AuthSignup from './components/AuthSignup';
import Clients from './components/Clients';
import AddClient from './components/AddClient';
import UserDetail from './components/UserDetail';



function App() {

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  })

  return (
    <React.Fragment>
      <header>
        <NavBar />


      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <>

              <Route path='/' element={<Auth />} />
              <Route path='/auth' element={<Auth />} />
              <Route path='/admin/addNewClient' element={<AuthSignup />} />
              {/* <Route path='/payments' element={<Payments />} /> */}

            </>

          ) : (
            <>
              <Route path='/' element={<Clients />} />
              <Route path='/clients' element={<Clients />} />
              <Route path='/client/add' element={<AddClient />} />
              <Route path='/client/payments' element={<Payments />} />
              <Route path='/payments/add' element={<AddPayment />} />
              <Route path='/myPayments/:id' element={<PaymentDetail />} />
              <Route path='/clientDetail' element={<ClientDetail />} />
              <Route path='/userDetail' element={<UserDetail />} />
              <Route path='/admin/addNewClient' element={<AuthSignup />} />
            </>

          )}
        </Routes>
      </main>

    </React.Fragment>

  );
}

export default App;
