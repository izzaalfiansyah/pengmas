import User from "./user";

export default interface Bantuan {
  id_bantuan: string;
  longitude: number;
  latitude: number;
  alamat_lokasi: string;
  lokasi_tambahan?: string;
  jenis_bantuan: string;
  kebutuhan: string;
  timestamp: string;
  id_pemohon: string;
  pemohon?: User;
  id_pengirim?: string;
  pengirim?: User;
  status: "pending" | "diterima";
}
