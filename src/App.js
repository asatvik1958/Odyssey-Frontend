import logo from './logo.svg';
import './App.css';

import { SignIn } from './components/signin/signin';
import { SignUp } from './components/signup/signup';
import { Home } from './components/home/home';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { UserData } from './components/userdata/userdata';
import { ResetPassword } from './components/forgotPwd/forgotPwd';
import { DeleteOne } from './components/deleteone/deleteone';
import { DeleteAll } from './components/deleteall/deleteall';
import { LandingPage } from './components/landing/landingv2';
import { BookingPage } from './components/booking/booking';
import { ProfilePage } from './components/profile/profile';
import { WelcomePage } from './components/welcome/welcome';
import { OrderPage } from './components/orders/orders';
import { AdminPage } from './components/admin/admin';
import { Verify } from './components/verify/verify';
import { PaymentPage } from './components/payment/payment';
import { BookedOrdersPage } from './components/bookedord/bookedord';
import { PaymentGateway } from './components/gateway/gateway';


function App() {
  const auth = sessionStorage?.auth && JSON.parse(sessionStorage?.auth)?.Email

  return (
    <>
    <BrowserRouter>
    <Routes> 
      {/* <Route path='/home' element={auth?<Home/>:<SignIn/>} /> */}
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/resetpwd' element={<ResetPassword/>}/>
      <Route path='/landing' element={auth?<LandingPage/>:<SignIn/>}/>
      <Route path='/booking' element={<BookingPage/>} /> 
      <Route path='/bkords' element={<BookedOrdersPage/>}/>
      <Route path='/profile' element={<ProfilePage/>} /> 
      <Route path='/orders' element={<OrderPage/>} /> 
      <Route path='/admin' element={<AdminPage/>} /> 
      <Route path='/verify' element={<Verify/>} />
      <Route path='/' element={<WelcomePage/>} />
      <Route path='/payment' element={<PaymentPage/>} />
      <Route path='/gateway' element={<PaymentGateway/>} />

      {/* tetsing conditional rendering*/}
  
      <Route path='/userdata' element={auth?<UserData/>:<SignIn/>} />

    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
