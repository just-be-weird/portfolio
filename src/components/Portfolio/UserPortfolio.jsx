import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "../../axios.instance";
import { loadingUI, setUIErrors } from "../actions/ui";
import { getProfile, setProfile, gerReqUserProfile } from "../actions/profile";
import Portfolio from "./Portfolio";
import Modal from "../UI/Modal/Modal";
import CustomInput from "../UI/InputButtons/CustomInput";
import { matchAnyChar } from "../Shared/Util";
import classes from "../Sass/main.module.scss";

const UserPortfolio = ({
  getProfile,
  setProfile,
  gerReqUserProfile,
  profile = {},
  loadingUI,
  setUIErrors,
  match
}) => {
  const [hideModal, setHideModal] = useState(false);
  const [editMdl, setEditMdl] = useState({});
  const {
    params: { userHandle }
  } = match;

  useEffect(() => {
    if (userHandle) {
      gerReqUserProfile(userHandle);
    } else {
      getProfile();
    }
  }, [userHandle, gerReqUserProfile, getProfile]);

  const { btn } = classes;

  const editHandler = async e => {
    e.stopPropagation();
    setHideModal(!hideModal);
    setEditMdl({
      label: e.currentTarget.attributes["data-action"].value
    });
  };

  const submitHandler = async e => {
    e.preventDefault();
    if (!editMdl.val) {
      setUIErrors({
        error: `User ${editMdl.label} is required.`.toUpperCase()
      });
    } else {
      if (editMdl.editing) {
        loadingUI(true);
        const res = await axios.post(`/notebook/profile`, {
          [editMdl.label]: editMdl.val
        });

        setProfile({
          ...profile,
          [editMdl.label]: res.data.data[editMdl.label]
        });
        setHideModal(false);
        loadingUI();
      } else {
        setProfile({ ...profile });
      }
    }
  };

  const changeHandler = e => {
    setEditMdl({
      ...editMdl,
      val: e.target.value,
      editing: true
    });
  };

  return (
    <Fragment>
      <Modal
        modalState={hideModal}
        hideModal={() => setHideModal(false)}
        id={"user-details_modal"}
      >
        <CustomInput
          iptype="text"
          ipid="user-details"
          htmlFor="user-details"
          placeholderVal={`Enter Value For User ${editMdl.label}`}
          regEx={matchAnyChar(4, 100)}
          labelName={`User ${editMdl.label}`.toUpperCase()}
          isRequired={true}
          val={!editMdl.editing ? profile[editMdl.label] : editMdl.val}
          changeHandler={changeHandler}
        />
        <div className={classes["btn-wrapper"]}>
          <div
            className={btn + " " + classes["btn__arrow"]}
            onClick={submitHandler}
          >
            <svg className={classes["svg-arrow"]}>
              <use xlinkHref={"/assets/img/sprite.svg#arrow"} />
            </svg>
          </div>
        </div>
      </Modal>
      <Portfolio
        profile={profile}
        userHandle={userHandle}
        setProfile={setProfile}
        loadingUI={loadingUI}
        editHandler={editHandler}
        setUIErrors={setUIErrors}
      />
    </Fragment>
  );
};

UserPortfolio.propTypes = {
  loadingUI: PropTypes.func.isRequired,
  setUIErrors: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  setProfile: PropTypes.func.isRequired,
  gerReqUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {
  loadingUI,
  setUIErrors,
  setProfile,
  gerReqUserProfile,
  getProfile
})(UserPortfolio);
