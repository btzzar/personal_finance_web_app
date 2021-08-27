import AccountService from "../components/account/service";
import UserService from "../components/user/service";

export default interface IServices{
    userService: UserService;
    accountService: AccountService;
}