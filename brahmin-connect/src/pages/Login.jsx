import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'test@example.com' && password === '123456') {
      alert('Login successful!');
      navigate('/reset-password');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div
      className="min-h-screen w-full relative flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/src/assets/login-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
      {/* Main content wrapper - responsive */}
      <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl gap-8">

        {/* Text Section */}
        <div className="text-white max-w-sm lg:ml-20 text-center lg:text-left mt-10 lg:mt-[-240px]">
          <div className="bg-white bg-opacity-25 h-10 w-60 mx-auto lg:mx-0 mb-4 rounded-sm"></div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            Login to<br />your account
          </h1>
          <p className="mt-2 text-md">Let's make things simpler</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-sm mt-10 lg:mt-[40px]"
        >
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 1 }}
          />
          <div className="text-right text-sm mb-4">
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
          {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#e5672a',
              fontSize: '16px',
              paddingY: '10px',
              '&:hover': { backgroundColor: '#d4551a' },
            }}
          >
            Login
          </Button>
        </form>

      </div>

      {/* Footer */}
      <div className="absolute bottom-12 w-full text-center text-white text-xs z-10">
        © 2025 - All Rights Reserved
      </div>
    </div>
  );
}
