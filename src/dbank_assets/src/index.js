import { dbank } from "../../declarations/dbank"; // Exposes the motoko code

// Every time the page is loaded, update the balance in the html.
window.addEventListener("load", async () => {
  update();
});

// Form to add and withdraw money.
document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  // When clicked, disable the button.
  const button = event.target.querySelector("#submit-btn");

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const withdrawalAmount = parseFloat(
    document.getElementById("withdrawal-amount").value
  );

  button.setAttribute("disabled", true);

  if (document.getElementById("input-amount").value.length != 0) {
    await dbank.topUp(inputAmount);
  }

  if (
    document.getElementById("withdrawal-amount").value.length != 0
    // && document.getElementById("withdrawal-amount").value <= (await dbank.checkBalance())
  ) {
    await dbank.withdraw(withdrawalAmount);
  }

  await dbank.compound();

  // Update the balance shown, enable the button again and clear the inputs
  update();

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";

  button.removeAttribute("disabled");
});

async function update() {
  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText =
    Math.round(currentAmount * 100) / 100;
}
