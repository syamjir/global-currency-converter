import { useSearchParams } from "react-router-dom";

export function useUrlConversionData() {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const amount = searchParams.get("amount");
  return { from, to, amount };
}
