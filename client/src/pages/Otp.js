import { useRef, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { userVerification } from '../services/user.service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Otp() {
    const inputRefs = useRef([]);
    const[otp,setOtp]=useState(Array(6).fill(''))
    const navigate= useNavigate()
    const handleChange = (e, index) => {
        const value = e.target.value;
        
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value.length === 1) {
                // Move focus to the next input if value is entered
                if (index < inputRefs.current.length - 1) {
                    inputRefs.current[index + 1].focus();
                }
            } else if (value.length === 0) {
                // Move focus to the previous input if value is deleted
                if (index > 0) {
                    inputRefs.current[index - 1].focus();
                }
            }
        } else {
            // Clear non-numeric values
            e.target.value = '';
        }
    };
    const handleOnClick= async ()=>{
        console.log("Onclick");
        
        let email=localStorage.getItem('email')
        console.log(email);
        
        try{
       const verification= await userVerification({email,otp})

       if(verification.data){
        toast.success("Otp verified successfully")
        navigate('/login')
       }  else{
            toast.error(verification.data.error)
       }
    
    }
        catch(error){
            console.log(error);
            
        }
    }
    return (
        <div className="font-sans bg-gray-100 mb-20">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-24">
                <h2 className="text-center text-2xl font-semibold mb-6">User OTP Verification</h2>
                <p className="text-center text-gray-600 mb-6">Please enter the OTP sent to your registered Email.</p>
                <div className="flex justify-center mb-6">
                {Array(6).fill().map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        pattern="\d"
                        required
                        value={otp[index]} 
                        className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:border-green-500 mx-1"
                        ref={el => inputRefs.current[index] = el}
                        onChange={(e) => handleChange(e, index)}
                    />
                ))}
                </div>
                <div className="text-center mb-6">
                    <p className="text-sm text-gray-600">Didn't receive the OTP? <p href="#" className="text-green-500 font-semibold cursor-pointer">Resend OTP</p></p>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-lg" onClick={handleOnClick}>Verify</button>
                </div>
            </div>
        </div>
    );
}

export default Otp;