import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import History from "./pages/History/index";
import Home from "./pages/Home";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/history" element={<History />} />
                <Route path="" element={<Home />} />
            </Route>
        </Routes>
    )
}