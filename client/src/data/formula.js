// Hardcoded 8-ingredient performance formula.
export const formula = [
  { name: 'Caffeine', dose: '100mg', role: 'Energy + alertness' },
  { name: 'L-Theanine', dose: '50mg', role: 'Smooth focus, no jitters' },
  { name: 'Alpha-GPC', dose: '50mg', role: 'Mind-muscle connection' },
  { name: 'L-Tyrosine', dose: '50mg', role: 'Drive + motivation' },
  { name: 'Taurine', dose: '30mg', role: 'No cramping' },
  { name: 'Theobromine', dose: '15mg', role: 'Sustained energy' },
  { name: 'Agmatine Sulfate', dose: '750mg', role: 'Pump + vascularity' },
  { name: 'Niacin B3', dose: '150mg', role: 'Activation signal' },
];

// "How it works" timeline.
export const timeline = [
  {
    window: '0–5 min',
    title: 'Onset',
    detail: 'Pouch in. Caffeine and aminos start absorbing through the gum line.',
  },
  {
    window: '5–15 min',
    title: 'Ramp',
    detail: 'Energy and focus climb. Tyrosine and theanine lock in clean drive.',
  },
  {
    window: '15–45 min',
    title: 'Peak',
    detail: 'Full effect. Pump from agmatine, mind-muscle from Alpha-GPC. Send it.',
  },
  {
    window: '45–60 min',
    title: 'Hold',
    detail: 'Theobromine keeps energy steady. No mid-session drop-off.',
  },
  {
    window: 'Post-workout',
    title: 'Smooth out',
    detail: 'Effects taper cleanly. No crash, no comedown. Spit it out and recover.',
  },
];
