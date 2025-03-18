import { Navigate, Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <>
      <div className="mb-4 flex items-center justify-center gap-2">
        <img src="/logo.svg" alt="Logo" className="h-8 w-10 object-cover" />
        <span className="mt-auto text-xl">Dev Productivity</span>
      </div>

      <section className="bg-card text-card-foreground rounded-xl border p-6 shadow-lg">
        <Outlet />
      </section>
    </>
  );
};

export default AuthPage;
