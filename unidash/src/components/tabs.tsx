import { motion } from "motion/react";
import React from "react";

type TabItem<T extends string> = {
  label: T;
  defaultChecked?: boolean;
};

type Props<T extends string> = {
  tabItems: TabItem<T>[];
  setActiveTab: (tab: T) => void;
  tabContent: Record<T, React.ReactNode>;
  isFetching: boolean;
};

function Tabs<T extends string>({
  tabItems,
  setActiveTab,
  tabContent,
  isFetching,
}: Props<T>) {
  return (
    <div className="tabs tabs-lift">
      {tabItems.map((tab) => (
        <React.Fragment key={tab.label}>
          <input
            type="radio"
            name="department_details_tabs"
            className="tab glass-morphism"
            aria-label={tab.label}
            defaultChecked={tab.defaultChecked}
            onChange={() => setActiveTab(tab.label)}
          />

          <div className="tab-content  p-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isFetching ? 0.5 : 1,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {tabContent[tab.label]}
            </motion.div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Tabs;
