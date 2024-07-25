class UserResource {
    constructor(user) {
        this.id = user._id,
        this.name = user.name,
        this.email = user.email,
        this.isVerified = user.isVerified,
        this.createdAt = shortDate(user.createdAt),
        this.updatedAt = shortDate(user.updatedAt)
    }
}

export default UserResource;