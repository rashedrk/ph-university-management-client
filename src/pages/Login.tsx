import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";

type TLoginData = {
    id: string,
    password: string,
}
const Login = () => {
    const {register, handleSubmit} = useForm<TLoginData>();
    const [login, {data, error}] = useLoginMutation();

    console.log("data", data);
    console.log("Error", error);
    
    const onSubmit: SubmitHandler<TLoginData> = (data) => {
        console.log(data);
        login(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="id"> ID: </label>
                <input type="text" id="id" {...register('id')}  />
            </div>
            <div>
                <label htmlFor="password"> Password: </label>
                <input type="text" id="password" {...register('password')}  />
            </div>
            <Button htmlType="submit">Login</Button>
        </form>
    );
};

export default Login;