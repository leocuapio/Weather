import * as React from 'react';
import AppAppBar from '../components/appbar';
import Hero from '../weathercomponents/hero';
import Hero1 from '../components/hero1';
import { useWeather } from '../weathercontext';
import Footer from '../components/footer';


export default function MarketingPage() {
  return (
    <div>
      <AppAppBar />
      <br></br>
      <Hero />
    </div>
  );
}