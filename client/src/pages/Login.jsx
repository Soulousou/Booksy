import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext} from "../../context/UserContext";

export default function Login({ closeModal }) {
    const { setUser, user } = useContext(UserContext);
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        password: '',
    });

    const loginUser = async (e) => {
        e.preventDefault();
        const { username, password } = data;
        try {
            const { data } = await axios.post('/login', { username, password });
            console.log("Login Response:", data);
            if (data.error) {
                toast.error(data.error);
            } else {
                setData({ username: '', password: '' });
                setUser(data);
                toast.success('Successfully Logged In');
                closeModal();
                navigate("/dashboard")

            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="relative p-6 rounded-lg shadow-lg max-w-md mx-auto poppins-light">
            <h1 className="text-center text-xl font-bold mb-4">Welcome!<br /> Please login</h1>
            <form onSubmit={loginUser} className="space-y-5">
                <div>
                    <label htmlFor="username" className="block font-medium pb-1">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={data.username}
                        onChange={(e) => setData({ ...data, username: e.target.value })}
                        className="w-full p-2 pl-3 border rounded-lg"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block font-medium pb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        className="w-full p-2 pl-3 border rounded-lg"
                    />
                </div>
                <button type="submit" className="w-full bg-accentgreen/80 mt-4 py-2 rounded-xl hover:bg-accentgreen">
                    Login
                </button>
            </form>
        </div>
    );
}
