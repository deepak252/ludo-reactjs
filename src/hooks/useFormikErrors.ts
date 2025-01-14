import { FormikProps } from 'formik'
import { useMemo } from 'react'

export default function useFormikErrors<
  TValue extends Record<string, unknown>,
  TError extends Record<string, unknown>,
>(formik: FormikProps<TValue>) {
  return useMemo(() => {
    const e: Partial<TError> = {}
    for (const field in formik.errors) {
      const valueField = field as keyof TValue
      const errField = field as keyof TError
      if (formik.touched[valueField] && formik.errors[valueField]) {
        e[errField] = formik.errors[valueField] as TError[keyof TError]
      }
    }
    return e
  }, [formik.touched, formik.errors])
}
