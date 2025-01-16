export type SignUpFormValues = {
  username: string
  email: string
  password: string
  isPasswordVisible?: boolean
}

export type SignUpFormError = {
  username?: string
  email?: string
  password?: string
}

export type SignInFormValues = {
  usernameOrEmail: string
  password: string
  isPasswordVisible?: boolean
}

export type SignInFormError = {
  usernameOrEmail?: string
  password?: string
}
