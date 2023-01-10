import React, { useState } from "react";
import s from "./style.module.css";
import { HELP_ROUTE } from "../../../utils/consts";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const Developers = () => {
  const storage = getStorage();
  const [urlHelpFile, setUrlHelpFile] = useState('')
  // const tryRequire = async () => {
  //     try {
  //       let response = await fetch("http://localhost:3000/help/help.html");
  //       let test = await response.text();
  //       console.log(test)
  //       console.log(response);
  //     } catch (err) {
  //       console.log("Fetch error:" + err);
  //     }
  // };
  // const helpFileRef = ref(storage, `https://firebasestorage.googleapis.com/v0/b/puzzle-8a8e3.appspot.com/o/help%2Fhelp.html?alt=media&token=309effbc-5bca-48ba-acb2-c5991cfde7b6`);
  // console.log(helpFileRef);
  
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
        {/* <Link to={HELP_ROUTE}>
          <button className={s.Button}>Справка о системе</button>
        </Link> */}
        
        <a href={urlHelpFile} target="_blank">
          <button className={s.Button}>Справка о системе</button>
        </a>
        {/* <button className={s.Button} onClick={tryRequire}>
          Справка о системе
        </button> */}
      </div>
    </div>
  );
};

export default Developers;
