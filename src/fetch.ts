import { resolve } from 'path';
import Logger from './log';

const worker = new Worker(resolve(__dirname, 'fetchWorker.js'));

type ResponseTypes = 'arrayBuffer' | 'formData' | 'json' | 'text';

/**
 *
 * @param responseType
 * @param {string} url
 * @param {Object} options
 * @returns {*}
 */
function fetchMessenger(responseType: ResponseTypes, url: RequestInfo, options: RequestInit = {}): Promise<any> {
  return new Promise((resolve) => {
    Logger.log(`Request ${responseType}`, options);
    worker.postMessage({ responseType, url, options });

    worker.onmessage = (e: MessageEvent) => {
      Logger.log(`Response`, e.data);

      resolve({
        ...e.data,
        [responseType]: () => Promise.resolve(e.data[responseType])
      });
    };
  });
}

async function Fetch(url: RequestInfo, options: RequestInit = {}): Promise<Response> {
  const acceptHeader = options?.headers?.['Accept'] || null;

  switch (true) {
    case acceptHeader === 'application/json':
      return await fetchMessenger('json', url, options);

    case acceptHeader === 'application/octet-stream':
      return await fetchMessenger('arrayBuffer', url, options);

    case acceptHeader === 'multipart/form-data':
      return await fetchMessenger('formData', url, options);

    case acceptHeader?.startsWith('text/'):
      return await fetchMessenger('text', url, options);

    default:
      throw Error('The Accept header is required to mock the Fetch API Response');
  }
}

export default Fetch;
