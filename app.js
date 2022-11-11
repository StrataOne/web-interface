const express = require("express");
const app = express();
const Coingecko = require("coingecko-api");
const expressEjsLayout = require("express-ejs-layouts");
const path = require("path");
const CoinGeckoClient = new Coingecko();
const { Harmony } = require('@harmony-js/core');
const {
  ChainID,
  ChainType,
  hexToNumber,
  numberToHex,
  fromWei,
  Units,
  Unit,
} = require('@harmony-js/utils');

// const hmy = new Harmony(
//     'https://api.s0.b.hmny.io/',
//     {
//         chainType: ChainType.Harmony,
//         chainId: ChainID.HmyTestnet,
//     },
// );

// // hmy.blockchain
//   .getBalance({ address: 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7' })
//   .then((response) => {
//     console.log('balance in ONEs: ' + fromWei(hexToNumber(response.result), Units.one));
//   });

app.set("view engine", "ejs");
app.set('layout', 'layout');
app.use(express.static(path.join(__dirname, "/public")));
app.use(expressEjsLayout);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", async (req, res) =>{
    // let data = await CoinGeckoClient.coins.fetch('cosmos', {});
    res.render("home");
});


// SERVER
app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
    console.log("App Started");
  });
  