import { Toaster, toast } from "sonner";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import NotFound from "./pages/NotFound.jsx";
function App() {
    return (
        <>
            <Toaster richColors closeButton />
            <Router>
                <Routes>
                    <Route path="/" index="true" element={<HomePage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
