import { Routes, Route } from "react-router-dom"
import { PostList } from "./components/PostLists"
import Homepage from "./components/Homepage"
import ClanPraisePage from "./components/ClanPraisePage"
import TribePage from "./components/TribePage"
import { BrowserRouter } from "react-router-dom"



function App() {
  
  return (
    <BrowserRouter>
    <div className="container">
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/:tribe" element={<TribePage/>} />
        <Route path="/:tribe/:posts" element={<PostList/>} />
        <Route path="/:tribe/:posts/:id" element={<ClanPraisePage/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
