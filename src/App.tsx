import { CourseSheetView } from './components/CourseSheetView'

function App() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Fiche de Cours MMA</h1>
        <p className="text-muted-foreground">Enregistrez votre cours</p>
      </header>
      <main>
        <CourseSheetView />
      </main>
    </div>
  )
}

export default App
