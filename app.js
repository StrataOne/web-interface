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
const { stringify } = require("querystring");

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
  let dataFindora = await CoinGeckoClient.coins.fetch('findora', {});
  let dataPersistence = await CoinGeckoClient.coins.fetch('persistence', {});
  let dataVelas = await CoinGeckoClient.coins.fetch('velas', {});
  let dataHarmony = await CoinGeckoClient.coins.fetch('harmony', {});
  let dataOasis = await CoinGeckoClient.coins.fetch('oasis-network', {});
  let dataFindoraPrice = parseFloat(dataFindora.data.market_data.current_price.usd).toFixed(3);
  let dataPersistencePrice = parseFloat(dataPersistence.data.market_data.current_price.usd).toFixed(3);
  let dataVelasPrice = parseFloat(dataVelas.data.market_data.current_price.usd).toFixed(3);
  let dataHarmonyPrice = parseFloat(dataHarmony.data.market_data.current_price.usd).toFixed(3);
  let dataOasisPrice = parseFloat(dataOasis.data.market_data.current_price.usd).toFixed(3);
  res.render("home", {dataFindoraPrice, dataPersistencePrice, dataVelasPrice, dataHarmonyPrice, dataOasisPrice});
});


// SERVER
app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
    console.log("App Started");
  });
  