class authorization {
    async checkRole(req, res, next) {
        if (req.user.roleId !== 1)
            return res.status(403).json({ success: false, message: 'Forbidden. Admin access only.'});

        next();
    }
}
module.exports = new authorization();