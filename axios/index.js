// axios.defaults.withCredentials = true

const baseUrl = "";

if (process && process.env && process.env.NODE_ENV === "production") {
  baseUrl = ""; // 线上环境
} else {
  baseUrl = ""; // 开发环境
}

const http = {
  post: (url, body, options) =>
    axios
      .post(baseUrl + url, body)
      .then((res) => {
        return handleSuccess(res);
      })
      .catch((err) => {
        return handleError(err);
      }),
  get: (url, params) =>
    axios
      .get(baseUrl + url, {
        ...params,
        params
      })
      .then((res) => {
        return handleSuccess(res);
      })
      .catch((err) => {
        return handleError(err);
      }),
  getFile: (url, params) =>
    getFile
      .get(url)
      .then((res) => {
        try {
          let blob = new Blob([res.data]);
          let link = document.createElement("a");
          let evt = document.createEvent("HTMLEvents");
          evt.initEvent("click", false, false);
          link.href = URL.createObjectURL(blob);
          link.download = `${params.name}.${params.type}`;
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(link.href);
          return true;
        } catch (error) {
          return Promise.reject(data);
        }
      })
      .catch((err) => {
        return handleError(err);
      })
};

const handleSuccess = ({ data, config }) => {
  if (!data.webResult.success) {
    return Promise.reject(data);
  }
  return data;
};

const handleError = (err) => {
  return Promise.reject(err);
};

export default http;
