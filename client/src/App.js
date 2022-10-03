import { Routes, Route } from 'react-router-dom'
import './index.css'
import Main from './pages/Main'
import AddEvent from './pages/AddEvent'
import ViewEvents from './pages/ViewEvents'
import UpdateEvent from './pages/UpdateEvent'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/view-events/:email" element={<ViewEvents />} />
        <Route path="/update-event/:userId/:eventId" element={<UpdateEvent />} />
      </Routes>
    </div>
  );
}

export default App;
