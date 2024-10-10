import { useState, useEffect, useContext } from "react";
import Calendar from "../../components/calendar/Calendar";
import ContainerButtons from "../../components/container/ButtonsContainer";
import TitleMobile from "../../components/title/Title";
import { ButtonFind } from "../../components/buttons/ButtonStyled";
import ConfirmButton from "../../components/buttons/ConfirmButton";
import PopUpSuccess from "../../components/popup/reserve/PopUpSuccess";
import PopUpConfirmReserve from "../../components/popup/reserve/PopUpConfirmReserve";
import HourSelect from "../../components/inputs/HourSelect";
import { Space } from "../../pages/office/OfficeBookingStyled";
import PlacesButton from "../../components/buttons/PlacesButton";
import { DivReserve } from "./OfficeBookingStyled";
import { Hr2, TitleSelectDate } from "../../components/calendar/CalendarStyled";
import { RoleInput } from "../../components/inputs/RoleInput";
import { apiRequest } from "../../services/apiRequest";
import {
  API_CREATE_RESERVATIONS,
  API_GET_RESERVATIONS_BY_ID,
  API_GET_SPACE_BY_ID,
} from "../../config/apiEndpoints";
import { AuthContext } from "../../auth/AuthProvider";

const ReserveOffice = () => {
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);
  const [error, setError] = useState("");
  const { authToken, user } = useContext(AuthContext);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };
  console.log("Headers enviados:", headers);

  const dataRange = {};

  const generateDefaultHours = () => {
    const hours = [];
    let startHour = 8;
    let endHour = 20; // 8 PM

    for (let i = startHour; i < endHour; i++) {
      hours.push({
        startDate: `${i}:00:00`, // Formato HH:mm:ss para startDate
        endDate: `${i + 1}:00:00`, // Formato HH:mm:ss para endDate
      });
    }

    return hours;
  };
  const handleHourChange = (event) => {
    const selectedSlot = availableHours.find(
      (slot) => slot.startDate === event.target.value
    );

    if (selectedSlot) {
      setSelectedHour({
        startTime: selectedSlot.startDate,
        endTime: selectedSlot.endDate,
      });
    }
  };

  const fetchAvailableHours = async (spaceId, dataRange) => {
    try {
      const response = await apiRequest(
        API_GET_RESERVATIONS_BY_ID(spaceId),
        "POST",
        dataRange,
        headers
      );
      console.log("Respuesta de horas disponibles:", response);

      // Si la respuesta es 404, o no hay horas disponibles
      if (
        !response ||
        response.status === 404 ||
        !response.availableHours ||
        response.availableHours.length === 0
      ) {
        console.log(
          "No se encontraron horas disponibles. Mostrando horas por defecto."
        );
        const defaultHours = generateDefaultHours(); // Generar horas por defecto
        setAvailableHours(defaultHours); // Llenar el select con horas por defecto
      } else {
        const availableHours = response.availableHours.map((item) => ({
          startDate: item.startDate,
          endDate: item.endDate,
        }));
        setAvailableHours(availableHours); // Llenar el select con las horas de la API
      }
    } catch (error) {
      console.error("Error obteniendo las horas disponibles:", error.message);
      setError("Error obteniendo las horas disponibles. Intenta nuevamente.");

      // Si ocurre un error, llenamos el select con las horas por defecto
      const defaultHours = generateDefaultHours(); // Generar horas por defecto
      setAvailableHours(defaultHours); // Llenar el select con horas por defecto
    }
  };

  const handleFindResults = async () => {
    if (selectedDates.length === 0) {
      setError("Si us plau, selecciona un o més dies.");
      return;
    }

    if (!selectedOffice) {
      setError("Si us plau, selecciona una oficina.");
      return;
    }
    setError("");

    const startDate = new Date(
      selectedDates[0].$d.getTime() -
        selectedDates[0].$d.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];
    const endDate = new Date(
      selectedDates[selectedDates.length - 1].$d.getTime() -
        selectedDates[selectedDates.length - 1].$d.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    const dataRange = {
      startDate: startDate,
      endDate: endDate,
    };

    const spaceId = selectedOffice === "office1" ? 2 : 3;

    await fetchAvailableHours(spaceId, dataRange);
  };

  const handleOpenSuccess = () => {
    setSuccessPopupOpen(true);
    console.log(selectedDates);
  };

  const handleCloseSuccess = () => {
    setSuccessPopupOpen(false);
  };

  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);

  const handleOpenConfirm = () => {
    console.log("Selected Dates:", selectedDates);
    console.log("Selected Office:", selectedOffice);
    console.log("Selected Hour:", selectedHour);
    /*     if (!selectedDates.length || !selectedOffice || !selectedHour) {
      setError("Selecciona fechas, una oficina y una hora antes de continuar.");
      return;
    } */

    if (
      !selectedDates.length ||
      !selectedOffice ||
      !selectedHour.startTime ||
      !selectedHour.endTime
    ) {
      setError("Selecciona fechas, una oficina y una hora antes de continuar.");
      return;
    }
    setError(""); // Limpiar cualquier error previo
    setConfirmationPopupOpen(true);
    console.log("Estado del popup de confirmación:", confirmationPopupOpen);
  };

  const handleCloseConfirm = () => {
    setConfirmationPopupOpen(false);
  };

  const handleAcceptConfirm = async () => {
    /*     if (!selectedHour.startDate || !selectedHour.endDate) {
      setError("Por favor selecciona un horario antes de continuar.");
      return;
    } */

    if (
      !selectedDates.length ||
      !selectedOffice ||
      !selectedHour.startTime ||
      !selectedHour.endTime
    ) {
      setError("Selecciona fechas, una oficina y una hora antes de continuar.");
      return;
    }

    try {
      // Formateamos las fechas seleccionadas al formato 'YYYY/MM/DD'
      const formattedStartDate = selectedDates[0].format("YYYY-MM-DD");
      const formattedEndDate = selectedDates[0].format("YYYY-MM-DD");

      // Estructuramos el objeto que debe enviarse al backend
      const dataToSend = {
        startDate: formattedStartDate, // Fecha en formato 'YYYY/MM/DD'
        endDate: formattedEndDate,     // Fecha en formato 'YYYY/MM/DD'
        startTime: selectedHour.startTime, // Hora de inicio en formato '00:00:00'
        endTime: selectedHour.endTime,     // Hora de fin en formato '00:00:00'
        userDTO: {
          id: user.id,  // ID del usuario
        },
        spaceDTO: {
          id: selectedOffice === "Oficina 1" ? 1 : 2,  // ID de la oficina
        },
      };
      console.log("Cuerpo de la solicitud:", dataToSend);

      // Realizamos la solicitud POST enviando el array con el cuerpo de la solicitud
      const response = await apiRequest(
        API_CREATE_RESERVATIONS,
        "POST",
        dataToSend,
        headers
      );

      console.log("Reserva creada exitosamente:", response);

      // Si todo va bien, abre el popup de éxito
      handleOpenSuccess();
    } catch (error) {
      console.error("Error al realizar la reserva:", error.message);
      setError(error.message); // Mostrar el error en la UI
    }
  };

  const handleRadioChange = (event) => {
    const office = event.target.value; // Asignar la oficina seleccionada
    setSelectedOffice(office);
  };

  /* const handleHourChange = (event) => {
    setSelectedHour(event.target.value); // Asignar la hora seleccionada
  }; */

  return (
    <>
      <DivReserve>
        <TitleMobile title="Fer reserva d' oficina" />
        <ContainerButtons>
          <PlacesButton
            text="taules individuals"
            focus={false}
            link="/reserva-taula"
          />
          <PlacesButton text="oficines privades" focus={true} />
          <PlacesButton
            text="sala de reunions"
            link="/reserva-reunio"
            focus={false}
          />
        </ContainerButtons>

        <Calendar
          onChange={setSelectedDates}
          value={selectedDates}
          setError={setError}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}

        <TitleSelectDate>Selecciona l'oficina</TitleSelectDate>
        <RoleInput
          label="Oficina 1"
          name="office1"
          selectedOption={selectedOffice}
          onChange={handleRadioChange}
          userRole={"USER"}
        />
        <RoleInput
          label="Oficina 2"
          name="office2"
          selectedOption={selectedOffice}
          onChange={handleRadioChange}
          userRole={"USER"}
        />

        <ContainerButtons>
          <ButtonFind onClick={handleFindResults}>Buscar</ButtonFind>
        </ContainerButtons>

        <Hr2 />

        {/*         {availableHours.length > 0 && (
          <HourSelect selectedHour={selectedHour} onChange={handleHourChange} availableHours={availableHours} />
        )}
 */}

        <label htmlFor="hoursSelect">Selecciona una franja horaria:</label>
        <select
          id="hoursSelect"
          value={selectedHour.startDate || ""}
          onChange={handleHourChange}
        >
          <option value="">Seleccione una hora</option>
          {availableHours.map((hour, index) => (
            <option key={index} value={hour.startDate}>
              {hour.startDate} - {hour.endDate}
            </option>
          ))}
        </select>
        <Hr2 />

        {/* Confirm Reservation */}
        <ContainerButtons>
          <ConfirmButton onClick={handleOpenConfirm}>Acceptar</ConfirmButton>
        </ContainerButtons>

        {/* Confirmation and Success Popups */}
        {confirmationPopupOpen && (

          <PopUpConfirmReserve
            open={confirmationPopupOpen}
            onCancel={handleCloseConfirm}
            onConfirm={handleAcceptConfirm}
            reservation={{
              startDate: selectedDates[0].format("YYYY-MM-DD"),
              endDate: selectedDates[0].format("YYYY-MM-DD"),
              startTime: selectedHour.startTime,
              endTime: selectedHour.endTime,
              spaceDTO: { spaceType: selectedOffice }, // ejemplo de espacio
              userDTO: { name: user.name }, // ejemplo de usuario
            }}
            button={{
              confirmText: "Confirmar",
              cancelText: "Cancelar",
            }}
            actionType="confirm"
          />
        )}
        <PopUpSuccess open={successPopupOpen} onClose={handleCloseSuccess} />
      </DivReserve>
      <Space />
    </>
  );
};

export default ReserveOffice;
