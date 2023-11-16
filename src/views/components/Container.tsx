import type { FC, ReactNode } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

interface Props {
    children?: ReactNode;
    className?: string;
}

const Container: FC<Props> = ({ children, className }) => {
    return (
        <div className={`${className}`}>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Container;
