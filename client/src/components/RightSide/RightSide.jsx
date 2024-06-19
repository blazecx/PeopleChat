import React, { useState } from "react";
import "./RightSide.css";

import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";
import NavIcons from "../NavIcons/NavIcons";
const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="RightSide">
      {/* Боковая панель навигации */}

      <NavIcons />
      {/* Карта трендов */}
      <TrendCard />

      {/* Кнопка поделиться */}
      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Поделиться
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
