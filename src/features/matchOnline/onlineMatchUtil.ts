import { CreateRoomFormError, CreateRoomFormValues } from '@/shared.types'

export const validateCreateOnlineMatchForm = (values: CreateRoomFormValues) => {
  const errors: CreateRoomFormError = {}

  if (!values.maxPlayersCount) {
    errors.maxPlayersCount = 'Select no. of players'
  }
  // console.log('validate', errors.maxPlayersCount)
  return errors
}
