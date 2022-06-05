import {StrictMode} from "react";
import {createRoot} from "react-dom/client";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation
} from 'react-router-dom';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>

    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/myapps" element={<Navigate toto="/learn"/>}/>

        <Route path="learn" element={<Learn/>}>

          <Route path="courses" element={<Courses/>}>
            <Route path=":courseid" element={<CourseId/>}/>
          </Route>

          <Route path="bundles" element={<Bundles/>}/>

        </Route>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>

  </StrictMode>
);

function Home() {
  return (
    <div>
      <h1>Home Route</h1>
      <NavLink to={`/learn`}>Learn</NavLink>
    </div>
  )
}

function Learn() {
  return (
    <div>
      <h1>Learn</h1>
      <h4>All courses are listed here</h4>
      <Link to="/learn/courses">Courses</Link> |
      <Link to="/learn/bundles">Bundles</Link>
      <Outlet/>
    </div>
  )
}

function Courses() {
  const courseList = ["React", "Angular", "Vue", "Nodejs"]
  const randomCourseName = courseList[Math.floor(Math.random() * courseList.length)]
  return (
    <div>
      <p>Courses list</p>
      <p>Courses card</p>

      <p>Courses list</p>
      <NavLink
        style={({isActive}) => {
          return {
            backgroundColor: isActive ? "pink" : "yellow"
          };
        }}
        to={`/learn/courses/${randomCourseName}`}>
        {randomCourseName}
      </NavLink> (Refresh page/Click)|
      <NavLink to={`/learn/courses/tests`}>tests</NavLink>

      <Outlet/>
    </div>
  )
}

function Bundles() {
  return (
    <div>
      <p>Bundle list</p>
      <p>Bundle card</p>
    </div>
  )
}

function CourseId() {
  const navigate = useNavigate()
  const {courseid} = useParams();
  return (
    <div>
      <p>URL Params is: {courseid}</p>
      <button
      onClick={() => {
        navigate("/dashboard", {state:"399"});
      }}
      >Price</button>
    </div>
  )
}

function Dashboard() {
  const location = useLocation()
  return (
    <div>
      <p>Info is here: {location.state}</p>

    </div>
  )
}