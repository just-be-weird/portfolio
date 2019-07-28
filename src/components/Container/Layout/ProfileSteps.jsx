import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios.instance";
import classes from "../../Sass/main.module.scss";
import CustomInput from "../../UI/InputButtons/CustomInput";

const ProfileSteps = () => {
    const [stepData, setStepData] = useState({
        active_step: 0,
        title: "Tell's about your self,",
        subtitle: "This makes easy for others to identify you",
        step_progress: [],
        step_meta_data: [
            {
                id: 0,
                count: 2,
                info_0_0: "Country",
                placeholder: "Enter Country",
                info_0_1: "Postal code",
                placeholder1: "Enter Postal Code",
                status: 0,
            },
            {
                id: 1,
                count: 3,
                info_1_0: "Are you a student?",
                info_1_1: "Job title",
                info_1_2: "Company*",
                status: 0,
            },
            {
                id: 2,
                count: 1,
                info_2_0: {
                    q: "Why you need portfolio",
                    options: [
                        "Hunting a job",
                        "Building a network",
                        "trying out my app",
                        "Not Sure!",
                    ],
                    status: 0,
                },
            },
            {
                id: 3,
                count: 1,
                info_3_0: "Add a photo",
                status: 0,
            },
        ],
    });

    const handleChange = (e, stFn, c) => {
        e.preventDefault();
        const os = Object.assign({}, stepData);
        const osd = {
            ...os.step_meta_data[os.active_step],
            ["info_" + [os.active_step] + "_" + c + "_a"]: e.target.value,
        };
        os.step_meta_data[os.active_step] = osd;
        stFn({ ...stepData, ...os });
    };

    const submitHandler = async e => {
        e.preventDefault();
        stepData.active_step++;
        //not found then only
        if (!~stepData.step_progress.indexOf(stepData.active_step)) {
            stepData.step_progress.push(stepData.active_step);
        }
        const data = await axios.post(
            `/notebook/step/${stepData.active_step}`,
            stepData
        );
        setStepData({ ...stepData, ...data });
    };

    console.log(">>", stepData);
    return (
        <section className={classes.profile}>
            <form
                action='#'
                className={classes["form"]}
                onSubmit={submitHandler}
            >
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
                            {stepData.title}
                        </span>
                    </h2>
                    <h4>{stepData.subtitle}</h4>
                </div>
                <CustomInput
                    iptype='text'
                    ipid='country'
                    htmlFor='country'
                    regEx={"^[a-zA-Z]+$"} //Excepet only Alpha chars
                    placeholderVal={stepData.step_meta_data[0].placeholder}
                    labelName={
                        stepData.step_meta_data[0][
                            "info_" + [stepData.active_step] + "_0"
                        ]
                    }
                    customHtml={<span className={classes.highlight}> *</span>}
                    isRquired={true}
                    changeHandler={e => handleChange(e, setStepData, 0)}
                />
                <CustomInput
                    iptype='text'
                    ipid='postalcode'
                    htmlFor='postalcode'
                    regEx={"^[0-9]{4,6}"}
                    placeholderVal={stepData.step_meta_data[0].placeholder1}
                    labelName={
                        stepData.step_meta_data[0][
                            "info_" + [stepData.active_step] + "_1"
                        ]
                    }
                    isRquired={true}
                    changeHandler={e => handleChange(e, setStepData, 1)}
                />
                <div className={classes["form__group"]}>
                    <button
                        className={classes["btn"] + " " + classes["btn--blue"]}
                    >
                        {stepData.step_meta_data[stepData.active_step].id !== 0
                            ? "Back"
                            : "Next"}
                    </button>
                </div>
            </form>
        </section>
    );
};

ProfileSteps.propTypes = {};

export default ProfileSteps;
