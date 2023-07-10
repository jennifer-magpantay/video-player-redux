/* eslint-disable react/prop-types */
import { Module } from "./Module";

export const Modules = ({ modules }) => {
  return (
    <div className="modules">
      <ul>
        {modules &&
          modules.map((module, index) => (
            <li key={module.id}>
              <Module
                title={module.title}
                numberOfLessons={module.lessons.length}
                lessons={module.lessons}
                moduleIndex={index}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};
