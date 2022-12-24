import React from "react";
import s from "./style.module.css";
import { HELP_ROUTE } from "../../../utils/consts";
import { Link } from "react-router-dom";

const Developers = () => {
  return (
    <div className={s.Page}>
      <div className={s.Container}>
        <h1>Сведения о разработчиках:</h1>
        <p>Курсовая работа по проекту "Программная инженерия"</p>
        <p>Студентов группы 6415 Афониной Анны и Жужи Владислава</p>
        <p>2022 год</p>
        <Link to={HELP_ROUTE}>
          <button className={s.Button}>Справка о системе</button>
        </Link>
      </div>
    </div>
  );
};

export default Developers;
