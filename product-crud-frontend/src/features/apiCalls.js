import axios from "axios";

const API_URL = "http://5.45.92.200:8081"

export const getModels = async () => {
  try {
    const res = await axios.get(API_URL+"/models/");
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const addModel = async (model) => {
  try {
    const res = await axios.post(API_URL+"/models/", model);
    return res.data;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export const updateModel = async (model, modelId) => {
  try {
    const res = await axios.put(
      API_URL+"/models/" + modelId,
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
      API_URL+"/models/" + modelId
    );
    return res.data;
  } catch (err) {
    return { error: err };
  }
};
export const getModelById = async (id) => {
  try {
    const res = await axios.get(API_URL+"/models/" + id);
    return res.data
  } catch (err) {
    return {error: err.message}
  }
};


export const uploadModelThumbnail = async (formData) => {
  try {
    const res = await axios.post(
      API_URL+"/thumbnailUpload/",
      formData
    );
    return res.data
      
  } catch (err) {
    console.log(err);
    return {error: err.message};
  }
};