import { Button, Divider, message, Popconfirm, Table, Tag } from "antd";
import Ellipsis from "components/Ellipsis";
import Toolbar from "components/Toolbar";
import useRemoveSchedule from "hooks/useRemoveSchedule";
import useSchedules from "hooks/useSchedules";
import React, { useState } from "react";
import Helmet from "react-helmet";

import EditScheduleDrawer from "./components/EditScheduleDrawer";

function Schedules() {
  const [open, setOpen] = useState(false);
  const [schedule, setSchedule] = useState(null);

  const { schedules, loading } = useSchedules();
  const [
    removeSchedule,
    { loading: removeScheduleLoading }
  ] = useRemoveSchedule();

  return (
    <>
      <Helmet>
        <title>企业微信群机器人网关 - 定时任务</title>
      </Helmet>

      <Toolbar>
        <Button
          type="primary"
          onClick={() => {
            setSchedule(null);
            setOpen(true);
          }}
        >
          创建
        </Button>
      </Toolbar>

      <Table
        columns={[
          {
            title: "名称",
            dataIndex: "name",
            key: "name",
            width: 200,
            render: name => <Ellipsis>{name}</Ellipsis>
          },
          {
            title: "表达式",
            dataIndex: "cron",
            key: "cron",
            width: 200
          },
          {
            title: "微信群机器人",
            dataIndex: "bots",
            key: "bots",
            render: bots => (
              <span>
                {bots.map(bot => (
                  <Tag key={bot.id}>{bot.name}</Tag>
                ))}
              </span>
            )
          },
          {
            title: "操作",
            key: "action",
            width: 320,
            align: "right",
            render: (text, record) => (
              <span>
                <Button
                  type="link"
                  onClick={() => {
                    setSchedule(record);
                    setOpen(true);
                  }}
                >
                  编辑
                </Button>
                <Divider type="vertical" />
                <Popconfirm
                  cancelText="取消"
                  okText="删除"
                  okType="danger"
                  title="你确定要删除吗？"
                  onConfirm={async () => {
                    await removeSchedule({ variables: { id: record.id } });
                    message.success(`删除 ${record.name} 成功`);
                  }}
                >
                  <Button type="link">删除</Button>
                </Popconfirm>
              </span>
            )
          }
        ]}
        dataSource={schedules}
        loading={loading || removeScheduleLoading}
        rowKey="id"
        scroll={{ x: "100%", y: "100%" }}
      />

      <EditScheduleDrawer
        open={open}
        schedule={schedule}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default Schedules;
