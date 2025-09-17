import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Snowfall from "react-snowfall";
import Snowglobe from "./snowglobe/Globe";
import { Routes, Route } from "react-router-dom";
import "./App.css";
const MagicReveal = lazy(() => import("./magic/MagicReveal"));
const Letter = lazy(() => import("./letter/ClosedLetter"));
const SelfieUpload = lazy(() => import("./selfie-upload/SelfieUpload"));
const ChocRecommendation = lazy(() => import("./recommendation/ChocRecommendation"));
const GiftFinder = lazy(() => import("./gift-quiz/GiftFinder"));

export default function App() {
const [snowAmount] = useState(100);

return (
  <Routes>
    <Route
      path="/"
      element={
        <div className="flex flex-col items-center justify-center min-h-screen pt-10">
          <div>
            <Snowfall snowflakeCount={snowAmount} useTwinkleEffect={true} />
            <div className="logo-elements">
              <motion.img
                src="/logo.png"
                alt="Cadbury Logo"
                className="logo"
                whileTap={{ scale: 0.8 }}
              />
              <h1>Festive Flavour Globe</h1>
            </div>
            <img
              src="/bg1.png"
              className="snow-village"
              alt="Snow background"
              loading="lazy"
            />
          </div>
          <div className="stand-items">
            <Snowglobe />
            <Suspense fallback={<div style={{height: 100}} />}> 
              <Letter />
            </Suspense>
          </div>
        </div>
      }
    />
    <Route path="/magic-reveal" element={
      <Suspense fallback={<div className="page-fallback" />}> 
        <MagicReveal />
      </Suspense>
    } />
    <Route path="/selfie-upload" element={
      <Suspense fallback={<div className="page-fallback" />}> 
        <SelfieUpload />
      </Suspense>
    } />
    <Route path="/gift-quiz" element={
      <Suspense fallback={<div className="page-fallback" />}> 
        <GiftFinder />
      </Suspense>
    } />
    <Route path="/choc-recommendation" element={
      <Suspense fallback={<div className="page-fallback" />}> 
        <ChocRecommendation />
      </Suspense>
    } />
  </Routes>
);
}