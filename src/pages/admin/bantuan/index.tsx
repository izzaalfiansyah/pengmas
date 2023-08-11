import Card from "@/components/card";
import FormGroup from "@/components/form/form-group";
import Input from "@/components/form/input";
import Select from "@/components/form/select";
import BuoyIcon from "@/components/icons/buoy-icon";
import SearchIcon from "@/components/icons/search-icon";
import { Marker } from "@/components/maps";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import { useLoading } from "@/contexts/loading-context";
import { useNotif } from "@/contexts/notif-context";
import Bantuan from "@/interfaces/bantuan";
import Meta from "@/interfaces/meta";
import AdminLayout from "@/layouts/admin-layout";
import formatDate, { formatToDate } from "@/libs/formatDate";
import http from "@/libs/http";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Maps = dynamic(() => import("@/components/maps"), { ssr: false });

export default function () {
  const loading = useLoading();
  const notif = useNotif();

  const [items, setItems] = useState<Bantuan[]>([]);
  const [metaItems, setMetaItems] = useState<Meta>();
  const [q, setQ] = useState<string>("");
  const [status, setStatus] = useState("");
  // const [tanggal, setTanggal] = useState(formatToDate(Date.now()));
  const [tanggal, setTanggal] = useState("");
  const [page, setPage] = useState(1);
  const [markers, setMarkers] = useState<Array<Marker>>();

  const getBantuan = async () => {
    try {
      const res = await http().get("/bantuan", {
        params: {
          q,
          status,
          page,
          tanggal,
        },
      });
      setItems(res.data.data);
      setMetaItems(res.data.meta);

      let markers: Marker[] = [];
      res.data.data.forEach((item: Bantuan) => {
        markers.push({
          latlng: [item.latitude, item.longitude],
          popup: `${item.kebutuhan} (${item.jenis_bantuan})`,
        });
      });

      setMarkers(markers);
    } catch (e: any) {}
  };

  useEffect(() => {
    loading?.show(getBantuan);
  }, [status, page, tanggal]);

  return (
    <AdminLayout title="SOS Bantuan">
      {markers && (
        <Card title="Tracking Maps">
          <Maps markers={markers} />
        </Card>
      )}
      <Card title="Data SOS Bantuan">
        <div className="flex lg:flex-row flex-col items-center gap-x-3">
          <div className="lg:w-1/4 w-full">
            <FormGroup>
              <Input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.currentTarget.value)}
              />
            </FormGroup>
          </div>
          <div className="lg:w-1/4 w-full">
            <FormGroup>
              <Select
                options={[
                  {
                    value: "",
                    label: "Semua Status",
                  },
                  {
                    value: "pending",
                    label: "Pending",
                  },
                  {
                    value: "diterima",
                    label: "Diterima",
                  },
                ]}
                value={status}
                onChange={(e) => setStatus(e.currentTarget.value)}
              />
            </FormGroup>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loading?.show(getBantuan);
            }}
            className="lg:w-1/2 w-full"
          >
            <FormGroup
              suffix={
                <button
                  type="submit"
                  className="bg-primary h-10 px-3 rounded text-white"
                >
                  <SearchIcon className="w-5 h-5" />
                </button>
              }
            >
              <Input
                value={q}
                onChange={(e) => setQ(e.currentTarget.value)}
                placeholder="Ketikkan Sesuatu..."
              />
            </FormGroup>
          </form>
        </div>

        <div className="-mx-5 mt-5 overflow-x-auto">
          <Table
            headers={[
              "Tanggal",
              "Pemohon",
              "Lokasi",
              "Jenis Bantuan",
              "Kebutuhan",
              "Status",
              "Pengirim",
            ]}
            items={items.map((item) => [
              formatDate(item.timestamp),
              item.pemohon?.nama_lengkap,
              <div>
                <div className="max-w-[450px] truncate">
                  {item.alamat_lokasi}
                </div>
                <div>Detail Lokasi: {item.lokasi_tambahan}</div>
              </div>,
              <div className="flex items-center">
                <div className="w-7 h-7 rounded-full flex items-center justify-center bg-green-100 mr-3">
                  <BuoyIcon className="w-4 h-4 text-green-500" />
                </div>
                {item.jenis_bantuan}
              </div>,
              <span className="font-semibold">{item.kebutuhan}</span>,
              <span
                className={`${
                  {
                    diterima: "bg-green-200 text-green-500",
                    pending: "bg-red-200 text-red-500",
                  }[item.status]
                } text-xs px-2 p-1 rounded`}
              >
                {item.status}
              </span>,
              item.pengirim?.nama_lengkap,
            ])}
          />
        </div>
        {metaItems && (
          <div className="mt-5">
            <div className="flex lg:flex-row flex-col items-center justify-between gap-5">
              <div className="text-sm">
                Menampilkan {metaItems?.from || 0} - {metaItems?.to || 0} dari{" "}
                {metaItems?.total} data
              </div>
              <Pagination
                current={metaItems.current_page}
                total={metaItems.last_page}
                onChange={(val) => setPage(val)}
              />
            </div>
          </div>
        )}
      </Card>
    </AdminLayout>
  );
}
