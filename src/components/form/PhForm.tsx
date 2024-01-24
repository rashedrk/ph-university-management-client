import { useForm } from "react-hook-form";

const PhForm = ({onSubmit, children}) => {
    const {handleSubmit} = useForm();
    return (
        <div>
            {children}
        </div>
    );
};

export default PhForm;