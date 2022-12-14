import { useState } from "react";
import { Link } from "react-router-dom";
import { useActions } from "../../services/hooks/actions";
import Settings from "../Settings/Settings";

export default function Header() {
  const [modalActive, setModalActive] = useState(false);
  const { quitGame } = useActions();

  const handleQuit = () => {
    quitGame();
    setModalActive(false);
  };
  console.log("Header render");

  return (
    <nav className="flex justify-between justify-items-center items-center h-12 w-full py-2 px-5 shadow-lg bg-gradient-to-tr from-blue-500 to-blue-600 bg-blue-500 text-white ">
      <img src="./axi_logo.png" alt="Axioma" className="mx-2 h-10 w-10 z-10" />

      <Settings active={modalActive} setActive={setModalActive}>
        <h1 className="mx-auto">Настройки</h1>

        <img
          src="./instruction.png"
          alt="Инструкция"
          className=" h-fit w-fit"
        />
        <Link
          to="/"
          onClick={() => handleQuit()}
          className="px-2 py-0 text-md mx-auto bg-red-600 text-white w-fit rounded-md shadow-xl hover:bg-red-500 hover:shadow-sm"
        >
          Выход в главное меню
        </Link>
      </Settings>

      <button
        className="h-10 w-10 p-1 bg-orange-600 border-slate-100 border-2 shadow-black shadow-3xl z-10 hover:shadow-sm hover:scale-105 rounded-2xl inline-block"
        onClick={() => setModalActive(true)}
      >
        <img src="./setting.svg" alt="Settings" className="block z-10" />
      </button>
    </nav>
  );
}
