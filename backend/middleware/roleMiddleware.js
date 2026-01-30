const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    // req.user comes from authMiddleware
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions"
      });
    }

    next();
  };
};

export default roleMiddleware;
