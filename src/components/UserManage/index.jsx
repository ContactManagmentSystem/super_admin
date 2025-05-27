import { useState, useEffect, useCallback } from "react";
import {
  Table,
  Button,
  Alert,
  Select as AntSelect,
  message,
  Badge,
} from "antd";
import ReactPaginate from "react-paginate";
import {
  useGetUser,
  useDeleteUser,
  useUnactiveUser,
} from "../../api/hooks/useUser";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { IconDots } from "@tabler/icons-react";
import Loading from "../ui/Loading";
import {
  MessengerLogo,
  WhatsappLogo,
  LineSegment,
  EnvelopeSimple,
  PhoneCall,
} from "phosphor-react";
import UserEditModal from "./components/userEditModal";
import UserCreateModal from "./components/userCreateModal";
import UpdatePasswordModal from "./components/userPasswordUpadteModal";

const pageSizeOptions = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 20, label: "20" },
];

const UserManage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, error, isError } = useGetUser(currentPage, pageSize);
  const deleteUser = useDeleteUser();
  const unactiveUser = useUnactiveUser();
console.log(data)
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [targetUser, setTargetUser] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const handleOpenPasswordModal = (user) => {
    setTargetUser(user);
    setPasswordModalVisible(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditModalVisible(true);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  const handleDelete = useCallback(
    (userId) => {
      deleteUser.mutate(userId, {
        onSuccess: () => message.success("User deleted successfully"),
        onError: (err) => message.error(`Error: ${err.message}`),
      });
    },
    [deleteUser]
  );

  const handleUnactive = useCallback(
    (userId) => {
      unactiveUser.mutate(userId, {
        onSuccess: () => message.success("User unactivated successfully"),
        onError: (err) => message.error(`Error: ${err.message}`),
      });
    },
    [unactiveUser]
  );

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (text, record, index) => index + 1 + (currentPage - 1) * pageSize,
    },
    { title: "Name", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Domain",
      dataIndex: "domainName",
      key: "domainName",
      render: (text) => (
        <a
          href={text}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {text}
        </a>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "serverStartDate",
      key: "serverStartDate",
    },
    {
      title: "Expiry Date",
      dataIndex: "serverExpiredDate",
      key: "serverExpiredDate",
      render: (text) => {
        if (!text) return "-";
        const [day, month, year] = text.split("-");
        const parsedDate = new Date(`${year}-${month}-${day}`);
        if (isNaN(parsedDate)) return "Invalid Date";
        const now = new Date();
        const daysLeft = (parsedDate - now) / (1000 * 60 * 60 * 24);
        const formatted = parsedDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        return (
          <span
            className={
              daysLeft <= 3 && daysLeft >= 0 ? "text-red-600 font-semibold" : ""
            }
          >
            {formatted}
          </span>
        );
      },
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => (
        <Badge status={status === "paid" ? "success" : "error"} text={status} />
      ),
    },
    {
      title: "Post Limit",
      dataIndex: "productPostLimit",
      key: "productPostLimit",
      render: (limit) => (
        <span className="font-medium text-blue-600">{limit}</span>
      ),
    },
    {
      title: "Post Count",
      dataIndex: "productPostCount",
      key: "productPostCount",
      render: (count) => (
        <span className="font-medium text-green-700">{count}</span>
      ),
    },
    {
      title: "Contacts",
      key: "contactInfo",
      render: (_, record) => {
        const { contactInfo = {}, email } = record;
        const { line, whatsapp, messenger, viber } = contactInfo;
        const iconSize = 22;
        const wrapperClass = "bg-indigo-600 rounded-full p-1 mx-1";

        return (
          <div className="flex items-center">
            {messenger && (
              <div className={wrapperClass}>
                <a
                  href={`https://m.me/${messenger}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessengerLogo size={iconSize} weight="fill" />
                </a>
              </div>
            )}
            {line && (
              <div className={wrapperClass}>
                <a
                  href={`https://line.me/R/ti/p/~${line}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LineSegment size={iconSize} weight="fill" />
                </a>
              </div>
            )}
            {whatsapp && (
              <div className={wrapperClass}>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsappLogo size={iconSize} weight="fill" />
                </a>
              </div>
            )}
            {viber && (
              <div className={wrapperClass}>
                <a
                  href={`viber://chat?number=${viber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PhoneCall size={iconSize} weight="fill" />
                </a>
              </div>
            )}
            {email && (
              <div className={wrapperClass}>
                <a href={`mailto:${email}`}>
                  <EnvelopeSimple size={iconSize} weight="fill" />
                </a>
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Tippy
          className="bg-white border shadow"
          content={
            <div>
              <div
                className="p-2 text-blue-700 hover:bg-blue-700 hover:text-white"
                onClick={() => handleEdit(record)}
              >
                Edit
              </div>
              <div
                className="p-2 text-indigo-700 hover:bg-indigo-700 hover:text-white"
                onClick={() => handleOpenPasswordModal(record)}
              >
                Update Password
              </div>
              <div
                className="p-2 text-orange-700 hover:bg-orange-700 hover:text-white"
                onClick={() => handleUnactive(record._id)}
              >
                Unactive
              </div>
              <div
                className="p-2 text-red-700 hover:bg-red-700 hover:text-white"
                onClick={() => handleDelete(record._id)}
              >
                Delete
              </div>
            </div>
          }
          placement="bottom"
          trigger="mouseenter"
          arrow={false}
          interactive
        >
          <Button icon={<IconDots />} />
        </Tippy>
      ),
    },
  ];

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <Alert
        message={`Error: ${error?.message || "Something went wrong"}`}
        type="error"
      />
    );

  const users = data?.data?.users || [];
  const totalPages = data?.data?.totalPages || 1;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <AntSelect
          value={pageSize}
          onChange={(value) => setPageSize(value)}
          options={pageSizeOptions}
          style={{ width: 120 }}
        />
        <Button type="primary" onClick={() => setCreateModalVisible(true)}>
          + Create User
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        loading={isLoading}
        pagination={false}
        bordered
        scroll={{ x: "max-content" }}
      />
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={({ selected }) => setCurrentPage(selected + 1)}
        containerClassName="pagination"
        activeClassName="active"
        disabledClassName="disabled"
        forcePage={currentPage - 1}
      />
      <UserEditModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        initialValues={editingUser}
      />
      <UserCreateModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
      />
      <UpdatePasswordModal
        visible={passwordModalVisible}
        user={targetUser}
        onClose={() => setPasswordModalVisible(false)}
      />
    </div>
  );
};

export default UserManage;
