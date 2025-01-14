import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import FormInputWrapper from '@/components/FormInputWrapper'
import { SignInFormError, SignInFormValues } from '../auth.types'
import { useAppDispatch, useAppSelector, useFormikErrors } from '@/hooks'
import { validateSignInForm } from '../authUtil'
import { signIn } from '../authSlice'

export default function SignInPage() {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.auth.signIn.isLoading)
  const formik = useFormik<SignInFormValues>({
    initialValues: {
      email: '',
      password: '',
      isPasswordVisible: false,
    },
    validate: validateSignInForm,
    onSubmit: (values) => {
      dispatch(signIn(values))
    },
  })
  const errors = useFormikErrors<SignInFormValues, SignInFormError>(formik)

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={formik.handleSubmit}>
        <h2 className="text-center mt-10 max-md:text-2xl">Welcome Back</h2>
        <p className="text-center text-gray-600 text-sm">
          Please login to your account
        </p>
        <FormInputWrapper className="mt-10" error={errors.email}>
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
          Sign In
        </button>
      </form>
      <p className="mt-6 text-center text-sm">
        Don't have an account? <Link to="/auth/sign-up">Sign Up</Link>
      </p>
    </div>
  )
}
