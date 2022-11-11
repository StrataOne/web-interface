// ANIMATE ON SCROLL
AOS.init();
// STATISTICS COUNT DOWN
function animate(obj, initVal, lastVal, duration) {
    let startTime = null;
    let currentTime = Date.now();
    const step = (currentTime ) => {
        if (!startTime) {
        startTime = currentTime ;
        }
        const progress = Math.min((currentTime  - startTime) / duration, 1);
        obj.innerHTML = Math.floor(progress * (lastVal - initVal) + initVal);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
let text1 = document.getElementById('amount-deligated');
let text2 = document.getElementById('paid-reward');
let text3 = document.getElementById('delegates');
if(  $("#statistics").is(":visible") == true )
{  
    animate(text1, 0, 3845866, 5000);
    animate(text2, 0, 38482, 5000);
    animate(text3, 100, 3845777, 5000);    
}