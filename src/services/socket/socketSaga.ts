import { eventChannel, EventChannel } from 'redux-saga'
import { take, put, call, apply, delay, fork, cancel } from 'redux-saga/effects'
import { Socket } from 'socket.io-client'
import { createSocketConnection } from './socketService'
import { connectSocket, disconnectSocket } from './socketSlice'

// Constants
// const SOCKET_CONNECT = 'SOCKET_CONNECT'
// const SOCKET_DISCONNECT = 'SOCKET_DISCONNECT'
const INCOMING_PING = 'INCOMING_PING'
const SEND_PONG = 'SEND_PONG'

// Create an event channel for socket events
function createSocketChannel(socket: Socket): EventChannel<any> {
  return eventChannel((emit) => {
    // Message event
    const messageHandler = (message: any) => {
      emit({ type: 'MESSAGE', payload: message })
    }

    // Connection events
    const connectHandler = () => {
      console.log('CONNECT')

      emit({ type: 'CONNECT' })
    }

    const disconnectHandler = () => {
      console.log('DISCONNECT')
      emit({ type: 'DISCONNECT' })
    }

    // Error handling
    const errorHandler = (error: Error) => {
      emit({ type: 'ERROR', payload: error })
    }

    // Setup socket listeners
    socket.on('new_message', messageHandler)
    socket.on('connect', connectHandler)
    socket.on('disconnect', disconnectHandler)
    socket.on('error', errorHandler)

    // Cleanup function
    return () => {
      socket.off('new_message', messageHandler)
      socket.off('connect', connectHandler)
      socket.off('disconnect', disconnectHandler)
      socket.off('error', errorHandler)
    }
  })
}

// Saga to handle pong responses
function* handlePong(socket: Socket) {
  while (true) {
    yield delay(5000) // Delay between pongs
    yield apply(socket, socket.emit, ['ping'])
  }
}

// Main socket watching saga
export function* socketSaga(): Generator {
  while (true) {
    console.log('socketSaga')

    // Wait for connection request
    yield take(connectSocket.type)
    // yield take(disconnectSocket.type)

    try {
      // Establish socket connection
      const socket = yield call(createSocketConnection)

      // Create event channel
      const socketChannel = yield call(createSocketChannel, socket)

      // Fork pong handler
      const pongTask = yield fork(handlePong, socket)

      // Main socket event loop
      while (true) {
        const event = yield take(socketChannel)

        console.log({ event })

        switch (event.type) {
          case INCOMING_PING:
            yield put({
              type: SEND_PONG,
              payload: event.payload,
            })
            break
          case disconnectSocket.type:
            yield cancel(pongTask)
            return
          default:
            yield put(event)
        }
      }
    } catch (error) {
      console.error('socketSaga error: ', error)

      // Handle connection errors
      yield put({
        type: 'SOCKET_CONNECTION_ERROR',
        error,
      })
    }
  }
}
