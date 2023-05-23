import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useProfileTabs = () => {
  const { pathname } = useLocation();
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (pathname.includes("friends")) {
      setSelected("friends");
    } else if (pathname.includes("likedPosts")) {
      setSelected("likedPosts");
    } else if (pathname.includes("media")) {
      setSelected("media");
    } else {
      setSelected("posts");
    }
  }, [pathname]);

  return { selected };
};

export default useProfileTabs;
