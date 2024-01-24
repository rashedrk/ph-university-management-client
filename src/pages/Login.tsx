import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TAuthUser, setUser } from "../redux/features/auth/authSlice";
import verifyToken from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const Login = () => {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            id: 'A-0001',
            password: 'admin123'
        }
    });
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // console.log("Error", error);
    
    const onSubmit = async(data: FieldValues) => {
        // console.log(data);
        const toastId = toast.loading('Logging in...');
        try {
            const res = await login(data).unwrap();
            const user = verifyToken(res.data.accessToken) as TAuthUser;
            dispatch(setUser({user , token: res.data.accessToken} ));
            navigate(`/${user.role}/dashboard`);
            toast.success('login successful' ,{id: toastId, duration: 2000});
        } catch (error) {
            toast.error('something went wrong!', {id: toastId, duration: 2000});
        }

        // console.log(res);
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