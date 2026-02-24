import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { CalendarDays, Activity, Clock } from "lucide-react";

const Donut = ({ data }) => {
  return (
    <PieChart width={220} height={220}>
      <Pie
        data={data}
        innerRadius={70}
        outerRadius={90}
        dataKey="value"
        paddingAngle={2}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
};

const Dashboard = () => {
  return (
    <div className="bg-white min-h-screen p-8">

      {/* Top Cards */}
      <div className="grid grid-cols-3 gap-8 mb-10">
        <div className="bg-white border border-orange-400 rounded-lg p-5 flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-md">
            <CalendarDays className="text-orange-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Upcoming Events</h3>
            <p className="text-gray-500 text-sm">03 Events</p>
          </div>
        </div>

        <div className="bg-white border border-orange-400 rounded-lg p-5 flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-md">
            <Activity className="text-orange-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Active Sports</h3>
            <p className="text-gray-500 text-sm">03 Sports</p>
          </div>
        </div>

        <div className="bg-white border border-orange-400 rounded-lg p-5 flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-md">
            <Clock className="text-orange-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Training Sessions</h3>
            <p className="text-gray-500 text-sm">10 Sessions</p>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-3 gap-8 mb-16">

        {/* Upcoming Events */}
        <div className="col-span-1">
          <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>

          <div className="bg-white border border-orange-400 rounded-lg p-5 h-full">
            <div className="divide-y divide-gray-200">

              <div className="py-3">
                <h4 className="font-semibold">Karate Tournament</h4>
                <p className="text-sm text-gray-500">28th Feb | 07:00pm</p>
                <p className="text-sm text-gray-500">GRK College of Hyderabad</p>
              </div>

              <div className="py-3">
                <h4 className="font-semibold">Basketball Practice</h4>
                <p className="text-sm text-gray-500">01st Mar | 07:00pm</p>
                <p className="text-sm text-gray-500">GRK College of Hyderabad</p>
              </div>

              <div className="py-3">
                <h4 className="font-semibold">Tennis Tournament</h4>
                <p className="text-sm text-gray-500">03rd Mar | 07:00pm</p>
                <p className="text-sm text-gray-500">GRK College of Hyderabad</p>
              </div>

            </div>
          </div>
        </div>

        {/* Training Progress */}
        <div className="col-span-2">
          <h2 className="text-lg font-semibold mb-6">Training Progress</h2>

         <div className="bg-white border border-orange-400 rounded-lg p-5 h-full">

            <div className="flex justify-around items-center">

              {/* Left Donut */}
              <div className="flex flex-col items-center">
                <Donut
                  data={[
                    { value: 20, color: "#f97316" },
                    { value: 20, color: "#22c55e" },
                    { value: 20, color: "#eab308" },
                    { value: 20, color: "#3b82f6" },
                    { value: 20, color: "#ef4444" },
                  ]}
                />

                <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                  <p><span className="w-3 h-3 bg-orange-500 inline-block mr-2 rounded-full"></span>Coach Rating</p>
                  <p><span className="w-3 h-3 bg-yellow-400 inline-block mr-2 rounded-full"></span>Skill Progress</p>
                  <p><span className="w-3 h-3 bg-green-500 inline-block mr-2 rounded-full"></span>Fitness</p>
                  <p><span className="w-3 h-3 bg-gray-500 inline-block mr-2 rounded-full"></span>Discipline</p>
                  <p><span className="w-3 h-3 bg-blue-500 inline-block mr-2 rounded-full"></span>Team Work</p>
                  <p><span className="w-3 h-3 bg-red-500 inline-block mr-2 rounded-full"></span>Effort</p>
                </div>
              </div>

              {/* Right Donut */}
              <div className="flex flex-col items-center">
                <Donut
                  data={[
                    { value: 25, color: "#f97316" },
                    { value: 25, color: "#eab308" },
                    { value: 25, color: "#22c55e" },
                    { value: 25, color: "#3b82f6" },
                  ]}
                />

                <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                  <p><span className="w-3 h-3 bg-orange-500 inline-block mr-2 rounded-full"></span>Speed</p>
                  <p><span className="w-3 h-3 bg-yellow-400 inline-block mr-2 rounded-full"></span>Agility</p>
                  <p><span className="w-3 h-3 bg-green-500 inline-block mr-2 rounded-full"></span>Stamina</p>
                  <p><span className="w-3 h-3 bg-blue-500 inline-block mr-2 rounded-full"></span>Flexibility</p>
                </div>
              </div>

            </div>

            <p className="text-sm text-gray-600 mt-6">
              <strong>Trainer Observation :</strong> Demonstrates consistent dedication,
              strong discipline, and steady improvement across all training sessions.
            </p>

          </div>
        </div>

      </div>


     {/* Attendance Summary */}
<div className="mt-10">
        <h2 className="text-lg font-semibold mb-6">Attendance Summary</h2>

        <div className="grid grid-cols-3 gap-8">

          {[
            { title: "Karate Sessions", total: 12, present: 10, absent: 2 },
            { title: "Basket Ball", total: 12, present: 8, absent: 4 },
            { title: "Tennis", total: 12, present: 12, absent: 0 },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white border border-orange-400 rounded-lg p-5"
            >
              <h3 className="font-semibold text-lg mb-4">{item.title}</h3>

              <p className="mb-2">
                Total Session <span className="float-right">{item.total}</span>
              </p>
              <p className="mb-2">
                Present <span className="float-right">{item.present}</span>
              </p>
              <p className="mb-2">
                Absent{" "}
                <span className="float-right">
                  {item.absent.toString().padStart(2, "0")}
                </span>
              </p>

              <div className="border-t mt-4 pt-3">
                <p className="text-sm mb-2">
                  Attendance Rate : {item.present}/{item.total}
                </p>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${(item.present / item.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default Dashboard;