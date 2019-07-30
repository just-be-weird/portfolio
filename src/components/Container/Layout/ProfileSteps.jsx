import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "../../../axios.instance";
import { connect } from "react-redux";
import classes from "../../Sass/main.module.scss";
import CustomInput from "../../UI/InputButtons/CustomInput";
import { setProfile } from "../../actions/profile";
import { isValidPinCode, containsTextOnly } from "../../Shared/Util";

const ProfileSteps = ({ stepData, setProfile }) => {
    const [radioState, setRadioState] = useState({ id: "student" });
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
            setRadioState({ id: e.target.value });
        } else {
            e.preventDefault();
            stateCopy.step_meta_data[lineId].data[rowId] = {
                ...stateCopy.step_meta_data[lineId].data[rowId],
                [ref + "_a"]: e.target.value,
            };
        }
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
		stateCopy.step_meta_data[1].data[0].info_1_0_a = radioState.id === 'student'
		stateCopy.step_meta_data[1].data[1].info_1_1_a = radioState.id === 'professional'

        const res = await axios.post(`/notebook/step/${current_step}`, {
            ...stateCopy,
            current_step,
            step_completed,
        });
        setProfile(res.data.data);
    };

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
                        <span className={classes.highlight}> {title}</span>
                    </h2>
                    <h4>{subtitle}</h4>
                </div>
                {step_meta_data.map((line, lineId) => {
                    const { id, data } = line;
                    let jsx = null;
                    return data.map((row, rowId) => {
                        const ref = "info_" + id + "_" + rowId,
                            type = row[ref + "_type"];

                        if (type) {
                            type !== "select"
                                ? (jsx = (
                                      <CustomInput
                                          key={row[ref + "_id" + rowId]}
                                          ipid={row[ref + "_id"]}
                                          iptype={row[ref + "_type"]}
                                          htmlFor={row[ref + "_id"]}
                                          placeholderVal={
                                              row["placeholder" + rowId]
                                          }
                                          val={
                                              row[ref + "_type"] === "radio"
                                                  ? row[ref + "_val"] ===
                                                    radioState.id
                                                      ? radioState.id
                                                      : row[ref + "_val"]
                                                  : row[ref + "_a"]
                                                  ? row[ref + "_a"]
                                                  : ""
                                          }
                                          labelName={row[ref]}
                                          isChecked={
                                              row[ref + "_type"] === "radio"
                                                  ? radioState.id ===
                                                    row[ref + "_val"]
                                                  : undefined
                                          }
                                          changeHandler={e =>
                                              handleChange(
                                                  e,
                                                  ref,
                                                  lineId,
                                                  rowId,
                                                  row[ref + "_type"]
                                              )
                                          }
                                      />
                                  ))
                                : (jsx = null);
                        } else {
                            jsx = (
                                <CustomInput
                                    key={row[ref + "_id" + rowId]}
                                    ipid={row[ref + "_id"]}
                                    htmlFor={row[ref + "_id"]}
                                    placeholderVal={row["placeholder" + rowId]}
                                    labelName={row[ref]}
                                    isRquired={row.req}
                                    regEx={
                                        row[ref + "_id"] === "postal_code"
                                            ? isValidPinCode
                                            : containsTextOnly
                                    }
                                    changeHandler={e =>
                                        handleChange(e, ref, lineId, rowId)
                                    }
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
};
const mapStateToProps = state => ({
    stepData: state.profile,
});

export default connect(
    mapStateToProps,
    { setProfile }
)(ProfileSteps);
