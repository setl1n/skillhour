import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';
import SkillsHub from './pages/skillshub/SkillsHub';
import Profile from './pages/profile/Profile';
import Lesson from './pages/lesson/Lesson';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <div className="flex flex-col min-h-screen bg-background text-text">
            <Header />
            <main className="flex-grow pt-16">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route
                    path="/*"
                    element={
                        <Routes>
                          <Route path="/" element={<SkillsHub />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/lesson/:id" element={<Lesson />} />
                        </Routes>
                    }
                  />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </Router>
      </div>
    </Provider>
  )
}

export default App
