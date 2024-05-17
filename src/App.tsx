import { Route, Routes } from "react-router-dom"
import EditUser from "./components/EditUser"
import ShowUser from "./components/ShowUser"
import CreateUser from "./components/CreateUser"


function App() {

  return (
      <div className="container">
        <div className="">
          <Routes>
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/user/:id" element={<ShowUser />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/" element={<ShowUser />} />
          </Routes>
          
        </div>
      </div>
  )
}

export default App
