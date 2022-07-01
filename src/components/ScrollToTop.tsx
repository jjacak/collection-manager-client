import { useEffect } from "react";
import { useLocation } from "react-router";
import { propsChildren } from "../ts/types";

const ScrollToTop = (props:propsChildren) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>
};

export default ScrollToTop;