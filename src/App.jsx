import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PageOne from './componans/PageOne'
import PageTwo from './componans/PageTwo'
import PageThree from './componans/PageThree'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PageOne />} />
          <Route path="/page-two" element={<PageTwo />} />
          <Route path="/page-three" element={<PageThree />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
