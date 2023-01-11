import React, { useState } from "react";
import s from "./style.module.css";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const Developers = () => {
  const storage = getStorage();
  const [urlHelpFile, setUrlHelpFile] = useState('')
  
  getDownloadURL(ref(storage, 'help/help.html')).then((url) => setUrlHelpFile(url)).catch((error) => alert("Файл справки не найден", error.code));
  return (
    <div className={s.Page}>
      <div className={s.Container}>
        <p>Самарский университет</p>
        <p>Кафедра программных систем</p>
        <p style={{ marginTop: 30 }}>
          Курсовой проект по дисциплине «Программная инженерия»
        </p>
        <p style={{ marginTop: 30 }}>
          Тема проекта: «Автоматизированная система «Игра
        </p>
        <p>Puzzle» с функциями администратора»</p>
        <p style={{ marginTop: 30 }}>
          Разработчки: обучающиеся группы 6415-020302D
        </p>
        <p>Жужа Владислав Сергеевич</p>
        <p>Афонина Анна Александровна</p>
        <p style={{ marginTop: 30 }}>Самара 2022</p>
        <a href={urlHelpFile} target="_blank">
          <button className={s.Button}>Справка о системе</button>
        </a>
      </div>
    </div>
  );
};

export default Developers;
