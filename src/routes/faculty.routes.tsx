import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import MyOfferedCourses from "../pages/faculty/MyOfferedCourses";


export const facultyPaths = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <FacultyDashboard/>
    },
    {
        name: 'My Courses',
        path: 'courses',
        element: <MyOfferedCourses/>
    },

]