import { ControlledEditor } from "@monaco-editor/react";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Switch
} from "antd";
import useBots from "hooks/useBots";
import useCreateSchedule from "hooks/useCreateSchedule";
import useSetScheduleBots from "hooks/useSetScheduleBots";
import useUpdateSchedule from "hooks/useUpdateSchedule";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const { Option } = Select;

const initCode = `module.exports = async () => {\n  // 请编写代码，参考：https://work.weixin.qq.com/help?person_id=1&doc_id=13376\n  // 最后返回企业微信群机器人的消息类型及数据格式\n  return null;\n}`;

function EditScheduleDrawer({ schedule, open, onClose, onSave }) {
  const [enable, setEnable] = useState(false);
  const [name, setName] = useState("");
  const [cron, setCron] = useState("");
  const [code, setCode] = useState(initCode);
  const [botIds, setBotIds] = useState([]);

  const { bots } = useBots();
  const [
    createSchedule,
    { loading: createScheduleLoading }
  ] = useCreateSchedule();
  const [
    updateSchedule,
    { loading: updateScheduleLoading }
  ] = useUpdateSchedule();
  const [
    setScheduleBots,
    { loading: setScheduleBotsLoading }
  ] = useSetScheduleBots();

  useEffect(() => {
    if (schedule) {
      setName(schedule.name);
      setCron(schedule.cron);
      setCode(schedule.code);
      setEnable(schedule.enable);
      setBotIds(schedule.bots.map(bot => bot.id));
    } else {
      setName("");
      setCron("");
      setCode(initCode);
      setEnable(false);
      setBotIds([]);
    }
  }, [schedule]);

  const handleSave = async () => {
    if (schedule) {
      await updateSchedule({
        variables: { id: schedule.id, input: { name, cron, code, enable } }
      });
      await setScheduleBots({
        variables: { id: schedule.id, botIds }
      });
      message.success("保存成功");
    } else {
      const {
        data: {
          createWebhook: { id }
        }
      } = await createSchedule({
        variables: { input: { name, cron, code, enable } }
      });
      await setScheduleBots({
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
      title={schedule ? "编辑" : "创建"}
      visible={open}
      width={800}
      onClose={onClose}
    >
      <Form hideRequiredMark layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="名称">
              <Switch checked={enable} onChange={setEnable} />
            </Form.Item>
          </Col>
        </Row>
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
            <Form.Item label="表达式">
              <Input
                placeholder="*/1 * * * *"
                value={cron}
                onChange={event => setCron(event.target.value)}
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
            createScheduleLoading ||
            updateScheduleLoading ||
            setScheduleBotsLoading
          }
          type="primary"
          onClick={handleSave}
        >
          {schedule ? "保存" : "创建"}
        </Button>
      </div>
    </Drawer>
  );
}

EditScheduleDrawer.propTypes = {
  open: PropTypes.bool,
  schedule: PropTypes.object,
  onClose: PropTypes.func,
  onSave: PropTypes.func
};

EditScheduleDrawer.defaultProps = {
  schedule: null,
  open: false,
  onClose: () => {},
  onSave: () => {}
};

export default EditScheduleDrawer;
