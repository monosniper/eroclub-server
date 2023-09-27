import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addModel,
  updateModel,
  getModelById,
  uploadModelThumbnail,
} from "../features/apiCalls";

const BASE_API_URL = "http://5.45.92.200:8081";
const AddModel = () => {
  const { id } = useParams();
  const [defaultValue, setDeafaultValue] = useState({
    name: "",
    phone: "",
    age: "",
    height: "",
    breast: "",
    location: "",
    hour: "",
    hour_2: "",
    night: "",
    is_out: "",
    description: "",
    time: "",
    services: "",
  });
  const [selectedImage, setSelectedImage] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getModel = async () => {
      const { data } = await getModelById(id);
      console.log(data);
      if (data) setDeafaultValue({ ...data[0] });
    };
    getModel();
  }, [id]);

  useEffect(() => {
    let url;
    if (selectedImage) {
      url = URL.createObjectURL(selectedImage);
      setPreviewUrl(url);
    }
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedImage]);

  const {
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
    description,
    time,
    services,
    thumbnail,
    modelId,
  } = defaultValue;
  console.log(modelId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);
    let formData = new FormData(e.target);
    let fileFormData = new FormData();
    let files = document.querySelector('#thumbnail').files;
    const values = Object.fromEntries(formData.entries());
    const pId = !modelId
      ? values.name.toLowerCase().replaceAll(/[\s\t]+/g, "-")
      : modelId;
    fileFormData.append("modelId", pId);
    delete values.thumbnail;
    console.log(selectedImage)
    try {

      if (!!selectedImage) {
        fileFormData.append("thumbnail", files[0]);
        let { data, error } = await uploadModelThumbnail(fileFormData);
        if (error) throw new Error(error);
        values["thumbnail"] = data;
      }
      if (pId && !!modelId) {
        let { data, error } = await updateModel(values, modelId);
        if (error) throw new Error(error);
      } else if (pId) {
        let formValues = {
          modelId: pId,
          ...values,
          thumbnail: "test-model.jpg",
        };
        let { data, error } = await addModel(formValues);
        if (error) throw new Error(error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container max-w-5xl py-10">
      <div className="flex space-x-6 mb-10 items-center">
        <button
          onClick={() => navigate(-1)}
          className="h-10 leading-none text-xl"
        >
          {"<"}
        </button>
        <h2 className="text--title">
          {defaultValue.name ? "Update model" : "Add model"}
        </h2>
      </div>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Имя</label>
            <input
              defaultValue={name || ""}
              name="name"
              placeholder="Enter name..."
              type="text"
            />
          </div>
          <div className="mb-4">
            <label>Телефон</label>
            <input
                defaultValue={phone || ""}
                name="phone"
                placeholder="Enter phone..."
                type="text"
            />
          </div>
          <div className="mb-4">
            <label>Возраст</label>
            <input
              defaultValue={age}
              name="age"
              placeholder="Enter age..."
            />
          </div>
          <div className="mb-4">
            <label>Рост</label>
            <input
                defaultValue={height}
                name="height"
                placeholder="Enter height..."
            />
          </div>
          <div className="mb-4">
            <label>Грудь</label>
            <input
                defaultValue={breast}
                name="breast"
                placeholder="Enter breast..."
            />
          </div>
          <div className="mb-4">
            <label>Город</label>
            <input
                defaultValue={location || ""}
                name="location"
                placeholder="Enter location..."
                type="text"
            />
          </div>
          <div className="mb-4">
            <label>1 час</label>
            <input
                defaultValue={hour}
                name="hour"
                placeholder="Enter hour..."
            />
          </div>
          <div className="mb-4">
            <label>2 часа</label>
            <input
                defaultValue={hour_2}
                name="hour_2"
                placeholder="Enter hour_2..."
            />
          </div>
          <div className="mb-4">
            <label>Ночь</label>
            <input
                defaultValue={night}
                name="night"
                placeholder="Enter night..."
            />
          </div>
          <div className="mb-4">
            <label>Выезд</label>
            <input
                defaultValue={is_out}
                name="is_out"
                placeholder="Enter is_out..."
            />
          </div>


          <div className="mb-4">
            <label>Описание</label>
            <textarea
                defaultValue={description || ""}
                name="description"
                className="resize-none"
                rows={5}
            ></textarea>
          </div>
          <div className="mb-4">
            <label>Время звонков</label>
            <input
                defaultValue={time}
                name="time"
                placeholder="Enter time..."
            />
          </div>
          <div className="mb-4">
            <label>Интим услуги</label>
            <textarea
                defaultValue={services || ""}
                name="services"
                className="resize-none"
                rows={5}
            ></textarea>
          </div>

          <div className="mb-10">
            <label>Thumbnail</label>
            <input
              onChange={(e) => {
                setSelectedImage(e.target.files[0]);
              }}
              id={'thumbnail'}
              accept="image/*"
              name="thumbnail"
              type={"file"}
            />
            {(thumbnail || previewUrl) && (
              <img
                className="h-48"
                alt="thumbnail"
                src={
                  previewUrl
                    ? previewUrl
                    : `${BASE_API_URL}/uploads/${thumbnail}`
                }
              />
            )}
          </div>
          <div className="flex items-center mb-5">
            <button className="w-full">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModel;
