import React from 'react';
import './MainContent.scss';
import SectionDemo from '../section-demo/SectionDemo';

const MainContent = ({ state }) => {
  return (
    <section className="main-ctn">
      <SectionDemo />
      <div className="heading-box">
        <ul className="main-ctn--list">
          <li className="main-ctn--list--item-1">
            Use graphs and metrics to track your most profitable bets
          </li>
          <li className="main-ctn--list--item-2">
            Have all the statistics in one place
          </li>
          <li className="main-ctn--list--item-3">
            Track your bankroll and net profits
          </li>
        </ul>
      </div>
      <button onClick={() => console.log(state)}>GET STATE</button>
    </section>
  );
};

export default MainContent;
