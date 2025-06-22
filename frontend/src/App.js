import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className = "pages">
        <h1>Gymnie</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/workouts" element={<WorkoutList />} />
          <Route path="/workouts/:id" element={<WorkoutDetail />} /> */}
        </Routes>
        </div>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
