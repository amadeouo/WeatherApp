import { Route, Routes } from "react-router";
import { MainLayout } from "@/pages/main-layout/MainLayout.tsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />} />
      </Routes>
    </>
  )
}

export default App
