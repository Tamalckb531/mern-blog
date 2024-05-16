import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Oauth from '../components/Oauth';

const SignUp = () => {
    const [formData, setFormData] = useState({});
    const [errMsg, setErrMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value.trim()
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            return setErrMsg("Please fill out all fields.")
        }
        try {
            setLoading(true);
            setErrMsg(null);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (data.success === false) {
                return setErrMsg(data.message);
            }
            setLoading(false);
            if (res.ok) {
                navigate('/signin')
            }
        } catch (error) {
            setErrMsg(error.message);
            setLoading(false);
        }
    }
    return (
        <div className=' min-h-screen mt-20'>
            <div className=" flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                {/* left side  */}
                <div className=" flex-1">
                    <Link to={"/"} className='text-4xl font-bold dark:text-white'>
                        <span className=' px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Tamal's</span>
                        Blog
                    </Link>
                    <p className=' text-sm mt-5'>
                        This is a demo project. You can sign up with your email and password.
                        or with Google.
                    </p>
                </div>
                {/* right  */}
                <div className=" flex-1">
                    <form className=' flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label value='Your username' />
                            <TextInput
                                type='text'
                                placeholder='John Doe'
                                id='username'
                                onChange={handleChange} />
                        </div>
                        <div>
                            <Label value='Your email' />
                            <TextInput
                                type='email'
                                placeholder='email@company.com'
                                id='email'
                                onChange={handleChange} />
                        </div>
                        <div>
                            <Label value='Your password' />
                            <TextInput
                                type='password'
                                placeholder="don'tTellAnyone"
                                id='password'
                                onChange={handleChange} />
                        </div>

                        <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner size={'sm'} />
                                    <span className=' pl-3'>Loading...</span>
                                </>
                            ) : 'Sign Up'}
                        </Button>
                        <Oauth />
                    </form>

                    {/* have an account  */}
                    <div className=" flex gap-2 text-sm mt-5">
                        <span>Have an account?</span>
                        <Link to='/signin' className=' text-blue-500'>
                            Sign In
                        </Link>
                    </div>

                    {/* error alert  */}
                    {
                        errMsg && (
                            <Alert className=' mt-5' color='failure'>
                                {errMsg}
                            </Alert>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default SignUp