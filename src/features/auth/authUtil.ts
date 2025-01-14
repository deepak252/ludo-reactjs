import { validateEmail } from '@/utils/validators'
import {
  SignInFormError,
  SignInFormValues,
  SignUpFormError,
  SignUpFormValues,
} from './auth.types'

export const validateSignInForm = (values: SignInFormValues) => {
  const errors: SignInFormError = {}
  const emailErr = validateEmail(values.email)
  if (emailErr) {
    errors.email = emailErr
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
  if (!values.name.trim()) {
    errors.name = "Name can't be empty"
  }
  if (!values.password.trim()) {
    errors.password = "Password can't be empty"
  }

  return errors
}
