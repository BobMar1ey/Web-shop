import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { asset, brands, heroSlides, instagram, news, products } from "../data";
import ProductCard from "../components/ProductCard.jsx";
import { Btn, Container, productGrid, productGrid6, SectionHead, ZipPay } from "../components/ui.jsx";

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);
  const slide = heroSlides[i];
  return (
    <section className="relative h-80 overflow-hidden bg-neutral-900 text-white md:h-[420px]">
      <img src={slide.image} alt="" className="h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 flex max-w-[820px] flex-col justify-center px-[8%]">
        <div className="mb-3 inline-block w-fit bg-white px-2 py-1 text-[11px] font-bold tracking-wide text-black">{slide.tag}</div>
        <h1 className="mb-2.5 text-[26px] font-bold leading-tight md:text-[42px]">{slide.title}</h1>
        <p className="mb-[18px] text-base">{slide.subtitle}</p>
        <Btn to="/catalog" variant="dark" className="w-fit">
          Shop Now
        </Btn>
        <div className="mt-3.5 text-[11px] tracking-wide text-neutral-300">{slide.note}</div>
      </div>
      <div className="absolute bottom-[18px] left-1/2 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, n) => (
          <button
            key={n}
            className={`h-2.5 w-2.5 rounded-full border-0 ${n === i ? "bg-white" : "bg-white/50"}`}
            onClick={() => setI(n)}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryRow({ title, tag, products: list, darkImg }) {
  return (
    <div className="my-7 grid min-h-[280px] gap-2 lg:grid-cols-[220px_1fr]">
      <div
        className="flex flex-col bg-cover bg-center p-7 text-white"
        style={{ backgroundImage: `linear-gradient(#0008,#0008), url(${darkImg})` }}
      >
        <h3 className="mb-3 text-[28px] leading-tight font-semibold">{title}</h3>
        <div className="my-2 mb-4 text-[13px]">
          {tag === "laptops" && (
            <>
              <Link to="/catalog/laptops" className="block py-0.5 opacity-85 hover:underline">MSI GS Series</Link>
              <Link to="/catalog/laptops" className="block py-0.5 opacity-85 hover:underline">MSI GT Series</Link>
              <Link to="/catalog/laptops" className="block py-0.5 opacity-85 hover:underline">MSI GL Series</Link>
              <Link to="/catalog/laptops" className="block py-0.5 opacity-85 hover:underline">MSI GE Series</Link>
            </>
          )}
          {tag === "desktops" && (
            <>
              <Link to="/catalog/desktops" className="block py-0.5 opacity-85 hover:underline">MSI Infinite Series</Link>
              <Link to="/catalog/desktops" className="block py-0.5 opacity-85 hover:underline">MSI Trident</Link>
              <Link to="/catalog/desktops" className="block py-0.5 opacity-85 hover:underline">MSI GL Series</Link>
              <Link to="/catalog/desktops" className="block py-0.5 opacity-85 hover:underline">MSI Nightblade</Link>
            </>
          )}
        </div>
        <Link to={`/catalog/${tag}`} className="mt-auto text-[13px] underline">
          See All Products
        </Link>
      </div>
      <div className={productGrid}>
        {list.map((p) => (
          <ProductCard key={p.id} product={p} compact />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const newest = products.filter((p) => p.tags?.includes("new")).slice(0, 6);
  const custom = products.filter((p) => p.tags?.includes("custom")).slice(0, 5);
  const msiLaptops = products.filter((p) => p.tags?.includes("msi-laptop")).slice(0, 5);
  const desktops = products.filter((p) => p.tags?.includes("msi-desktop")).slice(0, 5);
  const monitors = products.filter((p) => p.tags?.includes("monitor")).concat(products.slice(0, 3)).slice(0, 5);

  return (
    <>
      <Hero />
      <Container className="pt-9">
        <SectionHead title="New Products" to="/catalog" link="See All New Products" />
        <div className={productGrid6}>
          {newest.map((p) => (
            <ProductCard key={p.id} product={p} compact />
          ))}
        </div>
      </Container>

      <div id="zip" className="flex h-16 items-center justify-center bg-wash">
        <ZipPay />
      </div>

      <Container>
        <CategoryRow title={<>Custome<br />Builds</>} tag="desktops" products={custom} darkImg={asset("img/product-main.jpg")} />
        <CategoryRow
          title={<>MSI<br />Laptops</>}
          tag="laptops"
          products={msiLaptops.length ? msiLaptops : products.slice(0, 5)}
          darkImg={asset("img/products/p15.jpg")}
        />
        <CategoryRow title="Desktops" tag="desktops" products={desktops.length ? desktops : products.slice(4, 9)} darkImg={asset("img/product-alt.jpg")} />
        <CategoryRow title={<>Gaming<br />Monitors</>} tag="other" products={monitors} darkImg={asset("img/intel.jpg")} />

        <div className="flex flex-wrap justify-center gap-10 py-7 font-bold tracking-wide text-neutral-500">
          {brands.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>

        <div className="mt-12 mb-6 text-center">
          <h2 className="mb-[18px] text-[22px] font-semibold">Follow us on Instagram for News, Offers & More</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {news.map((n, i) => (
            <article key={i}>
              <img src={n.image} alt="" className="mb-2.5 h-[180px] w-full object-cover" />
              <p className="text-[13px] text-neutral-700">{n.text}</p>
              <time className="mt-2 block text-xs text-muted">{n.date}</time>
            </article>
          ))}
        </div>
        <div className="mt-[18px] grid grid-cols-3 gap-1.5 lg:grid-cols-9">
          {instagram.map((src) => (
            <img key={src} src={src} alt="" className="h-[120px] w-full object-cover" />
          ))}
        </div>

        <blockquote className="mx-auto my-12 max-w-[820px] text-center">
          <p className="text-lg font-medium leading-relaxed">
            “ My first order arrived today in perfect condition. From the time I sent a question about the item to making the
            purchase, to the shipping and now the delivery, your company, Tecs, has stayed in touch. Such great service. I look
            forward to shopping on your site in the future and would highly recommend it.
          </p>
          <cite className="mt-4 block not-italic text-neutral-600">- Tama Brown</cite>
          <Btn to="/contact" variant="ghost" size="sm" className="mt-4">
            Leave Us A Review
          </Btn>
        </blockquote>
      </Container>
    </>
  );
}
