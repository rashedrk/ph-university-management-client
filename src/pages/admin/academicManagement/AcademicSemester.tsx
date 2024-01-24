import { useGetAcademicSemesterQuery } from "../../../redux/features/academicSemester/academicSemesterApi";


const AcademicSemester = () => {
    const {data} = useGetAcademicSemesterQuery(undefined);

    console.log(data);
    
    return (
        <div>
            This is academic Semester component
        </div>
    );
};

export default AcademicSemester;