import "../styles/main.scss";
import axios from "axios";
import { IState } from "./interfaces";

let state: IState = {
  houses: [],
};

const app = async () => {
  try {
    const res = await axios.get("https://www.anapioficeandfire.com/api/houses");

    state.houses = res.data;
  } catch (error) {
    console.log(error);
  }

  const cards = document.querySelector(".cards");

  state.houses.forEach((house) => {
    const card = `
        <div class="card">
            <h3>${house.name}</h3>
        </div>
    `;

    cards.insertAdjacentHTML("beforeend", card);
  });
};

app();
