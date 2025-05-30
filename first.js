// const BASE_URL =
//   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


  const dropdowns = document.querySelectorAll(".dropdown select");
  console.log(dropdowns);

  const btn = document.querySelector("form button");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  const msg = document.querySelector(".msg");

  

  for(select of dropdowns ){
    for(currCode in  countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        } else if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=> {
           updadateFlag(evt.target);
    })

  }

 const  updadateFlag = (element)=>{

    // console.log(element);
    let currCode = element.value;
    console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

 }

 btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
   
 });

 const updateExchangeRate =  async ()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json` ;
    // const URL = `http://localhost:5000/api/rate/${fromCurr.value}/${toCurr.value}`;
    const URL = `http://127.0.0.1:5050/api/rate/${fromCurr.value}/${toCurr.value}`;




    try{
        let response = await fetch(URL);
    // console.log(response);
    let data = await response.json();
    // console.log(data);
    // let rate = data[toCurr.value.toLowerCase()];
    let rate = data.rate;

    // console.log(rate);

    let finalAmount = amtVal*rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    } catch(error) {
        msg.innerText = "Error fetching exchange rate.";
        console.log(error);
    }
 };

 window.addEventListener("load", () => {
    updateExchangeRate();
});