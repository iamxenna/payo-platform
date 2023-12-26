import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import Routes from "../../Constants/Routes";
import { PublicRoute } from "Components/HOCs/Routes/PublicRoute";
import { UnauthorizedRoute } from "Components/HOCs/Routes/UnauthorizedRoute";
import { useStore } from "Core/store";
import { mobile, mobileLayoutForTablet, tablet } from "utils/deviceSizes";
import { useEffect } from "react";
import { NotificationComponent } from "libs/Notification";

const App = () => {
  const dispatch = useDispatch();
  const {
    actions: {
      Device: { setMobile, setTablet, setDesktop, setMobileLayoutForTablet },
    },
    asyncActions: {
      Rates: { getRates },
    },
  } = useStore((store) => ({
    Device: store.DeviceEntity,
    Rates: store.RatesEntity,
  }));

  const handleResize = () => {
    if (window.innerWidth > 0 && window.innerWidth <= mobile) {
      dispatch(setMobile());
    } else if (window.innerWidth <= mobileLayoutForTablet) {
      dispatch(setMobileLayoutForTablet());
    } else if (window.innerWidth <= tablet) {
      dispatch(setTablet());
    } else {
      dispatch(setDesktop());
    }
  };

  useEffect(() => {
    dispatch(getRates());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  handleResize();

  return (
    <main>
      <Router>
        <Switch>
          {Routes.map((page) => (
            <Route key={page.path} path={page.path} exact={page.path !== "*"}>
              {page.routeType === "public" ? <PublicRoute {...page} /> : <UnauthorizedRoute {...page} />}
            </Route>
          ))}
        </Switch>
      </Router>
      <NotificationComponent />
    </main>
  );
};
export default App;
