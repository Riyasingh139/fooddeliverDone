import { Routes,Route } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import Page from "./components/Error";
import Restaurant from "./components/Rest";
import Thank from "./components/Thank";
const app = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/search/:meal_id/:name" element={ <Search/> } />
      <Route path="/thank/:id" element={<Thank/>}/>
      <Route path = "*" element ={<Page/>}/>
      <Route path="/restro/:id" element={<Restaurant/>}/>
    </Routes>
    </>)
}
export default app;