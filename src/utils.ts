export function prettify (data: Object) {
  return JSON.stringify(data, null, '  ');
}

export function payloadDecoder (payload: String) {
  let result = {};
  payload.split('&').forEach((v) => {
    let vv = v.split('=');
    result[vv[0]] = decodeURIComponent(vv[1]);
  });
  return result;
}

export function toQueryString (object: Object) {
  let qs = [];
  for (let key in object) {
    qs.push(`${key}=${encodeURIComponent(object[key])}`);
  }
  return qs.join('&');
}

export function generatePayload (accessToken: String, query: String) {
  return toQueryString({
    access_token: accessToken,
    batch_name: 'Queries',
    method: 'GET',
    queries: JSON.stringify({
      q1: {
        priority: 0,
        q: query
      }
    }),
    response_format: 'json',
    scheduler: 'phased'
  });
}

// Quick and dirty to make the query barely legible
export function prettifyQuery (query: String) {
  return query
    .replace(/\{/g, '$&\n')
    .replace(/\},?/g, '$&\n')
    .replace('QueryFragment', '\n\n$&')
    .replace(',', ', ');
}