import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: '',
        age: ''
    });
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            const response = await axios.post('http://localhost:3000/api/user/signup', user);
            console.log(response.data);
            if (response.data.success) {
                navigate('/signin');
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div>
            <div className="hero bg-[#e1dae4] min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left text-black/60">
                        <h1 className="text-5xl font-bold">Sign Up now</h1>
                        <p className="py-6">
                            Join our fitness community and start your journey towards a healthier, happier you. Whether you are looking to lose weight, build muscle, or just stay active, we have the resources and support you need to achieve your goals. Sign up today and take the first step towards a better you!
                        </p>
                    </div>
                    <div className="card bg-white/60 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black/70">First Name</span>
                                </label>
                                <input name='firstName' onChange={handleChange} type="text" placeholder="first name" className="input input-bordered bg-white text-black/60" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black/70">Last Name</span>
                                </label>
                                <input name='lastName' onChange={handleChange} type="text" placeholder="last name" className="input input-bordered bg-white text-black/60" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black/70">Gender</span>
                                </label>
                                <select name='gender' onChange={handleChange} className="select select-bordered bg-white text-black/60" required>
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black/70">Age</span>
                                </label>
                                <input name='age' onChange={handleChange} type="number" placeholder="age" className="input input-bordered bg-white text-black/60" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black/70">Username</span>
                                </label>
                                <input name='username' onChange={handleChange} type="text" placeholder="username" className="input input-bordered bg-white text-black/60" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black/70">Email</span>
                                </label>
                                <input name='email' onChange={handleChange} type="email" placeholder="email" className="input input-bordered bg-white text-black/60" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black/70">Password</span>
                                </label>
                                <input name='password' onChange={handleChange} type="password" placeholder="password" className="input input-bordered bg-white text-black/60" required />
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary text-white">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}