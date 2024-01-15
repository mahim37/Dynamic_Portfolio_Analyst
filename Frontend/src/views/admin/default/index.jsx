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



const Dashboard = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://13.201.92.248/history_icici', {
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
        const response = await fetch('https://13.201.92.248/sentiment/hdfc', {
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
  

  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Open"}
          subtitle={"₹340.5"}
        />  
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Close"}
          subtitle={"₹642.39"}
        />
         <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Volume"}
          subtitle={"574"}
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
          title={"Total Projects"}
          subtitle={"$2433"}
        /> */}
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* <TotalSpent /> */}
        <Plot data={[{
            type: 'scatter',
            mode:'lines',
            x: tableData.map((dataPoint) => dataPoint.Date),
            y: tableData.map((dataPoint) => dataPoint.Open)
            // open: tableData.map((dataPoint) => dataPoint.Open),
            // high: tableData.map((dataPoint) => dataPoint.High),
            // low: tableData.map((dataPoint) => dataPoint.Low),
            // close: tableData.map((dataPoint) => dataPoint.Close),
            // increasing: { line: { color: 'green' } },
            // decreasing: { line: { color: 'red' } },
          },
        ]}
        layout={{
          title: 'Candlestick Chart',
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
      // config={{ displayModeBar: false }} // Hide the display mode bar
    />
        {/* <WeeklyRevenue /> */}
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

        <div className="mt-5 grid grid-cols-3 gap-5 xl:grid-cols-1">
        {/* Check Table */}
        <div>
          <Plot data={[{
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
            // fixedrange: 'true's
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
        </div>
        {/* Traffic chart & Pie Chart */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>

        {/* Complex Table , Task & Calendar */}

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />

        {/* Task chart & Calendar */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
