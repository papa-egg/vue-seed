import { Loading } from 'element-ui'
import ajax from './ajax'

/**
 * @param { Object } reqArgs
 * @param { Boolean } isNotLoading
 * @returns { Promise<any> }
 */
function getAllAjax (reqArgs, isNotLoading) {
  let loadingInstance1;
  const sendArgs = [];

  if (!isNotLoading) {
    loadingInstance1 = Loading.service({ fullscreen: true });
    setTimeout(() => {
      loadingInstance1.close();
    }, 5000);
  }

  for (let item of reqArgs) {
    sendArgs.push(ajax(item.url, item.param || {}))
  }

  return new Promise((res, rej) => {
    Promise.all(sendArgs).then((rel) => {
      if (!isNotLoading) {
        loadingInstance1.close();
      }
      res(rel);
    }).catch((err) => {
      console.error(err);
    })
  })
}

/**
 * @param { Object } reqArgs
 * @param { Boolean } isNotLoading
 * @returns {Promise<any>}
 */
function ajaxAll (reqArgs, isNotLoading) {
  try {
    return getAllAjax(reqArgs, isNotLoading);
  } catch (err) {
    console.error(err);
  }
}

export default ajaxAll;
