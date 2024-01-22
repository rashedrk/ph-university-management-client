import { Button } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import verifyToken from "../utils/verifyToken";

type TLoginData = {
    id: string,
    password: string,
}
const Login = () => {
    const {register, handleSubmit} = useForm<TLoginData>({
        defaultValues: {
            id: 'A-0001',
            password: 'admin123'
        }
    });
    const [login, {error}] = useLoginMutation();
    const dispatch = useAppDispatch();

    console.log("Error", error);
    
    const onSubmit: SubmitHandler<TLoginData> = async(data) => {
        // console.log(data);
        const res = await login(data).unwrap();
        const user = verifyToken(res.data.accessToken)
        dispatch(setUser({user , token: res.data.accessToken}))
        console.log(res);
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