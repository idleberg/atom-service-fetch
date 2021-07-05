import { resolve } from "path";
import Logger from "./log";

const worker = new Worker(resolve(__dirname, "fetchWorker.js"));

type ResponseTypes = "arrayBuffer" | "json" | "text";

/**
 *
 * @param responseType
 * @param {string} url
 * @param {Object} options
 * @returns {*}
 */
function fetchWrapper(
  responseType: ResponseTypes,
  url: RequestInfo,
  options: RequestInit = {}
): Promise<any> {
  return new Promise((resolve) => {
    Logger.log(`Request`, options);
    worker.postMessage({ responseType, url, options });

    worker.onmessage = (e: MessageEvent) => {
      Logger.log(`Response`, e.data);

      resolve(e.data);
    };
  });
}

function Fetch(
  url: RequestInfo,
  options: RequestInit = {}
): Promise<ArrayBuffer> {
  const contentType = options?.headers?.["Content-Type"] || null;

  switch (true) {
    case contentType === "application/octet-stream":
      return fetchWrapper("arrayBuffer", url, options);

    case contentType?.startsWith("text/"):
      return fetchWrapper("text", url, options);

    default:
      return fetchWrapper("json", url, options);
  }
}

export default Fetch;
