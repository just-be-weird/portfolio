import React, { useState } from "react";
import classes from "../Sass/main.module.scss";
import CustomInput from "../UI/InputButtons/CustomInput";
import { containsTextOnly } from "../Shared/Util";

const AddExperience = () => {
    const [experienceData, setExperienceData] = useState({
        company: "",
        title: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: "",
    });
    const onChange = e => {
        console.log({ [e.target.name]: e.target.value });
        setExperienceData({
            ...experienceData,
            [e.target.name]: e.target.value,
        });
    };

    const {
        company,
        title,
        location,
        from,
        to,
        current,
        description,
    } = experienceData;

    return (
        <section className={classes.profile}>
            <form action='#' className={classes["form"]}>
                <div
                    className={
                        classes["u-margin-bottom-medium"] +
                        " " +
                        classes["form__des"]
                    }
                >
                    <h2 className={classes["heading-secondary"]}>
                        <span className={classes.highlight}>
                            {" "}
                            Add Experience
                        </span>
                    </h2>
                    <h4>Add your experience details</h4>
                </div>
                <CustomInput
                    ipid={"title"}
                    iptype={"text"}
                    placeholderVal={"Enter Job Title"}
                    isRequired={true}
                    val={title}
                    regEx={containsTextOnly}
                    labelName={"Job Title"}
                    changeHandler={e => onChange(e)}
                />
                <CustomInput
                    ipid={"company"}
                    iptype={"text"}
                    placeholderVal={"Enter Company Name"}
                    isRequired={true}
                    val={company}
                    regEx={containsTextOnly}
                    labelName={"Company Name"}
                    changeHandler={e => onChange(e)}
                />
                <CustomInput
                    ipid={"location"}
                    iptype={"text"}
                    placeholderVal={"Enter Job Location"}
                    isRequired={true}
                    val={location}
                    regEx={containsTextOnly}
                    labelName={"Company Location"}
                    changeHandler={e => onChange(e)}
                />
                <CustomInput
                    ipid={"from"}
                    iptype={"date"}
                    placeholderVal={"Enter from date in DD:MM:YYYY"}
                    val={from}
                    labelName={"From Date"}
                    regEx={null}
                    changeHandler={e => onChange(e)}
                />
                <CustomInput
                    ipid={"to"}
                    iptype={"date"}
                    placeholderVal={"Enter to date in DD:MM:YYYY"}
                    val={to}
                    labelName={"To Date"}
                    regEx={null}
                    changeHandler={e => onChange(e)}
                />
                {/* this should take special chars and number */}
                <CustomInput
                    ipid={"description"}
                    iptype={"text"}
                    placeholderVal={"Enter Job Description"}
                    val={description}
                    regEx={containsTextOnly}
                    labelName={"Job Description"}
                    changeHandler={e => onChange(e)}
                />
                <div className={classes["form__group"]}>
                    <button
                        className={classes["btn"] + " " + classes["btn--blue"]}
                    >
                        {"Submit"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AddExperience;
