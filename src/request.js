import axios from 'axios';

const url = 'https://restapi.amap.com/v3/ip';
export const correctKey = 'e641661b0dfbf7ffa23a2110d44f38de';

export const request = async (signal, params) => {
  const res = await axios.get(url, {
    signal,
    params,
  });
  const data = res.data;

  if (data.status !== '1') {
    throw new Error(data.info);
  }
  return data;
};
