import "../styles/main.scss";
import axios from "axios";
import { IHouse, IState } from "./interfaces";
import { GET_HOUSES } from "./api";
import { spinner } from "./utils/spinner";

let state: IState = {
  houses: [],
  loading: false,
};

const app = async () => {
  const cards = document.querySelector(".cards") as HTMLDivElement;
  const query = document.querySelector(".query") as HTMLInputElement;
  const modal = document.querySelector(".modal") as HTMLDivElement;
  const span = document.querySelector(".close") as HTMLSpanElement;
  const name = document.querySelector(".name") as HTMLHeadingElement;
  const region = document.querySelector(".region") as HTMLParagraphElement;
  const coatOfArms = document.querySelector(
    ".coatOfArms"
  ) as HTMLParagraphElement;

  const setCards = (data: IHouse[]) => {
    cards.innerHTML = "";

    data.forEach((house) => {
      const cardContainer = document.createElement("div");
      const cardTitle = document.createElement("h3");

      cardContainer.className = "card";
      cardTitle.className = "title";
      cardTitle.innerText = house.name;

      cardContainer.appendChild(cardTitle);
      cards.appendChild(cardContainer);

      cardTitle.addEventListener("click", () => {
        house.name ? (name.innerText = house.name) : "";
        house.region
          ? (region.innerHTML = `<span class="bold">Region:</span> ${house.region}`)
          : "";
        house.coatOfArms
          ? (coatOfArms.innerHTML = `<span class="bold">Coat of Arms:</span>  ${house.coatOfArms}`)
          : "";
        modal.style.display = "block";
      });
    });
  };

  try {
    state.loading = true;
    spinner();

    const res = await axios.get(GET_HOUSES);

    state.houses = res.data;

    setCards(state.houses);
    state.loading = false;
  } catch (error) {
    state.loading = false;
    console.log(error);
  }

  query.addEventListener("input", () => {
    const data = state.houses.filter((house) =>
      house.name.toUpperCase().includes(query.value.toUpperCase())
    );

    setCards(data);
  });

  span.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  };
};

app();
