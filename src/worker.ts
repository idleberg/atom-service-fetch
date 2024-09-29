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

  await Promise.all(
    Object.keys(output).map(async (algorithm) => {
      let checksum = null;

      try {
        checksum = await hasha[algorithm](payload);
      } catch (e) {}

      output[algorithm] = checksum;
    })
  );

  return output;
}

onmessage = async (e: MessageEvent): Promise<void> => {
  if (!e.data.url) {
    throw Error('Missing URL parameter');
  }

  const { url, options, responseType, senderID } = e.data;

  let body, response;

  try {
    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'User-Agent': navigator.userAgent
      }
    });

    body = await response[responseType]();
  } catch (err) {
    ctx.postMessage({ ok: false, message: err });

    return;
  }

  const hashPayload = responseType === 'string' ? body : new Uint8Array(body);

  ctx.postMessage({
    [responseType]: body,
    checksums: await getChecksums(hashPayload),
    ok: response.ok,
    recipientID: senderID,
    redirected: response.redirected,
    status: response.status,
    statusText: response.statusText,
    timeout: response['timeout'],
    url: response.url
  });
};
