import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios.instance";
import { connect } from "react-redux";
import classes from "../../Sass/main.module.scss";
import CustomInput from "../../UI/InputButtons/CustomInput";
import { setProfile, uploadImage } from "../../actions/profile";
import { isValidPinCode, containsTextOnly } from "../../Shared/Util";
import MultiSelect from "../../UI/MultiSelect/MultiSelect";

const ProfileSteps = ({ stepData, setProfile, uploadImage }) => {
    const [radioState, setRadioState] = useState({ id: "student" });
    const [dropdownState, setDropdownState] = useState(false);
    let {
        current_step,
        step_completed,
        step_meta_data,
        title,
        subtitle,
    } = stepData;

    const handleChange = (e, ref, lineId, rowId, type) => {
        const stateCopy = Object.assign({}, stepData);
        if (type === "radio") {
            //e.preventDefault();//incase of radio we dont do it
            setRadioState({ id: e.target.value });
        } else {
            e.preventDefault();
            stateCopy.step_meta_data[lineId].data[rowId] = {
                ...stateCopy.step_meta_data[lineId].data[rowId],
                [ref + "_a"]: e.target.value,
                status: e.target.value ? 1 : 0,
            };
        }
        setProfile(stateCopy);
    };

    const handleImageChange = (e, ref, lineId, rowId) => {
        const stateCopy = Object.assign({}, stepData);
        stateCopy.step_meta_data[lineId].data[rowId] = {
            ...stateCopy.step_meta_data[lineId].data[rowId],
            [ref + "_a"]: e.target.value,
        };
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        uploadImage(formData);
        setProfile(stateCopy);
    };

    const submitHandler = async e => {
        e.preventDefault();
        //not found then only
        if (!~step_completed.indexOf(current_step)) {
            step_completed.push(current_step);
            current_step++;
        }
        const stateCopy = Object.assign({}, stepData);
        //Hack for updating radio button values in database
        stateCopy.step_meta_data[1].data[0].info_1_0_a =
            radioState.id === "student";
        stateCopy.step_meta_data[1].data[1].info_1_1_a =
            radioState.id === "professional";

        const res = await axios.post(`/notebook`, {
            ...stateCopy,
            current_step,
            step_completed,
        });
        setProfile(res.data.data);
    };

    const setDDOption = (e, ref, isActive) => {
        e.preventDefault();
        const stateCopy = Object.assign({}, stepData);
        if (!isActive) {
            stateCopy.step_meta_data[2].data[0] = {
                ...stepData.step_meta_data[2].data[0],
                [ref + "_a"]: e.target.innerText,
            };
        } else {
            delete stateCopy.step_meta_data[2].data[0][ref + "_a"];
        }
        setProfile(stateCopy);
    };

    const dropdownOpendHandel = e => {
        e.preventDefault();
        setDropdownState(!dropdownState);
    };

    return (
        <section
            className={classes.profile}
            onClick={e => dropdownState && setDropdownState(false)}
        >
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
                        <span className={classes.highlight}> {title}</span>
                    </h2>
                    <h4>{subtitle}</h4>
                </div>
                {step_meta_data.map((line, lineId) => {
                    const { id, data } = line;
                    let jsx = [];
                    return data.map((row, rowId) => {
                        const ref = "info_" + id + "_" + rowId,
                            type = row[ref + "_type"];

                        let keyHolder = row[ref + "_id"] + rowId,
                            titleHolder = "",
                            ipidHolder = row[ref + "_id"],
                            placeHolder = row["placeholder" + rowId],
                            labeHolder = row[ref],
                            isRequiredHolder = row.req,
                            isCheckedHolder = undefined,
                            regExHolder = "",
                            valHolder = row[ref + "_a"] ? row[ref + "_a"] : "",
                            fnHolder = e =>
                                handleChange(e, ref, lineId, rowId, type);

                        switch (type) {
                            case "select":
                                titleHolder = row[ref + "_a"]
                                    ? row[ref + "_a"]
                                    : row[ref].q;

                                labeHolder = row[ref + "_a"]
                                    ? row[ref].q
                                    : null;

                                break;

                            case "radio":
                                valHolder =
                                    row[ref + "_val"] === radioState.id
                                        ? radioState.id
                                        : row[ref + "_val"];

                                isCheckedHolder =
                                    radioState.id === row[ref + "_val"];
                                break;

                            case "file":
                                fnHolder = e =>
                                    handleImageChange(e, ref, lineId, rowId);
                                break;

                            default:
                                valHolder = row[ref + "_a"]
                                    ? row[ref + "_a"]
                                    : "";

                                regExHolder =
                                    ipidHolder === "postal_code"
                                        ? isValidPinCode
                                        : containsTextOnly;
                                break;
                        }

                        if (type && type === "select") {
                            jsx = (
                                <MultiSelect
                                    key={keyHolder}
                                    title={titleHolder}
                                    list={row[ref].options}
                                    rfid={ref}
                                    ipid={ipidHolder}
                                    labelName={labeHolder}
                                    selectedLi={row[ref + "_a"]}
                                    show={dropdownState}
                                    isRequired={isRequiredHolder}
                                    dropdownOpend={dropdownOpendHandel}
                                    dropDownHandel={setDDOption}
                                />
                            );
                        } else {
                            jsx = (
                                <CustomInput
                                    key={keyHolder}
                                    ipid={ipidHolder}
                                    iptype={type}
                                    htmlFor={ipidHolder}
                                    placeholderVal={placeHolder}
                                    isRequired={isRequiredHolder}
                                    val={valHolder}
                                    regEx={regExHolder}
                                    labelName={labeHolder}
                                    isChecked={isCheckedHolder}
                                    changeHandler={e => fnHolder(e)}
                                />
                            );
                        }
                        return jsx;
                    });
                })}
                <div className={classes["form__group"]}>
                    <button
                        className={classes["btn"] + " " + classes["btn--blue"]}
                    >
                        {step_meta_data[current_step].id !== 0
                            ? "Back"
                            : "Next"}
                    </button>
                </div>
            </form>
        </section>
    );
};

ProfileSteps.propTypes = {
    stepData: PropTypes.object.isRequired,
    setProfile: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    stepData: state.profile,
});

export default connect(
    mapStateToProps,
    { setProfile, uploadImage }
)(ProfileSteps);
