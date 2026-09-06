import { useState } from "react";
import { Link } from "react-router-dom";
import { money } from "../data";
import { useShop } from "../context.jsx";
import { Btn, Container, control, Crumbs, Field, Page, Qty, ZipPay } from "../components/ui.jsx";

export default function Cart() {
  const { cartItems, setQty, removeFromCart, clearCart, subtotal } = useShop();
  const [code, setCode] = useState("");
  const [shipOpen, setShipOpen] = useState(false);
  const shipping = cartItems.length ? 21 : 0;
  const tax = +(subtotal * 0.0015 || 1.91).toFixed(2);
  const gst = tax;
  const total = subtotal + shipping + tax;

  return (
    <Page>
      <Container>
        <Crumbs>
          <Link to="/" className="hover:text-brand">Home</Link> › Shopping Cart
        </Crumbs>
        <h1 className="mb-5 text-[32px] font-semibold">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>
            Your cart is empty.{" "}
            <Link to="/catalog" className="text-brand underline">Continue Shopping</Link>
          </p>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <div>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {["Item", "Price", "Qty", "Subtotal", ""].map((h) => (
                      <th key={h} className="border-b border-neutral-200 py-2 text-left text-[13px] font-medium text-muted">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="border-b border-neutral-200 px-2 py-[18px] align-middle">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt="" className="h-20 w-20 object-contain" />
                          <div>{item.title}</div>
                        </div>
                      </td>
                      <td className="border-b border-neutral-200 px-2 py-[18px]">{money(item.price)}</td>
                      <td className="border-b border-neutral-200 px-2 py-[18px]">
                        <Qty
                          value={item.qty}
                          onDec={() => setQty(item.id, item.qty - 1)}
                          onInc={() => setQty(item.id, item.qty + 1)}
                          onChange={(e) => setQty(item.id, +e.target.value || 1)}
                        />
                      </td>
                      <td className="border-b border-neutral-200 px-2 py-[18px]">{money(item.price * item.qty)}</td>
                      <td className="border-b border-neutral-200 px-2 py-[18px]">
                        <button className="grid h-11 w-11 place-items-center" onClick={() => removeFromCart(item.id)}>✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex flex-wrap gap-3">
                <Btn to="/catalog" variant="ghost">Continue Shopping</Btn>
                <Btn variant="ghost" onClick={clearCart}>Clear Shopping Cart</Btn>
                <Btn variant="ghost">Update Shopping Cart</Btn>
              </div>

              <div className="mt-7">
                <button className="border-0 bg-transparent text-brand underline" onClick={() => setShipOpen((v) => !v)}>
                  Estimate Shipping and Tax
                </button>
                {shipOpen && (
                  <div className="mt-3 grid max-w-md grid-cols-2 gap-3.5">
                    <p className="col-span-full text-muted">Enter your destination to get a shipping estimate.</p>
                    <Field label="Country" full>
                      <select defaultValue="Australia" className={control}>
                        <option>Australia</option>
                        <option>United States</option>
                      </select>
                    </Field>
                    <Field label="State/Province">
                      <input className={control} />
                    </Field>
                    <Field label="Zip/Postal Code">
                      <input className={control} />
                    </Field>
                    <label className="col-span-full text-[13px]">
                      <input type="radio" name="ship" defaultChecked /> Standard Rate — Price may vary depending on the
                      item/destination. Shop Staff will contact you. $21.00
                    </label>
                    <label className="col-span-full text-[13px]">
                      <input type="radio" name="ship" /> Pickup from store — 1234 Street Adress City Address, 1234 $0.00
                    </label>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h4>Apply Discount Code</h4>
                <div className="mt-2 flex flex-col gap-2.5 sm:flex-row">
                  <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter discount code" className="h-[50px] rounded-full border border-line px-[18px]" />
                  <Btn variant="ghost">Apply Discount</Btn>
                </div>
              </div>
            </div>

            <aside className="border border-line p-5">
              <h3 className="mb-4 font-semibold">Summary</h3>
              <div className="flex justify-between py-2"><span>Subtotal</span><span>{money(subtotal)}</span></div>
              <div className="flex justify-between py-2"><span>Shipping</span><span>{money(shipping)}</span></div>
              <p className="text-xs text-muted">(Standard Rate - Price may vary depending on the item/destination. TECS Staff will contact you.)</p>
              <div className="flex justify-between py-2"><span>Tax</span><span>{money(tax)}</span></div>
              <div className="flex justify-between py-2"><span>GST (10%)</span><span>{money(gst)}</span></div>
              <div className="mt-2 flex justify-between border-t border-neutral-200 pt-3 text-lg font-bold">
                <span>Order Total</span>
                <span>{money(total)}</span>
              </div>
              <Btn to="/checkout" className="mt-4 w-full">Proceed to Checkout</Btn>
              <Btn variant="ghost" className="mt-2 w-full">Check out with PayPal</Btn>
              <p className="mt-2.5 text-xs text-muted">Check Out with Multiple Addresses</p>
              <ZipPay className="py-3" />
            </aside>
          </div>
        )}
      </Container>
    </Page>
  );
}
