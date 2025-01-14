import { REGEX } from '@/constants'

export const validateEmail = (value?: string) => {
  if (!value?.trim()) {
    return 'Email is required'
  }
  if (!REGEX.EMAIL.test(value)) {
    return 'Invalid email'
  }
}
