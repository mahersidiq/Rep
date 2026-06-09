export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.inner}>
        <div>
          <div style={styles.logo}>REP</div>
          <div className="text-secondary" style={styles.tagline}>
            Workout-specific performance pouch.
          </div>
        </div>
        <div className="text-secondary" style={styles.copy}>
          © {new Date().getFullYear()} REP. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    borderTop: '1px solid #1A1A1A',
    padding: '40px 0',
  },
  inner: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
  },
  logo: {
    color: '#C8E000',
    fontWeight: 500,
    fontSize: 20,
    letterSpacing: '0.04em',
  },
  tagline: {
    fontSize: 14,
    marginTop: 6,
  },
  copy: {
    fontSize: 13,
  },
};
