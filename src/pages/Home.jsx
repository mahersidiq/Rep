import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductVisual from "../components/ProductVisual";
import MediaSlot from "../components/MediaSlot";
import {
  ArrowIcon,
  BarbellIcon,
  BoltIcon,
  BrainIcon,
  CheckIcon,
  FlaskIcon,
  FocusIcon,
  LeafIcon,
  PouchIcon,
  PumpIcon,
  WaterIcon,
} from "../components/Icons";
import { featuredProducts, products } from "../data/products";

const benefits = [
  {
    title: "No Mixing",
    text: "Tear, tuck, and go.",
    icon: PouchIcon,
  },
  {
    title: "No Bloat",
    text: "Light. Clean. Comfortable.",
    icon: WaterIcon,
  },
  {
    title: "Built for Training",
    text: "Performance that hits when you do.",
    icon: BarbellIcon,
  },
];

const whyRep = [
  {
    title: "Stays in between sets",
    text: "Delivers steady focus and energy without the crash.",
    icon: FocusIcon,
  },
  {
    title: "Redosable energy",
    text: "Use another pouch anytime you need to lock back in.",
    icon: BoltIcon,
  },
  {
    title: "No shaker required",
    text: "Tear, tuck, get after it. Performance made simple.",
    icon: PouchIcon,
  },
];

const timeline = [
  ["0-5 MIN", "Ingredients begin absorbing. Light stimulation starts."],
  ["5-15 MIN", "Focus sharpens. Energy and alertness start to build."],
  ["15-45 MIN", "Peak performance. Dialed-in focus and sustained energy."],
  ["45-60 MIN", "Smooth taper. No crash, just steady output."],
  ["POST-WORKOUT", "Come down clean. Stay clear-headed and refreshed."],
];

const formula = [
  ["Caffeine", "Clean, effective energy and mental alertness.", BoltIcon],
  ["L-Theanine", "Promotes calm focus and reduces jitters.", FocusIcon],
  ["Alpha-GPC", "Supports cognitive function and power.", BrainIcon],
  ["L-Tyrosine", "Supports mental performance under stress.", BrainIcon],
  ["Taurine", "Supports hydration and nerve function.", WaterIcon],
  ["Theobromine", "Smooth stimulation from natural sources.", LeafIcon],
  ["Agmatine Sulfate", "Supports nitric oxide and pump performance.", PumpIcon],
  ["Niacin B3", "Supports energy metabolism and focus.", FlaskIcon],
];

