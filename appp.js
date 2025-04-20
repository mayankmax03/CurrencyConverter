const Base_URL = "http://data.fixer.io/api/latest?access_key=7370ff2962d49abefc56c32f5bc74aa8";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
for (currcode in countryList){
let newOption=document.createElement("option");
newOption.innerText=currcode;
newOption.value=currcode;
select.append(newOption);
if(select.name==="from" && currcode==="USD"){
newOption.selected="selected";
}
else if(select.name==="to" && currcode==="INR"){
newOption.selected="selected";
}
};

select.addEventListener("change",(evt)=>{
updateflag(evt.target);
});
};

const updateExchangeRate=async()=>{
let amount=document.querySelector(".amount input");
let amtValue=amount.value;
if(amtValue===" " || amtValue<1){
amtValue=1;
amount.value="1";
}

// const URL = `${Base_Url}&base=${fromCurr.value}&symbols=${toCurr.value}`;
const URL = '${Base_Url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json';
let response = await fetch(URL);
if (!response.ok) {
msg.innerText = "Error Coming in exchange rate.";
return;
}
let data = await response.json();
let rate = data[toCurr.value.toLowerCase];

let finalAmount = amtValue * rate;
msg.innerText = '${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}';
console.log(rate);
console.log(data);
console.log(finalAmount);
};

const updateflag=(element)=>{
let currcode= element.value;
let countrycode=countryList[currcode];
let newsrc='https://flagsapi.com/${countrycode}/flat/64.png';
let image=element.parentElement.querySelector("img");
image.src=newsrc;
};
//
btn.addEventListener("click",async(evt)=>{
evt.preventDefault();
updateExchangeRate();
});

document.addEventListener("load",()=>{
updateExchangeRate();
});