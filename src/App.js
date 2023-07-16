import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpenRoute from "./components/core/auth/OpenRoute";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Error from "./pages/Error"
import DashBoard from "./pages/DashBoard";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constant";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse"
import Catalog from "./pages/Catalog";
import FullCourseDetails from "./pages/FullCourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
// import SimpleBottomNavigation from "./components/common/BottomNavbar";

function App() {
  const { user } = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      {/* <SimpleBottomNavigation /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="/about"
          element={
            <About />
          }
        />

        <Route
          path="/contact"
          element={
            <Contact />
          }
        /> 

        <Route
          path="/courses/:courseId"
          element={
            <FullCourseDetails />
          }
        /> 

        <Route
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />
          

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT  && (
              <>
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                <Route path="dashboard/cart" element={<Cart />} />
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR  && (
              <>
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route path="dashboard/instructor" element={<Instructor />} />
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
              </>
            )
          }

        </Route>

        <Route element={
          <PrivateRoute>
            <ViewCourse />
          </PrivateRoute>
        }>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route 
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              </>
            )
          }
        </Route>

        <Route path="*" element={<Error />} />

      </Routes>
    </div>
  );
}

export default App;