import React from "react";
import { Link } from "react-router-dom";
import { deleteModel } from "../features/apiCalls";
const BASE_API_URL = "http://localhost:8081";

const Model = ({
  modelId,
  thumbnail,
  name,
  phone,
  age,
  height,
  breast,
  location,
  hour,
  hour_2,
  night,
                 is_out,
}) => {
  return (
    <>
      <div className="border-2 rounded overflow-hidden flex flex-col">
        {thumbnail ? (
          <img
            className="h-52 w-full object-cover"
            alt={modelId + "-thumbnail"}
            src={`${BASE_API_URL}/uploads/${thumbnail}`}
          />
        ) : (
          <div className="w-full h-48 bg-slate-200 rounded"></div>
        )}
        <div className="flex flex-col p-4">
          <h4 className="mb-1 text-xl font-medium mt-5">{name}</h4>
          <div>
            <div className="flex flex-col sm:flex-row items-center space-y-5 sm:space-y-0 sm:space-x-5 my-5">
              <Link className="w-full" to={`/updateModel/${modelId}`}>
                <button className="uppercase w-full font-medium">Update</button>
              </Link>
              <button
                onClick={async () => {
                  await deleteModel(modelId, thumbnail)
                  console.log("Deleted")
                }}
                className="uppercase border-gray-500 text-gray-500 w-full font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
