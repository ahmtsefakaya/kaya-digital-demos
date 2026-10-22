/* Kaya Digital demo izleme: ziyaret, ara butonu, form. "#ben" ile acilan tarayici kalici olarak haric tutulur. */
(function () {
  var s = document.currentScript, id = s && s.getAttribute('data-id'); if (!id) return;
  try { if (location.hash === '#ben') { localStorage.setItem('kd_ben', '1'); history.replaceState(null, '', location.pathname + location.search); } } catch (e) {}
  var ben = false; try { ben = localStorage.getItem('kd_ben') === '1'; } catch (e) {}
  var r = new URLSearchParams(location.search).get('r') || (document.referrer ? 'ref:' + document.referrer.split('/')[2] : '');
  function gonder(e) {
    var u = 'https://kaya-digital-panel.vercel.app/api/t?id=' + encodeURIComponent(id) + '&e=' + e + '&r=' + encodeURIComponent((ben ? 'ben ' : '') + r);
    if (navigator.sendBeacon) navigator.sendBeacon(u); else new Image().src = u;
  }
  var k = 'kd_v_' + id; try { if (!sessionStorage.getItem(k)) { sessionStorage.setItem(k, '1'); gonder('visit'); } } catch (e) { gonder('visit'); }
  document.addEventListener('click', function (ev) { var a = ev.target.closest && ev.target.closest('a[href^="tel:"]'); if (a) gonder('call'); }, true);
  document.addEventListener('submit', function () { gonder('form'); }, true);
})();
