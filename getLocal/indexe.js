import { networkInterfaces, platform } from 'os';
/**
 * 获取本地IP
 * @returns 本地IP
 */
export function getLocalIp() {
  const nets = networkInterfaces();
  const results = Object.create(null);
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }
  return results?.en0?.[0];
}

export function isIOS() {
  let ua = window.navigator.userAgent,
    app = window.navigator.appVersion;
  console.info('浏览器版本: ' + app + '\n' + '用户代理: ' + ua);
  if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    // ios端
    return true;
  } else if (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) {
    // android端
    return false;
  } else if (ua.match(/MicroMessenger/i) == 'MicroMessenger') {
    // 微信浏览器
    return false;
  }
  return false;
}

export function isAndroid() {
  // 'android', 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', and 'win32'
  const envRes = platform();
  if (envRes === 'android') {
    return true;
  }
  return false;
}
