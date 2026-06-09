import { Link } from "react-router-dom";
import { CheckIcon } from "../components/Icons";

export default function Confirmation() {
  return (
    <div className="page confirmation-page">
      <section className="container confirmation">
        <div className="confirmation__mark">
          <CheckIcon size={38} />
        </div>
        <p className="eyebrow">Order confirmed</p>
        <h1>You're locked in.</h1>
        <p>
          Your REP order is being prepared. We'll send tracking as soon as it
          leaves the floor.
        </p>
        <div className="confirmation__number">
          <span>ORDER</span>
          <strong>REP-10248</strong>
        </div>
        <Link className="button button--primary" to="/products">
          Keep shopping
        </Link>
      </section>
    </div>
  );
}
