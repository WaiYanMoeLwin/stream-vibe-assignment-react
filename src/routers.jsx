import { BrowserRouter, Route, Routes } from "react-router-dom";
import CheckoutPage from "./pages/CheckoutPage";
import ContentDetailsPage from "./pages/ContentDetailsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MoviesAndShowsPage from "./pages/MoviesAndShowsPage";
import PlaybackPage from "./pages/PlaybackPage";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import SupportPage from "./pages/SupportPage";
import WatchListPage from "./pages/WatchListPage";

export function AppRouters() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies-and-shows" element={<MoviesAndShowsPage />} />
                <Route path="/content-details" element={<ContentDetailsPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/subscriptions" element={<SubscriptionsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/watchlist" element={<WatchListPage />} />
                <Route path="/playback" element={<PlaybackPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    )
}