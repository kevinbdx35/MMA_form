import { useRef, useState } from 'react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { ImagePlus, Video, X, Download } from 'lucide-react'
import { type MediaAttachment } from '../lib/storage'
import { generateId } from '../lib/storage'

type MediaUploadProps = {
  media: MediaAttachment[]
  onChange: (media: MediaAttachment[]) => void
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime']

export function MediaUpload({ media, onChange }: MediaUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    setError(null)

    Array.from(files).forEach((file) => {
      // Validation de la taille
      if (file.size > MAX_FILE_SIZE) {
        setError(`Le fichier ${file.name} est trop volumineux (max 10 MB)`)
        return
      }

      // Validation du type
      const isImage = ACCEPTED_IMAGE_TYPES.includes(file.type)
      const isVideo = ACCEPTED_VIDEO_TYPES.includes(file.type)

      if (!isImage && !isVideo) {
        setError(`Le fichier ${file.name} n'est pas un format supporté`)
        return
      }

      // Conversion en base64
      const reader = new FileReader()
      reader.onload = (event) => {
        if (!event.target?.result) return

        const newMedia: MediaAttachment = {
          id: generateId(),
          type: isImage ? 'image' : 'video',
          dataUrl: event.target.result as string,
          name: file.name,
          size: file.size,
        }

        onChange([...media, newMedia])
      }

      reader.onerror = () => {
        setError(`Erreur lors de la lecture du fichier ${file.name}`)
      }

      reader.readAsDataURL(file)
    })

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  function removeMedia(id: string) {
    onChange(media.filter((m) => m.id !== id))
  }

  function downloadMedia(item: MediaAttachment) {
    const link = document.createElement('a')
    link.href = item.dataUrl
    link.download = item.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Photos / Vidéos</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Ajoutez des photos ou vidéos de techniques (max 10 MB par fichier)
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept={[...ACCEPTED_IMAGE_TYPES, ...ACCEPTED_VIDEO_TYPES].join(',')}
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            Ajouter une image
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Video className="mr-2 h-4 w-4" />
            Ajouter une vidéo
          </Button>
        </div>

        {error && (
          <p className="text-sm text-destructive mt-2">{error}</p>
        )}
      </div>

      {media.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="relative border border-border rounded-lg overflow-hidden group"
            >
              {item.type === 'image' ? (
                <img
                  src={item.dataUrl}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <video
                  src={item.dataUrl}
                  className="w-full h-40 object-cover"
                  controls
                />
              )}

              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => downloadMedia(item)}
                  title="Télécharger"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => removeMedia(item.id)}
                  title="Supprimer"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-2 bg-background/90 backdrop-blur">
                <p className="text-xs font-medium truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(item.size)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
