import { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { categories, money, priceBuckets, products } from "../data";
import { useShop } from "../context.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { Stars } from "../components/Icons.jsx";
import { Btn, Container, Crumbs, Page, productGrid } from "../components/ui.jsx";

const labelCls = "flex cursor-pointer items-center gap-2 py-1 text-[13px]";
const chip = "cursor-pointer rounded-[20px] border border-line bg-white px-2.5 py-1 text-xs";

export default function Catalog() {
  const { category } = useParams();
  const [params] = useSearchParams();
  const q = (params.get("q") || "").toLowerCase();
  const { addToCart, compare, toggleCompare } = useShop();
  const cat = categories.find((c) => c.slug === category);
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("position");
  const [perPage, setPerPage] = useState(35);
  const [page, setPage] = useState(1);
  const [stockOnly, setStockOnly] = useState(false);
  const [price, setPrice] = useState(null);
  const [brand, setBrand] = useState("all");
  const brands = [...new Set(products.map((p) => p.brand))];

  const filtered = useMemo(() => {
    let list = products.filter((p) => (category ? p.category === category : true));
    if (q) list = list.filter((p) => p.title.toLowerCase().includes(q) || p.short.toLowerCase().includes(q));
    if (stockOnly) list = list.filter((p) => p.inStock);
    if (price) list = list.filter((p) => p.price >= price[0] && p.price < price[1]);
    if (brand !== "all") list = list.filter((p) => p.brand === brand);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, q, stockOnly, price, brand, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const slice = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <Page>
      <Container>
        <Crumbs>
          <Link to="/" className="hover:text-brand">Home</Link> › {cat ? cat.label : "Laptops"} › Everyday Use Notebooks › MSI Prestige Series › MSI WS Series
        </Crumbs>
        <h1 className="mb-[18px] text-[32px] font-semibold">
          {cat?.label || "MSI PS Series"} ({filtered.length})
        </h1>
        <div className="grid gap-7 lg:grid-cols-[260px_1fr]">
          <aside>
            <Link to="/" className="mb-2.5 inline-flex text-[13px] text-brand">‹ Back</Link>
            <h3 className="mb-3 text-base font-semibold">Filters</h3>
            <button className={chip} onClick={() => { setStockOnly(false); setPrice(null); setBrand("all"); }}>Clear Filter</button>
            <div className="border-b border-neutral-200 py-3.5">
              <h4 className="mb-2.5 text-sm font-semibold">Category</h4>
              {["CUSTOM PCS", "MSI ALL-IN-ONE PCS", "HP/COMPAQ PCS"].map((n) => (
                <label key={n} className={labelCls}>
                  <input type="checkbox" /> {n} <span className="ml-auto text-muted">24</span>
                </label>
              ))}
            </div>
            <div className="border-b border-neutral-200 py-3.5">
              <h4 className="mb-2.5 text-sm font-semibold">Price</h4>
              {priceBuckets.map(([a, b]) => (
                <label key={a} className={labelCls}>
                  <input type="radio" name="price" checked={price?.[0] === a} onChange={() => setPrice([a, b])} />
                  {b === Infinity ? `${money(a)} And Above` : `${money(a)} - ${money(b)}`}
                </label>
              ))}
            </div>
            <div className="border-b border-neutral-200 py-3.5">
              <h4 className="mb-2.5 text-sm font-semibold">Color</h4>
              <label className={labelCls}><input type="checkbox" /> Black</label>
              <label className={labelCls}><input type="checkbox" /> White</label>
            </div>
            <div className="border-b border-neutral-200 py-3.5">
              <h4 className="mb-2.5 text-sm font-semibold">Filter Name</h4>
              <label className={labelCls}>
                <input type="checkbox" checked={stockOnly} onChange={(e) => setStockOnly(e.target.checked)} /> in stock
              </label>
              <Btn size="sm" className="mt-2.5" onClick={() => setPage(1)}>Apply Filters (2)</Btn>
            </div>
            <div className="border-b border-neutral-200 py-3.5">
              <h4 className="mb-2.5 text-sm font-semibold">Brands</h4>
              <label className={labelCls}>
                <input type="radio" name="brand" checked={brand === "all"} onChange={() => setBrand("all")} /> All Brands
              </label>
              {brands.map((b) => (
                <label key={b} className={labelCls}>
                  <input type="radio" name="brand" checked={brand === b} onChange={() => setBrand(b)} /> {b}
                </label>
              ))}
            </div>
            <div className="mt-5 border border-line p-3.5 text-[13px]">
              <strong>Compare Products</strong>
              <p>{compare.length ? `${compare.length} item(s)` : "You have no items to compare."}</p>
            </div>
          </aside>

          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <button className={chip}>CUSTOM PCS (24)</button>
                <button className={chip}>HP/COMPAQ PCS (24)</button>
                <button className={chip}>Clear All</button>
              </div>
              <div className="flex items-center gap-3">
                <label>
                  Sort By:{" "}
                  <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-line">
                    <option value="position">Position</option>
                    <option value="price-asc">Price ↑</option>
                    <option value="price-desc">Price ↓</option>
                  </select>
                </label>
                <label>
                  Show:{" "}
                  <select value={perPage} onChange={(e) => { setPerPage(+e.target.value); setPage(1); }} className="border border-line">
                    <option value={15}>15 per page</option>
                    <option value={35}>35 per page</option>
                    <option value={61}>61 per page</option>
                  </select>
                </label>
                <div className="flex gap-1.5">
                  {["grid", "list"].map((v) => (
                    <button
                      key={v}
                      className={`h-[34px] w-[34px] border ${view === v ? "border-brand text-brand" : "border-line bg-white"}`}
                      onClick={() => setView(v)}
                    >
                      {v === "grid" ? "▦" : "☰"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <p className="mb-3 text-muted">
              Items {(page - 1) * perPage + 1}-{Math.min(page * perPage, filtered.length)} of {filtered.length}
            </p>

            {view === "grid" ? (
              <div className={productGrid}>
                {slice.map((p) => (
                  <ProductCard key={p.id} product={p} compact />
                ))}
              </div>
            ) : (
              slice.map((p) => (
                <div className="grid items-center gap-5 border-b border-neutral-200 py-[18px] md:grid-cols-[180px_1fr_180px]" key={p.id}>
                  <Link to={`/product/${p.id}`}>
                    <img src={p.image} alt="" className="mx-auto h-[140px] object-contain" />
                  </Link>
                  <div>
                    <div className="text-muted">SKU {p.sku}</div>
                    <h3>
                      <Link to={`/product/${p.id}`}>{p.title}</Link>
                    </h3>
                    <Stars rating={p.rating || 4} reviews={p.reviews || 4} />
                    <p className="text-muted">CPU N/A · Featured N/A · I/O Ports N/A</p>
                    <label>
                      <input type="checkbox" checked={compare.includes(p.id)} onChange={() => toggleCompare(p.id)} /> Add To Compare
                    </label>
                  </div>
                  <div>
                    <div className="text-xs text-muted line-through">{money(p.oldPrice || p.price)}</div>
                    <div className="text-lg font-semibold">{money(p.price)}</div>
                    <Btn size="sm" className="mt-2.5" onClick={() => addToCart(p.id)}>Add To Cart</Btn>
                  </div>
                </div>
              ))
            )}

            <div className="mt-7 flex justify-center gap-1.5">
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  className={`h-9 min-w-9 border ${page === i + 1 ? "border-brand bg-brand text-white" : "border-line bg-white"}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Page>
  );
}
