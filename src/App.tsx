import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ProcessDetail } from "./pages/ProcessDetail";
import { Strategies } from "./pages/Strategies";
import { StrategyDetail } from "./pages/StrategyDetail";
import { Evolution } from "./pages/Evolution";
import { Managers } from "./pages/Managers";
import { ManagerDetail } from "./pages/ManagerDetail";
import { FundDetail } from "./pages/FundDetail";
import { Performance } from "./pages/Performance";
import { Guide } from "./pages/Guide";
import { Glossary } from "./pages/Glossary";
import { SearchPage } from "./pages/SearchPage";
import { NotFound } from "./pages/NotFound";

const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/process/:id" element={<ProcessDetail />} />
          <Route path="/strategies" element={<Strategies />} />
          <Route path="/strategies/:id" element={<StrategyDetail />} />
          <Route path="/evolution" element={<Evolution />} />
          <Route path="/managers" element={<Managers />} />
          <Route path="/managers/:id" element={<ManagerDetail />} />
          <Route path="/funds/:id" element={<FundDetail />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
