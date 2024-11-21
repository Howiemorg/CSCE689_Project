import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";

import HomePage, { loader as TopicsLoader } from "./pages/HomePage";
import Layout from "./pages/Layout";
import SearchPage from "./pages/SearchPage";
import ChooseQuestion from "./pages/ChooseQuestion";
import Questions, { loader as QuestionsLoader } from "./pages/Questions";
import Question from "./pages/Question";

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
        ],
      },
      {
        path: "topics",
        children: [
          {
            index: true,
            element: <HomePage />,
            loader: TopicsLoader,
            id: "topics",
          },
          { path: ":topicId", element: <ChooseQuestion /> },
        ],
      },
      {
        path: "questions",
        loader: QuestionsLoader,
        id: "questions",
        children: [
          {
            index: true,
            element: <Questions />,
          },
          {
            path: ":topicId",
            element: <Questions />,
          },
        ],
      },
      {
        path: "question",
        id: "question",
        children: [
          {
            index: true,
            element: <Questions />,
            loader: () =>  redirect("/questions")
          },
          {
            path: ":questionName",
            element: <Question />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
