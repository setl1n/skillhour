import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import SkillsHub from './pages/SkillsHub';


function App() {
  return (
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
                        </Routes>
                    }
                  />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </Router>
      </div>
  )
}

export default App
