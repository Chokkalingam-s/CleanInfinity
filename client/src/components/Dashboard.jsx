import BarGraph from "./BarChart";
import VerticalCard from "./VerticalCard";

export default function Dashboard({ creditVal, BarGraphVals, titles }) {
  return (
    <div className="container">
      <div className="w-24 flex items-center justify-around p-2 drop absolute top-15 right-2 z-10">
        <img
          src="/coins-solid.svg"
          className="w-6"
          alt="Credit Icon"
        />
        <p className="font-bold">{creditVal}</p>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-y-6 mt-12 md:mt-0 lg:mt-0">
        <BarGraph data={BarGraphVals} />
        <h3 className="text-2xl font-bold">How to use?</h3>
        <VerticalCard titles={titles} />
      </div>
    </div>
  );
}
