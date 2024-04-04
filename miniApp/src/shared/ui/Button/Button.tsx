import { ButtonHTMLAttributes } from "react";
import './Button.css';

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...props} className={"button " + props.className} />
    )
};

export default Button;
