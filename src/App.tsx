import { Button, Input } from 'antd';
import 'antd/dist/reset.css';
import { useState } from 'react';

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

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const arr = parseInputList(inputList.join(', '));
    const x = parseInt(target);
    // console.log(arr, 'arr');
    // console.log(x, 'x');

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
    <form onSubmit={(e) => handleSearch(e)}>
      <div style={{ padding: '20px' }} dir="rtl">
        <h1>نمایش الگوریتم جستجوی دودویی</h1>
        <div style={{ marginBottom: '10px' }}>
          <label>لیست اعداد (با کاما جدا شوند): </label>
          <Input
            type="text"
            defaultValue={inputList.join(', ')}
            onBlur={(e) =>
              setInputList(e.target.value.split(',').map((num) => num.trim()))
            }
            placeholder="مثلاً: 1, 3, 5, 7, 9"
            style={{ width: '300px', marginLeft: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>عدد جستجو (x): </label>
          <Input
            type="text"
            defaultValue={target}
            onBlur={(e) => setTarget(e.target.value)}
            placeholder="مثلاً: 5"
            style={{ width: '100px', marginLeft: '10px' }}
          />
        </div>
        <Button htmlType="submit">جستجو</Button>
        <div style={{ marginTop: '20px' }}>
          <h2>مراحل اجرا:</h2>
          <ul>
            {steps.map((step, index) => (
              <li key={index}>{step.message}</li>
            ))}
          </ul>
        </div>
      </div>
    </form>
  );
}

export default App;
