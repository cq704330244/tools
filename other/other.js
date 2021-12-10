// 八位随机数
const rodomStr = () => {
  return Math.random().toString(36).substr(2);
};
// 下划线转换驼峰
function toHump(name) {
  return name.replace(/\_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}
// 驼峰转换下划线
function toLine(name) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase();
}

// 下载
function download(href, title) {
  const a = document.createElement('a');
  a.setAttribute('href', href);
  a.setAttribute('download', title);
  a.click();
}

const editgit = 'https://github.com/nhn/tui.editor';
const edit = 'https://ui.toast.com/tui-editor/';

// 过滤表情
export const isEmojiCharacter = substring => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < substring.length; i++) {
    const hs = substring.charCodeAt(i);
    if (hs >= 0xd800 && hs <= 0xdbff) {
      if (substring.length > 1) {
        const ls = substring.charCodeAt(i + 1);
        const uc = (hs - 0xd800) * 0x400 + (ls - 0xdc00) + 0x10000;
        if (uc >= 0x1d000 && uc <= 0x1f77f) {
          return true;
        }
      }
    } else if (substring.length > 1) {
      const ls = substring.charCodeAt(i + 1);
      if (ls === 0x20e3) {
        return true;
      }
    } else {
      if (hs >= 0x2100 && hs <= 0x27ff) {
        return true;
      }
      if (hs >= 0x2b05 && hs <= 0x2b07) {
        return true;
      }
      if (hs >= 0x2934 && hs <= 0x2935) {
        return true;
      }
      if (hs >= 0x3297 && hs <= 0x3299) {
        return true;
      }
      if (
        hs === 0xa9 ||
        hs === 0xae ||
        hs === 0x303d ||
        hs === 0x3030 ||
        hs === 0x2b55 ||
        hs === 0x2b1c ||
        hs === 0x2b1b ||
        hs === 0x2b50
      ) {
        return true;
      }
    }
  }
  return false;
};

// 阿拉巴转中文
export const arabiaToSimplifiedChinese: (n: string) => string = (n) => {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(`${n}`)) {
    return '数据非法'; //判断数据是否大于0
  }

  let unit = '千百拾亿千百拾万千百拾元角分',
    str = '';
  // eslint-disable-next-line no-param-reassign
  n += '00';

  const indexpoint = n.indexOf('.'); // 如果是小数，截取小数点前面的位数

  if (indexpoint >= 0) {
    // eslint-disable-next-line no-param-reassign
    n = n.substring(0, indexpoint) + n.substr(indexpoint + 1, 2); // 若为小数，截取需要使用的unit单位
  }

  unit = unit.substr(unit.length - n.length); // 若为整数，截取需要使用的unit单位
  for (let i = 0; i < n.length; i++) {
    str += '零一二三四五六七八九'.charAt(Number(n.charAt(i))) + unit.charAt(i); //遍历转化为大写的数字
  }

  return str
    .replace(/零(千|百|拾|角)/g, '零')
    .replace(/(零)+/g, '零')
    .replace(/零(万|亿|元)/g, '$1')
    .replace(/(亿)万|壹(拾)/g, '$1$2')
    .replace(/^元零?|零分/g, '')
    .replace(/元$/g, ''); // 替换掉数字里面的零字符，得到结果
};
