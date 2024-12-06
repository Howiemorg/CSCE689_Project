import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";

import HomePage, { loader as TopicsLoader } from "./pages/HomePage";
import Layout from "./pages/Layout";
// import SearchPage from "./pages/SearchPage";
import ChooseQuestion from "./pages/ChooseQuestion";
import Questions, { loader as QuestionsLoader } from "./pages/Questions";
import Question from "./pages/Question";
import Quizzes, { loader as QuizzesLoader } from "./pages/Quizzes";
import Quiz from "./pages/Quiz";
import StudyMaterial from "./pages/StudyMaterial";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import Provider from "./store/provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    //  errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: TopicsLoader, id: "home" },
      // {
      //   path: "search",
      //   //  element: <SearchPage />,
      //   children: [
      //     {
      //       index: true,
      //       element: <SearchPage />,
      //       //  loader: searchLoader,
      //     },
      //   ],
      // },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUp /> },
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
        // loader: QuestionsLoader,
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
            loader: () => redirect("/questions"),
          },
          {
            path: ":questionName",
            element: <Question />,
          },
        ],
      },
      {
        path: "quizzes",
        // loader: QuizzesLoader,
        id: "quizzes",
        children: [
          {
            index: true,
            element: <Quizzes />,
          },
          {
            path: ":topicId",
            element: <Quizzes />,
          },
        ],
      },
      {
        path: "quiz",
        id: "quiz",
        children: [
          {
            index: true,
            element: <Quizzes />,
            loader: () => redirect("/quizzes"),
          },
          {
            path: ":quizName",
            element: <Quiz />,
          },
        ],
      },
      {
        path: "study",
        id: "study",
        children: [
          {
            index: true,
            element: <StudyMaterial />,
          },
          {
            path: ":topicId",
            element: <StudyMaterial />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
