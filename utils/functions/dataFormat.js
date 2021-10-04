module.exports = {
    userData: (user) => {
        return {
            id: user.dataValues.id,
            profileImage: user.dataValues.profileImage,
            userName: user.dataValues.userName,
            phnNo:user.dataValues.phnNo,
            email: user.dataValues.email,
            forgotCode: user.dataValues.forgotCode,
            approval: user.dataValues.approval,
            forgotCodeVerify: user.dataValues.forgotCodeVerify,
            rolesId: user.dataValues.rolesId,
            userTypes: user.dataValues.userTypes,
            superAdmin: user.dataValues.superAdmin,
            status: user.dataValues.status,
            softDelete: user.dataValues.softDelete,
            createdAt: user.dataValues.createdAt,
            updatedAt: user.dataValues.updatedAt,
        }
    }
}