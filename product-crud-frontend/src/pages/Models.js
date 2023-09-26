import React, { useEffect, useState } from "react";
import Model from "../components/Model";
import { getModels } from "../features/apiCalls";
import { Link } from "react-router-dom";
const Models = () => {
  const [models, setModels] = useState([]);
  useEffect(() => {
    const fetchModels = async () => {
      const { data, error } = await getModels();
      if (error) {
        console.log(error);
      } else {
        setModels(data);
      }
    };
    fetchModels();
  }, []);

  return (
    <div className="container py-10 w-full max-w-5xl">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text--title">Models</h2>
        <Link to="/addModel">
          <button>Add Model</button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-y-6 md:gap-6">
        {models.length > 0 ? (
            models.map((model) => {
            return <Model key={model.modelId} {...model} />;
          })
        ) : (
          <p>No Models Found.</p>
        )}
      </div>
    </div>
  );
};

export default Models;
