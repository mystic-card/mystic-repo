import { Outlet } from "react-router-dom"
import store from "./store/index"
import { Provider } from 'react-redux'

function App() {
  return (
    <>
      <Provider store={store}>
        <Outlet />
      </Provider>
    </>
  )
}

export default App
