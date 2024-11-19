import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage, { loader as TopicsLoader } from "./pages/HomePage";
import Layout from "./pages/Layout";
import SearchPage from "./pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    //  errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: TopicsLoader, id: "home" },
      {
        path: "search",
        //  element: <SearchPage />,
        children: [
          {
            index: true,
            element: <SearchPage />,
            //  loader: searchLoader,
          },
          //  {
          //    path: ":eventId",
          //    id: "event-detail",
          //    loader: eventDetailLoader,
          //    children: [
          //      {
          //        index: true,
          //        element: <EventDetailPage />,
          //        action: deleteEventAction,
          //      },
          //      {
          //        path: "edit",
          //        element: <EditEventPage />,
          //        action: manipulateEventAction,
          //      },
          //    ],
          //  },
          //  {
          //    path: "new",
          //    element: <NewEventPage />,
          //    action: manipulateEventAction,
          //  },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
