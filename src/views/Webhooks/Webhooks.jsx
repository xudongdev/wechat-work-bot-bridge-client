import { Button, Divider, message, Popconfirm, Table, Tag } from "antd";
import Ellipsis from "components/Ellipsis";
import Toolbar from "components/Toolbar";
import copy from "copy-to-clipboard";
import useRemoveWebhook from "hooks/useRemoveWebhook";
import useWebhooks from "hooks/useWebhooks";
import React, { useState } from "react";
import Helmet from "react-helmet";

import EditWebhookDrawer from "./components/EditWebhookDrawer";

function Webhooks() {
  const [open, setOpen] = useState(false);
  const [webhook, setWebhook] = useState(null);

  const { webhooks, loading } = useWebhooks();
  const [removeWebhook, { loading: removeWebhookLoading }] = useRemoveWebhook();

  return (
    <>
      <Helmet>
        <title>企业微信群机器人网关 - Webhook</title>
      </Helmet>

      <Toolbar>
        <Button
          type="primary"
          onClick={() => {
            setWebhook(null);
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
                    copy(
                      `${window.location.origin}/webhooks/${record.id}/send`
                    );
                    message.info("已复制 Webhook 地址到剪切板");
                  }}
                >
                  复制 Webhook
                </Button>
                <Divider type="vertical" />
                <Button
                  type="link"
                  onClick={() => {
                    setWebhook(record);
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
                    await removeWebhook({ variables: { id: record.id } });
                    message.success(`删除 ${record.name} 成功`);
                  }}
                >
                  <Button type="link">删除</Button>
                </Popconfirm>
              </span>
            )
          }
        ]}
        dataSource={webhooks}
        loading={loading || removeWebhookLoading}
        rowKey="id"
        scroll={{ x: "100%", y: "100%" }}
      />

      <EditWebhookDrawer
        open={open}
        webhook={webhook}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default Webhooks;
