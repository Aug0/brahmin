import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      if (values.email === 'test@example.com' && values.password === '123456') {
        alert('Login successful!');
        navigate('/vendor');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      alert(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="h-screen w-full relative flex items-center justify-center px-4 overflow-hidden"
      style={{
        backgroundImage: "url('/src/assets/login-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />

      {/* Content Container */}
      <div className="relative z-20 flex flex-col lg:flex-row items-center lg:items-start justify-between w-full max-w-6xl gap-6 sm:gap-10 mt-2 lg:mt-[-30px]">
        {/* Left Section */}
        <div className="text-white w-full max-w-sm text-center lg:text-left mt-10 sm:mt-16 lg:mt-0 px-4 sm:ml-8 md:ml-26">
          <div className="bg-white bg-opacity-45 h-8 sm:h-10 w-48 sm:w-72 mx-auto lg:mx-0 mb-3 rounded-sm" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mb-2">
            Login to<br />your account
          </h1>
          <p className="text-sm sm:text-base">Let's make things simpler</p>
        </div>

        {/* Form Section */}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="bg-white px-5 py-6 sm:px-6 sm:py-8 rounded-xl shadow-md w-full max-w-[90%] sm:max-w-sm mt-6 sm:mt-10 text-sm">
              {/* Email */}
              <div className="space-y-1">
                <label className="block text-gray-800 font-bold text-sm">Email</label>
                <Field
                  as={TextField}
                  name="email"
                  placeholder="John@gmail.com"
                  fullWidth
                  variant="outlined"
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      height: '50px',
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '15px',
                    },
                  }}
                />
              </div>

              {/* Password */}
              <div className="space-y-1 mt-4">
                <label className="block text-gray-800 font-bold text-sm">Password</label>
                <Field
                  as={TextField}
                  type="password"
                  name="password"
                  placeholder="Your password"
                  fullWidth
                  variant="outlined"
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      height: '50px',
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '15px',
                    },
                  }}
                />
              </div>

              {/* Forgot Password */}
              <div className="text-right text-xs mt-2 mb-4">
                <Link
                  to="/forgot-password"
                  className="text-blue-600 border-b-2 border-blue-300 pb-[1px] hover:opacity-80"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  backgroundColor: '#e5672a',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  textTransform: 'none',
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#d4551a',
                  },
                }}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Footer (Cross-browser support) */}
      <div className="absolute bottom-2 left-0 right-0 text-center text-white text-xs z-10">
        © 2025 - All Rights Reserved
      </div>
    </div>
  );
}
