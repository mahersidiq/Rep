const Icon = ({ children, size = 24, className = "" }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

export const BoltIcon = (props) => (
  <Icon {...props}>
    <path d="M13.2 2 5 13h6l-.2 9L19 10h-6l.2-8Z" stroke="currentColor" strokeLinecap="square" strokeWidth="1.7" />
  </Icon>
);

export const FocusIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
    <path d="M12 2V5M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="1.7" />
  </Icon>
);

export const BarbellIcon = (props) => (
  <Icon {...props}>
    <path d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12" stroke="currentColor" strokeLinecap="square" strokeWidth="1.7" />
  </Icon>
);

export const PouchIcon = (props) => (
  <Icon {...props}>
    <path d="M6 5.5C8.5 3.5 15.5 3.5 18 5.5v13c-2.5 2-9.5 2-12 0v-13Z" stroke="currentColor" strokeWidth="1.7" />
    <path d="M7 8h10" stroke="currentColor" strokeWidth="1.7" />
  </Icon>
);

export const WaterIcon = (props) => (
  <Icon {...props}>
    <path d="M12 3c3.8 4.7 6 7.5 6 10.2a6 6 0 1 1-12 0C6 10.5 8.2 7.7 12 3Z" stroke="currentColor" strokeWidth="1.7" />
    <path d="M9 14.2c.4 1.4 1.4 2.1 3 2.3" stroke="currentColor" strokeWidth="1.7" />
  </Icon>
);

export const BrainIcon = (props) => (
  <Icon {...props}>
    <path d="M9.2 5.2A3 3 0 0 0 4.8 8a3.3 3.3 0 0 0 .5 6.2A3 3 0 0 0 9 18.8M14.8 5.2A3 3 0 0 1 19.2 8a3.3 3.3 0 0 1-.5 6.2 3 3 0 0 1-3.7 4.6M12 4v16M8.5 9.5c1.7 0 3.5 1 3.5 2.5M15.5 14.5c-1.7 0-3.5-1-3.5-2.5" stroke="currentColor" strokeWidth="1.6" />
  </Icon>
);

export const PumpIcon = (props) => (
  <Icon {...props}>
    <path d="M5 14c2.5-6 4.5-8 7-8 1.8 0 2.8 1 3.2 2.5.5 2 1.3 3 3.8 3.5-1 4-3.5 6-7.5 6H5v-4Z" stroke="currentColor" strokeWidth="1.7" />
    <path d="M3 13v6h4" stroke="currentColor" strokeWidth="1.7" />
  </Icon>
);

export const LeafIcon = (props) => (
  <Icon {...props}>
    <path d="M19 4C10 4 5 8.4 5 14c0 3 2 5 5 5 5.6 0 9-6 9-15Z" stroke="currentColor" strokeWidth="1.7" />
    <path d="M5 20c2.5-5 5.5-8 10-10" stroke="currentColor" strokeWidth="1.7" />
  </Icon>
);

export const FlaskIcon = (props) => (
  <Icon {...props}>
    <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3M7.5 15h9" stroke="currentColor" strokeWidth="1.7" />
  </Icon>
);

export const ArrowIcon = (props) => (
  <Icon {...props}>
    <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.7" />
  </Icon>
);

export const CartIcon = (props) => (
  <Icon {...props}>
    <path d="M3 4h2l2 11h10l2-8H6M9 20h.01M16 20h.01" stroke="currentColor" strokeWidth="1.7" />
  </Icon>
);

export const CloseIcon = (props) => (
  <Icon {...props}>
    <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" />
  </Icon>
);

export const MenuIcon = (props) => (
  <Icon {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.7" />
  </Icon>
);

export const CheckIcon = (props) => (
  <Icon {...props}>
    <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="1.8" />
  </Icon>
);
