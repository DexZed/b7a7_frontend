import { motion } from "motion/react";

type ListItemType = {
  itemName: string;
  itemDescription?: string;
  itemRender?: React.ReactNode;
};
type Props = {
  listTitle: string;
  listItems: ListItemType[];
};

function GenericList({ listItems, listTitle }: Props) {
  return (
    <motion.div initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
      <ul className="list glass-morphism rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          <h3 className="text-xl font-semibold">{listTitle}</h3>
        </li>

        {listItems?.map((l, i) => (
          <li key={i} className="list-row">
            <div className="text-4xl font-thin opacity-30 tabular-nums">{}</div>

            <div className="list-col-grow">
              <div>{l.itemName}</div>
              <div className="text-xs uppercase font-semibold opacity-60 m-2">
                {l.itemDescription ? l.itemDescription : l.itemRender}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default GenericList;
