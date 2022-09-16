import { Routes, Route } from 'react-router-dom'
import './index.css'
import Main from './pages/Main'
import AddEvent from './pages/AddEvent'
import ViewEvents from './pages/ViewEvents'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/view-events/:email" element={<ViewEvents />} />
      </Routes>
    </div>
  );
}

export default App;
