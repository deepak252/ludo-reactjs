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
