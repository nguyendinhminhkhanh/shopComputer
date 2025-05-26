const checkRole = (req, res, next) => {
  try {
    const check = req.session.existingUser.role === "admin"; 
    if (!check) {
      return res.status(403).render("error",{
        message: "Bạn không có quyền truy cập !",
      });
    }
    next();
  } catch (error) {
    console.error("Lỗi xác thực:", error);
    return res.status(401).render("home", {
      message: "Không có quyền truy cập!",
    });
  }
};

module.exports = checkRole;
