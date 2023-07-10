/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { play } from "../store/slices/playerSlice";

import { PlayCircle, VideoCamera } from "@phosphor-icons/react";

export const Module = ({ title, numberOfLessons, lessons, moduleIndex }) => {
  const { currentModuleIndex, currentLessonIndex } = useSelector(
    (state) => state.player
  );
  const dispatch = useDispatch();
  const handlePlayVideo = (e) => {
    const lessonIndex = Number(e.currentTarget.dataset.index);
    dispatch(play([moduleIndex, lessonIndex]));
  };

  return (
    <article>
      <div className="article-header">
        <h3>{title}</h3>
        <p>{numberOfLessons}</p>
      </div>
      <div className="article-body">
        <ul>
          {lessons.map((item, index) => {
            const isActive =
              currentModuleIndex === moduleIndex &&
              currentLessonIndex === index;
            return (
              <li
                key={item.id}
                id={item.id}
                className="module-item"
                onClick={handlePlayVideo}
                data-index={index}
                data-active={isActive}
              >
                {isActive ? (
                  <PlayCircle size={32} />
                ) : (
                  <VideoCamera size={32} />
                )}
                <span> {item.title}</span>
                <span>{item.duration}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
};
