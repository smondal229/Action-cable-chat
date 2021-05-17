import { Search } from "@material-ui/icons";
import ajax from "./ajax";

export function fetchUsers(page=1, search='') {
  return ajax(`/users?page=${page}&search=${search}`);
}