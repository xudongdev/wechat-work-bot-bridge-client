import { Button, Divider, message, Popconfirm, Table } from "antd";
import Ellipsis from "components/Ellipsis";
import Toolbar from "components/Toolbar";
import copy from "copy-to-clipboard";
import useBots from "hooks/useBots";
import useRemoveBot from "hooks/useRemoveBot";
import React, { useState } from "react";
import Helmet from "react-helmet";

import EditBotDrawer from "./components/EditBotDrawer";

function Bots() {
  const [open, setOpen] = useState(false);
  const [bot, setBot] = useState(null);

  const { bots, loading } = useBots();
  const [removeBot, { loading: removeBotLoading }] = useRemoveBot();

  return (
    <>
      <Helmet>
        <title>企业微信群机器人网关 - 微信群机器人</title>
      </Helmet>

      <Toolbar>
        <Button
          type="primary"
          onClick={() => {
            setBot(null);
            setOpen(true);
          }}
        >
          添加
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
            title: "Webhook 地址",
            dataIndex: "webhookUrl",
            key: "webhookUrl",
            render: webhookUrl => (
              <Ellipsis
                onClick={() => {
                  copy(webhookUrl);
                  message.info("已复制到剪切板");
                }}
              >
                {webhookUrl}
              </Ellipsis>
            )
          },
          {
            title: "操作",
            key: "action",
            width: 260,
            align: "right",
            render: (text, record) => (
              <span>
                <Button type="link">测试</Button>
                <Divider type="vertical" />
                <Button
                  type="link"
                  onClick={() => {
                    setBot(record);
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
                    await removeBot({ variables: { id: record.id } });
                    message.success(`删除 ${record.name} 成功`);
                  }}
                >
                  <Button type="link">删除</Button>
                </Popconfirm>
              </span>
            )
          }
        ]}
        dataSource={bots}
        loading={loading || removeBotLoading}
        rowKey="id"
        scroll={{ x: "100%", y: "100%" }}
      />

      <EditBotDrawer bot={bot} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default Bots;
