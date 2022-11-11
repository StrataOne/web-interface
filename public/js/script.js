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
// HARMONY BLOCKCHAIN

function harmonyDetails() {
    $.ajax({
      type: "POST",
      url: "https://api.s0.t.hmny.io",
      headers: {"Content-Type": "application/json"},
      timeout: 5000,
      data:     JSON.stringify({
        "jsonrpc":"2.0",
        "method":"hmyv2_getValidatorInformation",
        "params":[
          "one1atp5gxdxxt9yqux6kq64eacz7x8cyldejqjd9f"
        ],
        "id":1
    }),
      success: function (data) {
        let apr = data.result.lifetime.apr;
        let totalDelegation = data.result["total-delegation"];
        let totalDelegators = data.result.validator.delegations;
        let lockup = NaN;
        let totalApr = parseFloat(apr).toFixed(2);
        let removingExponential = totalDelegation / (10**24);
        let total = Math.floor(parseInt(removingExponential * 1000000).toFixed(7));
        totalDelegation = total;
        totalDelegators = totalDelegators.length;
        console.log("HARMONY BLOCKCHAIN");
        console.log("=======================================================================");
        console.log("Total Delegations:" + totalDelegation + ";    APR:" + totalApr + ";    Lock Up:" + lockup + ";    Total Delegators:" + totalDelegators);
        console.log("=======================================================================");
      },
      error: function (err) {
        console.log(err);
      },
    });
  }
  
  $(".btn-style").on("click", function (event) {
    harmonyDetails();
  });
  