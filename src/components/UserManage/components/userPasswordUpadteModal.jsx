/* eslint-disable react/prop-types */
import { Modal, Form, Input, message } from "antd";
import { useUpdateUserPassword } from "../../../api/hooks/useUser";

const UpdatePasswordModal = ({ visible, user, onClose }) => {
  const [form] = Form.useForm();
  const updatePassword = useUpdateUserPassword();

  const handleSubmit = ({ password }) => {
    if (!user?._id) return;

    updatePassword.mutate(
      { id: user._id, password },
      {
        onSuccess: () => {
          message.success("Password updated successfully");
          form.resetFields();
          onClose();
        },
        onError: (err) => {
          message.error(
            err?.response?.data?.message || "Failed to update password"
          );
        },
      }
    );
  };

  return (
    <Modal
      open={visible}
      title={`Update Password for ${user?.username || ""}`}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={() => form.submit()}
      okText="Update"
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="password"
          label="New Password"
          rules={[
            { required: true, message: "Password is required" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm the password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm new password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdatePasswordModal;
