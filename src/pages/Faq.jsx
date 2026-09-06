import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Crumbs, Page } from "../components/ui.jsx";

const sections = [
  {
    id: "defs",
    title: "Definitions & Interpretation",
    body: `In the following Terms and Conditions of sale, unless the context requires otherwise (a) "Shop" means Shop Pty Ltd ABN 11 222 333 444; (b) "Customer" means the person or corporation placing an order for the purchase of goods or services from Shop; (c) "Products" means any goods, materials, equipment or services provided to the Customer by Shop; (d) if the Customer comprises more than one person, each of those person’s liability is joint and several; (e) references to a party or a person includes any form of entity and their respective successors, assigns and representatives; (f) for all periods and times specified in clauses 5 and 11, time is of the essence; and (g) all references to currency are references to Australian dollars.`,
  },
  {
    id: "general",
    title: "General",
    body: `By ordering the Products and/or accepting delivery of the Products from Shop, the Customer agrees that it is bound by these Terms and Conditions of sale. Customer orders, including orders placed via the internet, are subject to acceptance by Shop. The acceptance of the Customer's order by Shop is expressly made conditional upon the Customer's assent to these Terms and Conditions which will prevail notwithstanding anything that may be stated to the contrary on the Customer's order. Shop reserves the right to vary any of these terms at any time and any subsequent orders placed by the Customer will constitute an acceptance of the terms as varied. Once a Customer order has been placed and accepted by Shop, the Customer agrees that the Customer has no right to cancel or vary the order at any time, unless agreed upon in writing by both parties.`,
  },
  {
    id: "quotes",
    title: "Quotations",
    body: `Any quotation by Shop to the Customer will be open for acceptance by the Customer within the period stated in the quotation or, where no period is stated, within seven (7) days from the date of the quotation. Thereafter, prices stated in the quotation may be varied by Shop without notice to the Customer.`,
  },
  {
    id: "prices",
    title: "Prices / Taxes",
    body: `The prices charged by and payable to Shop will be the ruling prices applicable at the time of order placement, provided that the Products are accepted for delivery within a reasonable time. Prices are subject to change without notice. Recommended retail prices are provided for indicative purposes only and there is no obligation for Shop to comply with that recommendation. Prices include GST, but do not include any other tax or duty, which is in addition to the price and is to be paid by the Customer at the time of payment for the Products.`,
  },
  {
    id: "pay",
    title: "Terms of Payment",
    body: `Credit Card Payments may attract a surcharge, and Shop will inform the Customer if this is to be the case before processing the transaction. Unless otherwise agreed in writing by Shop, where Shop has not agreed in writing to provide commercial credit to the Customer, the total purchase price for Products supplied will be due for payment in cash prior to delivery. Where Shop has agreed in writing to provide commercial credit to the Customer, the Customer must make payments in accordance with the payment terms provided by Shop.`,
  },
  {
    id: "credit",
    title: "Credit Accounts",
    body: `Any commercial credit arrangements that are provided to the Customer by Shop will continue until terminated by Shop at its sole discretion. In the event that Shop terminates the Customer's commercial credit arrangement, the Customer will be notified in writing and termination will take effect upon receipt of that notification by the Customer.`,
  },
  {
    id: "owner",
    title: "Change of Ownership",
    body: `Trading accounts are approved by Shop based on the information supplied and the representations made by the Customer. In the event that there is a change in ownership of the Customer, whether total or partial, the Customer must immediately provide written notice to Shop informing Shop of these changes.`,
  },
  {
    id: "info",
    title: "Information on the Products supplied",
    body: `All descriptive specifications, illustrations, drawings, data, dimensions and weights furnished by Shop or otherwise contained in catalogues or other advertising material are approximate only and are intended to be merely a general description of the goods, are not incorporated within this agreement and do not form part of the description of the goods sold under this or any other agreement unless otherwise agreed to in writing by Shop.`,
  },
  {
    id: "delivery",
    title: "Delivery",
    body: `The means of delivering the Products to the Customer will be at Shop' discretion. Shop reserves the right to deliver Products in part deliveries. In the event that Shop incurs additional costs for meeting special (i.e. Tasmania / Northern Territory Deliveries) or urgent delivery arrangements, these additional costs may be charged to the Customer. Shop will not be liable for any loss or damage resulting from any late delivery of the Products and late delivery will not entitle the Customer to rescind or repudiate the Customer's order for the Products.`,
  },
];

export default function Faq() {
  const [active, setActive] = useState(sections[0].id);
  const current = sections.find((s) => s.id === active) || sections[0];
  return (
    <Page>
      <Container>
        <Crumbs>
          <Link to="/" className="hover:text-brand">Home</Link> › Login
        </Crumbs>
        <h1 className="mb-5 text-[28px] font-semibold">Shop Terms & Conditions</h1>
        <p className="mb-5 text-muted">GENERAL TERMS AND CONDITIONS FOR SALE OF PRODUCTS AND SERVICES</p>
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <nav>
            {sections.map((s) => (
              <button
                key={s.id}
                className={`block w-full border-0 bg-transparent py-2 text-left ${active === s.id ? "font-semibold text-brand" : "text-neutral-600"}`}
                onClick={() => setActive(s.id)}
              >
                {s.title}
              </button>
            ))}
          </nav>
          <article className="mb-7">
            <h3 className="mb-2.5 text-xl font-semibold">{current.title}</h3>
            <p className="text-neutral-700">{current.body}</p>
          </article>
        </div>
      </Container>
    </Page>
  );
}
