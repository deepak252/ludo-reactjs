import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import FormInputWrapper from '@/components/FormInputWrapper'
import { Spinner } from '@/components/Loader'
import { SignUpFormError, SignUpFormValues } from '../auth.types'
import { useAppDispatch, useAppSelector, useFormikErrors } from '@/hooks'
import { validateSignUpForm } from '../authUtil'
import { checkUsername, signUp } from '../authSlice'
import _ from 'lodash'

export default function SignUpPage() {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.auth.signUp.isLoading)
  const usernameState = useAppSelector((state) => state.auth.username)
  const debouncedCheckUsername = useMemo(
    () =>
      _.debounce((username: string) => {
        dispatch(checkUsername({ username }))
      }, 400),
    [dispatch] // Only recreate the function if `dispatch` changes
  )

  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      username: '',
      email: '',
      password: '',
      isPasswordVisible: false,
    },
    validate: validateSignUpForm,
    onSubmit: (values) => {
      if (
        errors.username ||
        usernameState.isLoading ||
        !usernameState.isAvailable
      )
        return
      dispatch(signUp(values))
    },
  })
  const errors = useFormikErrors<SignUpFormValues, SignUpFormError>(formik)

  useEffect(() => {
    const username = formik.values.username
    if (username.trim()) {
      debouncedCheckUsername(formik.values.username)
    }
  }, [formik.values.username, debouncedCheckUsername])

  return (
    <div className="max-w-sm mx-auto text-white">
      <form onSubmit={formik.handleSubmit}>
        <h2 className="text-center mt-10 max-md:text-2xl">Create Account</h2>
        <p className="text-center text-gray-300 text-sm">
          Please enter the details
        </p>
        <FormInputWrapper
          className="mt-10"
          error={errors.username || usernameState.error}
          trailing={
            usernameState.isLoading ? (
              <Spinner className="size-6 mx-4" />
            ) : (
              <></>
            )
          }
        >
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formik.values.username}
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

        <button
          type="submit"
          className="btn-filled-green w-full mt-10"
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