export default function Home({ addToCart }) {
  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">Workout-specific performance pouch</p>
            <h1>Put it in before you touch the bar.</h1>
            <p className="hero__lead">
              No shaker. No bloat. Clean, focused energy that stays with you so
              you can stay locked in.
            </p>
            <div className="hero__actions">
              <button
                className="button button--primary"
                onClick={() => addToCart(products[0])}
              >
                Shop Original <span>$9.99</span>
              </button>
              <button
                className="button button--outline"
                onClick={() => addToCart(products[2])}
              >
                Shop Plus <span>$18.99</span>
              </button>
            </div>
            <div className="hero__micro">
              <span>15 Pouches</span>
              <span>Nicotine-Free Option</span>
              <span>Redosable Mid-Workout</span>
            </div>
          </div>

          <div className="hero__visual-wrap">
            <div className="hero__index">01 / BUILT FOR THE IRON</div>
            <div className="hero__product">
              <ProductVisual line="Original" flavor="Citrus" size="hero" showPouch />
            </div>
            <div className="hero__stamp">
              <span>NO MIXING</span>
              <strong>100</strong>
              <small>MG CAFFEINE</small>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Key product benefits" className="benefits-section">
        <div className="container benefits-grid">
          {benefits.map(({ title, text, icon: BenefitIcon }, index) => (
            <article className="benefit-card" key={title}>
              <div className="benefit-card__icon">
                <BenefitIcon size={27} />
              </div>
              <div>
                <span>0{index + 1}</span>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section product-section" id="products">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The lineup</p>
              <h2>Pick your performance.</h2>
            </div>
            <Link className="text-link" to="/products">
              Shop all products <ArrowIcon size={19} />
            </Link>
          </div>
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard addToCart={addToCart} key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section why-section">
        <div className="container why-grid">
          <div className="why-copy">
            <p className="eyebrow">Why REP</p>
            <h2>The only pre-workout that trains with you.</h2>
            <div className="why-list">
              {whyRep.map(({ title, text, icon: WhyIcon }, index) => (
                <article className="why-item" key={title}>
                  <span className="why-item__number">0{index + 1}</span>
                  <div className="why-item__icon">
                    <WhyIcon />
                  </div>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="media-grid">
            <article className="media-card media-card--pouch">
              <MediaSlot
                alt="Athlete training with REP"
                className="media-card__scene"
                label="IN THE GYM"
                src="/images/lifestyle-1.png"
              />
              <div className="media-card__caption">
                <div>
                  <h3>Small pouch. Big difference.</h3>
                  <p>See how REP fits seamlessly into your training.</p>
                </div>
                <span>01</span>
              </div>
            </article>

            <article className="media-card media-card--can">
              <MediaSlot
                alt="REP performance pouch"
                className="media-card__scene"
                label="THE POUCH"
                src="/images/pouch.png"
              />
              <div className="media-card__caption">
                <div>
                  <h3>Built for the iron.</h3>
                  <p>Performance that's as serious as your training.</p>
                </div>
                <span>02</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section timeline-section" id="how-it-works">
        <div className="container">
          <div className="technical-heading">
            <div>
              <p className="eyebrow">Absorption profile</p>
              <h2>How it works</h2>
            </div>
            <div className="technical-readout">
              <span>SESSION</span>
              <strong>60:00</strong>
            </div>
          </div>
          <div className="timeline">
            {timeline.map(([time, text], index) => (
              <article className="timeline__step" key={time}>
                <div className="timeline__marker">
                  <span>{index + 1}</span>
                </div>
                <p>{time}</p>
                <h3>{text}</h3>
              </article>
            ))}
          </div>
          <p className="timeline-disclaimer">
            Timing varies by person. Use only as directed and assess your tolerance.
          </p>
        </div>
      </section>

      <section className="section formula-section" id="formula">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The stack</p>
              <h2>Formula</h2>
            </div>
            <p className="section-heading__note">
              Eight purpose-built ingredients. Nothing that doesn't earn its spot.
            </p>
          </div>
          <div className="formula-grid">
            {formula.map(([name, description, IngredientIcon], index) => (
              <article className="formula-card" key={name}>
                <div className="formula-card__top">
                  <IngredientIcon size={29} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{name}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section compare-section">
        <div className="container">
          <div className="section-heading section-heading--center">
            <div>
              <p className="eyebrow">Choose your REP</p>
              <h2>Same standard. Different intensity.</h2>
            </div>
          </div>
          <div className="comparison-grid">
            <ComparisonCard
              addToCart={() => addToCart(products[0])}
              description="Clean performance without nicotine."
              features={["Nicotine-Free", "100mg Caffeine", "15 Pouches"]}
              flavor="Citrus"
              line="Original"
              price="$9.99"
            />
            <ComparisonCard
              addToCart={() => addToCart(products[2])}
              description="For adult nicotine users who want an amplified session."
              features={["3mg Nicotine", "100mg Caffeine", "15 Pouches"]}
              flavor="Citrus"
              line="Plus"
              price="$18.99"
              restricted
            />
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta__inner">
          <div>
            <p className="eyebrow">Put in the work</p>
            <h2>
              Every <span>Rep</span> Counts.
            </h2>
          </div>
          <Link className="button button--black" to="/products">
            Buy now <ArrowIcon size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}

function ComparisonCard({
  addToCart,
  description,
  features,
  flavor,
  line,
  price,
  restricted = false,
}) {
  return (
    <article className={`comparison-card ${restricted ? "comparison-card--plus" : ""}`}>
      <div className="comparison-card__copy">
        <p className="eyebrow">{restricted ? "Amplified" : "Nicotine-Free"}</p>
        <h3>REP {line}</h3>
        <p>{description}</p>
        <ul>
          {features.map((feature) => (
            <li key={feature}>
              <CheckIcon size={18} />
              {feature}
            </li>
          ))}
        </ul>
        <div className="comparison-card__footer">
          <strong>{price}</strong>
          <button className="button button--primary" onClick={addToCart}>
            Shop {line}
          </button>
        </div>
      </div>
      <div className="comparison-card__visual">
        <ProductVisual flavor={flavor} line={line} size="compare" showPouch />
      </div>
      {restricted && <span className="age-tag">21+ ONLY</span>}
    </article>
  );
}
