import { dummyData } from "../data/dummyData";
import CustomCard from "../components/CustomCard";
import Profile from "../components/profiles/Profile";

const PatientDashboard = () => {
  return (
    <div className="p-6">
      <div className="p-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Patient Dashboard
        </h2>
        {/* <Profile /> */}
      </div>

      {/* Top Pharmacists Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Top Pharmacists</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {dummyData.pharmacists.slice(0, 5).map((pharmacist) => (
            <CustomCard
              key={pharmacist.id}
              title={pharmacist.name}
              subtitle={pharmacist.title}
              link={pharmacist.link}
              linkText="View Profile"
            />
          ))}
        </div>
      </div>

      {/* Top Prescriptions Section */}
      <div>
        <h3 className="text-lg font-medium mb-2">Top Prescriptions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {dummyData.prescriptions.slice(0, 5).map((prescription) => (
            <CustomCard
              key={prescription.id}
              title={prescription.title}
              subtitle={prescription.description}
              link={prescription.link}
              linkText="View Details"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
