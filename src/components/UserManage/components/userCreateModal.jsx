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
import { useCreateUser } from "../../../api/hooks/useUser";

const UserCreateModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const createUser = useCreateUser();

  const handleSubmit = (values) => {
    const contactInfo = {
      line: values.line,
      whatsapp: values.whatsapp,
      messenger: values.messenger,
      viber: values.viber,
    };

    const payload = {
      ...values,
      productPostLimit: Number(values.productPostLimit), // ensure number
      contactInfo,
    };

    delete payload.line;
    delete payload.whatsapp;
    delete payload.messenger;
    delete payload.viber;

    createUser.mutate(payload, {
      onSuccess: () => {
        message.success("User created successfully");
        form.resetFields();
        onClose();
      },
      onError: (err) => {
        message.error(err?.response?.data?.message || "Create failed");
      },
    });
  };

  return (
    <Modal
      open={visible}
      title="🧑‍💻 Create New Admin User"
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Create"
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          role: "admin",
          paymentStatus: "unpaid",
          productPostLimit: 50,
        }}
      >
        {/* Basic Info */}
        <Divider orientation="left">Basic Information</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g., admin123" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input placeholder="e.g., name@example.com" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="role" label="Role" rules={[{ required: true }]}>
              <AntSelect
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "Superadmin", value: "superadmin" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Product Posting */}
        <Divider orientation="left">Product Post Limit</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="productPostLimit"
              label="Max Products Admin Can Post"
              rules={[
                { required: true, message: "Please set a product limit" },
              ]}
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
          </Col>
        </Row>

        {/* Server Access */}
        <Divider orientation="left">Server & Access</Divider>
        <Row gutter={16}>
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
          <Col span={12}>
            <Form.Item name="domainName" label="Domain Name">
              <Input placeholder="https://yourshop.com" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="serverStartDate" label="Start Date">
              <Input placeholder="e.g., 01-01-2025" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="serverExpiredDate" label="Expired Date">
              <Input placeholder="e.g., 01-01-2026" />
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

export default UserCreateModal;
