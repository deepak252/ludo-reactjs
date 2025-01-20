import { validateEmail } from '@/utils/validators'
import {
  SignInFormError,
  SignInFormValues,
  SignUpFormError,
  SignUpFormValues,
} from './auth.types'

export const validateSignInForm = (values: SignInFormValues) => {
  const errors: SignInFormError = {}
  if (!values.usernameOrEmail.trim()) {
    errors.usernameOrEmail = 'Enter username or email'
  }
  if (!values.password.trim()) {
    errors.password = "Password can't be empty"
  }
  return errors
}

export const validateSignUpForm = (values: SignUpFormValues) => {
  const errors: SignUpFormError = {}
  const emailErr = validateEmail(values.email)
  if (emailErr) {
    errors.email = emailErr
  }
  if (!values.username.trim()) {
    errors.username = "Username can't be empty"
  }
  if (!values.password.trim()) {
    errors.password = "Password can't be empty"
  }

  return errors
}
