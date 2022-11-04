AOS.init();
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

$(document).ready(function () {
  window.onload = function () {
    $(".loader_bg").fadeOut(500, function () {
      $(".loader_bg").remove();
    });
    var elements = document.getElementsByClassName("typewrite");
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute("data-type");
      var period = elements[i].getAttribute("data-period");
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
  };
});

$(document).ready(function () {
  $(".owl-carousel").owlCarousel();
});

$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 25,
  nav: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 4,
    },
  },
});

$(".item-1").hover(function () {
  $(".1").toggleClass("d-none");
});
$(".item-2").hover(function () {
  $(".2").toggleClass("d-none");
});
$(".item-3").hover(function () {
  $(".3").toggleClass("d-none");
});
$(".item-4").hover(function () {
  $(".4").toggleClass("d-none");
});
$(".item-5").hover(function () {
  $(".5").toggleClass("d-none");
});
$(".item-6").hover(function () {
  $(".6").toggleClass("d-none");
});
$(".item-7").hover(function () {
  $(".7").toggleClass("d-none");
});
$(".item-8").hover(function () {
  $(".8").toggleClass("d-none");
});
$(".item-9").hover(function () {
  $(".9").toggleClass("d-none");
});
$(".item-10").hover(function () {
  $(".10").toggleClass("d-none");
});
$(".item-11").hover(function () {
  $(".11").toggleClass("d-none");
});
$(".item-12").hover(function () {
  $(".12").toggleClass("d-none");
});

$(".job").hover(function () {
  $(".hiring-tag").toggleClass("d-none");
  $(".job-description").toggleClass("d-none");
  $(".job-price").toggleClass("d-none");
  $(".apply").toggleClass("d-none");
});

$(".job").hover(function () {
  $(".hiring-tag").toggleClass("d-none");
  $(".job-description").toggleClass("d-none");
  $(".job-price").toggleClass("d-none");
  $(".apply").toggleClass("d-none");
});

$(".job1").hover(function () {
  $(".first-job").toggleClass("d-none");
});
$(".job2").hover(function () {
  $(".second-job").toggleClass("d-none");
});
$(".job3").hover(function () {
  $(".third-job").toggleClass("d-none");
});
//  $(".job4").hover(function () {
//   $(".fourth-job").toggleClass("d-none");
//  });

// $(document).ready(function() {
//   window.onload = function () {
//   $('.loader_bg').fadeOut(500, function(){ $('.loader_bg').remove(); } );
//   }
// });

// document.addEventListener("touchstart", onTouchStart, { passive: true });








function updateDetails() {
  $(".update-button").html("updating...");
  const username = $("#username").val();
  const email = $("#email").val();
  const gender = $("#gender").val();
  const description = $("#description").val();
  $.ajax({
    type: "PUT",
    url: "/dashboard/settings",
    timeout: 5000,
    data: {
      username: username,
      email: email,
      gender: gender,
      description: description,
    },
    dataType: "json",
    success: function (data) {
      $(".update-button").html("Update");
      // $(".airdrop-success-msg").html("<p>" + data.message + "</p>");
      console.log("success");
    },
  });
}

$(".update-button").on("click", function (event) {
  event.preventDefault();
  updateDetails();
});

// function seeMore(){
//   $(".see-more").html("loading...");
//   let page = $(".see-more").val();
//   let newpage = parseInt(page) + 1;
//   let limit = 10;
//   $(".see-more").attr("value", `${newpage}`);
//   $.ajax({
//     type: "GET",
//     url: `/dashboard/more-quetions`,
//     timeout: 5000,
//     data: {
//       page: page,
//       limit: limit,
//     },
//     dataType: "json",
//     success: function (data) {
//       $(".update-button").html("Update");
//       // $(".airdrop-success-msg").html("<p>" + data.message + "</p>");
//       console.log("success");
//     },
//   });
// }

// $(".see-more").on("click", function (event) {
//   event.preventDefault();
//   seeMore();
// });


function login(){
  $(".sign-in-btn").html("Signing in...");
  let email = $(".logemail").val();
  let password = $(".logpassword").val();
  $.ajax({
    type: "POST",
    url: "/sign-in",
    timeout: 5000,
    data: {
      logemail: email,
      logpassword: password,
    },
    dataType: "json",
    success: function (data) {
      if(data.message == "Sign in Sucessful."){
        $(".sign-in-btn").html("Sign in");
        window.open("/dashboard", "_self");
      }else{
            $(".sign-in-btn").html("Sign in");
            $(".login-message").html("<p>" + data.message + "</p>");
      }     
    },
  });
}

$(".sign-in-btn").on("click", function (event) {
  event.preventDefault();
  login();
});




