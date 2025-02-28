/**
 * Xác nhận ký
 * @param {Element} btn 
 */
function signatureConfirm(btn) {
  if (confirm("Chắc chắn ký?\n 確定標誌嗎")) {
    console.log('Đã ký')
    // todo
    // xu ly ajax
  }
}
/**
 * Tự động thay đổi chiều cao của textarea theo số dòng chữ nhập vào
 * @param {Element} textarea 
 */
function autoResize(textarea) {
  textarea.style.height = "auto";
  if (countRows(textarea) >= 2) {
    textarea.style.height = textarea.scrollHeight + "px";
  } else {
    textarea.style.height = "20px";
  }
}
/**
 * Đếm số dòng chữ trong 1 textarea
 * @param {Element} textarea 
 * @returns {Intl} count
 */
function countRows(textarea) {
  let lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight, 10);
  let scrollRows = Math.floor(textarea.scrollHeight / lineHeight);
  let newlineRows = textarea.value.split("\n").length;
  let count = Math.max(scrollRows, newlineRows); // Chọn số dòng lớn hơn
  return count;
}