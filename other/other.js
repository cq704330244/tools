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

// makdown2html
// html2pdf
