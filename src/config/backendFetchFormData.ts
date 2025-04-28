import serverConfig from "./fetchUrl";

export const backendFetchFormData = async (url: string, formData: FormData) => {
  const res = await fetch(
    `${serverConfig.basePath}${serverConfig.basePort}${serverConfig.baseRest}${url}`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    }
  );
  return res;
};