function register(){
  $(".sign-up-btn").html("Signing up...");
  let name = $(".regname").val();
  let email = $(".regemail").val();
  let password = $(".regpassword").val();
  $.ajax({
    type: "POST",
    url: "/sign-up",
    timeout: 5000,
    data: {
      email: email,
      username: name,
      password: password,
    },
    dataType: "json",
    success: function (data) {
      if(data.message == "Registration Successful."){
        $(".sign-up-btn").html("Sign Up");
        window.open("/dashboard", "_self");
      }else{
            $(".sign-up-btn").html("Sign Up");
            $(".register-message").html("<p>" + data.message + "</p>");
      }     
    },
  });
}

$(".sign-up-btn").on("click", function (event) {
  event.preventDefault();
  register();
});


function incrementNum(){
let seeMoreNum = $(".the-value").val();
let num = parseInt(seeMoreNum) + 1;
$(".the-value").attr("value", num);
seeMoreQuestion();
console.log(num);
}

function seeMoreQuestion(){
  $(".see-more-num").html("Loading...");
  let seeMoreNumber = $(".see-more-num").val();
  $.ajax({
    type: "GET",
    url: "/dashboard/more-questions",
    timeout: 5000,
    dataType: "json",
    success: function (data) {
         $(".see-more-num").html("See More");
         $(".questions").html("");
         let seeMoreNum = $(".the-value").val();
         let num = parseInt(seeMoreNum);
         let description;
         for(let i = data.length - num; i < data.length ; i++){
          let str = data[i].description;
          if(str == ""  || str == null || str == undefined){
            description = "There is currently no description for this question.";
            } else{
            description = str.split(" ").splice(0, 25).join(" ");
            let dots = "...";
            description = description + " " + dots ;
            }
            $(".questions").append("<div class='question mb-4'><div class='container'><div class='row'><div class='col-10'><h4>"+ data[i].question + "</h4><p class ='description-detail'>" + description + "</p><div class='small-text'><span><a href='#' class='username'>" + data[i].username + "</a></span> <span class='date'>" + data[i].date + "</span></div></div><div class='col-2'><div class='row right'><div class='col-12'><p><span class='reply'>" + data[i].answers.length + "</span> <i class='bi bi-chat'></i></p></div></div></div></div></div></div>");
         }
    },
  });
}

$(".see-more-num").on("click", function (event) {
 // seeMoreQuestion();
 incrementNum();
});

// CALCULATOR
let initialPrice = document.querySelector("#initial-price");
let stockQuantity = document.querySelector("#stock-quantity");
let currentPrice = document.querySelector("#current-price");
let submitBtn = document.querySelector("#submit-btn");
let outputBox = document.querySelector("#output-box");

submitBtn.addEventListener("click", submitHandler);

const imgProfit = document.createElement("img");
imgProfit.src = "/images/stonks.gif";
const imgLoss = document.createElement("img");
imgLoss.src = "/images/not-stonks.gif";
const imgEven = document.createElement("img");
imgEven.src = "/images/even-steven.gif";

function submitHandler() {
  let ip = Number(initialPrice.value);
  let qty = Number(stockQuantity.value);
  let curr = Number(currentPrice.value);

  calculateProfitAndLoss(ip, qty, curr);
}

function calculateProfitAndLoss(initial, quantity, current) {
  if (initial === "" || quantity === "" || current === "") {
    outputBox.innerHTML = "Please enter all the values.<br><br>";
  } else if (
    Number.parseInt(quantity) <= 0 ||
    Number.parseInt(initial) <= 0 ||
    Number.parseInt(current) <= 0
  ) {
    outputBox.innerHTML = "Please enter values greater than 0.<br><br>";
  } else if (current > initial) {
    let profit = ((current - initial) * quantity).toFixed(2);
    let profitPercentage = ((current - initial) / (initial / 100)).toFixed(2);
    outputBox.innerHTML =
      "You gained " +
      profitPercentage +
      "%</br>Your total profit is ₹ " +
      profit +
      "<br><br>";
    document.querySelector("#output-box").appendChild(imgProfit);
  } else if (initial > current) {
    let loss = ((initial - current) * quantity).toFixed(2);
    let lossPercentage = ((initial - current) / (initial / 100)).toFixed(2);
    outputBox.innerHTML =
      "You lost " +
      lossPercentage +
      "%</br>Your total loss is ₹ " +
      loss +
      "<br><br>";
    document.querySelector("#output-box").appendChild(imgLoss);
  } else {
    outputBox.innerHTML = "You make neither a profit nor a loss. <br><br>";
    document.querySelector("#output-box").appendChild(imgEven);
  }
}