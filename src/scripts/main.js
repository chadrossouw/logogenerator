import localsouth from "./localsouth";
import "./drapdroptouch"
//Sets a vh custom property to account for the shifting vh in mobile
setDocHeight();
window.addEventListener('resize', setDocHeight);
window.addEventListener('orientationchange', setDocHeight);

function setDocHeight(){
    document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`);
}

localsouth();
