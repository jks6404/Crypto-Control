import React from "react";

import "./styles.css";
import Button from "../../Common/Button";
import iphone from "../../../assets/iphone.080029ada53f0cd57453.png";
import gradient from "../../../assets/gradient.12a666ed10b3b442b534.png";
import { RWebShare } from "react-web-share";

import { motion } from "framer-motion";


function MainComponent() {

    return (
        <div className="flex-info">
            <div className="left-component">
                <motion.h1 className="track-crypto-heading"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Track Crypto
                </motion.h1>

                <motion.h1 className="real-time-heading"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    Real Time.
                </motion.h1>

                <motion.p className="info-text"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.75 }}
                >
                    Track crypto through a public api in real time. Visit the dashboard to do so!
                </motion.p>

                <motion.div className="btn-flex"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                >

                  <a href="/dashboard">
            <Button text="Dashboard" />
          </a>
          <RWebShare
            data={{
              text: "Crypto Dashboard made using React JS.",
              url: "https://crypto-dashboard-dec.netlify.app/",
              title: "CryptoDashboard.",
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button text="Share App" outlined={true} />
          </RWebShare>

                </motion.div>
            </div>

            <div className="phone-container">
                <motion.img src={iphone} className="iphone"
                    initial={{ y: -10 }}
                    animate={{ y: 10 }}
                    transition={{
                        type: "smooth",
                        repeatType: "mirror",
                        duration: 2,
                        repeat: Infinity,
                    }}

                ></motion.img>
                <img src={gradient} className="gradient"></img>
            </div>

        </div>
    )

}

export default MainComponent;