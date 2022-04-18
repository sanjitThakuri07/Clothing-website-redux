import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home";

import Navigation from "./routes/navigation/navigation";
import Authentication from "./routes/authentication/authentication";
import Shop from "./routes/shop/shop.component";
import Contact from "./routes/Contact/contact";
import Checkout from "./routes/checkout/checkout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation></Navigation>}>
        <Route index={true} element={<Home />} exact></Route>
        <Route path="shop/*" element={<Shop />} exact></Route>
        <Route path="contact" element={<Contact />} exact></Route>
        <Route path="auth" element={<Authentication />} exact></Route>
        <Route path="checkout" element={<Checkout />} exact></Route>
      </Route>
    </Routes>
  );
};

export default App;
