import { PositionObject } from "./type/PositionObject.ts";

export async function getAddress({ latitude, longitude }: PositionObject) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
  );
  if (!res.ok) throw Error("Failed getting address");

  return await res.json();
}
