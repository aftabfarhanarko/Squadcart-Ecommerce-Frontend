import { Radio } from "antd";

interface RadioBtnProps {
  checked?: boolean;
}

const RadioBtn: React.FC<RadioBtnProps> = ({ checked = false }) => {
  return (
    <div>
      <Radio checked={checked}></Radio>
    </div>
  );
};

export default RadioBtn;
