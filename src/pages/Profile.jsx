import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const initialValues = {
    currentPassword: '',
    newPassword: '',
    reconfirmPassword: '',
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required('Current Password is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New Password is required'),
    reconfirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Please confirm your new password'),
  });

  const handlePasswordChange = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    try {
      // Mock axios call
      await axios.post('/mock-change-password', {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      setPasswordDialogOpen(true);
      resetForm();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleDeletePhoto = () => {
    setProfileImage(null);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    setLogoutDialogOpen(false);
    navigate('/login');
  };

  const cancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  const handleBack = () => {
    navigate('/vendor');
  };

  return (
    <div className="bg-[#f9f5ed] min-h-screen">
      {/* Topbar */}
      <div className="bg-[#D65A31] text-white flex items-center justify-between px-6 py-4 shadow-md">
        <div className="text-lg font-semibold">Brahman Connect</div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v2c0 .728-.195 1.447-.571 2.07L2.293 14.293A1 1 0 003 16h14a1 1 0 00.707-1.707l-1.136-1.137A4.978 4.978 0 0116 10V8a6 6 0 00-6-6zM8 18a2 2 0 004 0H8z" />
            </svg>
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full ring-2 ring-white" />
          </div>
          <div className="flex items-center gap-2">
            <img
              src={profileImage || 'src/assets/Image.png'}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-right">
              <div className="font-medium text-sm">Kusha Reddy</div>
              <div className="text-xs">Agent</div>
            </div>
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-8 py-6 max-w-5xl mx-auto mt-6 bg-white rounded-lg">
        <div
          className="flex items-center text-gray-700 mb-4 cursor-pointer hover:text-gray-900"
          onClick={handleBack}
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-[16px] font-semibold">Back</span>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>

        {/* Profile image */}
        <div className="flex flex-col sm:flex-row items-start sm:space-x-6 space-y-4 sm:space-y-0 mb-8">
          <img
            src={profileImage || 'src/assets/Profile.png'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-orange-500"
          />
          <div className="flex flex-col space-y-2">
            <label>
              <Button
                variant="contained"
                component="span"
                className="!bg-[#de6436] hover:!bg-orange-700 normal-case !text-[14px]"
              >
                Upload Photo
              </Button>
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadPhoto}
                className="hidden"
              />
            </label>
            <Button
              onClick={handleDeletePhoto}
              variant="outlined"
              className="!border-[#de6436] !text-[#de6436] hover:!bg-orange-100 normal-case !text-[14px]"
            >
              Delete Photo
            </Button>
          </div>
        </div>


        {/* Basic details (read-only) */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-4">Basic Details</h3>
          <div className="flex flex-col space-y-4 w-full mb-6">
            {/* Name fields */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col w-full sm:w-auto">
                <label className="text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  className="bg-gray-100 border rounded px-3 py-1.5 text-ml w-full sm:max-w-[240px]"
                  value="John"
                  readOnly
                />
              </div>
              <div className="flex flex-col w-full sm:w-auto">
                <label className="text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  className="bg-gray-100 border rounded px-3 py-1.5 text-ml w-full sm:max-w-[240px]"
                  value="Gridson"
                  readOnly
                />
              </div>
            </div>

            {/* Phone number fields */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col w-full sm:w-auto">
                <label className="text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="flex sm:max-w-[210px] w-full">
                  <select
                    className="bg-gray-100 border rounded-l px-2 py-1.5 text-ml w-20"
                    disabled
                  >
                    <option>+91</option>
                  </select>
                  <input
                    type="text"
                    className="bg-gray-100 border border-l-0 rounded-r px-3 py-1.5 text-sm w-full"
                    value="9012345678"
                    readOnly
                  />
                </div>
              </div>
              <div className="flex flex-col w-full sm:w-auto">
                <label className="text-sm font-medium text-gray-700 mb-1">Alternate Phone Number</label>
                <div className="flex sm:max-w-[210px] w-full">
                  <select
                    className="bg-gray-100 border rounded-l px-2 py-1.5 text-ml w-20"
                    disabled
                  >
                    <option>+91</option>
                  </select>
                  <input
                    type="text"
                    className="bg-gray-100 border border-l-0 rounded-r px-3 py-1.5 text-sm w-full"
                    value="7004556789"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>


        </div>

        {/* Password form */}
        <h3 className="text-[16px] font-semibold text-gray-800 mb-2">Password Changes</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handlePasswordChange}
        >
          {({ isSubmitting }) => (
            <Form className="mb-8">
              <div className="flex flex-col sm:flex-row sm:gap-4 gap-3 mb-4">
                {['currentPassword', 'newPassword', 'reconfirmPassword'].map((field, index) => (
                  <div className="flex flex-col w-full sm:w-[20%]" key={index}>
                    <label htmlFor={field} className="text-sm font-medium text-black mb-1">
                      {field === 'currentPassword'
                        ? 'Current Password'
                        : field === 'newPassword'
                          ? 'New Password'
                          : 'Re-confirm Password'}
                    </label>
                    <Field
                      as={TextField}
                      name={field}
                      type="password"
                      size="small"
                      fullWidth
                      helperText={<ErrorMessage name={field} component="div" className="text-red-600 text-xs" />}
                    />
                  </div>
                ))}
              </div>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                className="!bg-[#de6436] hover:!bg-orange-700 normal-case !text-[14px]"
              >
                {isSubmitting ? 'Changing...' : 'Change Password'}
              </Button>
            </Form>

          )}
        </Formik>

        {/* Logout button */}
        <div
          className="flex items-center text-red-600 hover:text-red-700 cursor-pointer text-[16px] font-semibold"
          onClick={handleLogoutClick}
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-2 0V4H5v12h10v-2a1 1 0 112 0v3a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm6 7a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Logout
        </div>
      </div>

      {/* Logout Dialog */}
     
      <Dialog
        open={logoutDialogOpen}
        onClose={cancelLogout}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
            minWidth: 340,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', color: '#d25b2d' }}>
          Logout Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={cancelLogout} variant="outlined" sx={{ borderColor: '#d25b2d', color: '#d25b2d' }}>
            Cancel
          </Button>
          <Button
            onClick={confirmLogout}
            variant="contained"
            sx={{ backgroundColor: '#d25b2d', '&:hover': { backgroundColor: '#b34d24' } }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Password Success Dialog */}
      <Dialog
        open={passwordDialogOpen}
        onClose={() => setPasswordDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
            minWidth: 340,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', color: '#d25b2d' }}>
          Password Changed
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>
            Your password has been successfully updated.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setPasswordDialogOpen(false)}
            autoFocus
            variant="contained"
            sx={{ backgroundColor: '#d25b2d', '&:hover': { backgroundColor: '#b34d24' } }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default Profile;
