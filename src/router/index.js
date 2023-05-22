import Workouts from "../pages/Workouts";
import About from "../pages/About";
import View from "../pages/View";
import Add from "../pages/Add";
import Dashboard from "../pages/Dashboard.jsx";
import Login from "../pages/Login";

export let privateRoutes = [

  {index: 'true', element: Dashboard, },
  {path: 'add', element: Add},
  {path: 'workouts', element: Workouts},
  {path: 'workouts/:id', element: View},
  {path: 'about', element: About},
  {path: "*", element: Dashboard},

];

export let publicRoutes = [
  {path: '/', element: Login},
  {path: '/login', element: Login},
  {path: '/about', element: About},
  {path: "*", element: Login},

];