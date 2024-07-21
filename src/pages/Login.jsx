import {Link, useNavigate} from "react-router-dom";
import supabase from "../supabase/client.js";

export default function Login() {
    const navigate = useNavigate();
    const handleLogin = async (event) => {
        event.preventDefault();
        const LoginForm = event.currentTarget;
        const { email, password } = Object.fromEntries(new FormData(LoginForm));
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                alert(error.error_description || error.message);
            } else {
                navigate('/');
            }
        } catch (error) {
            alert(error);
        }
    };
    return (
        <section className="bg-secondary text-white">
            <div className="container py-5">
                <form className="row justify-content-center py-5"
                      onSubmit={handleLogin}>
                    <div className="col-11 col-md-6">
                        <h1>Welcome back!</h1>
                        <p>Please log in to view all game details, add them to your wishlist, and chat with other users. Be sure to have an account already.</p>
                        <div className="row bg-white p-4 p-md-5 my-5 innerForm text-black">
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label fw-bold">Email address</label>
                                <input name="email"
                                       type="email"
                                       className="form-control rounded-0"
                                       id="email"
                                />
                            </div>
                            <div className="mb-3 mb-md-4">
                                <label htmlFor="password" className="form-label fw-bold">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    className="form-control rounded-0"
                                    id="password"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-secondary text-white text-uppercase fw-bold border-0 rounded-0 w-50 mx-auto my-3">
                                Login
                            </button>
                            <p className="small text-grey text-center mb-0">
                                Don&apos;t you have an account?
                                <Link className="text-decoration-underline text-grey ms-1" to={`/register`}>
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}