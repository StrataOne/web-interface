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
        let lockup = 0;
        let totalApr = parseFloat(apr).toFixed(2);
        let removingExponential = totalDelegation / (10**24);
        let total = Math.floor(parseInt(removingExponential * 1000000).toFixed(7));
        totalDelegation = total;
        let str_totalD = totalDelegation.toString();
        totalDelegation= Number(str_totalD.slice(0, 7));
        totalDelegators = totalDelegators.length;
        console.log("HARMONY BLOCKCHAIN");
        console.log("=======================================================================");
        console.log("Total Delegations:" + totalDelegation + ";    APR:" + totalApr + ";    Lock Up:" + lockup + ";    Total Delegators:" + totalDelegators);
        console.log("=======================================================================");
        $("#harmony-apy").html(totalApr);
        $("#harmony-total-delegation").html(totalDelegation);
        $("#harmony-lockup").html(lockup);

      },
      error: function (err) {
        console.log(err);
        $("#harmony-apy").html("0.08");
        $("#harmony-total-delegation").html("7332799");
        $("#harmony-lockup").html("0");
      },
    });
  }

// OASIS BLOCKCHAIN
function oasisDetails() {
  $.ajax({
    type: "GET",
    url: "https://api.oasismonitor.com/data/validator/oasis1qp4tj3u9qkcgjqrrjvwljrqcyx3g5ygjqgtm37t3",
    headers: {"Content-Type": "application/json"},
    timeout: 5000,
    success: function (data) {
        let totalApr = 0.5;
        let totalDelegation = Math.floor(parseInt(data.delegations_balance).toFixed(7));
        let str_totalD = totalDelegation.toString();
        totalDelegation = Number(str_totalD.slice(0, 7));
        let totalDelegators = data.depositors_count;
        let lockup = 0;
      console.log("OASIS BLOCKCHAIN");
      console.log("=======================================================================");
      console.log("Total Delegations:" + totalDelegation + ";    APR:" + totalApr + ";    Lock Up:" + lockup + ";    Total Delegators:" + totalDelegators);
      console.log("=======================================================================");
      $("#oasis-apy").html(totalApr);
      $("#oasis-total-delegation").html(totalDelegation);
      $("#oasis-lockup").html(lockup);
    },
    error: function (err) {
      console.log(err);
      $("#oasis-apy").html("0.5");
      $("#oasis-total-delegation").html("1593651");
      $("#oasis-lockup").html("0");
    },
  });
}

// PERSISTENCE
function persistenceDetails() {
  $.ajax({
    type: "GET",
    url: "https://rest.core.persistence.one/staking/validators",
    headers: {"Content-Type": "application/json"},
    timeout: 5000,
    success: function (data) {
      let mainData = data.result.find(e => e.operator_address === 'persistencevaloper109yg6yhcyy5mfyteqmcn3pjca9nu9s39fxwh07');
      let totalDelegation = Math.floor(parseInt(mainData.delegator_shares).toFixed(5));
      let str_totalD = totalDelegation.toString();
      totalDelegation= Number(str_totalD.slice(0, 7));
      let totalApr = parseFloat(mainData.commission.commission_rates.max_rate).toFixed(2);
      let lockup = 0;
      console.log("PESISTENCE BLOCKCHAIN");
      console.log("=======================================================================");
      console.log("Total Delegations:" + totalDelegation + ";    APR:" + totalApr + ";    Lock Up:" + lockup);
      console.log("=======================================================================");
      $("#persistence-apy").html(totalApr);
      $("#persistence-total-delegation").html(totalDelegation);
      $("#persistence-lockup").html(lockup);
    },
    error: function (err) {
      console.log(err);
      $("#persistence-apy").html("0.10");
      $("#persistence-total-delegation").html("2212440");
      $("#persistence-lockup").html("0");
    },
  });
  // $.ajax({
  //   type: "GET",
  //   url: "https://rest.core.persistence.one/staking/validators/persistencevaloper109yg6yhcyy5mfyteqmcn3pjca9nu9s39fxwh07/delegations",
  //   headers: {"Content-Type": "application/json"},
  //   timeout: 5000,
  //   success: function (data) {
  //     let totalDelegators = data.result.length;
  //     console.log("PESISTENCE BLOCKCHAIN");
  //     console.log("=======================================================================");
  //     console.log("Total Delegators:" + totalDelegators);
  //     console.log("=======================================================================");
  //   },
  //   error: function (err) {
  //     console.log(err);
  //   },
  // });
}

// FINDORA BLOCKCHAIN
function findoraDetails() {
  $.ajax({
    type: "GET",
    url: "https://mainnet.backend.findorascan.io/api/chain/validator_detail/C58FE884BBF17C111A77910FF485666662672199",
    headers: {"Content-Type": "application/json"},
    timeout: 5000,
    success: function (data) {
        let totalApr = parseFloat(data.data.validator_realtime_apy[0]).toFixed(2);
        let totalDelegation = Math.floor(parseInt(data.data.voting_power).toFixed(7));
        let removingExponential = totalApr / (10**37);
        let total = parseFloat(removingExponential).toFixed(2);
        totalApr = total;
        let str_totalD = totalDelegation.toString();
        totalDelegation= Number(str_totalD.slice(0, 7));
        let totalDelegators = Math.floor(data.data.delegator_cnt);
        let lockup = 0;
      console.log("FINDORA BLOCKCHAIN");
      console.log("=======================================================================");
      console.log("Total Delegations:" + totalDelegation + ";    APR:" + totalApr + ";    Lock Up:" + lockup + ";    Total Delegators:" + totalDelegators);
      console.log("=======================================================================");
      $("#findora-apy").html(totalApr);
      $("#findora-total-delegation").html(totalDelegation);
      $("#findora-lockup").html(lockup);
    },
    error: function (err) {
      console.log(err);
      $("#findora-apy").html("1.92");
      $("#findora-total-delegation").html("8920165");
      $("#findora-lockup").html("0");
    },
  });
}

// VELAS BLOCKCHAIN
function velasDetails() {
  $.ajax({
    type: "GET",
    url: "https://wlal2jacbk.execute-api.us-east-1.amazonaws.com/v1/velasity/search?type=validator&search=9RBTmYrzcqEfX2bx8iAHHusDNAqzrhYfeLWRFMHGSG53",
    headers: {"Content-Type": "application/json"},
    timeout: 5000,
    success: function (data) {
        let totalApr = parseFloat(data.validator.commission).toFixed(2);
        let totalDelegation = Math.floor(parseInt(data.validator.activated_stake).toFixed(7));
        let str_totalD = totalDelegation.toString();
        totalDelegation= Number(str_totalD.slice(0, 7));
        let totalDelegators = Math.floor(data.stakers.length);
        let lockup = 0;
      console.log("VELAS BLOCKCHAIN");
      console.log("=======================================================================");
      console.log("Total Delegations:" + totalDelegation + ";    APR:" + totalApr + ";    Lock Up:" + lockup + ";    Total Delegators:" + totalDelegators);
      console.log("=======================================================================");
      $("#velas-apy").html(totalApr);
      $("#velas-total-delegation").html(totalDelegation);
      $("#velas-lockup").html(lockup);
    },
    error: function (err) {
      console.log(err);
      $("#velas-apy").html("0.00");
      $("#velas-total-delegation").html("2800039");
      $("#velas-lockup").html("0");
    },
  });
}



window.onload = function () {
    harmonyDetails();
    oasisDetails();
    persistenceDetails();
    findoraDetails();
    velasDetails()
  };
  