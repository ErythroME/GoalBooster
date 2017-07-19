import 'react-native'
import React from 'react'
import App from '../app/App.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'
import { mock, release } from 'mock-async-storage'
import { AsyncStorage as storage } from 'react-native'

mock()

it('renders correctly', () => {
  const tree = renderer.create(<App />)
})

it('Mock Async Storage working', async () => {
  await storage.setItem('myKey', 'myValue')
  const value = await storage.getItem('myKey')
  expect(value).toBe('myValue')
})
