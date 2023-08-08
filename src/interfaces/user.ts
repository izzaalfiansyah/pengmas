export default interface User {
  id?: string;
  nama?: string;
  email?: string;
  telepon?: string;
  alamat?: string;
  role?: "1" | "2" | "3";
  role_detail?: string;
  status?: "0" | "1" | "2";
  status_detail?: string;
}
