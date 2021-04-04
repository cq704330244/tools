function addEV(e, t, i) {
  window.attachEvent
    ? e.attachEvent('on' + t, i)
    : window.addEventListener && e.addEventListener(t, i, !1);
}
function _aMC(e) {
  for (var t = e, i = -1; (t = t.parentNode); )
    if (((i = parseInt(t.getAttribute('id'))), i > 0)) return i;
}
function al_c(e) {
  for (; 'TABLE' != e.tagName; ) e = e.parentNode;
  return e.getAttribute('id');
}
function al_c2(e, t) {
  for (; t--; ) for (; 'TABLE' != (e = e.parentNode).tagName; );
  return e.getAttribute('id');
}
