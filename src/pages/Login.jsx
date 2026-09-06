import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context.jsx";
import { Btn, Container, control, Crumbs, Field, Page } from "../components/ui.jsx";

export default function Login() {
  const { setUser } = useShop();
  const nav = useNavigate();
  return (
    <Page>
      <Container>
        <Crumbs>
          <Link to="/" className="hover:text-brand">Home</Link> › Login
        </Crumbs>
        <div className="grid max-w-[980px] gap-12 md:grid-cols-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              setUser({ name: "Alex Driver", email: data.get("email") });
              nav("/account");
            }}
          >
            <h2 className="mb-2 text-[28px] font-semibold">Customer Login</h2>
            <h3 className="my-3">Registered Customers</h3>
            <p className="mb-[18px] text-neutral-600">If you have an account, sign in with your email address.</p>
            <Field label="Email *">
              <input name="email" type="email" required placeholder="Email" className={control} />
            </Field>
            <Field label="Password *" className="mt-3.5">
              <input name="password" type="password" required placeholder="Password" className={control} />
            </Field>
            <div className="mt-[18px] flex items-center gap-4">
              <Btn>Sign In</Btn>
              <a className="text-brand underline">Forgot Your Password?</a>
            </div>
          </form>
          <div>
            <h2 className="mb-2 text-[28px] font-semibold">New Customer?</h2>
            <p className="mb-[18px] text-neutral-600">Creating an account has many benefits:</p>
            <ul>
              <li>• Check out faster</li>
              <li>• Keep more than one address</li>
              <li>• Track orders and more</li>
            </ul>
            <Btn to="/register" className="mt-5">Create An Account</Btn>
          </div>
        </div>
      </Container>
    </Page>
  );
}
