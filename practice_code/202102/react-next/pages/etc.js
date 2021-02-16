import React, { useState } from "react";
import AppLayout from "../components/AppLayout";
import { Button, Modal } from "antd";

const Etc = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <AppLayout>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>모달창이 이렇게 간단하다니</p>
        </Modal>
      </AppLayout>
    </>
  );
};

export default Etc;
