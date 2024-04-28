import { useParams } from "react-router-dom";

const StudentDetails = () => {
    const {studentId} = useParams();
    return (
        <div>
            This is student details for {studentId}
        </div>
    );
};

export default StudentDetails;