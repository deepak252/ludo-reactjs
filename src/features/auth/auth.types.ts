export type SignUpFormValues = {
  name: string
  email: string
  password: string
  isPasswordVisible?: boolean
}

export type SignUpFormError = {
  name?: string
  email?: string
  password?: string
}

export type SignInFormValues = {
  email: string
  password: string
  isPasswordVisible?: boolean
}

export type SignInFormError = {
  email?: string
  password?: string
}
