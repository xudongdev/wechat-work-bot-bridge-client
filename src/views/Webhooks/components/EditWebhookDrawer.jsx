import { ControlledEditor } from "@monaco-editor/react";
import { Button, Col, Drawer, Form, Input, message, Row, Select } from "antd";
import useBots from "hooks/useBots";
import useCreateWebhook from "hooks/useCreateWebhook";
import useSetWebhookBots from "hooks/useSetWebhookBots";
import useUpdateWebhook from "hooks/useUpdateWebhook";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const { Option } = Select;

const initCode = `module.exports = async ({ headers, query, body }) => {\n  // 请编写代码，参考：https://work.weixin.qq.com/help?person_id=1&doc_id=13376\n  // 最后返回企业微信群机器人的消息类型及数据格式\n  return null;\n}`;

function EditWebhookDrawer({ webhook, open, onClose, onSave }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState(initCode);
  const [botIds, setBotIds] = useState([]);

  const { bots } = useBots();
  const [createWebhook, { loading: createWebhookLoading }] = useCreateWebhook();
  const [updateWebhook, { loading: updateWebhookLoading }] = useUpdateWebhook();
  const [
    setWebhookBots,
    { loading: setWebhookBotsLoading }
  ] = useSetWebhookBots();

  useEffect(() => {
    if (webhook) {
      setName(webhook.name);
      setCode(webhook.code);
      setBotIds(webhook.bots.map(bot => bot.id));
    } else {
      setName("");
      setCode(initCode);
      setBotIds([]);
    }
  }, [webhook]);

  const handleSave = async () => {
    if (webhook) {
      await updateWebhook({
        variables: { id: webhook.id, input: { name, code } }
      });
      await setWebhookBots({
        variables: { id: webhook.id, botIds }
      });
      message.success("保存成功");
    } else {
      const {
        data: {
          createWebhook: { id }
        }
      } = await createWebhook({ variables: { input: { name, code } } });
      await setWebhookBots({
        variables: { id, botIds }
      });
      message.success("创建成功");
    }

    onSave();
    onClose();
  };

  return (
    <Drawer
      bodyStyle={{ paddingBottom: 80 }}
      title={webhook ? "编辑" : "创建"}
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
            <Form.Item label="代码">
              <ControlledEditor
                height="500px"
                language="javascript"
                theme="dark"
                value={code}
                onChange={(event, value) => setCode(value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="微信群机器人">
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                value={botIds}
                onChange={setBotIds}
              >
                {(bots || []).map(bot => (
                  <Option key={bot.id}>{bot.name}</Option>
                ))}
              </Select>
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
          loading={
            createWebhookLoading ||
            updateWebhookLoading ||
            setWebhookBotsLoading
          }
          type="primary"
          onClick={handleSave}
        >
          {webhook ? "保存" : "创建"}
        </Button>
      </div>
    </Drawer>
  );
}

EditWebhookDrawer.propTypes = {
  open: PropTypes.bool,
  webhook: PropTypes.object,
  onClose: PropTypes.func,
  onSave: PropTypes.func
};

EditWebhookDrawer.defaultProps = {
  webhook: null,
  open: false,
  onClose: () => {},
  onSave: () => {}
};

export default EditWebhookDrawer;
