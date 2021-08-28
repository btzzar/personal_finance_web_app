import AccountService from "../components/account/service";
import ExpenseService from "../components/expense/service";
import IncomeService from "../components/income/service";
import UserService from "../components/user/service";

export default interface IServices{
    userService: UserService;
    accountService: AccountService;
    expenseService: ExpenseService;
    incomeService: IncomeService;
}