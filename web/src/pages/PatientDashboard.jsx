import { dummyData } from "../data/dummyData";
import CustomCard from "../components/CustomCard";

const PatientDashboard = () => {
  return (
    <div className="p-6">
      <div className="p-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Patient Dashboard
        </h2>
      </div>

      {/* Top Pharmacists Section */}
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-4">Top Pharmacists</h3>

        {/* Cards Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {dummyData.pharmacists.slice(0, 5).map((pharmacist) => (
            // Passing the whole 'pharmacist' object to the CustomCard
            <CustomCard key={pharmacist.id} pharmacist={pharmacist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
