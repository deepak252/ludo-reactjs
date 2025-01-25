import { eventChannel, EventChannel } from 'redux-saga'
import { take, put, call, fork, takeLatest, all } from 'redux-saga/effects'
import { Socket } from 'socket.io-client'
import {
  connectSocket,
  connectSocketFailure,
  connectSocketSuccess,
  sendPing,
  sendPingSuccess,
  setSocketError,
} from './socketSlice'
import SocketService from './socketService'
import { PayloadAction } from '@reduxjs/toolkit'

function createSocketChannel(socket: Socket): EventChannel<any> {
  return eventChannel((emit) => {
    console.log('createSocketChannel: eventChannel')
    // Event listeners for the socket

    const connectHandler = () => {
      console.log('SOCKET_CONNECTED')
      emit(connectSocketSuccess())
    }
    const messageHandler = (data: any) => {
      emit({ type: 'MESSAGE_RECEIVED', payload: data })
    }

    const errorHandler = (error: any) => {
      console.error('SOCKET_ERROR', error)
      emit(setSocketError(error))
    }

    const connectErrorHandler = (error: any) => {
      console.error('SOCKET_CONNECT_ERROR', error)
      emit(connectSocketFailure())
    }

    const disconnectHandler = () => {
      console.log('SOCKET_DISCONNECTED')
      emit({ type: 'SOCKET_DISCONNECTED' })
    }

    const pongHandler = (data: any) => {
      console.log('pong: ', data)
      emit(sendPingSuccess())
    }

    // Attach event listeners
    socket.on('connect', connectHandler)
    socket.on('message', messageHandler) // Custom event
    socket.on('error', errorHandler) // Error event
    socket.on('connect_error', connectErrorHandler)
    socket.on('disconnect', disconnectHandler)
    socket.on('pong', pongHandler)

    // Return a function to clean up listeners
    return () => {
      console.log('socketSaga: cleanUp')

      socket.off('connect', connectHandler)
      socket.off('message', messageHandler)
      socket.off('error', errorHandler)
      socket.off('connect_error', connectErrorHandler)
      socket.off('disconnect', disconnectHandler)
      socket.off('pong', disconnectHandler)
    }
  })
}

// Worker saga to handle incoming socket events
function* handleSocketEvents(socket: Socket): Generator {
  const socketChannel: EventChannel<any> = yield call(
    createSocketChannel,
    socket
  )

  try {
    while (true) {
      const action = yield take(socketChannel) // Take actions emitted by the channel
      yield put(action) // Dispatch action to Redux
    }
  } catch (error) {
    console.error('Socket error:', error)
  } finally {
    console.log('socketChannel closed')
    socketChannel.close() // Cleanup the channel
  }
}

function* pingWorker(socket: Socket): Generator {
  try {
    while (true) {
      yield take(sendPing.type)
      socket.emit('ping', (data: any) => {
        console.log('response', { data })
      })
    }
  } catch (error) {
    console.error('pingWorker error:', error)
  }
}

function* connectSocketWorker(
  action: PayloadAction<{ reconnect?: boolean }>
): Generator {
  if (action.payload.reconnect) {
    SocketService.disconnect()
  }
  const socket = yield call(SocketService.getSocket)
  socket.connect()
  yield fork(handleSocketEvents, socket)
  yield fork(pingWorker, socket)
}

export default function* () {
  yield all([takeLatest(connectSocket.type, connectSocketWorker)])
}

// function* disconnectSocketWorker(socket: Socket): Generator {
//   try {
//     while (true) {
//       yield take(disconnectSocket.type)
//       socket.disconnect()
//     }
//   } catch (error) {
//     console.error('pingWorker error:', error)
//   }
// }

// // Main saga to initialize Socket.IO
// export function* socketSaga(): Generator {
//   console.log('socketSaga')

//   // const socket: Socket = io('http://localhost:3000') // Replace with your server URL

//   // Handle connection events
//   // socket.on('connect', () => {
//   //   console.log('Socket connected:', socket.id)
//   // })

//   // socket.on('connect_error', (error) => {
//   //   console.error('Connection error:', error)
//   // })

//   // yield fork(handleSocketEvents, socket) // Fork a saga to handle events

//   const socket = yield call(createSocketConnection)
//   yield fork(handleSocketEvents, socket)
// }

// // Constants
// // const SOCKET_CONNECT = 'SOCKET_CONNECT'
// // const SOCKET_DISCONNECT = 'SOCKET_DISCONNECT'
// const INCOMING_PING = 'INCOMING_PING'
// const SEND_PONG = 'SEND_PONG'

// // Create an event channel for socket events
// function createSocketChannel(socket: Socket): EventChannel<any> {
//   return eventChannel((emit) => {
//     // Message event
//     const messageHandler = (message: any) => {
//       emit({ type: 'MESSAGE', payload: message })
//     }

//     // Connection events
//     const connectHandler = () => {
//       console.log('CONNECT')

//       emit({ type: 'CONNECT' })
//     }

//     const disconnectHandler = () => {
//       console.log('DISCONNECT')
//       emit({ type: 'DISCONNECT' })
//     }

//     // Error handling
//     const errorHandler = (error: Error) => {
//       emit({ type: 'ERROR', payload: error })
//     }

//     // Setup socket listeners
//     socket.on('new_message', messageHandler)
//     socket.on('connect', connectHandler)
//     socket.on('disconnect', disconnectHandler)
//     socket.on('error', errorHandler)

//     // Cleanup function
//     return () => {
//       socket.off('new_message', messageHandler)
//       socket.off('connect', connectHandler)
//       socket.off('disconnect', disconnectHandler)
//       socket.off('error', errorHandler)
//     }
//   })
// }

// // Saga to handle pong responses
// function* handlePong(socket: Socket) {
//   while (true) {
//     yield delay(5000) // Delay between pongs
//     yield apply(socket, socket.emit, ['ping'])
//   }
// }

// // Main socket watching saga
// export function* socketSaga(): Generator {
//   while (true) {
//     console.log('socketSaga')

//     // Wait for connection request
//     yield take(connectSocket.type)
//     // yield take(disconnectSocket.type)

//     try {
//       // Establish socket connection
//       const socket = yield call(createSocketConnection)

//       // Create event channel
//       const socketChannel = yield call(createSocketChannel, socket)

//       // Fork pong handler
//       const pongTask = yield fork(handlePong, socket)

//       // Main socket event loop
//       while (true) {
//         const event = yield take(socketChannel)

//         console.log({ event })

//         switch (event.type) {
//           case INCOMING_PING:
//             yield put({
//               type: SEND_PONG,
//               payload: event.payload,
//             })
//             break
//           case disconnectSocket.type:
//             yield cancel(pongTask)
//             return
//           default:
//             yield put(event)
//         }
//       }
//     } catch (error) {
//       console.error('socketSaga error: ', error)

//       // Handle connection errors
//       yield put({
//         type: 'SOCKET_CONNECTION_ERROR',
//         error,
//       })
//     }
//   }
// }
