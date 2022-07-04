import "../styles/main.scss";
import axios from "axios";
import { IHouse, IState } from "./interfaces";
import { GET_HOUSES } from "./api";

let state: IState = {
  houses: [],
};

const app = async () => {
  const cards = document.querySelector(".cards") as HTMLDivElement;
  const query = document.querySelector(".query") as HTMLInputElement;

  const setCards = (data: IHouse[]) => {
    cards.innerHTML = "";

    data.forEach((house) => {
      const card = `
          <div class="card">
              <h3>${house.name}</h3>
          </div>
      `;

      cards.insertAdjacentHTML("beforeend", card);
    });
  };

  try {
    const res = await axios.get(GET_HOUSES);

    state.houses = res.data;

    setCards(state.houses);
  } catch (error) {
    console.log(error);
  }

  query.addEventListener("input", () => {
    const data = state.houses.filter((house) =>
      house.name.toUpperCase().includes(query.value.toUpperCase())
    );

    setCards(data);
  });
};

app();
