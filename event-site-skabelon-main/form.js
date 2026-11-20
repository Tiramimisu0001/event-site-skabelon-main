// Formular: begrænser antal retter efter den valgte billet

{
  const billet = document.querySelector("#tid");
  const bokse = document.querySelectorAll('input[name="ret"]');
  const taeller = document.querySelector("#ret-taeller");
  const knap = document.querySelector("#rute-knap");

  // Hvor mange retter hver billet giver
  const maxRetter = { 1: 4, "1-3": 8, "3-6": 16 };

  function opdater() {
    const antal = document.querySelectorAll('input[name="ret"]:checked').length;

    // Ingen billet valgt endnu
    if (billet.value === "") {
      taeller.textContent = "Vælg din billet først, så kan du se, hvor mange retter du kan nå.";
      bokse.forEach((boks) => (boks.disabled = false));
      knap.disabled = false;
      taeller.classList.remove("for-mange");
      return;
    }

    // Heldag: ingen grænse
    if (billet.value === "hele") {
      taeller.textContent = "Du har valgt " + antal + " retter · Heldag: vælg så mange du vil";
      bokse.forEach((boks) => (boks.disabled = false));
      knap.disabled = false;
      taeller.classList.remove("for-mange");
      return;
    }

    const max = maxRetter[billet.value];

    // For mange valgt (fx hvis man skifter til en mindre billet bagefter)
    if (antal > max) {
      taeller.textContent = "Du har valgt " + antal + " retter, men din billet giver max " + max + ". Fjern " + (antal - max) + ".";
      taeller.classList.add("for-mange");
      knap.disabled = true;
    } else {
      taeller.textContent = "Du har valgt " + antal + " af max " + max + " retter";
      taeller.classList.remove("for-mange");
      knap.disabled = false;
    }

    // Lås resten, når man har nået max
    bokse.forEach((boks) => {
      boks.disabled = !boks.checked && antal >= max;
    });
  }

  billet.addEventListener("change", opdater);
  bokse.forEach((boks) => boks.addEventListener("change", opdater));
  opdater();
}
