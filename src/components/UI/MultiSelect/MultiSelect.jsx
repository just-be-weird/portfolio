import React from "react";
import classes from "../../Sass/main.module.scss";

const MultiSelect = ({
    title,
    list,
    dropDownHandel,
    rfid,
    selectedLi,
    show,
    dropdownOpend,
    labelName,
    ipid,
    isRequired,
}) => {
    const isActive = id => {
        return id === selectedLi ? classes.active : "";
    };

    return (
        <div
            className={
                classes.custom_input__group +
                " " +
                classes.dropdown +
                (show ? " " + classes.open : "") +
                (selectedLi ? " " + classes.optActive : "")
            }
        >
            <select placeholder={title} id={ipid}>
                {list.map((opt, i) => (
                    <option key={i}>{opt}</option>
                ))}
            </select>

            <span
                className={classes.custom_input__input}
                onClick={dropdownOpend}
            >
                {title}
                <ul>
                    {list.map((opt, i) => (
                        <li key={i} data-id={i} className={isActive(opt)}>
                            <span
                                onClick={e =>
                                    dropDownHandel(e, rfid, isActive(opt))
                                }
                            >
                                {opt}
                            </span>
                        </li>
                    ))}
                </ul>
            </span>
            {labelName && (
                <label htmlFor={ipid} className={classes.custom_input__label}>
                    {labelName}
                    {isRequired && (
                        <span className={classes.highlight}> *</span>
                    )}
                </label>
            )}
        </div>
    );
};

export default MultiSelect;
