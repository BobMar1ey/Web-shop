import { Link } from "react-router-dom";
import { asset } from "../data";
import { Btn, Container, control, Crumbs, Field, Page } from "../components/ui.jsx";

export default function Contact() {
  return (
    <Page>
      <Container>
        <Crumbs>
          <Link to="/" className="hover:text-brand">Home</Link> › Contact Us
        </Crumbs>
        <h1 className="mb-3 text-[32px] font-semibold">Contact Us</h1>
        <p className="mb-6 text-muted">
          We love hearing from you, our Shop customers.
          <br />
          Please contact us and we will make sure to get back to you as soon as we possibly can.
        </p>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <aside>
            <div
              className="mb-4 h-[220px] bg-wash bg-cover bg-center"
              style={{ backgroundImage: `url(${asset("img/insta/i3.jpg")})` }}
            />
            <p>
              <strong>Address:</strong>
              <br />
              1234 Street Adress City Address, 1234
            </p>
            <p>
              <strong>Phone:</strong> (00) 1234 5678
            </p>
            <p>
              <strong>We are open:</strong>
              <br />
              Monday - Thursday: 9:00 AM - 5:30 PM
              <br />
              Friday: 9:00 AM - 6:00 PM
              <br />
              Saturday: 11:00 AM - 5:00 PM
            </p>
            <p>
              <strong>E-mail:</strong> shop@email.com
            </p>
          </aside>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent. We'll get back to you as quickly as possible.");
              e.currentTarget.reset();
            }}
          >
            <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
              <Field label="Your Name *">
                <input required placeholder="Your Name" className={control} />
              </Field>
              <Field label="Your Email *">
                <input type="email" required placeholder="Email" className={control} />
              </Field>
              <Field label="Your Phone Number" full>
                <input placeholder="Your Phone" className={control} />
              </Field>
              <Field label="What’s on your mind? *" full>
                <textarea required placeholder="Jot us a note and we’ll get back to you as quickly as possible" className={`${control} h-[120px] py-3`} />
              </Field>
            </div>
            <Btn className="mt-4">Submit</Btn>
          </form>
        </div>
      </Container>
    </Page>
  );
}
