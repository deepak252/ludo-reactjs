import { io, Socket } from 'socket.io-client'
import { SOCKET_BASE_URL } from '@/constants/environment'
import { getAccessToken } from '@/utils/storage'

// export const socket = io(SOCKET_BASE_URL, {
//   autoConnect: false,
//   extraHeaders: {
//     Authorization: `Bearer sdf${getAccessToken()}`, // Add the Authorization header
//   },
// })

export const createSocketConnection = (): Socket => {
  return io(SOCKET_BASE_URL, {
    extraHeaders: {
      Authorization: `Bearer ${getAccessToken()}`, // Add the Authorization header
    },
    // auth: { token },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  })
}

export default class SocketService {
  static socket: Socket | null = null

  static connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_BASE_URL, {
        extraHeaders: {
          Authorization: `Bearer ${getAccessToken()}`, // Add the Authorization header
        },
        autoConnect: false,
        // auth: {
        //   token: () => getAccessToken(),
        // },
        // reconnection: true,
        // reconnectionDelay: 1000,
        // reconnectionDelayMax: 5000,
        // reconnectionAttempts: 5,
      })

      this.socket.connect()

      this.socket.on('connect', () => {
        console.log('Connected')
      })

      this.socket.on('disconnect', () => {
        console.log('Disconnected')
      })

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error)
        this.disconnect()
        // if (error.message === 'invalid token') {
        //   this.disconnect()
        // }
      })
    }
    return this.socket
  }

  static disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  static refreshConnection() {
    this.disconnect()
    return this.connect()
  }

  static getSocket() {
    if (!this.socket) {
      return this.connect()
    }
    return this.socket
  }
}
