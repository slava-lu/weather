const getOptions = (method, body) => ({
  method: method,
  mode: 'cors',
  cache: 'default',
  redirect: 'follow',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: body ? JSON.stringify(body) : null
});

export const fetchData = async(url, methodRaw, body) => {
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  const method = methodRaw.toUpperCase();
  if (!allowedMethods.includes(method)) {
    throw new Error('Fetch method is not allowed');
  }
  const options = getOptions(method, body);
  try {
    const fetchResult = await fetch(url, options);
    const data = await handleResponse(fetchResult);
    return {
      response: {
        ok: true
      },
      data
    };
  } catch (error) {
    return {
      response: {
        ok: false
      },
      error
    };
  }
};

function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  if (contentType.includes('application/json')) {
    return handleJSONResponse(response);
  } else if (contentType.includes('text/plain') || contentType.includes('text/html')) {
    return handleTextResponse(response);
  } else {
    // Other response types as necessary.
    throw new Error(`Sorry, content-type ${contentType} not supported`);
  }
}

function handleJSONResponse(response) {
  return response.json()
    .then(json => {
      if (response.ok) {
        return json;
      } else {
        return Promise.reject({
          serverError: json,
          status: response.status,
          statusText: response.statusText
        });
      }
    });
}

function handleTextResponse(response) {
  return response.text()
    .then(text => {
      if (response.ok) {
        return text;
      } else {
        return Promise.reject({
          serverError: text,
          status: response.status,
          statusText: response.statusText
        });
      }
    });
}
