import { Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useEffect, lazy, Suspense } from "react";

import USER_ACTION_TYPES from "./store/user/user.types";
import { createAction } from "./utils/reducer/reducer.utils";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import Spinner from "./components/spinner/spinner.component";

import { GlobalStyles } from "./global.styles";

const Home = lazy(() => import("./routes/home/home.component"));
const Navigation = lazy(() =>
  import("./routes/navigation/navigation.component")
);
const Authentication = lazy(() =>
  import("./routes/authentication/authentication.component")
);
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    });

    return unsubscribe;
  }, []);
  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
