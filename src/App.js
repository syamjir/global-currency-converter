import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FlashRatePage from "./pages/FlashRatePage";
import RateAlertPage from "./pages/RateAlertPage";
import CurrencyPage from "./pages/CurrencyPage";
import Loader from "./components/Loader";
import CurrencyCardPage from "./pages/CurrencyCardPage";
import CurrencyInfoPage from "./pages/CurrencyInfoPage";
import NotFound from "./pages/NotFound";
import { CurrencyDataProvider } from "./contexts/CurrencyContext";

// Lazily loaded pages for performance optimization
const HomePage = lazy(() => import("./pages/HomePage"));
const ConversionPage = lazy(() => import("./pages/ConversionPage"));
const ChartPage = lazy(() => import("./pages/ChartPage"));
const FeaturePage = lazy(() => import("./pages/FeaturePage"));

function App() {
  return (
    // Center content and apply global layout styles
    <div className="h-full flex justify-center items-center pb-9">
      {/* Provide global currency data context */}
      <CurrencyDataProvider>
        {/* Set up routing with React Router */}
        <BrowserRouter>
          {/* Handle lazy loading fallback */}
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Main pages */}
              <Route index element={<HomePage />} />
              <Route path="conversion" element={<ConversionPage />} />
              <Route path="chart" element={<ChartPage />} />

              {/* Nested routes under features */}
              <Route path="features" element={<FeaturePage />}>
                <Route index element={<Navigate replace to="flash-rate" />} />
                <Route path="flash-rate" element={<FlashRatePage />} />
                <Route path="rate-alert" element={<RateAlertPage />} />

                {/* Further nested currency details routes */}
                <Route path="currency-details" element={<CurrencyPage />}>
                  <Route
                    index
                    element={<Navigate replace to="currency-cards" />}
                  />
                  <Route path="currency-cards" element={<CurrencyCardPage />} />
                  <Route
                    path="currency-cards/:code"
                    element={<CurrencyInfoPage />}
                  />
                </Route>
              </Route>

              {/* Fallback for unknown routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CurrencyDataProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
