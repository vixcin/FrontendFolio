import './App.css';
import Project from './components/Project';
// Add the home import in App.js
import { UserProvider } from './components/UserContext';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <div className='container p-3'>
        <UserProvider>
          <Navbar />

        </UserProvider>
      </div>
    </div>
  );
}

export default App;

