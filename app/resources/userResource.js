class UserResource {
    constructor(user) {
        this.id = user._id;
        this.name = user.name;
        this.email = user.email;
        this.isVerified = user.isVerified;
        this.createdAt = user.createdAt.toDateString();
        this.updatedAt = user.updatedAt.toDateString();
    }
}

export default UserResource;