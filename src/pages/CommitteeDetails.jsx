import React, { useState, useEffect } from "react";
import { db } from "../farebase/config";
import { collection, getDocs } from "firebase/firestore";

const CommitteeDetails = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "committees"));
        const committees = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(committees);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Подробная информация о комитете
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Название</th>
              <th className="border border-gray-300 p-2">Город</th>
              <th className="border border-gray-300 p-2">Молодых</th>
              <th className="border border-gray-300 p-2">Старых</th>
              <th className="border border-gray-300 p-2">Бедных семей</th>
              <th className="border border-gray-300 p-2">Новости</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.city}</td>
                <td className="border border-gray-300 p-2">
                  {item.population?.young || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {item.population?.old || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">
                  {item.population?.poor || "N/A"}
                </td>
                <td className="border border-gray-300 p-2">{item.news}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommitteeDetails;
