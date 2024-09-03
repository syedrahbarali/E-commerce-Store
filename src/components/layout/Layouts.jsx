import { Outlet } from "react-router-dom";
import { Container, Footer, Header } from "..";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import authService from "@/appwrite/auth";
import { login, logout } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";

const Layouts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData?.$id) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout());
      }
    });
  });

  return (
    <div className="min-h-screen w-screen h-screen">
      <Toaster />
      <Header />
      <main className="mt-10 w-full h-[calc(100vh-108px)]">
        <Container classNmae="h-full">
          <Outlet />
        </Container>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layouts;
