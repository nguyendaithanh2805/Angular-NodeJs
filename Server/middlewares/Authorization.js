class Authorization {
    async checkRoleAdmin(req, res, next) {
        if (req.user.roleId !== 1) {
            return res.status(403).json({ success: false, message: 'Forbidden. Admin access only.' });
        }
        next();
    }

    async checkRoleUser(req, res, next) {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized. Please log in.' });
        }
        next();
    }
}

module.exports = new Authorization();
