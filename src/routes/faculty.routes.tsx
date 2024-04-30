import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import MyOfferedCourses from "../pages/faculty/MyOfferedCourses";
import MyStudents from "../pages/faculty/MyStudents";


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
    {
        path: 'courses/:semesterRegisterId/:courseId',
        element: <MyStudents/>
    },

]