import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import Home from "./routes/home-page";
// import General from "./routes/general-page";
// import Topic from "./routes/topic-page";
import { Suspense, lazy } from "react";
import Loading from "./components/loading";

const General = lazy(() => import("./routes/general-page"));
const Topic = lazy(() => import("./routes/topic-page"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "general",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <General />,
              </Suspense>
            ),
          },
          {
            path: ":subtopicId",
            element: (
              <Suspense fallback={<Loading />}>
                <Topic />,
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
