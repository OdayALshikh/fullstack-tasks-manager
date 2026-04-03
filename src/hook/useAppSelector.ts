import { useSelector } from "react-redux";
import type { RootState } from "../App/store";

export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected,
): TSelected => {
  return useSelector(selector);
};
