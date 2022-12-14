import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useActions } from "../../../services/hooks/actions";
import { useAppSelector } from "../../../services/hooks/redux";
import { IPlayer } from "../../../services/models/IPlayer";
import Settings from "../../Settings/Settings";
import Card from "./Card";
import Dices from "./Dices";
import Instruction from "./Instruction";

function GamePage() {
  const { cards, players, gameStatus } = useAppSelector(
    (state) => state.gameReducers
  );
  const { layingCards, handleScoring, quitGame } = useActions();

  const [activePlayer, setActivePlayer] = useState<IPlayer>();
  const [instructionOpen, setInstructionOpen] = useState(false);
  const [scoringOpen, setScoringOpen] = useState(false);
  const [endGameOpen, setEndGameOpen] = useState(false);

  const PLAYING_DICES = "playingDice";
  const SCORING = "scoring";
  const END_GAME = "endGame";

  const handleQuit = () => {
    quitGame();
    setEndGameOpen(false);
  };

  useEffect(() => {
    setActivePlayer(players.find((p) => p.turn));
  }, [gameStatus]);

  useEffect(() => {
    if (gameStatus.check === SCORING) {
      setScoringOpen(true);
    } else if (gameStatus.check === PLAYING_DICES) {
      setScoringOpen(false);
    } else if (gameStatus.check === END_GAME) {
      setScoringOpen(false);
      setEndGameOpen(true);
    }
  }, [gameStatus.check]);

  useEffect(() => {
    layingCards();
  }, []);

  return (
    <div id="game-page" className="bg-white h-fit w-screen min-h-screen">
      <button
        className="absolute top-16 right-8"
        onClick={() => setInstructionOpen(true)}
      >
        <img
          src="./question.svg"
          alt="Инструкция"
          className="w-10 h-10 hover:scale-105"
        />
      </button>

      <div className="flex flex-col justify-between left-0 mx-auto my-auto top-[5%] h-[50%]">
        <div className="flex text-white justify-center text-center pb-1 px-2 font-sans text-xl font-bold mx-auto mt-4 bg-gradient-to-tr from-orange-400 to-orange-500 bg-orange-400 w-fit h-10 fancy-border transition ease-in-out delay-1500 shadow-md hover:shadow-sm">
          <h2 className="my-auto">
            {activePlayer ? `Ходит ${activePlayer?.name}` : "Найди кота!"}
          </h2>
        </div>
        <div className="flex flex-row">
          <div className="grid grid-cols-3 md:grid-cols-7 lg:grid-cols-10 gap-4 p-2 mx-1 md:p-6 md:mx-6 justify-between items-baseline h-fit w-[80%] ">
            {cards.map((card, idx) => {
              return <Card card={card} key={idx} />;
            })}
          </div>

          <div className="flex flex-col w-fit h-fit mt-8">
            <div className="grid grid-cols-1 gap-0 mx-auto justify-start h-fit w-fit ">
              <Dices />
            </div>
          </div>
        </div>
      </div>
      {/* Instruction */}
      <Settings active={instructionOpen} setActive={setInstructionOpen}>
        <Instruction />
      </Settings>

      {/* Scoring */}
      <Settings active={scoringOpen} setActive={setScoringOpen}>
        <h1>Нажмите на того, кто нашёл кота первым?</h1>
        <ul>
          {players.map((p) => {
            return (
              <li
                key={p.id}
                onClick={() => handleScoring(p)}
                className="flex z-10 justify-center flex-row mx-auto my-3 text-center text-lg font-bold font-sans text-white px-2 py-0 w-fit rounded-md  bg-blue-600 border-2 cursor-pointer hover:scale-105"
              >
                {p.name} <br /> количество очков:{p.points}
              </li>
            );
          })}
        </ul>
      </Settings>

      {/* End Game */}
      <Settings active={endGameOpen} setActive={setEndGameOpen}>
        <h1>Поздравляю! Вы нашли всех котов!</h1>
        {players.length && (
          <>
            <h1>Итоговый счёт:</h1>
            <ul>
              {Object.values(players)
                .sort((a, b) => {
                  if (b.points > a.points) {
                    return 1;
                  }
                  if (b.points < a.points) {
                    return -1;
                  }
                  return 0;
                })
                .map((p) => {
                  return (
                    <li
                      key={p.id}
                      onClick={() => handleScoring(p)}
                      className="flex z-10 justify-center flex-row mx-auto my-3 text-center text-lg font-bold font-sans text-white px-2 py-0 w-fit rounded-md  bg-blue-600 border-2 cursor-pointer hover:scale-105"
                    >
                      {p.name} <br /> Баллов: {p.points}
                    </li>
                  );
                })}
            </ul>
          </>
        )}
        <Link
          to="/"
          onClick={() => handleQuit()}
          className="px-2 py-0 mx-auto bg-red-600 text-white w-fit rounded-md shadow-xl hover:bg-red-500 hover:shadow-sm"
        >
          Выход в главное меню
        </Link>
      </Settings>
    </div>
  );
}

export default GamePage;
