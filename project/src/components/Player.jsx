import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadCourseData } from "../store/slices/playerSlice";

import { Modules } from "./Modules";
import { Video } from "./Video";

export const Player = () => {
  // it is a good practice extract just the piece of data you need, instead of get the whole data slilce
  // const { modules } = useSelector((state) => state.player.course);
  // const modules = useSelector((state) => state.player.course?.module);

  const course = useSelector((state) => state.player.course);
  const { currentModuleIndex, currentLessonIndex } = useSelector(
    (state) => state.player
  );
  const { isDataLoading } = useSelector((state) => state.player);
  console.log(isDataLoading);

  const dispatch = useDispatch();

  const currentModule = course?.modules[currentModuleIndex];
  const currentLesson = currentModule?.lessons[currentLessonIndex];

  // get data from api
  // basic implementation by useffect on the component
  // useEffect(() => {
  //   api.get("/course").then((response) => {
  //     dispatch(start(response.data));
  //   });
  // }, [dispatch]);

  // a better solution is to create a thunk on slice to deal just with async functions
  useEffect(() => {
    dispatch(loadCourseData());
  }, [dispatch]);

  // dynamic change page title
  useEffect(() => {
    document.title = currentLesson?.title;
  }, [currentLesson]);

  if (!course) {
    return <p>No course modules available</p>;
  }

  return (
    <>
      {!isDataLoading && (
        <div className="container-flex-row">
          <div>
            <h2>{currentLesson?.title}</h2>
            <p>Module: {currentModule?.title}</p>
          </div>

          <button className="feedback">Deixe seu feedback</button>
        </div>
      )}

      <div className="container-flex">
        {isDataLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="player">
              <Video title={currentLesson?.title} embedId={currentLesson?.id} />
            </div>
            <Modules modules={course?.modules} />
          </>
        )}
      </div>
    </>
  );
};
