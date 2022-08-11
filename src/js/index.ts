import "../styles/main.scss";
import axios from "axios";
import { IHouse, IState } from "./interfaces";
import { GET_HOUSES } from "./api";
import { spinner } from "./utils/spinner";
import { errorMessage } from "./utils/errorMessage";

let state: IState = {
  houses: [],
  loading: false,
  error: false,
  page: 1,
  pageSize: 10,
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
  const next = document.querySelector(".next") as HTMLButtonElement;
  const prev = document.querySelector(".prev") as HTMLButtonElement;
  const one = document.querySelector(".one") as HTMLButtonElement;

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

  const fetchData = async () => {
    try {
      state.loading = true;
      spinner();

      const res = await axios.get(
        GET_HOUSES({ page: state.page, pageSize: state.pageSize })
      );

      state.houses = res.data;

      setCards(state.houses);
      state.loading = false;
    } catch (error) {
      console.log(error);

      state.loading = false;
      state.error = true;

      errorMessage();
    }
  };

  fetchData();

  next.addEventListener("click", () => {
    state.page = state.page + 1;

    fetchData();
  });

  prev.addEventListener("click", () => {
    if (state.page > 1) {
      state.page = state.page - 1;
      fetchData();
    }
  });

  one.addEventListener("click", () => {
    if (state.page !== 1) {
      state.page = 1;
      fetchData();
    }
  });

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
