import { Outlet } from "react-router"

function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow mx-auto w-full max-w-[1400px] px-4 md:px-8 py-2">
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout