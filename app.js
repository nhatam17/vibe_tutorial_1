const form = document.querySelector('#requestForm');
const status = document.querySelector('#status');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!window.APP_CONFIG.appsScriptUrl.startsWith('https://')) {
    status.textContent = 'Hãy dán URL /exec của Apps Script vào config.js.'; return;
  }
  status.textContent = 'Đang gửi…';
  const payload = Object.fromEntries(new FormData(form));
  try {
    await fetch(window.APP_CONFIG.appsScriptUrl, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) });
    status.textContent = 'Đã gửi. Kiểm tra Google Sheets để xác nhận dòng mới.'; form.reset();
  } catch (error) { status.textContent = `Lỗi kết nối: ${error.message}`; }
});
