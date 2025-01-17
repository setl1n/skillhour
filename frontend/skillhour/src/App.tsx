import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-display text-primary mb-6">
          Tailwind Theme Test
        </h1>
        
        <div className="bg-surface p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl text-secondary mb-4">Color & Animation Test</h2>
          
          <div className="space-y-4">
            <div className="animate-soft-bounce bg-accent text-white p-4 rounded">
              Bouncing Element
            </div>
            
            <div className="bg-highlight p-4 rounded">
              Highlight Color
            </div>
            
            <div className="text-muted">
              Muted Text Color
            </div>
          </div>
        </div>

        <div className="card bg-white p-6 rounded-lg shadow-md">
          <button 
            onClick={() => setCount(count => count + 1)}
            className="bg-primary text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
          >
            Count is: {count}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
