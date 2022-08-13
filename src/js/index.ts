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
  success: false,
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

  const reset = () => {
    state.houses = [];
    state.loading = false;
    state.error = false;
    state.success = false;
  };

  const updateUI = () => {
    if (state.success) {
      setCards(state.houses);
    } else if (state.loading) {
      spinner();
    } else if (state.error) {
      errorMessage();
    }

    if (state.page === 1) {
      prev.disabled = true;
      one.disabled = true;
    } else if (state.page > 1) {
      prev.disabled = false;
      one.disabled = false;
    }
  };

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
      reset();
      state.loading = true;
      updateUI();

      const res = await axios.get(
        GET_HOUSES({ page: state.page, pageSize: state.pageSize })
      );

      state.houses = res.data;
      state.loading = false;
      state.success = true;
      updateUI();
    } catch (error) {
      console.log(error);

      state.loading = false;
      state.error = true;

      updateUI();
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
