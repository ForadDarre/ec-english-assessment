import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "../app/components/admin/AdminPage";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<AdminPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
