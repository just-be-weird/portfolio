import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios.instance";
import { connect } from "react-redux";
import classes from "../../Sass/main.module.scss";
import CustomInput from "../../UI/InputButtons/CustomInput";
import { setProfile, uploadImage } from "../../actions/profile";
import { loadingUI } from "../../actions/ui";
import {
    isValidPinCode,
    containsTextOnly,
    commaSeperatedTextOnly,
} from "../../Shared/Util";
import MultiSelect from "../../UI/MultiSelect/MultiSelect";

const ProfileSteps = ({
    loadingUI,
    profileData,
    title,
    subtitle,
    setProfile,
    uploadImage,
    history,
}) => {
    const [radioState, setRadioState] = useState({ id: "student" });
    const [dropdownState, setDropdownState] = useState(false);

    const handleChange = (e, ref, lineId, rowId, type) => {
        const stateCopy = Array.from(profileData);
        if (type === "radio") {
            //e.preventDefault();//incase of radio we dont do it
            setRadioState({ id: e.target.value });
        } else {
            e.preventDefault();
            stateCopy[lineId].data[rowId] = {
                ...stateCopy[lineId].data[rowId],
                [ref + "_a"]: e.target.value,
                status: e.target.value ? 1 : 0,
            };
        }
        setProfile({ profile_data: stateCopy });
    };

    const handleImageChange = (e, ref, lineId, rowId) => {
        const stateCopy = Array.from(profileData);
        stateCopy[lineId].data[rowId] = {
            ...stateCopy[lineId].data[rowId],
            [ref + "_a"]: e.target.value,
        };
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        uploadImage(formData);
        setProfile({ profile_data: stateCopy });
    };

    const submitHandler = async e => {
        e.preventDefault();
        //not found then only
        // current_step = step_completed.find(
        //     step => step.id === history.location.pathname
        // );
        // if (current_step) {
        //     step_completed.push(current_step);
        // }
        const stateCopy = Array.from(profileData);
        //Hack for updating radio button values in database
        stateCopy[1].data[0].info_1_0_a = radioState.id === "student";
        stateCopy[1].data[1].info_1_1_a = radioState.id === "professional";
        loadingUI(true);
        const res = await axios.post(`/notebook`, { profile_data: stateCopy });
        setProfile({ profile_data: res.data.data.profile_data });

        loadingUI();
        history.push("/");
    };

    const setDDOption = (e, ref, isActive) => {
        e.preventDefault();
        const stateCopy = Array.from(profileData);
        if (!isActive) {
            stateCopy[2].data[0] = {
                ...profileData[2].data[0],
                [ref + "_a"]: e.target.innerText,
            };
        } else {
            delete stateCopy[2].data[0][ref + "_a"];
        }
        setProfile({ profile_data: stateCopy });
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
                {profileData.map((line, lineId) => {
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

                                labeHolder = row[ref + "_a"] && row[ref].label;
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
                                        : ipidHolder === "skill-set"
                                        ? commaSeperatedTextOnly
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
                        {"Next"}
                    </button>
                </div>
            </form>
        </section>
    );
};

ProfileSteps.propTypes = {
    profileData: PropTypes.array.isRequired,
    setProfile: PropTypes.func.isRequired,
    loadingUI: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    uploadImage: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    profileData: state.profile.profile_data,
    title: state.profile.title,
    subtitle: state.profile.subtitle,
});

export default connect(
    mapStateToProps,
    { loadingUI, setProfile, uploadImage }
)(ProfileSteps);
