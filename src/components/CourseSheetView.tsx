import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Plus, Edit, Trash2, Printer } from 'lucide-react'
import { CourseSheetDialog } from './CourseSheetDialog'
import { loadCourseSheet, deleteCourseSheet, type CourseSheet } from '../lib/storage'

export function CourseSheetView() {
  const [courseSheet, setCourseSheet] = useState<CourseSheet | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const sheet = loadCourseSheet()
    setCourseSheet(sheet)
  }, [])

  function handlePrint() {
    const originalTitle = document.title
    const dateStr = courseSheet?.date
      ? new Date(courseSheet.date).toLocaleDateString('fr-FR').replace(/\//g, '-')
      : new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')

    document.title = `cours_${dateStr}`
    window.print()

    setTimeout(() => {
      document.title = originalTitle
    }, 100)
  }

  function openDialog() {
    setIsDialogOpen(true)
  }

  function closeDialog() {
    setIsDialogOpen(false)
    const sheet = loadCourseSheet()
    setCourseSheet(sheet)
  }

  function handleDelete() {
    if (!courseSheet?.id) return

    if (!confirm('Êtes-vous sûr de vouloir supprimer cette fiche ?')) {
      return
    }

    deleteCourseSheet()
    setCourseSheet(null)
  }

  function getDisciplineColor(discipline: string) {
    switch (discipline) {
      case 'Striking':
        return 'bg-red-500'
      case 'Lutte':
        return 'bg-blue-500'
      case 'Sol':
        return 'bg-green-500'
      case 'MMA':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  function formatDate(date: Date | string | null | undefined) {
    if (!date) return null
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long'
    }).format(new Date(date))
  }

  const hasContent = courseSheet?.discipline || courseSheet?.techniques || courseSheet?.warmUp ||
                     courseSheet?.drills || courseSheet?.sparring || courseSheet?.stretching ||
                     courseSheet?.notes || courseSheet?.date || (courseSheet?.media && courseSheet.media.length > 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Fiche de cours</span>
          <div className="flex gap-2">
            {hasContent && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handlePrint}
                  title="Imprimer en PDF"
                >
                  <Printer className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={openDialog}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </>
            )}
            {!hasContent && (
              <Button
                size="sm"
                variant="default"
                onClick={openDialog}
              >
                <Plus className="h-4 w-4 mr-2" />
                Créer la fiche
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasContent ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              {courseSheet.date && (
                <span className="text-lg font-semibold">
                  {formatDate(courseSheet.date)}
                </span>
              )}
              {courseSheet.discipline && (
                <Badge className={getDisciplineColor(courseSheet.discipline)}>
                  {courseSheet.discipline}
                </Badge>
              )}
            </div>

            {courseSheet.warmUp && (
              <div>
                <h4 className="text-sm font-semibold mb-1">Échauffement</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {courseSheet.warmUp}
                </p>
              </div>
            )}

            {courseSheet.drills && (
              <div>
                <h4 className="text-sm font-semibold mb-1">Drills</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {courseSheet.drills}
                </p>
              </div>
            )}

            {courseSheet.techniques && (
              <div>
                <h4 className="text-sm font-semibold mb-1">Techniques</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {courseSheet.techniques}
                </p>
              </div>
            )}

            {courseSheet.sparring && (
              <div>
                <h4 className="text-sm font-semibold mb-1">Sparring</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {courseSheet.sparring}
                </p>
              </div>
            )}

            {courseSheet.stretching && (
              <div>
                <h4 className="text-sm font-semibold mb-1">Étirement</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {courseSheet.stretching}
                </p>
              </div>
            )}

            {courseSheet.notes && (
              <div>
                <h4 className="text-sm font-semibold mb-1">Notes personnelles</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {courseSheet.notes}
                </p>
              </div>
            )}

            {courseSheet.media && courseSheet.media.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-1">Médias</h4>
                <div className="space-y-2 mt-2">
                  {courseSheet.media.map((item) => (
                    <div key={item.id}>
                      {item.type === 'image' ? (
                        <div className="border border-border rounded-lg overflow-hidden inline-block">
                          <img
                            src={item.dataUrl}
                            alt={item.name}
                            className="max-w-xs h-32 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => window.open(item.dataUrl, '_blank')}
                            title={item.name}
                          />
                        </div>
                      ) : item.type === 'youtube' ? (
                        <a
                          href={item.youtubeUrl?.replace('/embed/', '/watch?v=')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          🎥 {item.name || 'Vidéo YouTube'}
                        </a>
                      ) : (
                        <video
                          src={item.dataUrl}
                          className="max-w-xs h-32 object-cover rounded-lg border border-border"
                          controls
                          title={item.name}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Aucun cours enregistré</p>
        )}
      </CardContent>

      <CourseSheetDialog
        open={isDialogOpen}
        onClose={closeDialog}
        initialData={courseSheet}
      />
    </Card>
  )
}
