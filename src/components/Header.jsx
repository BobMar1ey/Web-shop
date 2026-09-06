import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categories, money, products } from "../data";
import { useShop } from "../context.jsx";
import { Icon, Logo } from "./Icons.jsx";
import ProductCard from "./ProductCard.jsx";
import { Btn, Container } from "./ui.jsx";

const iconBtn = "relative grid h-11 w-11 place-items-center border-0 bg-transparent text-black";
const dropItem = "block w-full px-[18px] py-2.5 text-left text-sm hover:bg-wash";

export default function Header() {
  const nav = useNavigate();
  const { cartItems, cartCount, subtotal, user, setUser, setSearchOpen, searchOpen, query, setQuery } = useShop();
  const [hoursOpen, setHoursOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const wrap = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) {
        setAccountOpen(false);
        setCartOpen(false);
        setHoursOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    setSearchOpen(false);
    nav(`/catalog?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white" ref={wrap}>
      <div className="flex h-11 items-center bg-neutral-950 text-xs text-white">
        <Container className="grid grid-cols-2 items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <div className="relative">
            <button className="inline-flex items-center gap-1.5 border-0 bg-transparent p-0 text-xs text-white" onClick={() => setHoursOpen((v) => !v)}>
              Mon-Thu: 9:00 AM - 5:30 PM ▾
            </button>
            {hoursOpen && (
              <div className="absolute top-11 z-40 min-w-[260px] border border-line bg-white p-4 text-[13px] text-black shadow-lg">
                <strong>We are open:</strong>
                <p>Mon-Thu: 9:00 AM - 5:30 PM</p>
                <p>Fr: 9:00 AM - 6:00 PM</p>
                <p>Sat: 11:00 AM - 5:00 PM</p>
                <p>Address: 1234 Street Adress, City Address, 1234</p>
                <p>Phones: (00) 1234 5678</p>
                <p>E-mail: shop@email.com</p>
              </div>
            )}
          </div>
          <div className="hidden text-center text-[#acacac] md:block">
            Visit our showroom in 1234 Street Adress City Address, 1234{" "}
            <Link to="/contact" className="text-white underline">
              Contact Us
            </Link>
          </div>
          <div className="text-right">Call Us: (00) 1234 5678</div>
        </Container>
      </div>

      <Container className="relative flex flex-wrap items-center gap-7 py-3 lg:h-[92px] lg:py-0">
        {searchOpen && (
          <form className="absolute inset-0 z-20 flex items-center bg-white px-6" onSubmit={submitSearch}>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search entire store here..."
              className="h-12 flex-1 border-0 outline-none"
            />
            <button type="submit" className={iconBtn}>
              <Icon name="search" />
            </button>
            <button type="button" className={iconBtn} onClick={() => setSearchOpen(false)}>
              ✕
            </button>
          </form>
        )}
        <Link to="/" className="flex shrink-0 items-center gap-2.5 text-[22px] font-bold tracking-tight">
          <Logo />
          Shop
        </Link>
        <form className="order-3 flex h-12 w-full flex-1 overflow-hidden rounded-[32px] border-2 border-line bg-white lg:order-none lg:w-auto" onSubmit={submitSearch}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search entire store here..."
            className="flex-1 border-0 px-5 text-[13px] outline-none placeholder:text-muted"
          />
          <button type="submit" aria-label="Search" className="w-[52px] border-0 bg-transparent text-brand">
            <Icon name="search" />
          </button>
        </form>
        <div className="relative ml-auto flex items-center gap-2">
          <button className={`${iconBtn} lg:hidden`} onClick={() => setNavOpen((v) => !v)} aria-label="Menu">
            <Icon name="menu" />
          </button>
          <button className={`${iconBtn} lg:hidden`} onClick={() => setSearchOpen(true)} aria-label="Open search">
            <Icon name="search" />
          </button>
          <button className={iconBtn} onClick={() => setAccountOpen((v) => !v)} aria-label="Account">
            <Icon name="user" />
          </button>
          {accountOpen && (
            <div className="absolute right-0 top-12 z-50 w-60 border border-line bg-white py-2 shadow-lg">
              <Link className={dropItem} to="/account" onClick={() => setAccountOpen(false)}>
                My Account
              </Link>
              <Link className={dropItem} to="/account" onClick={() => setAccountOpen(false)}>
                My Wish List (0)
              </Link>
              <Link className={dropItem} to="/catalog" onClick={() => setAccountOpen(false)}>
                Compare (0)
              </Link>
              <Link className={dropItem} to="/register" onClick={() => setAccountOpen(false)}>
                Create an Account
              </Link>
              {user ? (
                <button
                  className={dropItem}
                  onClick={() => {
                    setUser(null);
                    setAccountOpen(false);
                    nav("/");
                  }}
                >
                  Sign Out
                </button>
              ) : (
                <Link className={dropItem} to="/login" onClick={() => setAccountOpen(false)}>
                  Sign In
                </Link>
              )}
            </div>
          )}
          <button className={iconBtn} onClick={() => setCartOpen((v) => !v)} aria-label="Cart">
            <Icon name="cart" />
            <span className="absolute top-1 right-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand px-1 text-[11px] font-semibold text-white">
              {cartCount}
            </span>
          </button>
          {cartOpen && (
            <div className="absolute right-0 top-[52px] z-50 w-[340px] border border-line bg-white p-[18px] shadow-xl">
              <h4 className="mb-1 text-base font-semibold">My Cart</h4>
              <p className="text-muted">{cartCount} item in cart</p>
              {cartItems.length === 0 && <p>You have no items in your shopping cart.</p>}
              {cartItems.map((item) => (
                <div className="grid grid-cols-[64px_1fr_auto] gap-2.5 border-b border-neutral-200 py-3 text-[13px]" key={item.id}>
                  <img src={item.image} alt="" className="h-16 w-16 object-contain" />
                  <div>
                    {item.short}
                    <div className="text-muted">{item.qty} x</div>
                  </div>
                  <strong>{money(item.price)}</strong>
                </div>
              ))}
              <p className="my-3">
                Subtotal: <strong>{money(subtotal)}</strong>
              </p>
              <Btn to="/cart" variant="ghost" className="mb-2 w-full" onClick={() => setCartOpen(false)}>
                View or Edit Your Cart
              </Btn>
              <Btn to="/checkout" className="w-full" onClick={() => setCartOpen(false)}>
                Go to Checkout
              </Btn>
            </div>
          )}
        </div>
      </Container>

      <Container>
        <nav className={`${navOpen ? "flex" : "hidden"} flex-wrap items-center gap-1 border-t border-neutral-200 py-2 lg:flex lg:h-[54px] lg:py-0`}>
          {categories.map((cat) => (
            <div className="group relative" key={cat.slug}>
              <Link to={`/catalog/${cat.slug}`} className="px-3 py-2 text-sm font-semibold">
                {cat.label}
                {cat.children?.length ? " ▾" : ""}
              </Link>
              {cat.children?.length > 0 && (
                <div className="invisible absolute top-full left-0 z-40 grid w-[min(1100px,80vw)] grid-cols-[240px_1fr] gap-5 border border-line bg-white p-5 opacity-0 shadow-xl group-hover:visible group-hover:opacity-100">
                  <div>
                    {cat.children.map((c) => (
                      <Link key={c} to={`/catalog/${cat.slug}`} className="flex w-full justify-between px-2.5 py-2 text-left text-[13px] hover:text-brand">
                        {c}
                      </Link>
                    ))}
                    {cat.series?.map((s) => (
                      <Link key={s.name} to={`/catalog/${cat.slug}`} className="flex w-full justify-between px-2.5 py-2 text-left text-[13px] hover:text-brand">
                        {s.name} <span className="text-muted">({s.count})</span>
                      </Link>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {products
                      .filter((p) => p.category === cat.slug)
                      .slice(0, 4)
                      .map((p) => (
                        <ProductCard key={p.id} product={p} compact />
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link
            to="/catalog"
            className="ml-auto inline-flex h-[37px] items-center rounded-full border-2 border-brand px-[22px] font-semibold text-brand"
          >
            Our Deals
          </Link>
        </nav>
      </Container>
    </header>
  );
}
