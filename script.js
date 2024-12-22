let BASE_URL = "https://apilayer.net/api/live?access_key=8de7002e78585dde1d3d92b284e7dd39"
let dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("button")
let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")
// select
for(let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText = currCode;
        newOption.value = currCode
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected"
        } else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}
const updateExchangeRate = async () =>{
    let amount = document.querySelector("input")
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}&currencies=${toCurr.value}&source=${fromCurr.value}&format=1`
    // console.log(URL)
    let response = await fetch(URL);
    let dataObj = await response.json();
    let obj1 = dataObj["quotes"]
    let arr1 = Object.values(obj1)
    let rate = arr1[0]
    // console.log(rate)
    let finalAmt = amtVal * rate;
    // console.log(finalAmt)
    let from = fromCurr.value
    let to = toCurr.value
    msg.textContent = `${amtVal} ${from} = ${finalAmt} ${to}`
}
const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    newUrl = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newUrl;
}
btn.addEventListener("click", async (evt)=> {
    evt.preventDefault();
    updateExchangeRate();
})
window.addEventListener("load", () => {
    updateExchangeRate();
})