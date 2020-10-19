import axios from "axios";

const JSON_FILES = ["./data/bom.json"];

function extractData() {
  let hashMap = new Map();

  return {
    postData: async (bom_id, pk, load) =>
      await _helperPostData(bom_id, pk, load),
    fetchData: async () => await _helperGetData(hashMap),
    getObjects: () => {
      return hashMap;
    },
  };
}

async function _helperPostData(bom_id, pk, load) {
  const url = `https://www.mobiusmaterials.com/api/v1/bom/${bom_id}/bomitem/${pk}`;

  let req = await axios({
    url,
    method: "put",
    params: {
      ...load,
    },
  });

  return req;
}

async function _helperGetData(hashMap) {
  for (let file of JSON_FILES) {
    let res = await axios.get(`${file}`);

    for (let data of res.data) {
      if (!hashMap.has(data.model)) {
        hashMap.set(data.model, []);
      }
      hashMap.get(data.model).push(data);
    }
  }
}

export default extractData();
