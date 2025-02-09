import { PlayerColor } from '@/shared.types'

export const REGEX = Object.freeze({
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  PHONE: /^\d{10,15}$/,
  PASSWORD: /^(?=.*[!@#$%&*])(?=.*[0-9]).{8,}$/,
  ZIPCODE: /^\d{1,6}$/,
  DIGIT: /^\d+$/,
  ALPHANUMERIC: /^[A-Za-z0-9]*$/,
  URL: /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,})(\/[^\s]*)?(\?[\w%.-]+=[\w%.-]+(&[\w%.-]+=[\w%.-]+)*)?$/,
})

export const PLAYER_TYPES: PlayerColor[] = ['green', 'blue', 'yellow', 'red']

// export enum BoardState {
//   throwDice,
//   throwing,
//   pickToken,
//   moving,
//   ended,
// }

export const DICE_VALUES = [6, 1, 2, 6, 3, 4, 5, 6]
