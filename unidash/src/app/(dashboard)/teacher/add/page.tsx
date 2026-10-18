"use client";
import PageHeading from "@/components/pageHeading";
import StepDepartment from "./_common/stepDepartment";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import StepClass from "./_common/stepClass";
import StepSubject from "./_common/stepSubject";
const tabs = ["Department", "Subject", "Class"];
function MultiForm() {
  const [activeTab, setActiveTab] = useState("Department");

  const tabContent = {
    Department: <StepDepartment />,
    Subject: <StepSubject />,
    Class: <StepClass />,
  };

  return (
    <>
      <section className="min-h-screen flex flex-col">
        <PageHeading
          title="Add A Department, Class and Subject"
          className="capitalize"
        />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <div className="card m-5 w-full shadow-2xl">
            <div className="tabs tabs-border">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={`tab ${activeTab === tab ? "tab-active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="glass-morphism p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  {tabContent[activeTab as keyof typeof tabContent]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default MultiForm;
