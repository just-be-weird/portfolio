import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "../../axios.instance";
import classes from "../Sass/main.module.scss";
import CustomInput from "../UI/InputButtons/CustomInput";
import { containsTextOnly, containsDotAtEnd } from "../Shared/Util";
import CustomSwitch from "../UI/InputButtons/CustomSwitch";
import { setProfile } from "../actions/profile";

const AddEducation = ({ setProfile, stateData, history }) => {
    const [educationData, setEducationData] = useState({
        degree: "",
        school: "",
        field: "",
        from: "",
        to: "",
        current: false,
        description: "",
    });
    const [toDateDisabled, toggleDisabled] = useState(false);

    const onChange = e => {
        console.log({ [e.target.name]: e.target.value });
        setEducationData({
            ...educationData,
            [e.target.name]: e.target.value,
        });
    };

    const {
        degree,
        school,
        field,
        from,
        to,
        current,
        description,
    } = educationData;
    console.log(educationData);

    const submitHandler = async e => {
        e.preventDefault();
        stateData.education.push(educationData);
        const res = await axios.post(`/notebook`, {
            ...stateData,
        });
        setProfile(res.data.data);
        history.push("/");
    };

    return (
        <section className={classes.profile}>
            <form
                action='#'
                className={classes["form"]}
                onSubmit={submitHandler}
                id={classes.education}
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
                            Add Education
                        </span>
                    </h2>
                    <h3>Add your education details</h3>
                </div>
                <CustomInput
                    ipid={"school"}
                    iptype={"text"}
                    placeholderVal={"Enter School / Bootcamp Name"}
                    isRequired={true}
                    val={school}
                    regEx={containsDotAtEnd}
                    labelName={"School/Bootcamp"}
                    changeHandler={e => onChange(e)}
                />
                <CustomInput
                    ipid={"degree"}
                    iptype={"text"}
                    placeholderVal={"Enter Degree / Certificate Name"}
                    isRequired={true}
                    val={degree}
                    regEx={containsDotAtEnd}
                    labelName={"Degree/Certificate"}
                    changeHandler={e => onChange(e)}
                />
                <CustomInput
                    ipid={"field"}
                    iptype={"text"}
                    placeholderVal={"Enter Feild Of Study"}
                    isRequired={true}
                    val={field}
                    regEx={containsTextOnly}
                    labelName={"Feild of study"}
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
                        switch_label={"Current School / Bootcamp"}
                        changeHandler={e => {
                            console.log({ [e.target.name]: e.target.checked });

                            setEducationData({
                                ...educationData,
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
                    placeholderVal={"Enter Degree / Program Description"}
                    val={description}
                    regEx={containsTextOnly}
                    labelName={"Program Description"}
                    changeHandler={e => onChange(e)}
                />
                <div className={classes["form__group"]}>
                    <button
                        type='button'
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

AddEducation.propTypes = {
    setProfile: PropTypes.func.isRequired,
    stateData: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    stateData: state.profile,
});

export default connect(
    mapStateToProps,
    { setProfile }
)(AddEducation);
