import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import { Footer, Newsletter, SupportBar } from "./Footer.jsx";
import { Container } from "./ui.jsx";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Container>
        <SupportBar />
      </Container>
      <Newsletter />
      <Footer />
    </>
  );
}
