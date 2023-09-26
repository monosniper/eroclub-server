import axios from "axios";

export const getModels = async () => {
  try {
    const res = await axios.get("http://localhost:8081/models/");
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const addModel = async (model) => {
  try {
    const res = await axios.post("http://localhost:8081/models/", model);
    return res.data;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const updateModel = async (model, modelId) => {
  try {
    const res = await axios.put(
      "http://localhost:8081/models/" + modelId,
      model
    );
    return res.data;
  } catch (err) {
    return {
      error: err,
    };
  }
};
export const deleteModel = async (modelId, modelThumbnail) => {
  try {
    const res = await axios.delete(
      "http://localhost:8081/models/" + modelId
    );
    return res.data;
  } catch (err) {
    return { error: err };
  }
};
export const getModelById = async (id) => {
  try {
    const res = await axios.get("http://localhost:8081/models/" + id);
    return res.data
  } catch (err) {
    return {error: err.message}
  }
};


export const uploadModelThumbnail = async (formData) => {
  try {
    const res = await axios.post(
      "http://localhost:8081/thumbnailUpload/",
      formData
    );
    return res.data
      
  } catch (err) {
    console.log(err);
    return {error: err.message};
  }
};