import CryptoJS from "crypto";
import { type RequestHandler } from "express";
import QueryString from "qs";

const sortObject = (obj: Record<string, string>): Record<string, string> => {
  const sorted: Record<string, string> = {};
  const keysToSort: string[] = Object.keys(obj).filter((key) =>
    Object.prototype.hasOwnProperty.call(obj, key),
  );

  keysToSort.sort();

  for (const key of keysToSort) {
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(obj[key]).replace(/%20/g, "+");
    sorted[encodedKey] = encodedValue;
  }

  return sorted;
};

const getVnpParamsForInternalCard = (orderId: string, ipAddress: string, price: number) => {
  const date = new Date();

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const createDate = `${year}${month}${day}${hours}${minutes}${seconds}`;

  const USD_TO_VND = 24000;

  const amount = price * USD_TO_VND;

  return {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: process.env.VNP_TMN_CODE ?? "FSD6QFW5",
    vnp_Locale: "vn",
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: "Shopbebin:" + orderId,
    vnp_OrderType: "other",
    vnp_Amount: `${amount * 100}`,
    vnp_ReturnUrl: process.env.VNP_RETURN_URL ?? "http://localhost:3120/orders",
    vnp_IpAddr: ipAddress,
    vnp_CreateDate: createDate,
    vnp_BankCode: "VNBANK",
  };
};

export const handleCheckout: RequestHandler = (req, res) => {
  const { id: orderId, price } = req.body;

  const ipAddress = req.headers["x-forwarded-for"] ?? req.socket.remoteAddress;

  if (!ipAddress) {
    return res.status(500).json({
      message: "Cannot get IP address",
    });
  }

  let vnpUrl = process.env.VNP_URL ?? "";

  const secretKey = process.env.VNP_HASH_SECRET ?? "";

  if (vnpUrl === "" || secretKey === "") {
    return res.status(500).json({
      message: "VNP_URL or VNP_HASH_SECRET is not set",
    });
  }

  const vnpParams = getVnpParamsForInternalCard(orderId, ipAddress as string, price);
  const sortedVnpParams = sortObject(vnpParams);

  const signData = QueryString.stringify(sortedVnpParams, { encode: false });
  const hmac = CryptoJS.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  // @ts-expect-error: vnp_SecureHash is not in type definition
  vnpParams.vnp_SecureHash = signed;

  vnpUrl += "?" + QueryString.stringify(vnpParams, { encode: false });

  res.status(200).json({
    url: vnpUrl,
  });
};
