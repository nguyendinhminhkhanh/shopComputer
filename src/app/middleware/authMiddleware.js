const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token = req.cookies.token || req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Không có token, truy cập bị từ chối' });
    }

    try {
        if (token.startsWith('Bearer ')) {
            token = token.split(' ')[1]; // Lấy token từ Header Authorization
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Gắn thông tin user vào req để sử dụng ở controller
        req.user = user; // Gán user vào request để sử dụng trong controller
        res.locals.user = user; 
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ' });
    }
    next();
};

module.exports = { protect };