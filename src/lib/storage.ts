export type CourseSheet = {
  id: string
  date?: Date | null
  discipline?: string | null
  warmUp?: string | null
  techniques?: string | null
  sparring?: string | null
  drills?: string | null
  stretching?: string | null
  notes?: string | null
}

const STORAGE_KEY = 'mma-course-sheet'

export function saveCourseSheet(sheet: CourseSheet): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sheet))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export function loadCourseSheet(): CourseSheet | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return null

    const parsed = JSON.parse(data)
    // Convert date string back to Date object
    if (parsed.date) {
      parsed.date = new Date(parsed.date)
    }
    return parsed
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return null
  }
}

export function deleteCourseSheet(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error deleting from localStorage:', error)
  }
}

export function generateId(): string {
  return crypto.randomUUID()
}
