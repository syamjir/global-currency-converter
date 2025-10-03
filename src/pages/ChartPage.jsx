import React, { useState, useEffect } from "react";
// React Chart Component
import { AgCharts } from "ag-charts-react";
import deepClone from "deepclone";
import Button from "../components/Button";
import HeaderTitle from "../components/HeaderTitle";
import { useCurrencyData } from "../contexts/CurrencyContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ChartPage = () => {
  const [activeChartStyle, setActiveChartStyle] = useState("smooth");
  const [page, setPage] = useState({ from: 0, to: 11 });
  const [chartYear, setChartYear] = useState("")

  const { setChartDate, chartDate, currencyData, isLoading } =
    useCurrencyData();

  // When chartDate changes, update chartYear
  useEffect(() => {
    setChartYear(chartDate.split('-')[0]);
  }, [chartDate]);

  console.log(chartYear)

  // When chartYear changes, update the chart title in options
  useEffect(() => {
    setOptions((prevOptions) => {
      const updatedOptions = deepClone(prevOptions);
      updatedOptions.title.text = `${chartYear} USD Based Currency Rate `;
      return updatedOptions;
    });
  }, [chartYear]);

  // Handle the chart data loading state
  const [options, setOptions] = useState({
    title: {
      text: 'USD Based Currency Rate',
      color: "#333",
      fontWeight: 600,
    },
    subtitle: {
      text: "US Dollar Base",
      color: "#666",
    },
    data: [],
    background: {
      fill: "#fbd89d",
    },
    series: [
      {
        type: "line",
        xKey: "code",
        yKey: "rate",
        interpolation: { type: "smooth" },
      },
    ],
  });



  // When pagination, data, or loading changes, update data in options
  useEffect(() => {
    setOptions((prevOptions) => {
      const updatedOptions = deepClone(prevOptions);
      updatedOptions.data = isLoading
        ? []
        : currencyData.chartData.slice(page.from, page.to);
      return updatedOptions;
    });
  }, [page, currencyData.chartData, chartDate, isLoading]);

  const lineStyleLinear = () => {
    const clone = deepClone(options);
    clone.series?.forEach((series) => {
      series.interpolation = { type: "linear" };
    });
    setOptions(clone);
    setActiveChartStyle("linear");
  };

  const lineStyleSmooth = () => {
    const clone = deepClone(options);
    clone.series?.forEach((series) => {
      series.interpolation = { type: "smooth" };
    });
    setOptions(clone);
    setActiveChartStyle("smooth");
  };

  const lineStyleStepStart = () => {
    const clone = deepClone(options);
    clone.series?.forEach((series) => {
      series.interpolation = { type: "step", position: "start" };
    });
    setOptions(clone);
    setActiveChartStyle("start");
  };

  const lineStyleStepMiddle = () => {
    const clone = deepClone(options);
    clone.series?.forEach((series) => {
      series.interpolation = { type: "step", position: "middle" };
    });
    setOptions(clone);
    setActiveChartStyle("middle");
  };

  const lineStyleStepEnd = () => {
    const clone = deepClone(options);
    clone.series?.forEach((series) => {
      series.interpolation = { type: "step", position: "end" };
    });
    setOptions(clone);
    setActiveChartStyle("end");
  };

  return (
    <div className="w-full md:w-3/4 flex flex-col gap-4">
      <HeaderTitle
        header={"ExchanGo Currency Converter"}
        title={"USD Based Currency Rate"}
      />

      <div className="flex flex-col bg-primary-hover-dark p-6 rounded-lg border border-border ">
        <div className="md:flex items-center gap-6 justify-around p-2 ">
          <div className="flex gap-3 mb-4 justify-center items-center md:mb-0">
            <input
              type="date"
              className="bg-light p-1 md:p-2 rounded-full text-text font-semibold border border-border hover:bg-brand hover:text-dark cursor-pointer"
              value={chartDate}
              onChange={(e) => {
                setChartDate(e.target.value);
              }}
            />
            <button
              className="bg-light cursor-pointer hover:bg-brand hover:text-dark p-1 px-2 border border-border rounded-lg"
              onClick={() =>
                setPage((page) => ({
                  from: page.from + 10,
                  to: page.to + 10,
                }))
              }
            >
              <FaArrowRight />
            </button>
            {page.to > 11 && (
              <button
                className="bg-light cursor-pointer hover:bg-brand hover:text-dark p-1 px-2  rounded-lg"
                onClick={() =>
                  setPage((page) => ({
                    from: page.from - 10,
                    to: page.to - 10,
                  }))
                }
              >
                <FaArrowLeft />
              </button>
            )}
          </div>
          <div className="toolbar flex gap-2 sm:gap-4 justify-center text-text flex-wrap">
            <Button
              onClick={lineStyleLinear}
              type="chart"
              color="bg-brand"
              onActiveChartStyle={activeChartStyle === "linear" ? true : false}
            >
              Linear
            </Button>
            <Button
              onClick={lineStyleSmooth}
              type="chart"
              color="bg-brand"
              onActiveChartStyle={activeChartStyle === "smooth" ? true : false}
            >
              Smooth
            </Button>
            <Button
              onClick={lineStyleStepStart}
              type="chart"
              color="bg-brand"
              onActiveChartStyle={activeChartStyle === "start" ? true : false}
            >
              Start
            </Button>
            <Button
              onClick={lineStyleStepMiddle}
              type="chart"
              color="bg-brand"
              onActiveChartStyle={activeChartStyle === "middle" ? true : false}
            >
              Middle
            </Button>
            <Button
              onClick={lineStyleStepEnd}
              type="chart"
              color="bg-brand"
              onActiveChartStyle={activeChartStyle === "end" ? true : false}
            >
              End
            </Button>
          </div>
        </div>
        <div>
          {currencyData.chartData.length ? (
            <AgCharts
              options={options}
              key={`${options.series[0].interpolation.type}-${chartDate}`} // Force update
              className="fill-primary-shade"
            />
          ) : (
            <p className="text-center text-text">
              No data available for the selected date.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
