import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import SelectCoins from "../components/Compare/SelectCoins";
import SelectDays from "../components/Coin/SelectDays";
import { getCoinData } from "../functions/getCoinData";
import { coinObject } from "../functions/convertObject";
import { getCoinPrices } from "../functions/getCoinPrices";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import { settingChartData } from "../functions/settingChartData";
import LineChart from "../components/Coin/LineChart";
import BackToTop from "../components/Common/BackToTop";
import TogglePriceType from "../components/Coin/PriceType";

const PROXY_URL = "https://corsproxy.io/?";
const COINGECKO_API = "https://api.coingecko.com/api/v3";

function ComparePage() {
    const [crypto1, setCrypto1] = useState("bitcoin");
    const [crypto2, setCrypto2] = useState("tron");
    const [cryptoData, setCryptoData] = useState(null);
    const [crypto2Data, setCrypto2Data] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [priceType, setPriceType] = useState("prices");
    const [days, setDays] = useState(30);
    const [chartData, setChartData] = useState({ datasets: [] });


    async function fetchPrices(coin, days, type) {
        try {
            const response = await fetch(
                `https://api.allorigins.win/get?url=${encodeURIComponent(
                    `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}&interval=daily`
                )}`
            );
            const proxyData = await response.json();
            const data = JSON.parse(proxyData.contents);
            return data[type] || [];
        } catch (error) {
            console.error(`Error fetching ${coin} prices:`, error);
            return [];
        }
    }
    

    async function handleDaysChange(event) {
        setIsLoading(true);
        setDays(event.target.value);

        const prices1 = await fetchPrices(crypto1, event.target.value, priceType);
        const prices2 = await fetchPrices(crypto2, event.target.value, priceType);

        if (prices1.length > 0 && prices2.length > 0) {
            settingChartData(setChartData, prices1, prices2, cryptoData?.name, crypto2Data?.name);
        }
        setIsLoading(false);
    }

    const handlePriceTypeChange = async (event, newType) => {
        setIsLoading(true);
        const selectedType = newType || priceType;

        const prices1 = await fetchPrices(crypto1, days, selectedType);
        const prices2 = await fetchPrices(crypto2, days, selectedType);

        if (prices1.length > 0 && prices2.length > 0) {
            settingChartData(setChartData, prices1, prices2, cryptoData?.name, crypto2Data?.name);
        }

        setPriceType(selectedType);
        setIsLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        setIsLoading(true);
        try {
            const data1 = await getCoinData(crypto1);
            const data2 = await getCoinData(crypto2);

            if (data1) coinObject(setCryptoData, data1);
            if (data2) coinObject(setCrypto2Data, data2);

            const prices1 = await fetchPrices(crypto1, days, priceType);
            const prices2 = await fetchPrices(crypto2, days, priceType);

            if (prices1.length > 0 && prices2.length > 0) {
                settingChartData(setChartData, prices1, prices2, data1?.name, data2?.name);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setIsLoading(false);
    }

    const handleCoinChange = async (event, isCoin2) => {
        setIsLoading(true);
        const newCoin = event.target.value;

        try {
            if (isCoin2) {
                setCrypto2(newCoin);
                const data = await getCoinData(newCoin);
                if (data) coinObject(setCrypto2Data, data);
            } else {
                setCrypto1(newCoin);
                const data = await getCoinData(newCoin);
                if (data) coinObject(setCryptoData, data);
            }

            const prices1 = await fetchPrices(crypto1, days, priceType);
            const prices2 = await fetchPrices(crypto2, days, priceType);

            if (prices1.length > 0 && prices2.length > 0) {
                settingChartData(setChartData, prices1, prices2, cryptoData?.name, crypto2Data?.name);
            }
        } catch (error) {
            console.error("Error updating coin data:", error);
        }

        setIsLoading(false);
    };

    return (
        <div>
            <BackToTop />
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="coins-days-flex">
                        <SelectCoins crypto1={crypto1} crypto2={crypto2} handleCoinChange={handleCoinChange} />
                        <SelectDays days={days} handleDaysChange={handleDaysChange} />
                    </div>

                    <div className="grey-wrapper">
                        <List coin={cryptoData} />
                    </div>
                    <div className="grey-wrapper">
                        <List coin={crypto2Data} />
                    </div>

                    <div className="grey-wrapper">
                        <div className="TogglePriceType-padding">
                            <TogglePriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange} />
                        </div>
                        <LineChart chartData={chartData} priceType={priceType} multiAxis={true} />
                    </div>

                    <CoinInfo heading={cryptoData?.name} desc={cryptoData?.desc} />
                    <CoinInfo heading={crypto2Data?.name} desc={crypto2Data?.desc} />
                </>
            )}
        </div>
    );
}

export default ComparePage;
