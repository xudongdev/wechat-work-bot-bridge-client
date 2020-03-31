import { Button, Col, Drawer, Form, Input, message, Row } from "antd";
import useCreateBot from "hooks/useCreateBot";
import useUpdateBot from "hooks/useUpdateBot";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

function EditBotDrawer({ bot, open, onClose, onSave }) {
  const [name, setName] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");

  const [createBot, { loading: createBotLoading }] = useCreateBot();
  const [updateBot, { loading: updateBotLoading }] = useUpdateBot();

  useEffect(() => {
    if (bot) {
      setName(bot.name);
      setWebhookUrl(bot.webhookUrl);
    } else {
      setName("");
      setWebhookUrl("");
    }
  }, [bot]);

  const handleSave = async () => {
    if (bot) {
      await updateBot({
        variables: { id: bot.id, input: { name, webhookUrl } }
      });
      message.success("保存成功");
    } else {
      await createBot({ variables: { input: { name, webhookUrl } } });
      message.success("添加成功");
    }

    onSave();
    onClose();
  };

  return (
    <Drawer
      bodyStyle={{ paddingBottom: 80 }}
      title={bot ? "编辑" : "添加"}
      visible={open}
      width={800}
      onClose={onClose}
    >
      <Form hideRequiredMark layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="名称">
              <Input
                placeholder="请输入名称"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Webhook 地址">
              <Input
                placeholder="请输入 Webhook 地址"
                value={webhookUrl}
                onChange={event => setWebhookUrl(event.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "100%",
          borderTop: "1px solid #e9e9e9",
          padding: "10px 16px",
          background: "#fff",
          textAlign: "right"
        }}
      >
        <Button style={{ marginRight: 8 }} onClick={onClose}>
          取消
        </Button>
        <Button
          loading={createBotLoading || updateBotLoading}
          type="primary"
          onClick={handleSave}
        >
          {bot ? "保存" : "创建"}
        </Button>
      </div>
    </Drawer>
  );
}

EditBotDrawer.propTypes = {
  bot: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func
};

EditBotDrawer.defaultProps = {
  bot: null,
  open: false,
  onClose: () => {},
  onSave: () => {}
};

export default EditBotDrawer;
