import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Radio,
  FormControl,
  FormHelperText,
  Button,
  Typography,
} from "@mui/material";

const vendors = [
  { name: "Temple", img: "src/assets/Temple.png" },
  { name: "Pooja Store", img: "src/assets/Pooja Store.png" },
  { name: "Poojari", img: "src/assets/Poojari.png" },
];

const validationSchema = Yup.object().shape({
  vendor: Yup.string().required("Please select a vendor"),
});

const VendorPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (values.vendor === "Temple") {
      navigate("/temple-details");
    } else if (values.vendor === "Pooja Store") {
      navigate("/pooja-store");
    } else if (values.vendor === "Poojari") {
      navigate("/add-partner-form");
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md p-6 sm:p-10">
        <Typography variant="h5" className="text-[#1E1E1E] font-semibold mb-2">
          Add Vendor
        </Typography>
        <Typography className="text-gray-500 mb-8 text-base">
          Choose vendor type and complete the form to add them.
        </Typography>

        <Formik
          initialValues={{ vendor: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form>
              <FormControl
                error={touched.vendor && Boolean(errors.vendor)}
                className="w-full"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vendors.map((vendor) => (
                    <label
                      key={vendor.name}
                      htmlFor={vendor.name}
                      className={`cursor-pointer flex flex-col items-center text-center border-2 rounded-xl p-4 transition-all select-none w-full ${values.vendor === vendor.name
                          ? "border-[#D75A28] bg-orange-50"
                          : "border-transparent"
                        }`}
                    >
                      <img
                        src={vendor.img}
                        alt={vendor.name}
                        draggable={false}
                        className="w-full max-w-[260px] aspect-[4/3] object-contain mb-4 pointer-events-none select-none outline-none border-none"
                      />
                      <Radio
                        id={vendor.name}
                        name="vendor"
                        value={vendor.name}
                        checked={values.vendor === vendor.name}
                        onChange={handleChange}
                        sx={{
                          color: "#D75A28",
                          "&.Mui-checked": { color: "#D75A28" },
                        }}
                      />
                      <Typography className="text-black text-base md:text-lg mt-1">
                        {vendor.name}
                      </Typography>
                    </label>
                  ))}
                </div>


                {touched.vendor && errors.vendor && (
                  <FormHelperText className="ml-2 mt-2 text-sm text-red-600">
                    {errors.vendor}
                  </FormHelperText>
                )}
              </FormControl>

              <div className="mt-8">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!values.vendor}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: "8px",
                    backgroundColor: "#D75A28",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#b44c1e",
                    },
                  }}
                >
                  Next
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default VendorPage;
