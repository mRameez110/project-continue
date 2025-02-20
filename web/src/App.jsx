import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleBasedRedirect from "./routes/RoleBasedRedirect";
import DashboardLayout from "./layouts/DashboardLayout";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import Contact from "./pages/ContactPage";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";

import AdminDashboard from "./pages/AdminDashboard";
import PharmacistDashboard from "./pages/PharmacistDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import MyPrescriptions from "./components/prescriptions/MyPrescriptions";
import PrescriptionDetail from "./components/prescriptions/PrescriptionDetail";
import NotFound from "./components/NotFound";
import Profile from "./components/profiles/Profile";
import EditProfile from "./components/profiles/EditProfile";
import AllPatients from "./components/patients/AllPatients";
import PatientDetail from "./components/patients/PatientDetail";
import EditPatient from "./components/patients/EditPatient";
import AllPharmacists from "./components/pharmacist/AllPharmacists";
import PharmacitDetail from "./components/pharmacist/PharmacistDetail";
import EditPharmacist from "./components/pharmacist/EditPharmacist";
import PharmacistBranch from "./pages/PharmacistBranchPage";

import { getUserRole } from "./utils/auth";
import AllBranches from "./components/AllBranches";
import BranchDetail from "./pages/BranchDetail";
import TopPharDetails from "./components/pharmacist/TopPharDetails";
import AllOrders from "./pages/medicineOrder/AllOrders";
import InvantoriesPage from "./pages/InaventoriesPage";

function App() {
	const userRole = getUserRole();
	console.log("see loged/current user role in app.jsx ", userRole);
	return (
		<>
			<Routes>
				<Route element={<PublicLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Route>

				{/* All protected routes are below */}

				<Route element={<ProtectedRoute />}>
					<Route path="/dashboard" element={<RoleBasedRedirect />} />
					<Route element={<DashboardLayout />}>
						<Route path="/admin-dashboard" element={<AdminDashboard />} />
						<Route
							path="/pharmacist-dashboard"
							element={<PharmacistDashboard />}
						/>
						<Route path="/patient-dashboard" element={<PatientDashboard />} />
						{/* Routes of Patients */}
						<Route
							path="/patient/prescriptions"
							element={<MyPrescriptions />}
						/>
						<Route
							path="/patient/prescription/:id"
							element={<PrescriptionDetail />}
						/>
						<Route path="/patient-profile" element={<Profile />} />
						{/* Routes of Pharmacists */}
						<Route
							path="/pharmacist/prescriptions"
							element={<MyPrescriptions />}
						/>
						<Route
							path="pharmacist/prescription/:id"
							element={<PrescriptionDetail />}
						/>
						<Route path="/pharmacist/patients" element={<AllPatients />} />

						<Route path="/pharmacist-profile" element={<Profile />} />
						<Route path="pharmacist/patient/:id" element={<PatientDetail />} />
						<Route
							path="/pharmacist/patient/edit/:id"
							element={<EditPatient />}
						/>
						<Route path="/pharmacist/branch" element={<PharmacistBranch />} />
						<Route path="/pharmacist/orders" element={<AllOrders />} />
						<Route path="/pharmacist/inventory" element={<InvantoriesPage />} />

						{/* Routes of Admin */}
						<Route path="/admin/prescriptions" element={<MyPrescriptions />} />
						<Route
							path="admin/prescription/:id"
							element={<PrescriptionDetail />}
						/>
						<Route path="/admin-profile" element={<Profile />} />
						<Route path="/admin/patients" element={<AllPatients />} />
						<Route path="/admin/pharmacists" element={<AllPharmacists />} />
						<Route path="admin/patient/:id" element={<PatientDetail />} />
						<Route path="admin/patient/edit/:id" element={<EditPatient />} />
						<Route path="admin/pharmacist/:id" element={<PharmacitDetail />} />
						<Route
							path="/admin/pharmacist/edit/:id"
							element={<EditPharmacist />}
						/>
						<Route path="/admin/branches" element={<AllBranches />} />
						<Route
							path="/admin/branch-details/:id"
							element={<BranchDetail />}
						/>
						<Route path="/profile" element={<Profile />} />
						<Route path="/edit-profile/:id" element={<EditProfile />} />
						<Route path="/topphardetails/:id" element={<TopPharDetails />} />
					</Route>
				</Route>

				{/* Not Found Route for 404 */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
