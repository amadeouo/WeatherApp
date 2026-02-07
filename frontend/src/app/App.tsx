import { Route, Routes } from "react-router";
import { MainLayout } from "@/pages/main-layout/MainLayout.tsx";
import { Weather } from "@/widgets/weather/Weather.tsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path=':city' element={<Weather />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
