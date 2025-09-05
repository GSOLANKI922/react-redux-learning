import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div>
      <header className="p-4 bg-amber-200">AuthLayout</header>
      <div className="w-full bg-white rounded-lg shadow-md flex items-center justify-center min-h-[calc(100vh-56px)]">
        <div className="max-w-md p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
