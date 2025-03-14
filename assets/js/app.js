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

  $(document).ready(function () {
    let currentTable = null; // Lưu bảng hiện tại được chọn

    // Chỉ chọn bảng khi click vào bất kỳ nơi nào trên bảng
    $("table").click(function () {
      if (!$(this).hasClass("selected")) {
        $("table").removeClass("selected");
        $(this).addClass("selected");

        // Bỏ chọn tất cả dòng đã chọn ở bảng khác
        $("tr.select").removeClass("select");
        currentTable = this;
      }
    });

    // Cập nhật STT cho từng hàng trong bảng được truyền vào
    function updateSTT(table) {
      $(table).find("tbody tr").each(function (index) {
        var sttCell = $(this).find(".stt");
        if (sttCell.length) {
          sttCell.text(index + 1); // Nếu có class "stt" thì cập nhật số thứ tự
        }
      });
    }

    // Thêm hàng mới vào bảng đã chọn
    $("#addRow").click(function () {
      // find selected table
      var selectedTable = $('table').get(0);
      if ($('table').length > 1) {
        if ($('table.selected').length === 0) {
          alert('Vui lòng chọn bảng cần thêm dòng!\n 请选择需要更多行的表！');
          return;
        } else {
          selectedTable = $('table.selected').get(0);
        }
      }

      // Clone hàng đầu tiên để giữ nguyên cấu trúc
      var firstRow = $(selectedTable).find("tbody tr:first");
      var newRow = firstRow.clone();

      // Xóa nội dung trong các textarea của hàng mới
      newRow.find(".input-field").val("");

      // Đặt STT về rỗng để cập nhật lại sau
      newRow.find(".stt").text("");

      newRow.removeClass("select")

      // Bỏ chọn tất cả các dòng đang được chọn trước khi thêm hàng mới
      $(selectedTable).find("tr.select").removeClass("select");

      $(selectedTable).find("tbody").append(newRow); // Thêm vào bảng

      updateSTT(selectedTable); // Cập nhật lại số thứ tự
    });

    // Khi nhấp vào ô có class "first-child" hoặc "stt" => Chọn bảng + chọn dòng luôn
    $("table").on("click", "td.first-child, td.stt", function (event) {
      var row = $(this).closest("tr");
      var table = row.closest("table").get(0);

      // Nếu bảng chưa được chọn, chọn luôn
      if (!$(table).hasClass("selected")) {
        $("table").removeClass("selected");
        $(table).addClass("selected");
        $("tr.select").removeClass("select"); // Bỏ chọn tất cả dòng của bảng khác
        currentTable = table;
      }

      // Chọn dòng trong bảng hiện tại
      row.toggleClass("select");
      event.stopPropagation(); // Ngăn chặn sự kiện lan ra các ô khác
    });

    // Xóa dòng đã chọn
    $("#deleteRow").click(function () {
      if (!currentTable) {
        alert("Vui lòng chọn bảng để xóa dòng!");
        return;
      }

      var selectedRows = $(currentTable).find("tr.select");

      if (selectedRows.length === 0) {
        alert("Vui lòng chọn ít nhất một dòng để xóa!");
        return
      }

      var confirmDelete = confirm(`Bạn có chắc chắn muốn xóa ${selectedRows.length} dòng đã chọn không?`);

      if (confirmDelete) {
        selectedRows.remove();
        updateSTT(currentTable);
      }
    });
  });

  // Xử lý khi nhấn nút "Quay lại"
  $("#goBack").click(function () {
    window.location.href = "/";
  });

  $("#printPage").click(function () {
    window.print(); // Gọi in trực tiếp
  });
});