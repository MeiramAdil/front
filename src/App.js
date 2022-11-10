import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ProductList from "./Components/ProductList";
import CategoryList from "./Components/CategoryList";
import StockList from "./Components/StockList";
import SaleList from "./Components/SaleList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import ProductUpdate from "./Components/ProductUpdate";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/update/:id" element={<ProductUpdate />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/stocks" element={<StockList />} />
            <Route path="/sales" element={<SaleList />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
