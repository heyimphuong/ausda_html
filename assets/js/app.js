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

jQuery(document).ready(function ($) {
  $(window).load(function () {
    // auto resize textarea onload
    $("table .input-field").each(function () {
      autoResize(this);
    });
  })
});

$(document).ready(function () {
  // Hàm tự động điều chỉnh kích thước textarea
  // window.autoResize = function (element) {
  //   element.style.height = "30px"; // Reset chiều cao
  //   element.style.height = element.scrollHeight + "px"; // Set chiều cao theo nội dung
  // };

  // Cập nhật STT cho từng hàng
  function updateSTT() {
    $("#dataTable tbody tr").each(function (index) {
      $(this).find(".stt").text(index + 1);
    });
  }

  $("#addRow").click(function () {
    var lastRow = $("#dataTable tbody tr:last"); // Lấy hàng cuối cùng
    if (lastRow.length === 0) {
      alert("Không có dòng nào để sao chép!");
      return;
    }

    var newRow = lastRow.clone(); // Clone hàng cuối cùng

    // Xóa nội dung trong các textarea của hàng mới
    newRow.find("textarea").val("");

    // Đặt STT về rỗng để cập nhật lại sau
    newRow.find(".stt").text("");

    $("#dataTable tbody").append(newRow); // Thêm vào bảng

    updateSTT(); // Cập nhật lại số thứ tự
  });


  // Chọn / bỏ chọn hàng khi click
  $("#dataTable").on("click", "tr", function () {
    $(this).toggleClass("selected");
  });

  // Xóa các dòng đã chọn
  $("#deleteRow").click(function () {
    var selectedRows = $("#dataTable tr.selected");

    if (selectedRows.length === 0) {
      alert("Vui lòng chọn ít nhất một dòng để xóa!");
      return;
    }

    var confirmDelete = confirm(`Bạn có chắc chắn muốn xóa ${selectedRows.length} dòng đã chọn không?`);

    if (confirmDelete) {
      selectedRows.remove();
      updateSTT();
    }
  });

  // Xử lý khi nhấn nút "Quay lại"
  $("#goBack").click(function () {
    window.location.href = "http://localhost:3000/";
  });

  $("#printPage").click(function () {
    window.print(); // Gọi in trực tiếp
  });
});