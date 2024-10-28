import { useParams } from 'react-router-dom';

const SizeChart = () => {
  const { gender } = useParams();
  const chartUrls = {
    women: "https://cdn.shopify.com/s/files/1/1231/6442/files/Cottonworld-Size-Chart-Women-Updated.jpg?v=1580299724",
    men: "https://cdn.shopify.com/s/files/1/1231/6442/files/Cottonworld-Revised-Men-Chart-02-01.png?v=1662620756",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-inherit">
      <div className="bg-white p-4 rounded shadow-lg max-w-lg">
        <img src={chartUrls[gender]} alt={`${gender} size chart`} className="w-full h-auto" />
      </div>
    </div>
  );
};

export default SizeChart;
