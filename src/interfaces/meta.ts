export default interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Array<{
    url?: string;
    label: string;
    active: boolean;
  }>;
  path: string;
  per_page: number;
  to: number;
  total: number;
}
