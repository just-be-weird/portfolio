import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "../../axios.instance";
import { getProfile } from "../../components/actions/profile";
import { connect } from "react-redux";
import classes from "../Sass/main.module.scss";

const Portfolios = ({ handle: activeHandle, getProfile }) => {
  let [portfolios, setPortfolioData] = useState([]);
  useEffect(() => {
    getProfile();
    axios.get(`/notebook/all`).then(res => {
      setPortfolioData(res.data);
    });
  }, [setPortfolioData, getProfile]);

  const jsx =
    portfolios.length > 0 &&
    portfolios.map(portfolio => {
      const { notebookId, userImage, handle, followerCount } = portfolio;
      const {
        portfolio__content,
        portfolio__row,
        portfolio__user_img,
        portfolio__title
      } = classes;
      //filter out the logged in user from all portfolios
      return !activeHandle
        ? null
        : activeHandle !== handle && (
            <div key={notebookId} className={portfolio__row}>
              <div className={portfolio__user_img}>
                <a href={`/portfolio/${handle}`}>
                  <img src={userImage} alt="User" />
                </a>
              </div>
              <div className={portfolio__content}>
                <h4 className={portfolio__title}>
                  <a href={`/portfolio/${handle}`}>{handle}</a>
                </h4>
                <p>Followers: {followerCount}</p>
              </div>
            </div>
          );
    });

  return (
    <section className={classes.wrap_container}>
      <div>
        <h2 className={classes["section-title"]}>Portfolios</h2>
      </div>
      <div className={classes.row}>{jsx}</div>
    </section>
  );
};

Portfolios.propTypes = {
  handle: PropTypes.string,
  getProfile: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  handle: state.profile.handle
});

export default connect(mapStateToProps, { getProfile })(Portfolios);
