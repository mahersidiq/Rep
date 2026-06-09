import { formula } from '../data/formula.js';

export default function IngredientGrid() {
  return (
    <div style={styles.grid}>
      {formula.map((ing) => (
        <div className="card" key={ing.name} style={styles.cell}>
          <div style={styles.top}>
            <span style={styles.name}>{ing.name}</span>
            <span className="tag tag-accent">{ing.dose}</span>
          </div>
          <span className="text-secondary" style={styles.role}>
            {ing.role}
          </span>
        </div>
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 16,
  },
  cell: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 20,
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 500,
  },
  role: {
    fontSize: 13,
  },
};
