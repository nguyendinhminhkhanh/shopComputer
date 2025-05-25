const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    // Lấy token từ cookie hoặc header Authorization
    let token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Không có token, truy cập bị từ chối' });
    }

    try {
        // Loại bỏ "Bearer " nếu có trong header
        if (token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
        }

        // Giải mã token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Gắn thông tin user vào req (sửa lại chỗ này)
        req.user = decoded; // decoded đã chứa { userId, ... }
        res.locals.user = decoded; // Cho view template (nếu cần)

        next(); // Chỉ gọi next() 1 lần
    } catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ' });
    }
};

module.exports = protect; // Export trực tiếp hàm, không cần object {}