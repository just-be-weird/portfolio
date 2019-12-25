import React, {useState} from 'react'
import classes from '../../Sass/main.module.scss';
import Experience from './Experience';
import InfinityStones from './InfinityStones';
import Projects from './Projects';
import Contact from './Contact';

export default function About() {
  const [atBottom, setAtBottom] = useState(false);
  const [elmVisible, setElmVisible] = useState(0);
  const mapCountWithElm = {
    0: {
      id: 'description'
    },
    1: {
      id: 'experience'
    },
    2: {
      id: 'stones'
    },
    3: {id: 'projects'},
    4: {id: classes.contact}
  };

  const handleOnClick = () => {
    // elm.scrollTop = elm.scrollHeight;//elm.getBoundingClientRect().top
    if (elmVisible === -1) {
      setAtBottom(false);
      setElmVisible(0);
      return;
    }
    if (elmVisible < 5) {
      // window.scroll(0, Math.round(elm.scrollHeight));
      let elm = document.getElementById(mapCountWithElm[elmVisible].id);
      elm.scrollIntoView();
    }
    // Go down logic
    if (!atBottom && elmVisible < 5) {
    // Checking if the element is at the bottom
    if (elmVisible === 4) {
        setElmVisible(3);
        setAtBottom(true);
      } else {
      // If not at bottom then keep moving focus to down
        setElmVisible(elmVisible + 1);
        setAtBottom(false);
      }
    } else {
      // Go Up logic
      setElmVisible(elmVisible - 1);
    }

  };

  return (
    <div className="content_tracker">
      <div className={classes.down__arrow} onClick={handleOnClick}>
        <svg className={classes.down__arrow_icon}>
          <use xlinkHref={`/assets/img/sprite.svg#down-arrow`}></use>
        </svg>
      </div>
      <section className={classes['section-about'] + ' ' + classes['container']}>
        <div className={classes['section-wrapper']} id={classes.about}>
          <div className={classes.section_about_intro}>
            <h2 className={classes['section-title']}>About Creator</h2>
            <div className={classes['hero-text-box'] + ' ' + classes['heading-primary']}>
              <h2 className={classes['heading-primary'] + ' ' + classes['heading-primary--sub']}>
                Hi my name is,
              </h2>
              <div className={classes['hero-text-box-container']}>
                <h1 className={classes['heading-primary'] + ' ' + classes['heading-primary--main']}>
                  {' '}
                  <span className={classes.highlight}>Abhishek P.</span>{' '}
                </h1>
                <p className={classes['heading-secondary']}>
                  A passionate software engineer based in Mumbai, India<br/>
                  – I create high-quality websites and digital applications <br/> with knowledge and
                  passion.
                </p>
              </div>
            </div>
          </div>
          <p className={classes['long-copy'] + ' ' + classes.section_about} id='description'>
            I`m a <span className={classes.highlight}>fullstack developer</span> at Adapty Inc.
            <br/> With my knowledge in both frontend & backend, I bring up{' '}
            <span className={classes.highlight}>
							fast, reliable, engaging & responsive websites powered{' '}
						</span>
            with efficient and modern back-ends.
            <br/>
            <br/>
            I`m a big fan of <span className={classes.highlight}>AGILE</span> Workflow, I use it`s
            collaborative, flexible and adaptive principles for identifying scope for the product & evolve
            it by adding new business ideas, innovations and values that meet user needs as well as business
            objectives. I strongly focus on{' '}
            <span className={classes.highlight}>performance & responsive design </span>
            using the <span className={classes.highlight}>latest STACK</span> that meets the requirements of
            modern time.
          </p>
        </div>
      </section>
      <Experience/>
      <InfinityStones/>
      <Projects/>
      <Contact/>
    </div>)
}

/* #Todo
- If at botoom then reverse the go down arraw to up
*/