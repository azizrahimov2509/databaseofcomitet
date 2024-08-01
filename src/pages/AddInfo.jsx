import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../farebase/config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { Modal, Button } from "react-daisyui";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const AddMahalla = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    population: {
      young: "",
      old: "",
      poor: "",
    },
    news: "",
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Add useNavigate hook

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "committees"));
      const committees = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        population: doc.data().population || {
          young: "",
          old: "",
          newlyweds: "",
        },
      }));
      setData(committees);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editMode) {
        // Update existing document
        const docRef = doc(db, "committees", currentId);
        await updateDoc(docRef, formData);
        toast.success("Данные успешно обновлены!");
      } else {
        // Add new document
        const docRef = await addDoc(collection(db, "committees"), formData);
        toast.success("Данные успешно добавлены!");
      }
      setFormData({
        name: "",
        city: "",
        population: { young: "", old: "", poor: "" },
        news: "",
      });
      setShowModal(false);
      fetchData();

      // Store in localStorage
      const localStorageData =
        JSON.parse(localStorage.getItem("committees")) || [];
      if (editMode) {
        const updatedData = localStorageData.map((item) =>
          item.id === currentId ? { id: currentId, ...formData } : item
        );
        localStorage.setItem("committees", JSON.stringify(updatedData));
      } else {
        localStorageData.push({ id: docRef.id, ...formData });
        localStorage.setItem("committees", JSON.stringify(localStorageData));
      }
    } catch (error) {
      toast.error("Ошибка при добавлении/обновлении данных!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Вы уверены, что хотите удалить эту запись?")) {
      try {
        await deleteDoc(doc(db, "committees", id));
        toast.success("Данные успешно удалены!");
        fetchData();

        // Update localStorage
        const localStorageData =
          JSON.parse(localStorage.getItem("committees")) || [];
        const updatedData = localStorageData.filter((item) => item.id !== id);
        localStorage.setItem("committees", JSON.stringify(updatedData));
      } catch (error) {
        toast.error("Ошибка при удалении данных!");
      }
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setCurrentId(item.id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <Button
          className="btn btn-primary mb-4"
          onClick={() => {
            setEditMode(false);
            setShowModal(true);
          }}
        >
          Добавить махаллу
        </Button>
        <Button className="btn btn-secondary mb-4" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        className="modal-center fixed inset-0 flex items-center justify-center z-50 p-4"
      >
        <div className="p-4 shadow-lg rounded-lg bg-base-200 w-full max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            {editMode ? "Редактировать махаллу" : "Добавить махаллу"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Название махаллы
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Город (адрес)
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Количество населения
              </label>
              <input
                type="number"
                placeholder="Молодых"
                value={formData.population.young}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    population: {
                      ...formData.population,
                      young: e.target.value,
                    },
                  })
                }
                className="input input-bordered w-full mb-2"
                required
              />
              <input
                type="number"
                placeholder="Старых"
                value={formData.population.old}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    population: { ...formData.population, old: e.target.value },
                  })
                }
                className="input input-bordered w-full mb-2"
                required
              />
              <input
                type="number"
                placeholder="Бедных семей"
                value={formData.population.poor}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    population: {
                      ...formData.population,
                      poor: e.target.value,
                    },
                  })
                }
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Новости</label>
              <textarea
                value={formData.news}
                onChange={(e) =>
                  setFormData({ ...formData, news: e.target.value })
                }
                className="textarea textarea-bordered w-full"
                rows={4}
              />
            </div>
            <div className="flex items-center justify-between">
              <Button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader size={24} color={"#3498db"} />
                ) : editMode ? (
                  "Обновить"
                ) : (
                  "Сохранить"
                )}
              </Button>
              <Button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Отмена
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      <div className="mt-8 overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left text-xs md:text-sm lg:text-base">
                Название
              </th>
              <th className="border border-gray-300 p-2 text-left text-xs md:text-sm lg:text-base">
                Город
              </th>
              <th className="border border-gray-300 p-2 text-left text-xs md:text-sm lg:text-base">
                Молодых
              </th>
              <th className="border border-gray-300 p-2 text-left text-xs md:text-sm lg:text-base">
                Старых
              </th>
              <th className="border border-gray-300 p-2 text-left text-xs md:text-sm lg:text-base">
                Бедных
              </th>
              <th className="border border-gray-300 p-2 text-left text-xs md:text-sm lg:text-base">
                Новости
              </th>
              <th className="border border-gray-300 p-2 text-left text-xs md:text-sm lg:text-base">
                Действия
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 p-2 text-xs md:text-sm lg:text-base">
                  {item.name}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm lg:text-base">
                  {item.city}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm lg:text-base">
                  {item.population.young}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm lg:text-base">
                  {item.population.old}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm lg:text-base">
                  {item.population.poor}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm lg:text-base">
                  {item.news}
                </td>
                <td className="border border-gray-300 p-2 text-xs md:text-sm lg:text-base">
                  <Button
                    className="btn btn-outline btn-warning mr-2"
                    onClick={() => handleEdit(item)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    className="btn btn-outline btn-error"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddMahalla;
