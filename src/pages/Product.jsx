import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asset, getProduct, money, products } from "../data";
import { useShop } from "../context.jsx";
import { Stars } from "../components/Icons.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { Btn, Container, Crumbs, Page, productGrid, Qty, SectionHead, ZipPay } from "../components/ui.jsx";

export default function Product() {
  const { id } = useParams();
  const product = getProduct(id) || products.find((p) => p.id === "msi-trident-3") || products[0];
  const { addToCart } = useShop();
  const nav = useNavigate();
  const [tab, setTab] = useState("about");
  const [qty, setQty] = useState(1);
  const [photo, setPhoto] = useState(0);
  const images = product.images?.length ? product.images : [product.image];

  return (
    <Page>
      <Container>
        <Crumbs>
          <Link to="/" className="hover:text-brand">Home</Link> › <Link to="/catalog/laptops" className="hover:text-brand">Laptops</Link> › MSI WS Series
        </Crumbs>
        <div className="mb-10 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-3 grid h-[420px] place-items-center border border-neutral-200">
              <img src={images[photo]} alt={product.title} className="max-h-[400px] object-contain" />
            </div>
            <div className="flex gap-2">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  className={`h-[72px] w-[72px] border bg-white p-1 ${photo === i ? "border-brand" : "border-line"}`}
                  onClick={() => setPhoto(i)}
                >
                  <img src={src} alt="" className="h-full object-contain" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <h1 className="my-1.5 text-[32px] font-semibold">{product.title}</h1>
            <Stars rating={product.rating} reviews={product.reviews} />
            {product.reviews === 0 && <p className="text-muted">Be the first to review this product</p>}
            <ul className="my-4 text-[13px]">
              {(product.bullets || product.short.split(",").map((s) => s.trim())).map((b) => (
                <li key={b} className="py-0.5">• {b}</li>
              ))}
            </ul>
            <p>
              <Link to="/contact" className="text-brand underline">Have a Question? Contact Us</Link>
              <span className="text-xs text-muted"> SKU {product.sku}</span>
            </p>
            <ZipPay className="py-3" />
            <p className="text-muted">+ More information</p>
            <div className="my-4 text-[28px] font-semibold">On Sale from {money(product.price)}</div>
            <div className="my-4 flex items-center gap-3">
              <Qty
                value={qty}
                onDec={() => setQty((q) => Math.max(1, q - 1))}
                onInc={() => setQty((q) => q + 1)}
                onChange={(e) => setQty(Math.max(1, +e.target.value || 1))}
              />
              <Btn
                onClick={() => {
                  addToCart(product.id, qty);
                  nav("/cart");
                }}
              >
                Add to Cart
              </Btn>
            </div>
          </div>
        </div>

        <div className="mt-6 flex border-b-2 border-neutral-200">
          {["about", "details", "specs"].map((t) => (
            <button
              key={t}
              className={`-mb-0.5 border-0 border-b-2 bg-transparent px-[22px] py-3 font-semibold ${tab === t ? "border-brand text-brand" : "border-transparent"}`}
              onClick={() => setTab(t)}
            >
              {t === "about" ? "About Product" : t === "details" ? "Details" : "Specs"}
            </button>
          ))}
        </div>
        <div className="py-7">
          {tab === "about" && (
            <>
              <div className="grid items-center gap-7 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <h2 className="mb-3 text-4xl font-semibold">
                    Outplay the
                    <br />
                    Competittion
                  </h2>
                  <p>
                    Experience a 40% boost in computing from last generation. MSI Desktop equips the 10th Gen. Intel® Core™ i7
                    processor with the upmost computing power to bring you an unparalleled gaming experience.
                  </p>
                  <p className="mt-2 text-muted">*Performance compared to i7-9700. Specs varies by model.</p>
                </div>
                <img src={asset("img/intel.jpg")} alt="Intel Core i7 10th Gen" className="h-[280px] w-full object-cover" />
              </div>
              <div className="mt-6 flex gap-7">
                <Link to="/contact">Product Support →</Link>
                <Link to="/faq">FAQ →</Link>
                <Link to="/about">Our Buyer Guide →</Link>
              </div>
              <h3 className="mt-9 mb-3">Featues</h3>
              <p>
                The MPG series brings out the best in gamers by allowing full expression in color with advanced RGB lighting
                control and synchronization.
              </p>
              <div className="mt-7 grid gap-[18px] md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <h4 className="mb-2 text-sm font-semibold">Intel® Core™ i7</h4>
                  <p>processor with the upmost computing power to bring you an unparalleled gaming experience.</p>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-semibold">GeForce® RTX SUPER™</h4>
                  <p>The new series has more cores and higher clocks for superfast performance compared to previous-gen GPUs.</p>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-semibold">NVMe SSD</h4>
                  <p>Unleash the full potential with the latest SSD technology. 6 times faster than traditional SATA SSD.</p>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-semibold">DDR4 2933MHz</h4>
                  <p>Featuring the latest 10th Gen Intel® Core™ processors, memory can support up to DDR4 2933MHz.</p>
                </div>
              </div>
            </>
          )}
          {tab === "details" && (
            <p>
              {product.short} Complete business IT solutions, centred on high quality hardware and exceptional customer
              service. On-site warranty available. SKU {product.sku}.
            </p>
          )}
          {tab === "specs" && (
            <table className="w-full border-collapse">
              <tbody>
                {["CPU", "Featured", "I/O Ports"].map((row) => (
                  <tr key={row}>
                    <td className="w-[220px] border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 font-semibold">{row}</td>
                    <td className="border border-neutral-200 px-3.5 py-2.5">N/A</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <SectionHead title="Related Products" />
        <div className={productGrid}>
          {products.filter((p) => p.id !== product.id).slice(0, 5).map((p) => (
            <ProductCard key={p.id} product={p} compact />
          ))}
        </div>
      </Container>
    </Page>
  );
}
