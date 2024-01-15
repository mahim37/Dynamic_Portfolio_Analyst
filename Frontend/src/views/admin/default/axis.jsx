import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import { useState, useEffect} from "react";
import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";
import Plot from 'react-plotly.js';

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import CandlestickChart from "components/charts/CandleS";
import { tab } from "@testing-library/user-event/dist/tab";
import Navbar from "components/navbar";



import React from "react";
import Dropdown from "components/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";
import navbarimage from "assets/img/layout/Navbar.png";
import { BsArrowBarUp } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import {
  IoMdNotificationsOutline,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import avatar from "assets/img/avatars/avatar4.png";


const Axis = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState([]);
  const [predictData, setPredictData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://13.201.92.248/predict/axis', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          // const fileName = '../variables/tableData.json';
          const jsonData = await response.json();
          // console.log((jsonData));
          setPredictData((jsonData));
        } else {
          console.error('Failed to fetch data');
        }
  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://13.201.92.248/history/axis', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          // const fileName = '../variables/tableData.json';
          const jsonData = await response.json();
          // console.log((jsonData));
          setTableData((jsonData));
        } else {
          console.error('Failed to fetch data');
        }
  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://13.201.92.248/sentiment/axis', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          // const fileName = '../variables/tableData.json';
          const jsonData = await response.json();
          console.log(jsonData);
          setNewsData(jsonData);
     
        } else {
          console.error('Failed to fetch data');
        }
  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = React.useState(false);
  return (
    <div>
      <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <Link to="/admin/dashboard"
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Dashboard
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </Link>
          
        </div>
        <p className="shrink text-[28px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            AXIS BANK
            {/* {brandText} */}
          </Link>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Search..."
            class="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
          />
        </div>
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          // onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
        {/* start Notification */}
        <Dropdown
          button={
            <p className="cursor-pointer">
              <IoMdNotificationsOutline className="h-4 w-4 text-gray-600 dark:text-white" />
            </p>
          }
          animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
          children={
            <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[460px]">
              <div className="flex items-center justify-between">
                <p className="text-base font-bold text-navy-700 dark:text-white">
                  Notification
                </p>
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  Mark all read
                </p>
              </div>

              <button className="flex w-full items-center">
                <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
                  <BsArrowBarUp />
                </div>
                <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                  <p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">
                    
                  </p>
                  <p className="font-base text-left text-xs text-gray-900 dark:text-white">

                  </p>
                </div>
              </button>

              <button className="flex w-full items-center">
                <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
                  <BsArrowBarUp />
                </div>
                <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                  <p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">
                    
                  </p>
                  <p className="font-base text-left text-xs text-gray-900 dark:text-white">
                    
                  </p>
                </div>
              </button>
            </div>
          }
          classNames={"py-2 top-4 -left-[230px] md:-left-[440px] w-max"}
        />
       
        <Dropdown
          button={
            <p className="cursor-pointer">
              <IoMdInformationCircleOutline className="h-4 w-4 text-gray-600 dark:text-white" />
            </p>
          }
          children={
            <div className="flex w-[350px] flex-col gap-2 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
             </div> 
          }
          classNames={"py-2 top-6 -left-[250px] md:-left-[330px] w-max"}
          animation="origin-[75%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
        />
        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <img
              className="h-10 w-10 rounded-full"
              src={avatar}
              alt="Elon Musk"
            />
          }
          children={
            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    👋 Hey, Adela
                  </p>{" "}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="flex flex-col p-4">
                <Link to="/admin/profile"
                  href=" "
                  className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                >
                  Profile Settings
                </Link>
                <a
                  href=" "
                  className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"
                >
                  Newsletter Settings
                </a>
                <a
                  href=" "
                  className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                >
                  Log Out
                </a>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Open"}
          subtitle={"₹986.00"}
        />  
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Close"}
          subtitle={"₹988.85"}
        />
         <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Volume"}
          subtitle={"42,68,048"}
        />
        {/*
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Your Balance"}
          subtitle={"$1,000"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"New Tasks"}
          subtitle={"145"}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Projects    <TopCreatorTable
            extra="mb-5"
            tableData={tableDataTopCreators}
            columnsData={tableColumnsTopCreators}
          
          />"}
          subtitle={"$2433"}
        /> */}
        
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-3 gap-5 md:grid-cols-1">
      <Plot data={[{
            type: 'scatter',
            mode:'lines',
            x: tableData.map((dataPoint) => dataPoint.Date),
            y: tableData.map((dataPoint) => dataPoint.Open),
            // open: tableData.map((dataPoint) => dataPoint.Open),
            // high: tableData.map((dataPoint) => dataPoint.High),
            // low: tableData.map((dataPoint) => dataPoint.Low),
            // close: tableData.map((dataPoint) => dataPoint.Close),
          },
        ]}
        layout={{
          title: 'Price Chart',
          xaxis: {
            title: 'Date',
            // fixedrange: 'true'
            // type: 'category', // Display dates as categories
          },
          yaxis: {
            title: 'Price',
            tickprefix: '₹', // Add a dollar sign prefix to tick values
            // fixedrange: true, // Disable zooming on the y-axis
          },
          dragmode: 'pan', // Enable panning
        }}
      config={{ displayModeBar: false }} // Hide the display mode bar
    />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-3 gap-5 xl:grid-cols-1">
        {/* Check Table */}
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData= {newsData}
          />
        </div>

        <div className="mt-5 grid grid-cols-3 gap-5 md:grid-cols-1">
        {/* Check Table */}
        
        <Plot data={[{
            type: 'scatter',
            mode:'lines',
            x: predictData.map((dataPoint) => dataPoint.Date),
            y: predictData.map((dataPoint) => dataPoint.Open),
            // open: tableData.map((dataPoint) => dataPoint.Open),
            // high: tableData.map((dataPoint) => dataPoint.High),
            // low: tableData.map((dataPoint) => dataPoint.Low),
            // close: tableData.map((dataPoint) => dataPoint.Close),
          },
        ]}
        layout={{
          title: 'Prediction Chart',
          xaxis: {
            title: 'Date',
            // fixedrange: 'true's
            // type: 'category', // Display dates as categories
          },
          yaxis: {
            title: 'Price',
            tickprefix: '₹', // Add a dollar sign prefix to tick values
            // fixedrange: true, // Disable zooming on the y-axis
          },
          // dragmode: 'pan', // Enable panning
        }}
      config={{ displayModeBar: false }} // Hide the display mode bar
    />
    </div>
          
          
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
  <div className="rounded-lg">
    <Plot
      data={[
        {
          type: 'candlestick',
          x: tableData.map((dataPoint) => dataPoint.Date),
          open: tableData.map((dataPoint) => dataPoint.Open),
          high: tableData.map((dataPoint) => dataPoint.High),
          low: tableData.map((dataPoint) => dataPoint.Low),
          close: tableData.map((dataPoint) => dataPoint.Close),
          increasing: { line: { color: 'green' } },
          decreasing: { line: { color: 'red' } },
        },
      ]}
      layout={{
        title: 'Candlestick Chart',
        xaxis: {
          title: 'Date',
          // fixedrange: true
          // type: 'category', // Display dates as categories
        },
        yaxis: {
          title: 'Price',
          tickprefix: '$', // Add a dollar sign prefix to tick values
          // fixedrange: true, // Disable zooming on the y-axis
        },
        dragmode: 'pan', // Enable panning
      }}
      config={{ displayModeBar: false }} // Hide the display mode bar
    />
  </div>

  <div className="rounded-lg">
    <div className="md:grid md:grid-cols-3 md:gap-5">
      <MiniCalendar />
    </div>
  </div>
</div>

        
        
        {/* Traffic chart & Pie Chart */}

        {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div> */}

        {/* Complex Table , Task & Calendar */}
{/* 
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}

        {/* Task chart & Calendar */}


      </div>
    </div>
  );
};


export default Axis;
