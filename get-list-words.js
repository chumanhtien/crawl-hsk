// VIết ở Console của F12 của từng trang

const table = document.querySelector('table');

// Lấy tất cả các thẻ <tr> trong thẻ <table>
const rows = table.querySelectorAll('tr');

// Lặp qua từng thẻ <tr> và lấy nội dung của nó
let listWords = [];
rows.forEach(row => {
    // Lấy tất cả các thẻ <td> trong thẻ <tr>
    const cells = row.querySelectorAll('td');
    
    // Tạo mảng chứa nội dung của từng ô trong dòng
    const rowData = Array.from(cells).map(cell => cell.textContent.trim());

    // Kiểm tra nếu rowData[1] tồn tại và không rỗng
    if (rowData[1]) {
        listWords.push(rowData[1]);
    }
});

console.log("listWords: ", listWords);
