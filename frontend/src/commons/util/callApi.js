import axios from "axios";

const API_URL_BASE =
  "http://demo-ebs-env.eba-qcvhx8uz.us-east-1.elasticbeanstalk.com";

export default async function callApi(url, method = "get", data) {
  const urlToUse = `${API_URL_BASE}/${url}`;

  const config = {
    url: urlToUse,
    method,
    data,
  };

  const response = await axios(config);
  return response.data;
}
