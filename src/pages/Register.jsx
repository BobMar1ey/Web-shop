import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context.jsx";
import { Btn, Container, control, Crumbs, Field, Page } from "../components/ui.jsx";

export default function Register() {
  const { setUser } = useShop();
  const nav = useNavigate();
  return (
    <Page>
      <Container>
        <Crumbs>
          <Link to="/" className="hover:text-brand">Home</Link> › Create an Account
        </Crumbs>
        <form
          className="max-w-[560px]"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            setUser({
              name: `${data.get("first")} ${data.get("last")}`.trim(),
              email: data.get("email"),
            });
            nav("/account");
          }}
        >
          <h2 className="text-[28px] font-semibold">Create New Customer Account</h2>
          <div className="mt-[18px] grid grid-cols-1 gap-3.5 md:grid-cols-2">
            <Field label="First Name *"><input name="first" required className={control} /></Field>
            <Field label="Last Name *"><input name="last" required className={control} /></Field>
            <Field label="Email *" full><input name="email" type="email" required className={control} /></Field>
            <Field label="Password *"><input name="password" type="password" required className={control} /></Field>
            <Field label="Confirm Password *"><input name="confirm" type="password" required className={control} /></Field>
          </div>
          <Btn className="mt-5">Create An Account</Btn>
        </form>
      </Container>
    </Page>
  );
}
