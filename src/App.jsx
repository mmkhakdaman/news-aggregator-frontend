import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Search from "./pages/Search";
import Feed from "./pages/Feed";
import Layout from "./layouts/main";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route path="/" index element={<Auth />} />
                    <Route path="/Search" index element={<Search />} />
                    <Route path="/feed" index element={<Feed />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}


export default App;