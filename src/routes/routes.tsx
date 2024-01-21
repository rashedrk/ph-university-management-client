import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { studentPaths } from "./student.routes";
import { facultyPaths } from "./faculty.routes";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/admin',
    element: <App />,
    children: routeGenerator(adminPaths)
  },
  {
    path: '/faculty',
    element: <App />,
    children: routeGenerator(facultyPaths)
  },
  {
    path: '/student',
    element: <App />,
    children: routeGenerator(studentPaths)
  },

]);

export default router;
