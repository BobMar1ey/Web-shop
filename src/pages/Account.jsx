import { Link, Navigate } from "react-router-dom";
import { useShop } from "../context.jsx";
import { Container, Crumbs, Page } from "../components/ui.jsx";

const links = [
  "Account Dashboard",
  "Account Information",
  "Address Book",
  "My Orders",
  "My Downloadable Products",
  "Stored Payment Methods",
  "Billing Agreements",
  "My Wish List",
  "My Product Reviews",
  "Newsletter Subscriptions",
];

function Card({ title, children }) {
  return (
    <div className="mb-4 border border-neutral-200 p-[18px]">
      <h4 className="font-semibold">{title}</h4>
      {children}
    </div>
  );
}

export default function Account() {
  const { user, setUser, compare, wishlist } = useShop();
  if (!user) return <Navigate to="/login" replace />;

  return (
    <Page>
      <Container>
        <Crumbs>
          <Link to="/" className="hover:text-brand">Home</Link> › My Dashboard
        </Crumbs>
        <h1 className="mb-5 text-[32px] font-semibold">My Dashboard</h1>
        <div className="grid gap-7 lg:grid-cols-[240px_1fr_240px]">
          <nav>
            {links.map((l, i) => (
              <a key={l} className={`block py-2 text-sm ${i === 0 ? "font-semibold text-brand" : ""}`}>
                {l}
              </a>
            ))}
            <button className="mt-3 border-0 bg-transparent text-brand underline" onClick={() => setUser(null)}>
              Sign Out
            </button>
          </nav>
          <div>
            <h3 className="font-semibold">Account Information</h3>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <Card title="Contact Information">
                <p>{user.name}</p>
                <p className="text-muted">{user.email}</p>
                <p>
                  <a className="text-brand underline">Edit</a> · <a className="text-brand underline">Change Password</a>
                </p>
              </Card>
              <Card title="Newsletters">
                <p>You don't subscribe to our newsletter.</p>
                <a className="text-brand underline">Edit</a>
              </Card>
            </div>
            <h3 className="mt-6 mb-3 font-semibold">Address Book</h3>
            <a className="text-brand underline">Manage Addresses</a>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <Card title="Default Billing Address">
                <p>You have not set a default billing address.</p>
                <a className="text-brand underline">Edit Address</a>
              </Card>
              <Card title="Default Shipping Address">
                <p>You have not set a default shipping address.</p>
                <a className="text-brand underline">Edit Address</a>
              </Card>
            </div>
          </div>
          <aside>
            <div className="mb-4 border border-line p-3.5 text-[13px]">
              <strong>Compare Products</strong>
              <p>{compare.length ? `${compare.length} item(s)` : "You have no items to compare."}</p>
            </div>
            <div className="border border-line p-3.5 text-[13px]">
              <strong>My Wish List</strong>
              <p>{wishlist.length ? `${wishlist.length} item(s)` : "You have no items in your wish list."}</p>
            </div>
          </aside>
        </div>
      </Container>
    </Page>
  );
}
