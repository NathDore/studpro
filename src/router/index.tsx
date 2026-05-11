import { createBrowserRouter, Outlet } from "react-router-dom";
import { CalendarPage } from "../pages/Calendar/CalendarPage";
import { TodoPage } from "../pages/Todo/TodoPage";
import { NavBar } from "../components/NavBar/NavBar";

function Root() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <NavBar />
            <Outlet />
        </div>
    );
}

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: CalendarPage,
            },
            {
                path: "todo",
                Component: TodoPage,
            },
        ],
    },
]);