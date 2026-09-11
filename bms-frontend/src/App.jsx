import { BrowserRouter, Routes, Route, useMatch } from "react-router-dom";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Profile from "./pages/Profile";
import SeatLayout from "./pages/SeatLayout";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Checkout from "./pages/Checkout";
import { Toaster } from "react-hot-toast";
import { useLoadUser } from "./hooks/useLoadUser";
import FullScreenLoader from "./components/shared/FullScreenLoader";

dayjs.extend(customParseFormat);

function App() {
  const { isLoading } = useLoadUser();

  const isSeatLayoutPage = useMatch(
    "/movies/:movieId/:movieName/:state/theater/:theaterId/show/:showId/seat-layout",
  );

  const isCheckoutPage = useMatch("shows/:showId/:state/checkout");

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "14px",
          },
        }}
      />
      <div className="flex flex-col min-h-screen">
        {/* If the page is not seatLayout display Header */}
        {!isCheckoutPage && !isSeatLayoutPage && <Header />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/movies" element={<Movies />} />
            <Route
              path="/movies/:state/:movieName/:id/ticket"
              element={<MovieDetails />}
            />
            <Route
              path="/movies/:movieId/:movieName/:state/theater/:theaterId/show/:showId/seat-layout"
              element={<SeatLayout />}
            />
            <Route
              path="shows/:showId/:state/checkout"
              element={<Checkout />}
            />
          </Routes>
        </main>
        {!isSeatLayoutPage && !isCheckoutPage && <Footer />}
      </div>
    </>
  );
}

export default App;
