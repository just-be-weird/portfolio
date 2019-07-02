import React from 'react'
import Container from './components/Container'

//Redux
import { Provider } from 'react-redux'
import store from './store'
import  './components/Firebase/Firebase'


const App = () => {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  )
}

export default App;
