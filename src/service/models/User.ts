export interface User {
    username: string,
    name: string,
    email: string
}

export interface UserLogin extends Pick<User, 'username'> {
    password: string
}

export interface UserRegister extends User, Pick<UserLogin, 'password'> {}