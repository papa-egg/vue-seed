import { Loading, Message } from 'element-ui';
import CONFIG from './config';

/**
 * @param { String } api
 * @param { Object } sendData
 * @param { Boolean } isLoading
 * @returns { Promise }
 */
function ajax (api, sendData = {}, isLoading) {
  try {
    const sendUrl = apiFilter(api);
    const xhr = new XMLHttpRequest();
    let loadingInstance = null;
    let startTime = Date.parse(new Date());

    if (isLoading) {
      loadingInstance = Loading.service({ fullscreen: true });
    }

    return new Promise((resolve, reject) => {
      xhr.open('post', sendUrl, true);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      xhr.send(JSON.stringify(sendData));

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {

          if (isLoading) {
            loadingInstance.close();
          }

          if (xhr.status === 200) {
            const resData = JSON.parse(xhr.responseText);

            if (resData.statusCode === 200) {
              resolve(resData);
            } else {
              if (resData.statusCode === 401) {

                // Link to login page
                // window.$vue.$router.push('/login');

                return;
              }

              if (resData.message) {
                Message({
                  showClose: true,
                  message: resData.message,
                  type: 'error'
                })
              } else {
                console.error('Request failed, resData: ' + JSON.stringify(resData));
                console.error(resData);

                reject(resData);
              }
            }
          } else {
            if (!window.navigator.onLine) {
              Message({
                showClose: true,
                message: '网络断开，请检查网络！',
                type: 'error'
              });
            } else {
              let endTime = Date.parse(new Date());

              if (parseFloat((endTime - startTime) / 1000) >= 9) {
                Message({
                  showClose: true,
                  message: '请求超时, 请检查网络或重试',
                  type: 'error',
                });
              } else {
                Message({
                  showClose: true,
                  message: '请求失败, 请检查网络或重试',
                  type: 'error',
                });
              }
            }

            if (isLoading) {
              loadingInstance.close();
            }

            console.error('Request failed, status code: ' + xhr.status);
          }
        }
      };
    });

  } catch (err) {
    console.error(err);

    Message({
      showClose: true,
      message: '系统错误：' + err,
      type: 'error'
    });
  }
}

/**
 * @param { String } api
 * @returns { String }
 */
function apiFilter (api) {
  if (!api) throw new Error('Please input legal api');

  let sendUrl = '';

  if (api.startsWith('http') || api.startsWith('//')) {
    sendUrl = api;
  } else {
    if (api.startsWith('/')) {
      sendUrl = CONFIG.DOMAIN + api;
    } else {
      sendUrl = CONFIG.DOMAIN + '/' + api;
    }
  }

  return sendUrl;
}

export default ajax;
