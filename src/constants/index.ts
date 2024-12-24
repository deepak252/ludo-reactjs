// export enum PlayerType {
//   green,
//   yellow,
//   blue,
//   red,
// }

import { PlayerType } from '@/shared.types'

export const PlayerTypes: PlayerType[] = ['green', 'yellow', 'blue', 'red']

export enum LudoStatus {
  throwDice,
  pickToken,
  moving,
  ended,
}

export const DICE_VALUES = [6, 6, 1, 2, 6, 3, 4, 5, 6]
