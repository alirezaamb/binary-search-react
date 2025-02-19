import { Button, Input, Form, Typography, List } from 'antd';
import 'antd/dist/reset.css';
import { useState } from 'react';

const { Title, Text } = Typography;

interface Step {
  low?: number;
  mid?: number;
  high?: number;
  midValue?: number;
  message: string;
}

function App() {
  const [inputList, setInputList] = useState<string[]>([]);
  const [target, setTarget] = useState<string>('');
  const [steps, setSteps] = useState<Step[]>([]);
  console.log(inputList, 'inputList');

  const parseInputList = (input: string): number[] => {
    return input
      .split(',')
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num))
      .sort((a, b) => a - b);
  };

  const handleSearch = (values: { inputList: string; target: string }) => {
    const arr = parseInputList(values.inputList);
    const x = parseInt(values.target);

    if (isNaN(x)) {
      alert('لطفاً مقدار جستجو را به صورت عدد وارد کنید.');
      return;
    }

    let low = 0;
    let high = arr.length - 1;
    const localSteps: Step[] = [];
    let found = false;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      localSteps.push({
        low,
        mid,
        high,
        midValue: arr[mid],
        message: `low: ${low}, mid: ${mid}, high: ${high} → مقدار وسط: ${arr[mid]}`,
      });

      if (arr[mid] === x) {
        localSteps.push({
          low,
          mid,
          high,
          midValue: arr[mid],
          message: `عدد ${x} در ایندکس ${mid} پیدا شد.`,
        });
        found = true;
        break;
      } else if (arr[mid] < x) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    if (!found) {
      localSteps.push({
        message: `عدد ${x} در لیست پیدا نشد.`,
      });
    }

    setSteps(localSteps);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Form
        onFinish={handleSearch}
        layout="vertical"
        style={{ padding: '20px', maxWidth: '600px', width: '100%' }}
        dir="rtl"
      >
        <Title level={1}>نمایش الگوریتم جستجوی دودویی</Title>
        <Form.Item
          label="لیست اعداد (با کاما جدا شوند):"
          name="inputList"
          initialValue={inputList.join(', ')}
        >
          <Input
            placeholder="مثلاً: 1, 3, 5, 7, 9"
            onBlur={(e) =>
              setInputList(e.target.value.split(',').map((num) => num.trim()))
            }
          />
        </Form.Item>
        <Form.Item label="عدد جستجو (x):" name="target" initialValue={target}>
          <Input
            placeholder="مثلاً: 5"
            onBlur={(e) => setTarget(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            جستجو
          </Button>
        </Form.Item>
        <div style={{ marginTop: '20px' }}>
          <Title level={2}>مراحل اجرا:</Title>
          <List
            bordered
            dataSource={steps}
            renderItem={(step) => (
              <List.Item>
                <Text>{step.message}</Text>
              </List.Item>
            )}
          />
        </div>
      </Form>
    </div>
  );
}

export default App;
