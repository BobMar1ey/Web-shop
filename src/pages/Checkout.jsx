import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { money } from "../data";
import { useShop } from "../context.jsx";
import { Btn, Container, control, Crumbs, Field, Page } from "../components/ui.jsx";

export default function Checkout() {
  const { cartItems, subtotal, clearCart, user } = useShop();
  const nav = useNavigate();
  const [step, setStep] = useState(user ? 2 : 1);
  const shipping = 21;
  const tax = 1.91;
  const total = subtotal + shipping + tax;

  if (!cartItems.length) {
    return (
      <Page>
        <Container>
          <p>
            Cart is empty. <Link to="/catalog" className="text-brand underline">Continue shopping</Link>
          </p>
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      <Container>
        <Crumbs>
          <Link to="/" className="hover:text-brand">Home</Link> › <Link to="/cart" className="hover:text-brand">Shopping Cart</Link> › Checkout Process
        </Crumbs>
        <div className="mb-6 flex gap-7 font-semibold">
          {["1 Checkout Sign In", "2 Shipping", "3 Review & Payments"].map((label, i) => (
            <span key={label} className={step === i + 1 ? "border-b-2 border-brand pb-1.5 text-brand" : "text-muted"}>
              {label}
            </span>
          ))}
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            {step === 1 && (
              <div className="grid gap-12 md:grid-cols-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep(2);
                  }}
                >
                  <h2 className="mb-2 text-[28px] font-semibold">Registered Customers</h2>
                  <p className="mb-[18px] text-neutral-600">If you have an account, sign in with your email address.</p>
                  <Field label="Email *">
                    <input type="email" required className={control} />
                  </Field>
                  <Field label="Password *" className="mt-3.5">
                    <input type="password" required className={control} />
                  </Field>
                  <div className="mt-4 flex gap-3">
                    <Btn>Sign In</Btn>
                    <Link to="/login" className="self-center text-brand underline">Forgot Your Password?</Link>
                  </div>
                </form>
                <div>
                  <h2 className="mb-2 text-[28px] font-semibold">New Customer?</h2>
                  <p className="mb-[18px] text-neutral-600">Creating an account has many benefits:</p>
                  <ul>
                    <li>• Check out faster</li>
                    <li>• Keep more than one address</li>
                    <li>• Track orders and more</li>
                  </ul>
                  <Btn className="mt-4" onClick={() => nav("/register")}>Create An Account</Btn>
                  <Btn variant="ghost" className="mt-2.5" onClick={() => setStep(2)}>Continue as Guest</Btn>
                </div>
              </div>
            )}

            {step === 2 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(3);
                }}
              >
                <h2 className="text-[28px] font-semibold">Shipping Address</h2>
                <p className="text-muted">You can create an account after checkout.</p>
                <div className="mt-4 grid grid-cols-1 gap-3.5 md:grid-cols-2">
                  <Field label="Email Address *" full>
                    <input type="email" required defaultValue={user?.email} className={control} />
                  </Field>
                  <Field label="First Name *"><input required className={control} /></Field>
                  <Field label="Last Name *"><input required className={control} /></Field>
                  <Field label="Company"><input className={control} /></Field>
                  <Field label="Street Address *"><input required className={control} /></Field>
                  <Field label="City *"><input required className={control} /></Field>
                  <Field label="State/Province *">
                    <select required defaultValue="" className={control}>
                      <option value="">Please, select a region, state or province</option>
                      <option>Victoria</option>
                      <option>NSW</option>
                    </select>
                  </Field>
                  <Field label="Zip/Postal Code *"><input required className={control} /></Field>
                  <Field label="Country *">
                    <select defaultValue="United States" className={control}>
                      <option>United States</option>
                      <option>Australia</option>
                    </select>
                  </Field>
                  <Field label="Phone Number *"><input required className={control} /></Field>
                </div>
                <h3 className="mt-6 mb-3">Shipping Methods</h3>
                <label className="flex flex-col gap-1.5 text-[13px]">
                  <span>
                    <input type="radio" name="rate" defaultChecked /> Standard Rate — Price may vary depending on the
                    item/destination. Shop Staff will contact you. $21.00
                  </span>
                </label>
                <label className="mt-2 flex flex-col gap-1.5 text-[13px]">
                  <span>
                    <input type="radio" name="rate" /> Pickup from store — 1234 Street Adress City Address, 1234 $0.00
                  </span>
                </label>
                <Btn className="mt-5">Next</Btn>
              </form>
            )}

            {step === 3 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  clearCart();
                  alert("Order placed. Thank you!");
                  nav("/");
                }}
              >
                <h2 className="text-[28px] font-semibold">Review & Payments</h2>
                <p className="text-neutral-600">Payment method: Credit Card or PayPal (demo checkout).</p>
                <Field label="Card number" className="mt-4 max-w-[360px]">
                  <input placeholder="•••• •••• •••• ••••" className={control} />
                </Field>
                <Btn className="mt-4">Place Order</Btn>
              </form>
            )}
          </div>
          <aside className="border border-line p-5">
            <h3 className="mb-4 font-semibold">Order Summary</h3>
            <p className="text-muted">{cartItems.length} Items in Cart</p>
            {cartItems.map((item) => (
              <div className="grid grid-cols-[64px_1fr_auto] gap-2.5 border-b border-neutral-200 py-3 text-[13px]" key={item.id}>
                <img src={item.image} alt="" className="h-16 w-16 object-contain" />
                <div>
                  {item.short}
                  <div className="text-muted">Qty {item.qty}</div>
                </div>
                <strong>{money(item.price)}</strong>
              </div>
            ))}
            <div className="mt-2 flex justify-between border-t border-neutral-200 pt-3 text-lg font-bold">
              <span>Order Total</span>
              <span>{money(total)}</span>
            </div>
          </aside>
        </div>
      </Container>
    </Page>
  );
}
