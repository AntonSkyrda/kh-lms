import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Groups from "./pages/Groups";
// import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import Course from "./pages/Course";
// import { AuthProvider } from "./contexts/Auth/AuthProvider";
// import Account from "./pages/Account";
import ProtectedAdminRoute from "./ui/ProtectedAdminRoute";
import Settings from "./pages/Settings";
import Schedule from "./pages/Schedule";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 60 * 1000,
        staleTime: 0,
      },
    },
  });

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:courseId" element={<Course />} />
            <Route path="groups" element={<Groups />} />
            <Route path="schedule" element={<Schedule />} />
            {/* <Route path="tasks" element={<Tasks />} /> */}
            {/* <Route path="account" element={<Account />} /> */}
            <Route path="lms-admin-route" element={<ProtectedAdminRoute />}>
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
