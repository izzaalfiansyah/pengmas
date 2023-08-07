import Card from "@/components/card";
import ChartBarIcon from "@/components/icons/chart-bar-icon";
import AdminLayout from "@/layouts/admin-layout";
import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { useLoading } from "@/contexts/loading-context";
import http from "@/libs/http";

export default function () {
  let canvas = useRef<any>();

  const [chart, setChart] = useState<Chart>();
  const [kondisi, setKondisi] = useState<any>();
  const [perangkat_id, setPerangkat_id] = useState("0");

  const loading = useLoading();

  const render = async () => {
    Chart.register(...registerables);

    const ctx = canvas.current.getContext("2d");
    const ch = new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Ketinggian Air",
            data: [],
            fill: true,
            borderColor: "#7367f0",
            backgroundColor: "rgba(115,103,240,0.05)",
            tension: 0.1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        hover: {
          intersect: true,
        },
        plugins: {
          filler: {
            propagate: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            min: 0,
            ticks: {
              stepSize: 10,
            },
          },
        },
      },
    });

    setChart(ch);
  };

  const getData = () => {
    http()
      .get("/air/latest", {
        params: {
          perangkat_id,
        },
      })
      .then((res) => {
        setKondisi(res.data);

        chart?.data.labels?.push(res.data.waktu);
        chart?.data.datasets[0].data?.push(res.data.ketinggian);

        (chart as any).data.labels = chart?.data.labels?.slice(-9);
        (chart as any).data.datasets[0].data =
          chart?.data.datasets[0].data.slice(-9);

        chart?.update();
      })
      .catch((e) => {
        alert("Gagal mengambil data ketinggian air");
      });
  };

  const destroyChart = () => {
    (chart as any).data.labels = [];
    (chart as any).data.datasets[0].data = [];
    chart?.update();
  };

  useEffect(() => {
    render();
    loading?.show(
      () =>
        new Promise((res) => {
          setTimeout(() => res(true), 1200);
        })
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <AdminLayout title="Dashboard">
      <div className="flex lg:flex-row flex-col gap-x-5">
        <div className="lg:w-2/5">
          <Card title="Pilihan Perangkat">
            <select
              className="rounded border border-gray-300 h-10 bg-white px-3 w-full outline-none focus:shadow-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition disabled:bg-gray-50"
              value={perangkat_id}
              onChange={(e) => {
                setPerangkat_id(e.currentTarget.value);
                destroyChart();
              }}
            >
              <option value="0">Perangkat 0</option>
              <option value="1">Perangkat 1</option>
            </select>
          </Card>
        </div>
        <div className="flex-1">
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="mb-5 text-gray-800 text-lg">Ketinggian Air</div>
                <div className="text-3xl mb-3">{kondisi?.ketinggian}</div>
                <div>
                  status :{" "}
                  <span
                    className={
                      ["text-green-500", "text-yellow-500", "text-red-500"][
                        parseInt(kondisi?.status) - 1
                      ]
                    }
                  >
                    {kondisi?.status_detail}
                  </span>
                </div>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <ChartBarIcon className="text-primary w-8 h-8" />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Card title="Grafik Ketinggian Air">
        <div className="chart chart-sm">
          <canvas ref={canvas} className="h-[400px]"></canvas>
        </div>
      </Card>
    </AdminLayout>
  );
}
