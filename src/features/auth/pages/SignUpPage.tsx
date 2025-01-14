import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import FormInputWrapper from '@/components/FormInputWrapper'
import { SignUpFormError, SignUpFormValues } from '../auth.types'
import { useAppDispatch, useAppSelector, useFormikErrors } from '@/hooks'
import { validateSignUpForm } from '../authUtil'
import { signUp } from '../authSlice'

export default function SignUpPage() {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.auth.signUp.isLoading)
  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      isPasswordVisible: false,
    },
    validate: validateSignUpForm,
    onSubmit: (values) => {
      dispatch(signUp(values))
    },
  })
  const errors = useFormikErrors<SignUpFormValues, SignUpFormError>(formik)

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={formik.handleSubmit}>
        <h2 className="text-center mt-10 max-md:text-2xl">Create Account</h2>
        <p className="text-center text-gray-600 text-sm">
          Please enter the details
        </p>
        <FormInputWrapper className="mt-10" error={errors.name}>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormInputWrapper>
        <FormInputWrapper className="mt-5" error={errors.email}>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormInputWrapper>
        <FormInputWrapper className="mt-5" error={errors.password}>
          <input
            type={formik.values.isPasswordVisible ? 'text' : 'password'}
            name="password"
            placeholder="Enter password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FormInputWrapper>

        <div className="text-end text-sm mt-3">
          <Link to="/auth/forgot-password">Forgot Password?</Link>
        </div>
        <button
          type="submit"
          className="btn-filled w-full mt-10"
          disabled={isLoading}
        >
          Sign Up
        </button>
      </form>
      <p className="mt-6 text-center text-sm">
        Already have an accoount? <Link to="/auth/sign-in">Sign In</Link>
      </p>
    </div>
  )
}
