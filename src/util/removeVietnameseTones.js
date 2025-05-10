//phục vụ viêc chuyển đổi tiếng việt sang en
function removeVietnameseTones(str) {
    return str.normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/đ/g, "d").replace(/Đ/g, "D");
}

module.exports = removeVietnameseTones;
