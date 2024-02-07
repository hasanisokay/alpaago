import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../providers/AuthProvider';
import toast from 'react-hot-toast';

const SignUp = () => {
    const location = useLocation()
    const { register, setProfile, withGoogle, user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [email, setEmail] = useState("")

    const handleEmail = e => {

        const input = e.target.value;
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
            setEmailError("Please enter a valid email")
        }
        else {
            setEmailError("")
        }
        if (input === "") {
            setEmailError("")
        }
        setEmail(input)
    }

    const handlePassword = e => {
        const input = e.target.value;
        if (input.length < 6) {
            setPasswordError("Password must be at least 6 character long")
        }
        else if (input.length > 5) {
            setPasswordError("")
        }
        if (input === "") {
            setPasswordError("")
        }
        setPassword(input)
    }

    const handleRegister = e => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        const name = form.name.value
        const photourl = form.photourl.value

        register(email, password)
            .then(result => {
                const user = result.user;
                setProfile(name, photourl)
                    .then()
                    .catch()
                navigate(location?.state?.pathname || "/")
            })
            .catch(error => {
                const message = error.message.slice(10)
                console.log(error, error.message);
                toast.error(message)
            })
    }


    const handleGoogleSignUp = () => {
        withGoogle()
            .then(result => navigate(location?.state?.pathname || "/")
            )
            .catch(error => {
                const message = error.message.slice(10)
                toast.error(message)
            })
    }
    useEffect(()=>{
        if(user){
            navigate(location?.state?.pathname || "/")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user])
    
    return (
        <>
            <Helmet>
                <title>Signup - Alpaago</title>
            </Helmet>

            <div className="box-shadow p-4 mx-auto h-[650px] min-w-[300px] w-[400px] max-w-[90%] ">
                <h1 className='text-4xl font-semibold text-center my-4'>Sign Up</h1>
                <h1 className='text-lg font-medium text-center'>Join alpaago</h1>
                <form onSubmit={handleRegister}>
                    <label htmlFor="name" className="block mt-4 mb-2 ">
                        Name
                    </label>
                    <input type="text" placeholder="name" className='form-input' required name='name' />

                    <label htmlFor="email" className="block mt-4 mb-2 ">
                        Email
                    </label>
                    <input type="email" placeholder="email" className='form-input' required name='email'
                        value={email} onChange={handleEmail} />
                    <p className='error-text'>{emailError}</p>

                    <label htmlFor="password" className="block mt-4 mb-2 ">
                        Password
                    </label>
                    <input type="password" placeholder="password" className='form-input' required name='password'
                        value={password} onChange={handlePassword}
                    />
                    <p className='error-text'>{passwordError}</p>

                    <label htmlFor="photourl" className="block mt-4 mb-2 ">
                        Photo URL
                    </label>
                    <input type="url" placeholder="photo url" value={"https://picsum.photos/200"} className='form-input' required name='photourl' />

                    <button className="btn-green btn mt-4" type='submit'>Signup</button>
                    <div className='mt-4'>
                        <p>Already have an account? Please <Link to="/login" className='text-blue-800'>login</Link> </p>
                    </div>
                </form>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-sm mt-2'>Or, continue with</p>
                    <button className="text-red-600 rounded-full" title='Google' onClick={handleGoogleSignUp} >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>
                    </button>

                </div>
            </div>
        </>
    );
};

export default SignUp;