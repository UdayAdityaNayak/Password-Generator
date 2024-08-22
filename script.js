const pass_text=document.querySelector(".password_txt");
const Length_text=document.querySelector("[pass_length]");
const cm=document.querySelector(".cpy_msg");
const upper=document.querySelector("[uppercase]");
const lower=document.querySelector("[lowercase]");
const num=document.querySelector("[number]");
const sym=document.querySelector("[Symbol]");
const all_check_box=document.querySelectorAll("input[type=checkbox]");
const cpy_btn=document.querySelector("[copy_button]");
const slider_inner=document.querySelector(".slider_text");
const gp=document.querySelector("[generate_pass]");
const strength_indicator=document.querySelector(".strength_indicater");
const SYMBOLS='~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
let passwordLength=10;
let checkCount=0;
password="";
setIndicator("#999799");
function slider_handler() {
    slider_inner.value=passwordLength;
    Length_text.innerHTML=passwordLength;
    const min=slider_inner.min;
    const max=slider_inner.max;
    slider_inner.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%";
}
console.log("the handler is working");
function sufflePassword(array){
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
}
slider_handler();
console.log("the suffle is working");
function setIndicator(color){
    strength_indicator.style.backgroundColor=color;
    strength_indicator.style.boxShadow=`0px 0px 8px 1px ${color}`; 
}
function getRandNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function genarateRandNum(){
    return getRandNum(0,9);
}
function genarateUpper(){
    return String.fromCharCode(getRandNum(65,91));
}
function genarateLower(){
    return String.fromCharCode(getRandNum(97,123))
}
function genarateSymbols(){
    const randNum=getRandNum(0,SYMBOLS.length);
    return SYMBOLS.charAt(randNum);
}
console.log("the set color is working");
function cal_strength(){
    let hasUpper=false;
    let hasLower=false;
    let hasSymbol=false;
    let hasnumber=false;
    if(upper.checked) hasUpper=true;
    if(lower.checked) hasLower=true;
    if(sym.checked)  hasSymbol=true;
    if(num.checked) hasnumber=true;
    if(hasUpper && hasLower &&(hasnumber || hasSymbol) && passwordLength >=8){
        setIndicator("#0f0");
    }
    else if ((hasLower || hasUpper)&&(hasnumber || hasSymbol)&& passwordLength >=6){
        setIndicator("#FFA500");
    }else{
        setIndicator("#FF0000");
    }

}
console.log("strength is working ");
async function copy(){
    try{
        await navigator.clipboard.writeText(pass_text.value);
        cm.innerHTML="Copied";
    }
    catch(e){
        cm.innerHTML="Failed";
    }
    cm.classList.add("active");
    setTimeout( ()=>{
        cm.classList.remove("active");
    },2000);
}
function handleBoxChange(){
    checkCount = 0;
    all_check_box.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        slider_handler();
    }
}
all_check_box.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleBoxChange)
})

slider_inner.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    slider_handler();
})
cpy_btn.addEventListener('click',()=>{
    if(pass_text.value){
        copy();
    }
})
gp.addEventListener('click',()=>{
    if(checkCount==0) return;
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        slider_handler();
    }
    password="";
    
    // if(upper.checked){
    //     password+=genarateUpper();
    // }
    // if(lower.checked){
    //     password+=genarateLower();
    // }
    // if(num.checked){
    //     password+=genarateRandNum();
    // }
    // if(sym.checked){
    //     password+=genarateSymbols();
    // }


let func_arr=[];
if (upper.checked)
    func_arr.push(genarateUpper);
if (lower.checked)
    func_arr.push(genarateLower);
if (num.checked)
    func_arr.push(genarateRandNum);
if (sym.checked)
    func_arr.push(genarateSymbols);
for(let i=0;i<func_arr.length;i++){
    password+=func_arr[i]();
}

for(let i=0;i<passwordLength-func_arr.length;i++){
    let randIndx=getRandNum(0,func_arr.length);
    password+=func_arr[randIndx]();
}
password=sufflePassword(Array.from(password));
pass_text.value=password;
cal_strength();
});