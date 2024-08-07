import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import About from './pages/About';
import MyProfile from './components/core/Dashboard/MyProfile';
import Dashboard from './pages/Dashboard';
import Setting from './components/core/Dashboard/Settings';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import Cart from './components/core/Dashboard/cart';
import AddCourse from './components/core/Dashboard/AddCourse/AddCourse';
import MyCourses from './components/core/Dashboard/MyCourse';

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/update-password/:id' element={<UpdatePassword/>}/>
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path='/about' element={<About/>}/>
        <Route element={<Dashboard/>}> 
            <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
            <Route path="/dashboard/settings" element={<Setting/>}/>
            <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
            <Route path="/dashboard/cart" element={<Cart />} />
            <Route path="/dashboard/add-course" element={<AddCourse/>} />
            <Route path="/dashboard/my-courses" element={<MyCourses/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
