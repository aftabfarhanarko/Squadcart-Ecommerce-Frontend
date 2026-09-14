import styled from "styled-components";

const Input = styled.input`
  border: 1.5px solid #d1d5db;
  outline: none;
  border-radius: 5px;
  padding: 8px 6px;
  flex: 1;
  width: 100%;
  &:focus {
    border: 1.5px solid #6d198a;
  }
`;
interface PaymentMethodInfoProps {
  method: string;
  number: string;
  send_money_cost: string;
}

const PaymentMethodInfo: React.FC<PaymentMethodInfoProps> = ({
  method,
  number,
  send_money_cost,
}) => {
  return (
    <div className=" text-gray-700 flex flex-col gap-2">
      <p>
        {`Please complete your ${method} payment at first, then fill up the form
        below. Also note that ${send_money_cost}% bKash "SEND MONEY" cost will be added with
        net price. Total amount you need to send us at $ 1342.00`}
      </p>
      <p>
        {`${method} Personal Number :`} <strong>{number}</strong>
      </p>
      <div className=" flex flex-col gap-3">
        <div className=" flex min-[500px]:flex-row flex-col gap-1 min-[500px]:items-center justify-between">
          <label className=" flex-1">{`${method} Number :`}</label>
          <Input
            type="text"
            placeholder="017XXXXXXXX"
            className=" placeholder:text-gray-500"
          />
        </div>
        <div className=" flex min-[500px]:flex-row flex-col gap-1 min-[500px]:items-center justify-between">
          <label htmlFor="" className=" flex-1">
            {`${method} Transaction ID :`}
          </label>
          <Input
            type="text"
            placeholder="8N7A6D5EE7M"
            className=" placeholder:text-gray-500"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodInfo;
