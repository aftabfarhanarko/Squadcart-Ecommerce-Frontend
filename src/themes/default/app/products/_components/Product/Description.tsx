interface List {
  id: string;
  item: string;
}

interface ListItems {
  id: string;
  title: string;
  list: List[];
}
interface DescriptionProps {
  description: {
    id: string;
    summary: string;
    list_items: ListItems[];
  };
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <div className=" flex flex-col gap-3">
      <p className=" sm:text-sm text-xs text-gray-700">
        {description?.summary}
      </p>
      <div className=" flex gap-5 flex-wrap">
        {description?.list_items.map((item: ListItems, index: number) => (
          <div key={index}>
            <h2 className=" text-base sm:text-lg font-medium">{item.title}</h2>
            <ul className="list-disc pl-5  font-light sm:text-base text-xs">
              {item.list.map((listItem: List, index: number) => (
                <li key={index}>{listItem.item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Description;
