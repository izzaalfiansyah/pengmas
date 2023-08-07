import Card from "@/components/card";
import ChartBarIcon from "@/components/icons/chart-bar-icon";
import AdminLayout from "@/layouts/admin-layout";

export default function () {
  return (
    <AdminLayout title="Dashboard">
      <div className="flex lg:flex-row flex-col gap-5">
        <div className="lg:w-2/5">
          <Card title="Pilihan Perangkat">
            <select className="rounded border border-gray-300 h-10 bg-white px-3 w-full outline-none focus:shadow-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition disabled:bg-gray-50">
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
                <div className="text-3xl mb-3">72</div>
                <div>
                  status : <span className="text-green-500">Aman</span>
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
          <canvas id="grafik-ketinggian-air" height="400px"></canvas>
        </div>
      </Card>
    </AdminLayout>
  );
}
