import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { AutocompleteTextarea } from './AutocompleteTextarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CalendarIcon, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { saveCourseSheet, generateId, type CourseSheet, type MediaAttachment } from '../lib/storage'
import { getTemplateNames, getTemplateLabel, getTemplate } from '../lib/templates'
import { MediaUpload } from './MediaUpload'

type CourseSheetDialogProps = {
  open: boolean
  onClose: () => void
  initialData?: CourseSheet | null
}

export function CourseSheetDialog({
  open,
  onClose,
  initialData,
}: CourseSheetDialogProps) {
  const [date, setDate] = useState<Date | undefined>(
    initialData?.date ? new Date(initialData.date) : undefined
  )
  const [discipline, setDiscipline] = useState(initialData?.discipline || 'none')
  const [warmUp, setWarmUp] = useState(initialData?.warmUp || '')
  const [techniques, setTechniques] = useState(initialData?.techniques || '')
  const [sparring, setSparring] = useState(initialData?.sparring || '')
  const [drills, setDrills] = useState(initialData?.drills || '')
  const [stretching, setStretching] = useState(initialData?.stretching || '')
  const [notes, setNotes] = useState(initialData?.notes || '')
  const [media, setMedia] = useState<MediaAttachment[]>(initialData?.media || [])

  function loadTemplate(templateKey: string) {
    const template = getTemplate(templateKey)
    if (!template) return

    if (template.discipline) setDiscipline(template.discipline)
    if (template.warmUp) setWarmUp(template.warmUp)
    if (template.techniques) setTechniques(template.techniques)
    if (template.sparring) setSparring(template.sparring)
    if (template.drills) setDrills(template.drills)
    if (template.stretching) setStretching(template.stretching)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const sheet: CourseSheet = {
      id: initialData?.id || generateId(),
      date: date || null,
      discipline: (discipline && discipline !== 'none') ? discipline : null,
      warmUp: warmUp || null,
      techniques: techniques || null,
      sparring: sparring || null,
      drills: drills || null,
      stretching: stretching || null,
      notes: notes || null,
      media: media.length > 0 ? media : undefined,
    }

    saveCourseSheet(sheet)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Fiche de cours</DialogTitle>
          <DialogDescription>
            Remplissez les détails de votre cours
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Date du cours</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP', { locale: fr }) : <span>Sélectionner une date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Charger un template</Label>
            <Select onValueChange={loadTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un template (optionnel)" />
              </SelectTrigger>
              <SelectContent>
                {getTemplateNames().map(key => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      {getTemplateLabel(key)}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Discipline</Label>
            <Select value={discipline} onValueChange={setDiscipline}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une discipline (optionnel)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Aucune</SelectItem>
                <SelectItem value="Striking">Striking</SelectItem>
                <SelectItem value="Lutte">Lutte</SelectItem>
                <SelectItem value="Sol">Sol</SelectItem>
                <SelectItem value="MMA">MMA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="warmup" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="warmup">Échauffement</TabsTrigger>
              <TabsTrigger value="drills">Drills</TabsTrigger>
              <TabsTrigger value="techniques">Techniques</TabsTrigger>
              <TabsTrigger value="sparring">Sparring</TabsTrigger>
              <TabsTrigger value="stretching">Étirement</TabsTrigger>
            </TabsList>

            <TabsContent value="warmup" className="space-y-2">
              <Label>Échauffement</Label>
              <Textarea
                placeholder="Décrivez l'échauffement..."
                value={warmUp}
                onChange={(e) => setWarmUp(e.target.value)}
                rows={6}
              />
            </TabsContent>

            <TabsContent value="drills" className="space-y-2">
              <Label>Drills / Exercices</Label>
              <Textarea
                placeholder="Décrivez les drills effectués..."
                value={drills}
                onChange={(e) => setDrills(e.target.value)}
                rows={6}
              />
            </TabsContent>

            <TabsContent value="techniques" className="space-y-2">
              <Label>Techniques travaillées</Label>
              <AutocompleteTextarea
                placeholder="Décrivez les techniques travaillées durant le cours..."
                value={techniques}
                onChange={setTechniques}
                rows={6}
              />
            </TabsContent>

            <TabsContent value="sparring" className="space-y-2">
              <Label>Sparring</Label>
              <Textarea
                placeholder="Décrivez les sessions de sparring..."
                value={sparring}
                onChange={(e) => setSparring(e.target.value)}
                rows={6}
              />
            </TabsContent>

            <TabsContent value="stretching" className="space-y-2">
              <Label>Étirement</Label>
              <Textarea
                placeholder="Décrivez les étirements effectués..."
                value={stretching}
                onChange={(e) => setStretching(e.target.value)}
                rows={6}
              />
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <Label>Notes personnelles</Label>
            <Textarea
              placeholder="Ajoutez vos observations, points à travailler, etc..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          <MediaUpload media={media} onChange={setMedia} />

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              {initialData?.id ? 'Mettre à jour' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
