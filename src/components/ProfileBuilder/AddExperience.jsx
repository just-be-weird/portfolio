import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "../../axios.instance";
import classes from "../Sass/main.module.scss";
import CustomInput from "../UI/InputButtons/CustomInput";
import { containsTextOnly } from "../Shared/Util";
import CustomSwitch from "../UI/InputButtons/CustomSwitch";
import { setProfile } from "../actions/profile";
import { loadingUI } from "../actions/ui";

const AddExperience = ({ loadingUI, setProfile, stateData, history }) => {
    const [experienceData, setExperienceData] = useState({
        company: "",
        title: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: "",
    });
    const [toDateDisabled, toggleDisabled] = useState(false);

    const onChange = e => {
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

    const submitHandler = async e => {
        e.preventDefault();
        stateData.experience.push(experienceData);
        loadingUI(true);
        const res = await axios.post(`/notebook/profile`, {
            ...stateData,
        });
        setProfile(res.data.data);
        loadingUI();
        history.push("/");
    };

    return (
        <section className={classes.profile}>
            <form
                action='#'
                className={classes["form"]}
                onSubmit={submitHandler}
                id={classes.experience}
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
                            Add Experience
                        </span>
                    </h2>
                    <h3>Add your experience details</h3>
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
                <div className={classes.custom_input__group}>
                    <CustomSwitch
                        ipid={"current"}
                        val={current}
                        switch_label={"Current Job"}
                        changeHandler={e => {
                            setExperienceData({
                                ...experienceData,
                                [e.target.name]: e.target.checked,
                            });
                            toggleDisabled(!toDateDisabled);
                        }}
                    />
                </div>
                <CustomInput
                    ipid={"to"}
                    iptype={"date"}
                    placeholderVal={"Enter to date in DD:MM:YYYY"}
                    val={to}
                    labelName={"To Date"}
                    regEx={null}
                    isDisabled={current}
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
                        className={classes["btn"] + " " + classes["btn--back"]}
                        onClick={e => {
                            e.stopPropagation();
                            history.push("/");
                        }}
                    >
                        Back
                    </button>
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

AddExperience.propTypes = {
    loadingUI: PropTypes.func.isRequired,
    setProfile: PropTypes.func.isRequired,
    stateData: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    stateData: state.profile,
});

export default connect(
    mapStateToProps,
    { loadingUI, setProfile }
)(AddExperience);
