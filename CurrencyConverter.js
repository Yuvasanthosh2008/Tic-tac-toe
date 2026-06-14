const baseurl = "https://open.er-api.com/v6/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for (let select of dropdowns) {
  for (let currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value = currcode;
    if (select.name === "from" && currcode === "USD") {
      newoption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      newoption.selected = "selected";
    }
    select.append(newoption);
  }
  select.addEventListener("change", (e) => {
    updateflag(e.target);
  });
}
const updateflag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let image = element.parentElement.querySelector("img");
  image.src = newSrc;
};
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amt = document.querySelector(".amount input");
  let amtval = amt.value;
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amt.value = "1";
  }
  try {
    const URL = `${baseurl}/${fromcurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[tocurr.value];
    let finalAmount = Number(amtval) * rate;
    msg.innerText = `${amtval} ${fromcurr.value} = ${finalAmount.toFixed(2)} ${tocurr.value}`;
  } catch (err) {
    msg.innerText = "Something went wrong!";
    console.log(err);
  }
});