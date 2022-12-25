import React from "react";
import s from "./style.module.css";
import { HELP_ROUTE } from "../../../utils/consts";

const Developers = () => {
  return (
    <div className={s.Page}>
      <div className={s.Container}>
        <p>Самарский университет</p>
        <p>Кафедра программных систем</p>
        <p style={{ marginTop: 30 }}>
          Курсовой проект по дисциплине Программная инженерия
        </p>
        <p style={{ marginTop: 30 }}>
          Тема проекта: «Автоматизированная система «Игра
        </p>
        <p>Puzzle» с функциями администратора»</p>
        <p style={{ marginTop: 30 }}>
          Разработчки: студенты группы 6415-020302D
        </p>
        <p style={{ alignSelf: "right" }}>Жужа Владислав Сергеевич</p>
        <p style={{ alignSelf: "right" }}>Афонина Анна Александровна</p>
        <p style={{ marginTop: 30 }}>Самара 2022</p>
        {/* <Link to={HELP_ROUTE}>
          <button className={s.Button}>Справка о системе</button>
        </Link> */}
        <a href="./help/help.html" target="_blank">
          <button className={s.Button}>Справка о системе</button>
        </a>
        {/* <button className={s.Button}>
          Справка о системе
        </button> */}
      </div>
    </div>
  );
};

export default Developers;
