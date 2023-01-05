const express = require("express");
const app = express();
const Coingecko = require("coingecko-api");
const expressEjsLayout = require("express-ejs-layouts");
const path = require("path");
const CoinGeckoClient = new Coingecko();
let dataFindoraPrice, dataPersistencePrice, dataVelasPrice, dataHarmonyPrice, dataOasisPrice;
let minutes = 30, the_interval = minutes * 60 * 1000;
async function priceCall() {
  let dataFindora = await CoinGeckoClient.coins.fetch('findora', {});
  let dataPersistence = await CoinGeckoClient.coins.fetch('persistence', {});
  let dataVelas = await CoinGeckoClient.coins.fetch('velas', {});
  let dataHarmony = await CoinGeckoClient.coins.fetch('harmony', {});
  let dataOasis = await CoinGeckoClient.coins.fetch('oasis-network', {});
  let dataSentinel = await CoinGeckoClient.coins.fetch('sentinel', {});
  dataVelasPrice = parseFloat(dataVelas.data.market_data.current_price.usd).toFixed(3);
  dataHarmonyPrice = parseFloat(dataHarmony.data.market_data.current_price.usd).toFixed(3);
  dataOasisPrice = parseFloat(dataOasis.data.market_data.current_price.usd).toFixed(3);
  dataPersistencePrice = parseFloat(dataPersistence.data.market_data.current_price.usd).toFixed(3);
  dataFindoraPrice = parseFloat(dataFindora.data.market_data.current_price.usd).toFixed(3);
  dataSentinelPrice = parseFloat(dataSentinel.data.market_data.current_price.usd).toFixed(3);
}
priceCall();
 setInterval(async function() {
  let dataFindora = await CoinGeckoClient.coins.fetch('findora', {});
  let dataPersistence = await CoinGeckoClient.coins.fetch('persistence', {});
  let dataVelas = await CoinGeckoClient.coins.fetch('velas', {});
  let dataHarmony = await CoinGeckoClient.coins.fetch('harmony', {});
  let dataOasis = await CoinGeckoClient.coins.fetch('oasis-network', {});
  let dataSentinel = await CoinGeckoClient.coins.fetch('sentinel', {});
  dataVelasPrice = parseFloat(dataVelas.data.market_data.current_price.usd).toFixed(3);
  dataHarmonyPrice = parseFloat(dataHarmony.data.market_data.current_price.usd).toFixed(3);
  dataOasisPrice = parseFloat(dataOasis.data.market_data.current_price.usd).toFixed(3);
  dataPersistencePrice = parseFloat(dataPersistence.data.market_data.current_price.usd).toFixed(3);
  dataFindoraPrice = parseFloat(dataFindora.data.market_data.current_price.usd).toFixed(3);
  dataSentinelPrice = parseFloat(dataSentinel.data.market_data.current_price.usd).toFixed(3);
}, the_interval);
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
  if(dataVelasPrice == undefined || dataVelasPrice == null|| dataVelasPrice == "" ){
    dataVelasPrice = 0.022;
  }
  if(dataHarmonyPrice == undefined || dataHarmonyPrice == null|| dataHarmonyPrice == "" ){
    dataHarmonyPrice = 0.014;
  }
  if(dataOasisPrice == undefined || dataOasisPrice == null|| dataOasisPrice == "" ){
    dataOasisPrice = 0.047;
  }
  if(dataPersistencePrice == undefined || dataPersistencePrice == null|| dataPersistencePrice == "" ){
    dataPersistencePrice = 0.578;
  }
  if(dataFindoraPrice == undefined || dataFindoraPrice == null|| dataFindoraPrice == "" ){
    dataFindoraPrice = 0.002;
  }
  if(dataSentinelPrice == undefined || dataSentinelPrice == null|| dataSentinelPrice == "" ){
    dataSentinelPrice = 0.000;
  }
  res.render("home",{dataVelasPrice, dataHarmonyPrice, dataOasisPrice, dataPersistencePrice, dataFindoraPrice, dataSentinelPrice});
});


// SERVER
app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
    console.log("App Started");
  });
  