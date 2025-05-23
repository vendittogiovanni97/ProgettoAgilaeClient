import serverConfig from "./fetchUrl";

const backendFetch = async (
  url: string,
  method: "get" | "post" | "delete" | "put" = "get",
  body?: unknown,
  responseType: "json" | "blob" | "text" = "json"
) => {
  const fetchOptions: RequestInit =
    method === "post"
      ? {
          method: method,
          body: JSON.stringify(body),
          headers: { "content-type": "application/json" },
          credentials: "include",
        }
      : {
          credentials: "include",
        };

  try {
    //console.log("INVIO FETCH ");
    const fetchResult = await fetch(
      `${serverConfig.basePath}${serverConfig.basePort}${serverConfig.baseRest}${url}`,
      fetchOptions
    );

    let responseBody;
    if (responseType === "json") {
      responseBody = await fetchResult.json();
    } else if (responseType === "blob") {
      //Serve per salvare file ed immagini, o  mostrare un’anteprima o scaricare un file generato lato client
      responseBody = await fetchResult.blob();
    } else if (responseType === "text") {
      responseBody = await fetchResult.text();
    }
    const responseDetails = responseBody.details;
    //console.log("RESPONSE FETCH ", fetchResult, responseBody);

    return { fetchResult, responseBody, responseDetails };
  } catch (error) {
    throw new Error(`Errore nella fetch: ${error}`);
  }
};

export default backendFetch;
