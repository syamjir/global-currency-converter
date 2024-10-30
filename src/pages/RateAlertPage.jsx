import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import CustomCheckBox from "../components/CustomCheckBox";
import { useCurrencyData } from "../contexts/CurrencyContext";
import { convertToFlag } from "../utils/helper";
import emailjs from "emailjs-com";
import Loader from "../components/Loader";

const EMAIL_FROM = "";
const SERVICE_ID = "";
const TEMPLATE_ID = "";
const USER_ID = "";

function RateAlertPage() {
  const { from, to, rate, setFrom, setTo, calculateRate } = useCurrencyData();
  const [exchangeRate, setExchangeRate] = useState(0);
  const [dailyMailCheck, setDailyMailCheck] = useState(false);
  const [exchangeRateCheck, setExchangeRateCheck] = useState(false);
  const [mailId, setMailId] = useState("");
  const [loading, setLoading] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (rate !== undefined && rate !== null) {
      calculateRate();
      setExchangeRate(rate);
    }
  }, [calculateRate, rate]);

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  function sendMail(
    emailFrom,
    currPair,
    newRate,
    preRate,
    rateChange,
    emailTo
  ) {
    setLoading(true);
    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: emailFrom,
          currency_pair: currPair,
          new_exchange_rate: newRate,
          previous_exchange_rate: preRate,
          rate_change: rateChange,
          reply_to: emailTo,
        },
        USER_ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Email sent successfully!");
        },
        (error) => {
          console.log("FAILED...", error);
          alert("Failed to send the email.");
        }
      )
      .finally(() => setLoading(false));
  }

  function reSetData() {
    const { from, to, oldRate, mail } = JSON.parse(
      localStorage.getItem("mailData")
    );
    setFrom(from);
    setTo(to);
    calculateRate();
    const newRate = rate;
    const rateChange = oldRate - newRate;

    return { newRate, rateChange, from, to, oldRate, mail };
  }

  function handleRateChangeNotification() {
    const { newRate, rateChange, from, to, oldRate, mail } = reSetData();
    sendMail(
      EMAIL_FROM,
      `${from} to ${to}`,
      newRate,
      oldRate,
      rateChange,
      mail
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem(
      "mailData",
      JSON.stringify({
        from,
        to,
        oldRate: parseFloat(exchangeRate),
        mail: mailId,
      })
    );

    if (exchangeRateCheck && dailyMailCheck) {
      return alert("Please select only one of the options");
    }
    if (!dailyMailCheck && !exchangeRateCheck) {
      return alert("Please check at least one of the boxes");
    }

    if (intervalId) clearInterval(intervalId);

    if (dailyMailCheck) {
      handleRateChangeNotification();
      const id = setInterval(() => {
        handleRateChangeNotification();
      }, 1000 * 60 * 60 * 24); // Every 24 hours
      setIntervalId(id);
    }

    if (exchangeRateCheck) {
      alert("You have successfully check rate alert");
      const id = setInterval(() => {
        const { oldRate, newRate } = reSetData();
        if (newRate > oldRate) {
          handleRateChangeNotification();
        }
      }, 1000 * 60 * 60 * 24);
      setIntervalId(id);
    }
  }

  const emailInputStyles =
    "border-none appearance-none bg-transparent p-0 focus:outline-none focus:ring-0 no-arrows w-48 sm:w-36";

  return (
    <div className="w-full relative md:w-3/4 grid gap-y-5 mt-5">
      {loading ? (
        <Loader />
      ) : (
        <>
          <header className="text-center">
            <h3 className="text-2xl font-semibold mb-3">
              Don't Miss the Best Rate!
            </h3>
            <p className="text-[#444]">
              Set up an alert, and we'll notify you when the rates improve. Stay
              updated with our daily insights so you're always in the know.
            </p>
          </header>
          <section className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Daily Exchange Insights</h4>
              <p className="text-[#444]">
                Keep track of the BSD → INR rate with our daily email updates
              </p>
            </div>
            <CustomCheckBox setIsChecked={setDailyMailCheck} />
          </section>
          <section>
            <h4 className="font-medium">Email me when</h4>
            <div className="flex justify-between">
              <div className="flex items-center gap-2 sm:flex-row flex-col">
                <div className="flex border border-primary py-2 sm:py-3 px-2 sm:px-3 items-center rounded-lg">
                  <input
                    type="number"
                    readOnly
                    placeholder="1"
                    className={emailInputStyles}
                  />
                  <p>
                    {convertToFlag(from)} {from}
                  </p>
                </div>
                <p>goes above</p>
                <div className="flex border border-primary py-2 sm:py-3 px-2 sm:px-3 items-center rounded-lg">
                  <input
                    type="number"
                    maxLength={10}
                    className={emailInputStyles}
                    value={exchangeRate}
                    onChange={(e) =>
                      setExchangeRate(parseFloat(e.target.value))
                    }
                  />
                  <p>
                    {convertToFlag(to)} {to}
                  </p>
                </div>
              </div>
              <CustomCheckBox setIsChecked={setExchangeRateCheck} />
            </div>
          </section>
          <section className="flex flex-col">
            <label htmlFor="email" className="text-[#444]">
              Your email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="jonas.io@gmail.com"
              value={mailId}
              onChange={(e) => setMailId(e.target.value)}
              className="py-2 px-2 sm:px-3 border border-primary rounded-lg bg-transparent"
            />
          </section>
          <Button type="emailAlert" onClick={handleSubmit}>
            Rate Alert
          </Button>
        </>
      )}
    </div>
  );
}

export default RateAlertPage;
