import FormBuilder from './components/FormBuilder'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Form Builder</h1>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <FormBuilder />
      </main>
    </div>
  )
}

export default App
