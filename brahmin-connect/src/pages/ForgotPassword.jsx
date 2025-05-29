import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import backgroundImage from '/src/assets/login-bg.jpg';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Password reset link has been "sent" (demo)');
    navigate('/reset-password');
  };

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Main content container */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center lg:items-start justify-between px-4 sm:px-10 lg:px-32 py-10 lg:py-24 gap-12 lg:gap-20">
        {/* Left text section */}
        <div className="text-white max-w-md text-center lg:text-left mt-0 lg:-mt-4 lg:ml-28">
          <div className="bg-white bg-opacity-25 h-10 w-60 mx-auto lg:mx-0 mb-4 rounded-sm" />
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            Reset your<br />password
          </h1>
          <p className="mt-2 text-md">
            Enter your email to receive a <br className="hidden sm:inline" />
            password reset link
          </p>
        </div>


        {/* Form section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-xs space-y-6 text-gray-800 mt-12 lg:mt-20"        >
          <div>
            <label className="block mb-2 font-medium">Email ID</label>
            <TextField
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@gmail.com"
            />
          </div>

          <div className="pb-20">
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              style={{
                backgroundColor: '#E15C2B',
                borderRadius: 8,
                paddingTop: 10,
                paddingBottom: 10,
                fontWeight: 'bold',
              }}
            >
              Submit
            </Button>
          </div>
        </form>


      </div>

      {/* Footer */}
      <div className="absolute bottom-6 w-full text-center text-white text-xs z-10">
        © 2025 - All Rights Reserved
      </div>
    </div>
  );
}
