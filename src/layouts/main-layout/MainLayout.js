import { Box } from "@mui/material";
import style from "./MainLayout.module.scss";
import classNames from "classnames/bind";
import Header from "~/components/header";
import Footer from "~/components/footer";
import ChatBot from "~/components/chatbot/ChatBot";
const cx = classNames.bind(style);

function MainLayout({ children }) {
    return (
        <Box className={cx("main")}>
            <Header />
            <Box className={cx("wrapper")}>{children}</Box>
             {/* <ChatBot /> */}
            <Footer />
        </Box>
    );
}

export default MainLayout;
