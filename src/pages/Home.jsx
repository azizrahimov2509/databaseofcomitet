import React from "react";

import mahallaimage from "../../public/mahalla.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col items-center px-4 py-8 lg:items-start">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between w-full">
          <div className="lg:w-1/2 mt-14 text-center lg:text-left">
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">
              Базы данных рабочего процесса махалинских комитетов
            </h1>
            <h2 className="text-base lg:text-xl">
              В целях дальнейшего совершенствования поддержки махаллей,
              эффективной организации деятельности и обеспечения взаимодействия
              лиц, ответственных за работу «махаллабай», а также создания в
              соответствии со статьей 127 Конституции Республики Узбекистан
              необходимых условий для функционирования органов самоуправления
              граждан, содействия в реализации ими определенных законом
              полномочий.
            </h2>
          </div>

          <div className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center">
            <img
              className="w-full max-w-xs lg:max-w-full"
              src={mahallaimage}
              alt="mahalla image"
            />
          </div>
        </div>

        <div className="mt-10">
          <Link to="/committees" className="btn btn-primary">
            База данных
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
