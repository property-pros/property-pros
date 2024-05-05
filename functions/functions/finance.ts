import cmds from "../cmds";

export default {
    *saveUserFinancialItem({ accessToken, itemId }) {
        yield cmds.reduxGetState("user");
        // yield cmds.saveUserFinancialItem({ accessToken, itemId });
    }
}