import React from 'react';
import './SectionDemo.scss';

const SectionDemo = () => (
  <section className="get-started">
    <p className="get-started--heading-1">
      Take <span className="span-control"> control </span> of your{' '}
      <span className="span-money"> money </span> -
    </p>
    <p className="get-started--heading-1">
      make <span className="span-luck">luck</span> a{' '}
      <span className="span-statistic">pattern</span>
    </p>
    <button className="get-started--button">Get started &darr;</button>
  </section>
);

export default SectionDemo;
