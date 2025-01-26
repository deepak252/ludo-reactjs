import { eventChannel, EventChannel } from 'redux-saga'
import { take, put, call, fork, takeLatest, all } from 'redux-saga/effects'
import { Socket } from 'socket.io-client'
import {
  connectSocket,
  connectSocketFailure,
  connectSocketSuccess,
  sendPing,
  sendPingSuccess,
  setSocketConnected,
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
      emit(setSocketConnected(false))
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
