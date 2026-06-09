import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import IngredientGrid from '../components/IngredientGrid.jsx';
import { products } from '../data/products.js';
import { timeline } from '../data/formula.js';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section style={styles.hero}>
        <div className="container">
          <div className="tag tag-accent" style={styles.heroTag}>
            Workout-specific performance pouch
          </div>
          <h1 style={styles.headline}>
            Train harder.
            <br />
            Stay fueled.
          </h1>
          <p className="text-secondary" style={styles.subtext}>
            A performance pouch engineered for the gym. Caffeine, aminos, and
            pump ingredients dosed to hit when your set starts and hold through
            the last rep. Two formulas. One mission.
          </p>
          <div style={styles.ctas}>
            <Link to="/products/original" className="btn btn-primary">
              Shop Original · $9.99
            </Link>
            <Link to="/products/plus" className="btn">
              Shop Plus · $18.99
            </Link>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section" id="products">
        <div className="container">
          <div className="section-label">Products</div>
          <h2 className="section-title">Pick your formula</h2>
          <p className="text-secondary" style={styles.lead}>
            Same performance base. Choose nicotine-free or with an edge.
          </p>
          <div style={styles.productGrid}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Formula */}
      <section className="section" id="formula">
        <div className="container">
          <div className="section-label">Formula</div>
          <h2 className="section-title">Eight ingredients. No filler.</h2>
          <p className="text-secondary" style={styles.lead}>
            Every pouch is dosed for the gym — energy, focus, and pump, nothing
            you don't need.
          </p>
          <IngredientGrid />
        </div>
      </section>

      {/* How it works */}
      <section className="section" id="how-it-works">
        <div className="container">
          <div className="section-label">How it works</div>
          <h2 className="section-title">From pouch to PR</h2>
          <p className="text-secondary" style={styles.lead}>
            One pouch, one session. Here's the timeline.
          </p>
          <div style={styles.timeline}>
            {timeline.map((step, i) => (
              <div key={step.window} style={styles.step}>
                <div style={styles.stepHead}>
                  <span className="tag tag-accent">{step.window}</span>
                  {i < timeline.length - 1 && <div style={styles.connector} />}
                </div>
                <h4 style={styles.stepTitle}>{step.title}</h4>
                <p className="text-secondary" style={styles.stepDetail}>
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const styles = {
  hero: {
    padding: '100px 0 80px',
  },
  heroTag: {
    marginBottom: 24,
  },
  headline: {
    fontSize: 'clamp(40px, 8vw, 72px)',
    letterSpacing: '-0.02em',
    marginBottom: 24,
  },
  subtext: {
    maxWidth: 520,
    fontSize: 17,
    marginBottom: 32,
  },
  ctas: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
  },
  lead: {
    maxWidth: 540,
    marginBottom: 32,
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 24,
  },
  timeline: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 24,
  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  stepHead: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  connector: {
    flex: 1,
    height: 1,
    background: '#1A1A1A',
  },
  stepTitle: {
    fontSize: 17,
  },
  stepDetail: {
    fontSize: 14,
  },
};
