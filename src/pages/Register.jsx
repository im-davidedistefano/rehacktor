import { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import * as z from 'zod';
import supabase from '../supabase/client';
import '../assets/scss/components/Form.scss';

const schema = z.object({
    username: z.string().min(1, { message: 'Username required' }),
    name: z.string().min(1, { message: 'Name required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(5, { message: 'Must be 5 or more characters long' }),
});

export default function Register() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    const handleClick = (newState) => {
        setState({ ...newState, open: true });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async ({ username, name, email, password }) => {
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: name,
                        username,
                    },
                },
            });
            if (error) {
                handleClick({ vertical: 'top', horizontal: 'right' });
            } else {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <section className="bg-primary text-white">
            <div className="container py-5">
                <form className="row justify-content-center py-5"
                      onSubmit={handleSubmit((formData) => onSubmit(formData))}>
                    <div className="col-11 col-md-6">
                        <h1>Register on our platform</h1>
                        <p>Register now to unlock the full potential of our website and enjoy exclusive benefits. By creating an account, you’ll be able to save and manage your preferences, chat in your favourite games and add them to your wishlist!<br/><br/>
                            <strong>It only takes a few moments to sign up and it’s completely free!</strong></p>
                        <div className="row bg-white p-4 p-md-5 my-5 innerForm text-black">
                            <div className="mb-4">
                                <label htmlFor="username" className="form-label fw-bold">Username</label>
                                <input
                                    name="username"
                                    type="text"
                                    className={`form-control rounded-0 ${errors.username?.message && 'is-invalid'}`}
                                    id="username"{...register('username')}
                                />
                                <div id="validationServer03Feedback" className="invalid-feedback mt-2">
                                    {errors.username?.message && (
                                        <p className="m-0 p-0 font-main">
                                            {errors.username?.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="form-label fw-bold">Full name</label>
                                <input
                                    name="name"
                                    type="text"
                                    className={`form-control rounded-0 ${errors.name?.message && 'is-invalid'}`}
                                    id="name"{...register('name')}
                                />
                                <div id="validationServer03Feedback" className="invalid-feedback mt-2">
                                    {errors.name?.message && (
                                        <p className="m-0 p-0 font-main">{errors.name?.message}</p>
                                    )}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label fw-bold">Email address</label>
                                <input name="email"
                                       type="email"
                                       className={`form-control rounded-0 ${errors.email?.message && 'is-invalid'}`}
                                       id="email"{...register('email')}
                                />
                                <div id="validationServer03Feedback" className="invalid-feedback mt-2">
                                    {errors.email?.message && (
                                        <p className="m-0 p-0 font-main">{errors.email?.message}</p>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3 mb-md-4">
                                <label htmlFor="password" className="form-label fw-bold">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    className={`form-control rounded-0 ${errors.password?.message && 'is-invalid'}`}
                                    id="password"{...register('password')}
                                />
                                <div id="validationServer03Feedback" className="invalid-feedback mt-2">
                                    {errors.password?.message && (
                                        <p className="m-0 p-0 font-main">
                                            {errors.password?.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary text-white text-uppercase fw-bold border-0 rounded-0 w-50 mx-auto my-3">
                                Register
                            </button>
                            <p className="small text-grey text-center mb-0">
                                Already registered?
                                <Link className="text-decoration-underline text-grey ms-1" to={`/login`}>
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                key={vertical + horizontal}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%', fontFamily: '"DM Sans", sans-serif' }}
                >
                    <AlertTitle
                        sx={{ width: '100%', fontFamily: '"DM Sans", sans-serif' }}
                    >
                        Sign Up error
                    </AlertTitle>
                    Check all fields before continuing
                </Alert>
            </Snackbar>
        </section>
    )
}