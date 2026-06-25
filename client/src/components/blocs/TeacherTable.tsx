import React from "react";
import TeacherModal from "./TeacherModal";

const TeacherTable = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Teachers</h2>
          <input
            type="text"
            className="outline-2 focus:ring-2 focus:ring-orange-500 px-2 py-1 focus:outline-none text-sm"
            placeholder="Search teachers..."
          />
        </div>
        <TeacherModal/>
      </div>
    </div>
  );
};

export default TeacherTable;
