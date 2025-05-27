/* eslint-disable react/prop-types */
import {
  Modal,
  Form,
  Input,
  Select as AntSelect,
  Row,
  Col,
  message,
  Divider,
} from "antd";
import { useEffect } from "react";
import { useEditUser } from "../../../api/hooks/useUser";

const UserEditModal = ({ visible, onClose, initialValues = {} }) => {
  const [form] = Form.useForm();
  const editUser = useEditUser();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        ...initialValues,
        ...initialValues?.contactInfo,
      });
    }
  }, [visible, initialValues, form]);

const handleSubmit = (values) => {
  const contactInfo = {
    line: values.line,
    whatsapp: values.whatsapp,
    messenger: values.messenger,
    viber: values.viber,
  };

  const payload = {
    ...values,
    contactInfo,
    productPostLimit: Number(values.productPostLimit), // Ensure it's a number
  };

  delete payload.line;
  delete payload.whatsapp;
  delete payload.messenger;
  delete payload.viber;

  editUser.mutate(
    { id: initialValues._id, data: payload },
    {
      onSuccess: () => {
        message.success("User updated successfully");
        onClose();
      },
      onError: (err) => {
        message.error(err?.response?.data?.message || "Update failed");
      },
    }
  );
};

  return (
    <Modal
      open={visible}
      title={`🛠 Edit User: ${initialValues?.username || ""}`}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Save"
      width={800}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Basic Info */}
        <Divider orientation="left">Basic Information</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="username" label="Username">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="role" label="Role">
              <AntSelect
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "Superadmin", value: "superadmin" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="paymentStatus" label="Payment Status">
              <AntSelect
                options={[
                  { label: "Paid", value: "paid" },
                  { label: "Unpaid", value: "unpaid" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Product Limit */}
        <Divider orientation="left">Product Post Limit</Divider>
        <Form.Item
          name="productPostLimit"
          label="Max Products Admin Can Post"
          rules={[{ required: true, message: "Please set a product limit" }]}
        >
          <Input
            type="number"
            placeholder="e.g., 50"
            style={{
              borderRadius: 8,
              padding: "8px 12px",
              fontWeight: 500,
              backgroundColor: "#f9fafb",
              border: "1px solid #d9d9d9",
            }}
          />
        </Form.Item>

        {/* Server Access */}
        <Divider orientation="left">Server & Access Info</Divider>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="domainName" label="Domain Name">
              <Input placeholder="https://example.com" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="serverStartDate" label="Start Date">
              <Input placeholder="e.g., 2025-01-01" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="serverExpiredDate" label="Expired Date">
              <Input placeholder="e.g., 2025-12-31" />
            </Form.Item>
          </Col>
        </Row>

        {/* Contact Channels */}
        <Divider orientation="left">Contact Information</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="line" label="Line ID">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="whatsapp" label="WhatsApp Number">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="messenger" label="Messenger Username">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="viber" label="Viber Number">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UserEditModal;
