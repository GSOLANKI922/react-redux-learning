import { useRouter } from "next/router";
import { useEffect } from "react";

const Auth = () => {
  const router = useRouter();
  useEffect(() => {
    let auth;
    (async () => {
      auth = localStorage.getItem("token");
      if (!auth) {
        router.push("/login");
      }
    })();
  }, []);
};

export default Auth;
