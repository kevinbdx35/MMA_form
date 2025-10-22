import { type CourseSheet } from './storage'

export type CourseTemplate = Omit<CourseSheet, 'id' | 'date'>

export const courseTemplates: Record<string, CourseTemplate> = {
  striking: {
    discipline: 'Striking',
    warmUp: '- Shadow boxing 3 rounds\n- Burpees 3x10\n- Jump rope 10 minutes',
    drills: '- Jab-cross sur pattes d\'ours\n- Low kicks alternés\n- Combinations 1-2-3-2',
    techniques: '- Perfectionnement du jab\n- Travail des esquives\n- Contre sur middle kick',
    sparring: '- Sparring technique léger 3x2 minutes\n- Focus sur la distance et le timing',
    stretching: '- Étirements des jambes\n- Assouplissement des hanches\n- Relaxation 5 minutes',
    notes: null,
  },
  lutte: {
    discipline: 'Lutte',
    warmUp: '- Échauffement articulaire\n- Roulades avant/arrière\n- Déplacements en position de lutte',
    drills: '- Pénétrations simples et doubles\n- Changements de niveau\n- Sprawls répétés',
    techniques: '- Single leg takedown\n- Double leg defense\n- Travail du clinch',
    sparring: '- Sparring lutte 5x3 minutes\n- Départs debout uniquement',
    stretching: '- Étirements du dos\n- Assouplissement des épaules\n- Relaxation',
    notes: null,
  },
  sol: {
    discipline: 'Sol',
    warmUp: '- Échauffement général\n- Exercices de mobilité\n- Drill de shrimping',
    drills: '- Passages de garde\n- Arm drag depuis la garde\n- Hip escapes',
    techniques: '- Triangle choke depuis garde fermée\n- Kimura depuis side control\n- Sweep depuis half guard',
    sparring: '- Sparring au sol 6x5 minutes\n- Positions de départ variées',
    stretching: '- Étirements complets\n- Relaxation et respiration',
    notes: null,
  },
  mma: {
    discipline: 'MMA',
    warmUp: '- Échauffement cardio complet\n- Shadow MMA 3 rounds\n- Exercices fonctionnels',
    drills: '- Transitions debout-sol\n- GnP depuis le top control\n- Défense des takedowns avec frappes',
    techniques: '- Combos debout vers takedown\n- Travail contre la cage\n- Elbows et frappes au sol',
    sparring: '- Sparring MMA 4x5 minutes\n- Règles compétition',
    stretching: '- Étirements complets\n- Récupération active\n- Ice bath optionnel',
    notes: null,
  },
  debutant: {
    discipline: null,
    warmUp: '- Échauffement progressif\n- Mobilité articulaire\n- Cardio léger 10 minutes',
    drills: '- Mouvements de base\n- Exercices techniques simples\n- Coordination',
    techniques: '- Introduction aux fondamentaux\n- Position de garde\n- Mouvements de base',
    sparring: '- Sparring technique supervisé\n- Intensité contrôlée\n- Focus apprentissage',
    stretching: '- Étirements guidés\n- Retour au calme\n- Questions/réponses',
    notes: 'Premier cours ou reprise',
  },
}

export function getTemplateNames(): string[] {
  return Object.keys(courseTemplates)
}

export function getTemplateLabel(key: string): string {
  const labels: Record<string, string> = {
    striking: 'Cours Striking',
    lutte: 'Cours Lutte',
    sol: 'Cours Sol/Grappling',
    mma: 'Cours MMA Complet',
    debutant: 'Cours Débutant',
  }
  return labels[key] || key
}

export function getTemplate(key: string): CourseTemplate | null {
  return courseTemplates[key] || null
}
