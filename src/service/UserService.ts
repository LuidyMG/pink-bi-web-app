import { AxiosService } from "./AxiosService";

import { UserLogin, UserRegister } from "./models/User";

const axiosService = new AxiosService();
const axios = axiosService.getInstance();

export class UserService {
    async create(newUser : UserRegister)
    {
        return await axios.post('/users', newUser);
    }

    async login(user : UserLogin)
    {
        return await axios.post('/auth/login', user);
    }
}