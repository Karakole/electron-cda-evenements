import Evenements from "./Evenements.js";
document
  .getElementById("toggle-dark-mode")
  .addEventListener("click", async () => {
    const isDarkMode = await window.darkMode.toggle();
    document.getElementById("theme-source").innerHTML = isDarkMode
      ? "Dark"
      : "Light";
  });

document
  .getElementById("reset-to-system")
  .addEventListener("click", async () => {
    await window.darkMode.system();
    // document.getElementById("theme-source").innerHTML = "System";
  });

const evenements = new Evenements();
evenements.getEvenements().then((data) => {
  const d = data.evenements;
  d.map((ev) => {
    evenements.setDOMEvenement(ev);

  });
});
