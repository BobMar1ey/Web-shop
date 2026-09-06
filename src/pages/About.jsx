import { Link } from "react-router-dom";
import { asset } from "../data";
import { Btn, Container, Crumbs, Page } from "../components/ui.jsx";

function Block({ img, reverse, title, children }) {
  return (
    <div className={`mb-10 grid items-center gap-8 md:grid-cols-2 ${reverse ? "" : ""}`}>
      {img && !reverse && <img src={img} alt="" className="h-80 w-full object-cover" />}
      <div>
        <h2 className="mb-3 text-4xl font-semibold">{title}</h2>
        {children}
      </div>
      {img && reverse && <img src={img} alt="" className="h-80 w-full object-cover" />}
    </div>
  );
}

export default function About() {
  return (
    <Page>
      <Container>
        <Crumbs>
          <Link to="/" className="hover:text-brand">Home</Link> › About Us
        </Crumbs>
        <h1 className="mb-6 text-[32px] font-semibold">About Us</h1>
        <Block img={asset("img/product-main.jpg")} title="A Family That Keeps On Growing">
          <p>
            We always aim to please the home market, supplying great computers and hardware at great prices to non-corporate
            customers, through our large Melbourne CBD showroom and our online store.
          </p>
          <p className="mt-3">
            Shop management approach fosters a strong customer service focus in our staff. We prefer to cultivate long-term
            client relationships rather than achieve quick sales, demonstrated in the measure of our long-term success.
          </p>
        </Block>
        <Block img={asset("img/products/p14.jpg")} reverse title="Shop.com">
          <p>
            Shop.com is a proudly Australian owned, Melbourne based supplier of I.T. goods and services, operating since
            1991. Our client base encompasses individuals, small business, corporate and government organisations. We
            provide complete business IT solutions, centred on high quality hardware and exceptional customer service.
          </p>
        </Block>
        <Block img={asset("img/intel.jpg")} title="Now You're In Safe Hands">
          <p>
            Experience a 40% boost in computing from last generation. MSI Desktop equips the 10th Gen. Intel® Core™ i7
            processor with the upmost computing power to bring you an unparalleled gaming experience.
          </p>
          <p className="mt-2 text-muted">*Performance compared to i7-9700. Specs varies by model.</p>
        </Block>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-3 text-[28px] font-semibold">The Highest Quality of Products</h2>
            <p>
              We guarantee the highest quality of the products we sell. Several decades of successful operation and millions of
              happy customers let us feel certain about that. Besides, all items we sell pass thorough quality control, so no
              characteristics mismatch can escape the eye of our professionals.
            </p>
          </div>
          <div>
            <h2 className="mb-3 text-[28px] font-semibold">We Deliver to Any Regions</h2>
            <p>
              We deliver our goods all across Australia. No matter where you live, your order will be shipped in time and
              delivered right to your door or to any other location you have stated. The packages are handled with utmost
              care, so the ordered products will be handed to you safe and sound, just like you expect them to be.
            </p>
          </div>
        </div>
        <blockquote className="mx-auto my-12 max-w-[820px] text-center">
          <p className="text-lg font-medium leading-relaxed">
            “ My first order arrived today in perfect condition. From the time I sent a question about the item to making the
            purchase, to the shipping and now the delivery, your company, Tecs, has stayed in touch. Such great service. I look
            forward to shopping on your site in the future and would highly recommend it.
          </p>
          <cite className="mt-4 block not-italic text-neutral-600">- Tama Brown</cite>
          <Btn to="/contact" variant="ghost" size="sm" className="mt-4">Leave Us A Review</Btn>
        </blockquote>
      </Container>
    </Page>
  );
}
