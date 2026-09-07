import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { LogIn } from "../pages/LogIn";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    );
}
