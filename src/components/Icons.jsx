export function Logo({ className = "h-[34px] w-[34px]" }) {
  return (
    <svg viewBox="0 0 34 34" aria-hidden="true" className={className}>
      <polygon fill="#0156FF" points="17,1 32,9.5 32,24.5 17,33 2,24.5 2,9.5" />
      <polygon fill="#fff" points="17,8 25,12.5 25,21.5 17,26 9,21.5 9,12.5" />
    </svg>
  );
}

export function Icon({ name, className = "h-[22px] w-[22px]" }) {
  const common = { className, fill: "none", stroke: "currentColor", strokeWidth: 1.7 };
  if (name === "search")
    return (
      <svg {...common} viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
    );
  if (name === "user")
    return (
      <svg {...common} viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5 19c1.5-3.2 4-4.8 7-4.8S17.5 15.8 19 19" />
      </svg>
    );
  if (name === "cart")
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M6 7h15l-1.4 8.2H8L6 7z" />
        <path d="M6 7L5 4H2" />
        <circle cx="9" cy="20" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="18" cy="20" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    );
  if (name === "menu")
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    );
  if (name === "support")
    return (
      <svg {...common} viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    );
  if (name === "account")
    return (
      <svg {...common} viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="3" />
        <path d="M5 19c1.6-3 4.2-4.5 7-4.5S17.4 16 19 19" />
      </svg>
    );
  if (name === "save")
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M12 4l2.2 4.6L19 9.2l-3.5 3.4.8 4.8L12 15.6 7.7 17.4l.8-4.8L5 9.2l4.8-.6L12 4z" />
      </svg>
    );
  return null;
}

export function Stars({ rating = 4, reviews }) {
  const full = Math.round(rating);
  return (
    <div className="text-xs tracking-wide text-star">
      {"★".repeat(full)}
      {"☆".repeat(Math.max(0, 5 - full))}
      {reviews !== undefined && <span className="ml-1.5 font-normal text-muted">Reviews ({reviews})</span>}
    </div>
  );
}
