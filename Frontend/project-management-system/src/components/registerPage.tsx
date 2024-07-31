import * as Yup from "yup";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { toast } from 'react-toastify';
import axios from 'axios';

interface RegisterPageProps {
  isRegisterOpen: boolean;
  setIsRegisterOpen: (isOpen: boolean) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = (props) => {
  const { setIsRegisterOpen, isRegisterOpen } = props;

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Firstname is required *"),
    lastname: Yup.string().required("Lastname is required *"),
    email: Yup.string().email("Invalid email format *").required("Email is required *"),
    password: Yup.string()
      .required("Password is required *")
      .min(8, "Password must be at least 8 characters *")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character *"),
    phonenumber: Yup.string().required("Phone number is required *"),
    confirmpassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match *").required("Confirm Password is required *"),
    address: Yup.string().required("Address is required *")
  });

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        phonenumber: "",
        password: "",
        confirmpassword: "",
        address: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        console.log('====================================');
        console.log('rrrrrrrrr');
        console.log('====================================');
        const DATA = {
          email: values.email,
          password: values.password,
          firstname: values.firstname,
          lastname: values.lastname,    
          phonenumber: values.phonenumber,
          address: values.address
        };
        console.log('====================================');
        console.log('DATA', DATA);
        console.log('====================================');
        try {
            const response = await axios.post("http://localhost:5001/api/CreateUser", DATA, {
              headers: {
                "Content-Type": "application/json",
              },
            });
             console.log('response', response);
            localStorage.setItem("user_id", JSON.stringify(response?.data?.record?._id));
            toast.success("Registered successfully");
            setIsRegisterOpen(!isRegisterOpen);
  
          } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
              const errorData = error.response.data;
              console.log('response error', errorData);
              if (errorData.message) {
                toast.error(errorData.message);
              } else {
                toast.error("Something went wrong");
              }
            } else {
              console.log("Error Message", error);
            }
          }
        }}
    >
      {({ handleSubmit }) => (
        <div
          className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform transform ${isRegisterOpen ? 'translate-x-0' : 'translate-x-full'
            } bg-white w-1/3 dark:bg-gray-800`}
          tabIndex={-1}
          aria-labelledby="drawer-label"
        >
          <h2 className='text-center py-5'>
            <span className="text-2xl font-bold text-gray-50">Create your Account</span>
          </h2>
          <button
            type="button"
            onClick={() => setIsRegisterOpen(!isRegisterOpen)}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          <Form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 gap-4'>
              <div className='grid grid-cols-1 gap-4'>
                <label className='text-lg text-gray-50 capitalize'>First name</label>
                <Field type="text" name="firstname" placeholder="First name" className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <ErrorMessage name="firstname" component="div" className="text-red-500" />
              </div>
              <div className='grid grid-cols-1 gap-4'>
                <label className='text-lg text-gray-50 capitalize'>Last name</label>
                <Field type="text" name="lastname" placeholder="Last name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <ErrorMessage name="lastname" component="div" className="text-red-500" />
              </div>
              <div className='grid grid-cols-1 gap-4'>
                <label className='text-lg text-gray-50 capitalize'>Email</label>
                <Field type="email" name="email" placeholder="john.doe@company.com" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <div className='grid grid-cols-1 gap-4'>
                <label className='text-lg text-gray-50 capitalize'>Phone number</label>
                <Field type="tel" name="phonenumber" placeholder="123-45-678" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <ErrorMessage name="phonenumber" component="div" className="text-red-500" />
              </div>
              <div className='grid grid-cols-1 gap-4'>
                <label className='text-lg text-gray-50 capitalize'>Password</label>
                <Field type="password" name="password" placeholder="•••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>
              <div className='grid grid-cols-1 gap-4'>
                <label className='text-lg text-gray-50 capitalize'>Confirm Password</label>
                <Field type="password" name="confirmpassword" placeholder="•••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <ErrorMessage name="confirmpassword" component="div" className="text-red-500" />
              </div>
              <div className='grid grid-cols-1 gap-4'>
                <label className='text-lg text-gray-50 capitalize'>Address</label>
                <Field as="textarea" name="address" rows={4} placeholder="Write your address here..." className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <ErrorMessage name="address" component="div" className="text-red-500" />
              </div>
              <div className="grid grid-cols-1 gap-4 text-center">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Register
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default RegisterPage;