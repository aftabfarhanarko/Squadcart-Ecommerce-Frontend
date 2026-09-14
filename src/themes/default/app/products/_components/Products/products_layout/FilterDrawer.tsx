"use client";
import { Button, Drawer } from "antd";
import React, { useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import SideBar from "./SideBar";

const FilterDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <BsFilterLeft size={23} />
        Filters
      </Button>
      <Drawer
        title="Advanced Filters"
        placement="left"
        onClose={onClose}
        open={open}
      >
        <SideBar />
      </Drawer>
    </>
  );
};

export default FilterDrawer;
