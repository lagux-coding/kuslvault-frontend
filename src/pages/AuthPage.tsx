import { Navigate, Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <div className="container grid h-svh flex-col items-center justify-center lg:max-w-none lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center sm:w-[480px] lg:p-8">
        <div className="mb-4 flex items-center justify-center gap-2">
          <img src="/logo.svg" alt="Logo" className="h-10 w-10 object-cover" />
          <span className="mt-auto text-2xl">Kusl Vault</span>
        </div>

        <section className="text-card-foreground border-border outline-ring/50 bg-accent-foreground rounded-xl p-6 shadow-lg">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default AuthPage;
