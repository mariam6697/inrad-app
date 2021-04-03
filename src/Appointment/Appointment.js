import PatientDataService from "../services/PatientService";
import PatientAppointmentDataService from "../services/PatientAppointmentService";
import PatientAppointmentImageService from "../services/PatientAppointmentImageService";
import PatientAppointmentSymptomService from "../services/PatientAppointmentSymptomService";
import { Alert } from "rsuite";
import { useEffect, useState } from "react";
import PatientDetailShow from "../Appointment/PatientDetailShow";
import { useParams } from "react-router";
import AppointmentList from "../Appointment/AppointmentList";
import AppointmentForm from "../Appointment/AppointmentForm";

const PatientAppointment = ({ patient_id }) => {
  const initialPatientAppointmentState = {
    id: null,
    summary: "",
    patient: null,
    user: null,
    patientTreatment: null,
    patientDiagnostic: null,
    images: [],
    symptoms: [],
  };
  const [patientAppointments, setPatientAppointments] = useState([]);
  const [patientAppointment, setPatientAppointment] = useState(
    initialPatientAppointmentState
  );
  const [currentPatientAppointment, setCurrentPatientAppointment] = useState(
    null
  );
  const [formVisibility, setFormVisibility] = useState(false);

  const retrievePatientAppointments = () => {
    PatientAppointmentDataService.getAll(id)
      .then((response) => {
        setPatientAppointments(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const savePatientAppointment = () => {
    PatientAppointmentDataService.create(patient.id, patientAppointment)
      .then((response) => {
        savePatientAppointmentImages(response.data.id);
        savePatientAppointmentSymptoms(response.data.id);
        setPatientAppointment({
          id: response.data.id,
          summary: patientAppointment.summary,
          images: patientAppointment.images,
          symptoms: patientAppointment.symptoms,
        });
        setFormVisibility(false);
        retrievePatientAppointments();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const savePatientAppointmentImages = (appointment_id) => {
    PatientAppointmentImageService.create(
      patient.id,
      appointment_id,
      patientAppointment.images
    );
  };

  const savePatientAppointmentSymptoms = (appointment_id) => {
    PatientAppointmentSymptomService.create(
      patient.id,
      appointment_id,
      patientAppointment.symptoms
    );
  };

  const newPatientAppointment = () => {
    setPatientAppointment(initialPatientAppointmentState);
  };

  const PatientAppointmentFormButton = () => {
    newPatientAppointment();
    setFormVisibility(true);
  };

  const PatientAppointmentEditFormButton = () => {
    setPatientAppointment(currentPatientAppointment);
    setFormVisibility(true);
  };

  const setFormPatientAppointment = (data) => {
    setPatientAppointment({
      id: data.id,
      summary: data.summary,
      images: data.images,
      symptoms: data.symptoms,
    });
  };

  const updatePatientAppointmentButton = () => {
    let data = {
      id: patientAppointment.id,
      summary: patientAppointment.summary,
      images: patientAppointment.images,
      symptoms: patientAppointment.symptoms,
    };
    PatientAppointmentDataService.update(patient_id, data.id, data)
      .then((response) => {
        setFormVisibility(false);
        retrievePatientAppointments();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deletePatientAppointment = (patient_id, id) => {
    PatientAppointmentDataService.remove(id)
      .then((response) => {
        console.log(response.data);
        Alert.success("Visita eliminada exitosamente");
        retrievePatientAppointments();
      })
      .catch((e) => {
        console.log(e);
        Alert.error("No se ha podido eliminar la visita");
      });
  };

  const { id } = useParams();

  const [patient, setPatient] = useState(null);

  useEffect(() => {
    retrievePatient();
    retrievePatientAppointments();
  }, []);

  const setPatientDetail = (data) => {
    setPatient({
      id: data.id,
      name: data.name,
      last_name: data.last_name,
      identifier: data.identifier,
      phone_number: data.phone_number,
      gender: data.gender,
      age: data.age,
      images: data.images,
      treatments: data.treatments,
      current_treatment: data.current_treatment,
      current_diagnostic: data.current_diagnostic,
    });
  };

  const retrievePatient = () => {
    PatientDataService.get(id)
      .then((response) => {
        setPatientDetail(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {patient && <PatientDetailShow patient={patient} />}
      <AppointmentList
        appointments={patientAppointments}
        appointmentFormButton={PatientAppointmentFormButton}
        setCurrentAppointment={setCurrentPatientAppointment}
        setFormAppointment={setFormPatientAppointment}
        showFormModal={() => setFormVisibility(true)}
        deleteAppointment={deletePatientAppointment}
      />
      <div className="modal-container">
        <AppointmentForm
          appointment={patientAppointment}
          hideModal={() => setFormVisibility(false)}
          showModal={() => setFormVisibility(true)}
          visibility={formVisibility}
          setAppointment={setPatientAppointment}
          saveAppointment={savePatientAppointment}
          updateAppointmentButton={updatePatientAppointmentButton}
        />
      </div>
    </>
  );
};

export default PatientAppointment;
