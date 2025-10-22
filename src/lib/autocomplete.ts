// Suggestions d'auto-complétion pour les techniques
export const techniqueSuggestions = [
  // Striking
  'Jab',
  'Cross',
  'Hook',
  'Uppercut',
  'Jab-cross',
  'Low kick',
  'Middle kick',
  'High kick',
  'Front kick (teep)',
  'Roundhouse kick',
  'Switch kick',
  'Spinning back kick',
  'Superman punch',
  'Overhand',
  'Lead hook',
  'Rear hook',
  'Body hook',
  'Slip',
  'Duck',
  'Parry',
  'Block',
  'Check kick',
  'Esquive',
  'Contre',

  // Lutte
  'Single leg takedown',
  'Double leg takedown',
  'Sprawl',
  'Underhook',
  'Overhook',
  'Body lock',
  'Hip toss',
  'Clinch',
  'Collar tie',
  'Pummeling',
  'Shoot',
  'Blast double',
  'High crotch',
  'Ankle pick',
  'Foot sweep',

  // Sol / Grappling
  'Guard',
  'Closed guard',
  'Open guard',
  'Half guard',
  'Side control',
  'Mount',
  'Back control',
  'Armbar',
  'Triangle choke',
  'Rear naked choke',
  'Guillotine',
  'Kimura',
  'Americana',
  'D\'Arce choke',
  'Anaconda choke',
  'North-south choke',
  'Ezekiel choke',
  'Arm triangle',
  'Sweep',
  'Escape',
  'Bridge',
  'Shrimp',
  'Hip escape',
  'Elevator sweep',
  'Scissor sweep',
  'Flower sweep',
  'X-guard',
  'De la Riva guard',
  'Spider guard',
  'Butterfly guard',
  'Leg drag',
  'Berimbolo',
  'Knee slice',
  'Toreando pass',
  'Stack pass',
  'Pressure pass',

  // MMA spécifique
  'Ground and pound',
  'Elbows au sol',
  'Transition debout-sol',
  'Cage work',
  'Wall walking',
  'Get up',
  'Scramble',
  'Defensive guard',
]

export function getMatchingSuggestions(input: string, maxResults: number = 5): string[] {
  if (!input || input.length < 2) return []

  const normalizedInput = input.toLowerCase().trim()

  // Recherche les suggestions qui commencent par l'input
  const startsWith = techniqueSuggestions.filter(suggestion =>
    suggestion.toLowerCase().startsWith(normalizedInput)
  )

  // Si pas assez de résultats, recherche les suggestions qui contiennent l'input
  if (startsWith.length < maxResults) {
    const contains = techniqueSuggestions.filter(suggestion =>
      !suggestion.toLowerCase().startsWith(normalizedInput) &&
      suggestion.toLowerCase().includes(normalizedInput)
    )
    return [...startsWith, ...contains].slice(0, maxResults)
  }

  return startsWith.slice(0, maxResults)
}

// Extraire le dernier mot incomplet d'un texte (pour auto-complétion au milieu d'une ligne)
export function extractCurrentWord(text: string, cursorPosition: number): {
  word: string
  start: number
  end: number
} {
  // Trouver le début du mot (après un espace, retour à la ligne, ou début du texte)
  let start = cursorPosition
  while (start > 0 && text[start - 1] !== ' ' && text[start - 1] !== '\n') {
    start--
  }

  // Trouver la fin du mot (avant un espace, retour à la ligne, ou fin du texte)
  let end = cursorPosition
  while (end < text.length && text[end] !== ' ' && text[end] !== '\n') {
    end++
  }

  return {
    word: text.substring(start, end),
    start,
    end,
  }
}
