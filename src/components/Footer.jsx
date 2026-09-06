import { Link } from "react-router-dom";
import { Icon } from "./Icons.jsx";
import { Btn, Container } from "./ui.jsx";

function SupportItem({ icon, title, text }) {
  return (
    <div className="flex items-start gap-3.5">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-brand text-brand">
        <Icon name={icon} />
      </div>
      <div>
        <h4 className="text-base font-semibold">{title}</h4>
        <p className="text-[13px] text-neutral-600">{text}</p>
      </div>
    </div>
  );
}

export function SupportBar() {
  return (
    <div className="grid gap-6 border-t border-neutral-200 py-7 pb-10 md:grid-cols-3">
      <SupportItem icon="support" title="Product Support" text="Up to 3 years on-site warranty available for your peace of mind." />
      <SupportItem icon="account" title="Personal Account" text="With big discounts, free delivery and a dedicated support specialist." />
      <SupportItem icon="save" title="Amazing Savings" text="Up to 70% off new Products, you can be sure of the best price." />
    </div>
  );
}

export function Newsletter() {
  return (
    <section className="bg-wash py-7">
      <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h3 className="text-[22px] font-semibold">Sign Up To Our Newsletter.</h3>
          <p className="text-muted">Be the first to hear about the latest offers.</p>
        </div>
        <form
          className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            e.currentTarget.reset();
            alert("Thanks for subscribing!");
          }}
        >
          <input
            type="email"
            required
            placeholder="Your Email"
            className="h-[50px] w-full rounded-full border border-line px-[18px] sm:w-80"
          />
          <Btn variant="dark">Subscribe</Btn>
        </form>
      </Container>
    </section>
  );
}

function Col({ title, links }) {
  return (
    <div>
      <h4 className="mb-3.5 text-sm font-semibold">{title}</h4>
      {links.map(([to, label]) =>
        to.startsWith("/") ? (
          <Link key={label} to={to} className="block py-1 text-[#aaa] hover:text-white">
            {label}
          </Link>
        ) : (
          <a key={label} href={to} className="block py-1 text-[#aaa] hover:text-white">
            {label}
          </a>
        )
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-black py-12 pb-5 text-[13px] text-white">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Col
            title="Information"
            links={[
              ["/about", "About Us"],
              ["#zip", "About Zip"],
              ["#privacy", "Privacy Policy"],
              ["/catalog", "Search"],
              ["/faq", "Terms"],
              ["/faq", "Orders and Returns"],
              ["/contact", "Contact Us"],
              ["/catalog", "Advanced Search"],
              ["#nl", "Newsletter Subscription"],
            ]}
          />
          <Col
            title="PC Parts"
            links={[
              ["/catalog/parts", "CPUS"],
              ["/catalog/parts", "Add On Cards"],
              ["/catalog/parts", "Hard Drives (Internal)"],
              ["/catalog/parts", "Graphic Cards"],
              ["/catalog/parts", "Keyboards / Mice"],
              ["/catalog/parts", "Cases / Power Supplies / Cooling"],
              ["/catalog/parts", "RAM (Memory)"],
              ["/catalog/parts", "Software"],
              ["/catalog/parts", "Speakers / Headsets"],
              ["/catalog/parts", "Motherboards"],
            ]}
          />
          <div>
            <Col
              title="Desktop PCs"
              links={[
                ["/catalog/desktops", "Custom PCs"],
                ["/catalog/desktops", "Servers"],
                ["/catalog/desktops", "MSI All-In-One PCs"],
                ["/catalog/desktops", "HP/Compaq PCs"],
                ["/catalog/desktops", "ASUS PCs"],
                ["/catalog/desktops", "Tecs PCs"],
              ]}
            />
            <h4 className="mb-3.5 mt-[22px] text-sm font-semibold">Laptops</h4>
            {[
              "Everyday Use Notebooks",
              "MSI Workstation Series",
              "MSI Prestige Series",
              "Tablets and Pads",
              "Netbooks",
              "Infinity Gaming Notebooks",
            ].map((l) => (
              <Link key={l} to="/catalog/laptops" className="block py-1 text-[#aaa] hover:text-white">
                {l}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="mb-3.5 text-sm font-semibold">Address</h4>
            <p>Address: 1234 Street Adress City Address, 1234</p>
            <p>Phones: (00) 1234 5678</p>
            <p>
              We are open: Monday-Thursday: 9:00 AM - 5:30 PM
              <br />
              Friday: 9:00 AM - 6:00 PM
              <br />
              Saturday: 11:00 AM - 5:00 PM
            </p>
            <p>E-mail: shop@email.com</p>
          </div>
        </div>
        <div className="mt-8 flex justify-between border-t border-neutral-800 pt-4 text-xs text-neutral-500">
          <span>Copyright © Shop Pty. Ltd.</span>
          <span>PayPal · Visa · Mastercard</span>
        </div>
      </Container>
    </footer>
  );
}
