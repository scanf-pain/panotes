import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div className="h-full">
      HomeLayout
      <div className="flex h-full">
        <aside className="h-full border p-4">aside</aside>
        <Outlet />
      </div>
    </div>
  );
}

export default HomeLayout;
