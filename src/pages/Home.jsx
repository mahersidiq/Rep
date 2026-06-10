import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductVisual from "../components/ProductVisual";
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
  StarIcon,
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

const marqueeItems = [
  "No Mixing",
  "No Bloat",
  "No Shaker",
  "Redosable",
  "100mg Caffeine",
  "Built for Training",
];

const testimonials = [
  {
    quote:
      "I pop one in walking into the gym and I'm dialed by my first working set. No shaker, no waiting 30 minutes.",
    name: "Marcus T.",
    detail: "Powerlifter · Original Citrus",
    initials: "MT",
  },
  {
    quote:
      "The redosing is the whole game. Halfway through a two-hour session I tuck another pouch and the second wind is real.",
    name: "Dana K.",
    detail: "CrossFit Coach · Original Mint",
    initials: "DK",
  },
  {
    quote:
      "Pre-workout drinks wreck my stomach on heavy squat days. This hits just as hard with none of the slosh.",
    name: "Andre B.",
    detail: "Strongman · Plus Berry",
    initials: "AB",
  },
];

const faqs = [
  [
    "How fast does it kick in?",
    "Most people feel the first effects within 5 minutes, with peak focus and energy between 15 and 45 minutes. Buccal absorption skips the digestive system, so it hits faster than a drink.",
  ],
  [
    "How is this different from a pre-workout drink?",
    "No mixing, no 30-minute wait, no slosh in your stomach mid-set. One pouch delivers 100mg of caffeine plus focus ingredients through the lining of your lip while you train.",
  ],
  [
    "Can I use more than one pouch per session?",
    "Yes — that's the point of redosable energy. Many lifters tuck a second pouch mid-session for long workouts. Assess your tolerance first and keep total caffeine in your daily comfort zone.",
  ],
  [
    "Does REP Plus contain tobacco?",
    "No. REP Plus contains 3mg of pharmaceutical-grade nicotine but is 100% tobacco-free. It's for adult nicotine users 21+ only. Nicotine is an addictive chemical.",
  ],
  [
    "What does it taste like?",
    "Clean and bright, not medicinal. Citrus is sharp and fresh, Mint runs cold, and Berry is dark and smooth. Flavor lasts the full 30-45 minutes the pouch is in.",
  ],
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
              <ProductVisual line="Original" flavor="Citrus" size="hero" />
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

      <div aria-hidden="true" className="marquee">
        <div className="marquee__track">
          {[0, 1].map((copy) => (
            <div className="marquee__group" key={copy}>
              {marqueeItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

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
              <div className="media-card__scene">
                <span className="scene-label">THE POUCH / DETAIL</span>
                <img
                  alt="REP performance pouch up close"
                  className="scene-photo scene-photo--pouch"
                  loading="lazy"
                  src="/images/rep-can.webp"
                />
                <span className="scene-tag">Tear · Tuck · Train</span>
              </div>
              <div className="media-card__caption">
                <div>
                  <h3>Small pouch. Big difference.</h3>
                  <p>See how REP fits seamlessly into your training.</p>
                </div>
                <span>01</span>
              </div>
            </article>

            <article className="media-card media-card--can">
              <div className="media-card__scene">
                <span className="scene-label">PRODUCT STUDY / THE CAN</span>
                <img
                  alt="REP Original Citrus can"
                  className="scene-photo scene-photo--can"
                  loading="lazy"
                  src="/images/rep-can.webp"
                />
                <span className="scene-tag">15 Pouches / Can</span>
              </div>
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

      <section className="section testimonial-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">From the floor</p>
              <h2>Lifters are locked in.</h2>
            </div>
            <p className="section-heading__note">
              Real training, real sessions. Here's what they're saying.
            </p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map(({ quote, name, detail, initials }) => (
              <article className="testimonial-card" key={name}>
                <div aria-label="5 out of 5 stars" className="testimonial-card__stars" role="img">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} size={16} />
                  ))}
                </div>
                <blockquote>“{quote}”</blockquote>
                <footer>
                  <span aria-hidden="true" className="testimonial-card__avatar">
                    {initials}
                  </span>
                  <div className="testimonial-card__name">
                    <strong>{name}</strong>
                    <span>{detail}</span>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="container faq-grid">
          <div className="faq-copy">
            <p className="eyebrow">Questions</p>
            <h2>Before you tuck.</h2>
            <p>
              Everything you need to know before your first pouch. Still curious?
              Reach out at <a href="mailto:training@rep.example">training@rep.example</a>.
            </p>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details className="faq-item" key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
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
        <ProductVisual flavor={flavor} line={line} size="compare" />
      </div>
      {restricted && <span className="age-tag">21+ ONLY</span>}
    </article>
  );
}
