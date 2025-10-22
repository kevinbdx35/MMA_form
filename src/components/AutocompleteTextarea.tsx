import { useState, useRef, useEffect } from 'react'
import { Textarea } from './ui/textarea'
import { getMatchingSuggestions, extractCurrentWord } from '../lib/autocomplete'

type AutocompleteTextareaProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

export function AutocompleteTextarea({
  value,
  onChange,
  placeholder,
  rows = 6,
}: AutocompleteTextareaProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!showSuggestions) {
      setSelectedIndex(0)
    }
  }, [showSuggestions])

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newValue = e.target.value
    onChange(newValue)

    const cursorPosition = e.target.selectionStart
    const { word } = extractCurrentWord(newValue, cursorPosition)

    if (word.length >= 2) {
      const matches = getMatchingSuggestions(word)
      if (matches.length > 0) {
        setSuggestions(matches)
        setShowSuggestions(true)
        return
      }
    }

    setShowSuggestions(false)
  }

  function applySuggestion(suggestion: string) {
    if (!textareaRef.current) return

    const cursorPosition = textareaRef.current.selectionStart
    const { start, end } = extractCurrentWord(value, cursorPosition)

    const newValue = value.substring(0, start) + suggestion + value.substring(end)
    onChange(newValue)
    setShowSuggestions(false)

    // Remettre le focus et le curseur après l'insertion
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
        const newCursorPos = start + suggestion.length
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos)
      }
    }, 0)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % suggestions.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length)
        break
      case 'Enter':
      case 'Tab':
        if (showSuggestions) {
          e.preventDefault()
          applySuggestion(suggestions[selectedIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        setShowSuggestions(false)
        break
    }
  }

  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={rows}
        onBlur={() => {
          // Délai pour permettre le clic sur une suggestion
          setTimeout(() => setShowSuggestions(false), 200)
        }}
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              type="button"
              className={`w-full text-left px-3 py-2 hover:bg-accent cursor-pointer transition-colors ${
                index === selectedIndex ? 'bg-accent' : ''
              }`}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => applySuggestion(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <div className="text-xs text-muted-foreground mt-1">
          Utilisez ↑↓ pour naviguer, Entrée/Tab pour sélectionner, Échap pour fermer
        </div>
      )}
    </div>
  )
}
