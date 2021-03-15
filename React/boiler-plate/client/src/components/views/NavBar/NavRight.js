import React from "react";
import { Menu } from "antd";

function NavRight() {
  return (
    <div>
      <Menu mode="horizontal" style={{ marginBottom: "10px" }}>
        <Menu.Item>
          <NavRight />
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default NavRight;
