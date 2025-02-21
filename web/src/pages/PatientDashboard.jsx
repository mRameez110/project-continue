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

      <div className="mb-6">
        <h3 className="text-xl font-medium mb-4">Top Doctors</h3>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {dummyData.pharmacists.slice(0, 6).map((pharmacist) => (
            <CustomCard key={pharmacist.id} pharmacist={pharmacist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
