'use client';
import * as React from 'react';
import AppAppBar from './components/appbar';
import Hero from './weathercomponents/hero';
import Hero1 from './components/hero1';
import { useRouter } from "next/navigation";

export default function MarketingPage() {
  const router = useRouter();
  const navigatetoweather = () => {
    router.push("/weather");
  };
  return (
    <div>
      <AppAppBar />
      <Hero1 /> 
      <br></br>

    </div>
  );
}