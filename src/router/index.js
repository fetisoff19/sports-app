import Workouts from "../pages/Workouts";
import About from "../pages/About";
import View from "../pages/View";
import Add from "../pages/Add";
import Dashboard from "../pages/Dashboard.jsx";
import Login from "../pages/Login";
import SettingsPage from "../pages/SettingsPage.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import Registration from "../components/Registration/Registration";

export let privateRoutes = [
  {index: 'true', element: Dashboard, },
  {path: 'add', element: Add},
  {path: 'workouts', element: Workouts},
  {path: 'workouts/:id', element: View},
  {path: 'about', element: About},
  {path: 'settings', element: SettingsPage},
  {path: '/sports-app', navigate: true,},
  {path: "*", element: PageNotFound},
];

export let publicRoutes = [
  {path: '/', element: Login},
  {path: '/registration', element: Registration},
  {path: '/login', element: Login},
  {path: '/about', element: About},
  {path: '/sports-app', navigate: true,},
  {path: "*", element: Login},
];