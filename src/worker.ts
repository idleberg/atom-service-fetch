import fetch from 'cross-fetch';
import * as hasha from 'hash-wasm';

const ctx: Worker = self as any;

async function getChecksums(payload) {
  const output = {
    md5: null,
    sha1: null,
    sha256: null,
    sha512: null
  };

  await Promise.all(Object.keys(output).map(async algorithm => {
    let checksum = null;

    try {
      checksum = await hasha[algorithm](payload);
    } catch (e) {
    }

    output[algorithm] = checksum;
  }));

  return output;
}

onmessage = async (e: MessageEvent): Promise<void> => {
    if (!e.data.url) {
        throw Error('Missing URL parameter');
    }

    const { url, options, responseType } = e.data;

    const response = await fetch(url, options);
    const body = await response[responseType]();
    const hashPayload = responseType === 'string'
      ? body
      : new Uint8Array(body)

    ctx.postMessage({
      body: body,
      checksums: await getChecksums(hashPayload),
      redirected: response.redirected,
      status: response.status,
      statusText: response.statusText,
      timeout: response['timeout'],
      url: response.url
    }, null);
};
