import { Link } from "react-router-dom";

export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

export function Container({ className, children }) {
  return <div className={cn("mx-auto w-[min(1400px,calc(100%-3rem))]", className)}>{children}</div>;
}

export function Page({ children }) {
  return <div className="py-7 pb-16">{children}</div>;
}

export function Crumbs({ children }) {
  return <div className="mb-[18px] text-[13px] text-muted">{children}</div>;
}

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full border-2 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";
const btnVariant = {
  primary: "border-brand bg-brand text-white hover:border-brand-dark hover:bg-brand-dark",
  ghost: "border-brand bg-transparent text-brand hover:bg-brand hover:text-white",
  dark: "border-black bg-black text-white hover:bg-neutral-800",
};
const btnSize = {
  md: "h-[50px] px-7 text-sm",
  sm: "h-[37px] px-[18px] text-[13px]",
};

export function Btn({ to, variant = "primary", size = "md", className, children, ...props }) {
  const classes = cn(btnBase, btnVariant[variant], btnSize[size], className);
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export function Field({ label, full, className, children }) {
  return (
    <label className={cn("flex flex-col gap-1.5 text-[13px]", full && "col-span-full", className)}>
      {label}
      {children}
    </label>
  );
}

export const control =
  "h-11 rounded-sm border border-line px-3 outline-none focus:border-brand";

export function ZipPay({ className }) {
  return (
    <div className={cn("flex items-center gap-3.5 text-[15px]", className)}>
      <span className="rounded bg-zip px-2.5 pb-1 pt-0.5 text-[22px] font-extrabold tracking-tighter text-black">
        zip
      </span>
      <span>
        own it now, up to 6 months interest free{" "}
        <a className="text-brand underline">learn more</a>
      </span>
    </div>
  );
}

export function Qty({ value, onDec, onInc, onChange }) {
  return (
    <div className="flex h-[50px] rounded border border-line">
      <button type="button" className="w-9 border-0 bg-transparent text-lg" onClick={onDec}>
        ?
      </button>
      <input className="w-10 border-0 text-center outline-none" value={value} onChange={onChange} />
      <button type="button" className="w-9 border-0 bg-transparent text-lg" onClick={onInc}>
        +
      </button>
    </div>
  );
}

export function SectionHead({ title, to, link }) {
  return (
    <div className="mb-[18px] mt-2 flex items-baseline justify-between">
      <h2 className="text-[22px] font-semibold">{title}</h2>
      {to && (
        <Link to={to} className="text-[13px] text-brand">
          {link}
        </Link>
      )}
    </div>
  );
}

export const productGrid = "grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5";
export const productGrid6 = "grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6";
