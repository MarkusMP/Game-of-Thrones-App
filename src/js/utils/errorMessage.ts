const cards = document.querySelector(".cards") as HTMLDivElement;

export const errorMessage = () => {
  cards.innerHTML = "";

  const message = (document.createElement("p").innerText =
    "Error fetching data...");

  cards.append(message);
};
