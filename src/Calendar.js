import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DayView,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
  AllDayPanel,
  EditRecurrenceMenu,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';

const Appointment = ({
  children, style, ...restProps
}) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: '#2C677B',
      borderRadius: '8px',
    }}
  >
    {children}
  </Appointments.Appointment>
);

export default class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      currentViewName: 'work-week',
      currentDate: new Date(),
      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
    };
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate });
    };
    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);

    this.fetchAppointments();
  }

  componentDidMount() {
    this.fetchAppointments();
  }

  async fetchAppointments() {
    try {
      const appointmentsRef = collection(db, 'appointments');
      const snapshot = await getDocs(appointmentsRef);
      const appointments = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          allDay: data.allDay,
          startDate:
            data.startDate instanceof Timestamp
              ? data.startDate.toDate()
              : data.startDate,
          endDate:
            data.endDate instanceof Timestamp
              ? data.endDate.toDate()
              : data.endDate,
          rRule: data.rRule || null,
        };
      });
      this.setState({ data: appointments });
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }

  async commitChanges({ added, changed, deleted }) {
    try {
      let { data } = this.state;

      if (added) {
        const newAppointment = { ...added };
        const docRef = await addDoc(
          collection(db, 'appointments'),
          newAppointment
        );
        newAppointment.id = docRef.id;
        data = [...data, newAppointment];
      }

      if (changed) {
        data = data.map((appointment) => {
          if (changed[appointment.id]) {
            const updatedAppointment = {
              ...appointment,
              ...changed[appointment.id],
            };
            updateDoc(
              doc(db, 'appointments', appointment.id),
              updatedAppointment
            );
            return updatedAppointment;
          }
          return appointment;
        });
      }

      if (deleted !== undefined) {
        await deleteDoc(doc(db, 'appointments', deleted));
        data = data.filter((appointment) => appointment.id !== deleted);
      }

      this.setState({ data });
    } catch (error) {
      console.error('Error committing changes:', error);
    }
  }

  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    this.setState({ editingAppointment });
  }

  render() {
    const {
      data,
      currentViewName,
      currentDate,
      addedAppointment,
      appointmentChanges,
      editingAppointment,
    } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          locale={'pl'}
          height={660}
          adaptivityEnabled={true}
        >
          <ViewState
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
            currentDate={currentDate}
            onCurrentDateChange={this.currentDateChange}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={this.changeAddedAppointment}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={this.changeAppointmentChanges}
            editingAppointment={editingAppointment}
            onEditingAppointmentChange={this.changeEditingAppointment}
          />

          <WeekView startDayHour={10} endDayHour={19} />
          <WeekView
            name="work-week"
            displayName="Obecny tydzień roboczy"
            excludedDays={[0, 6]}
            startDayHour={9}
            endDayHour={19}
          />
          <MonthView />
          <DayView startDayHour={9} endDayHour={14} />

          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <AllDayPanel />
          <EditRecurrenceMenu />
          <ConfirmationDialog />
          <Appointments
            appointmentComponent={Appointment}
          />
          <AppointmentTooltip showCloseButton showOpenButton showDeleteButton />
          <AppointmentForm />
        </Scheduler>
      </Paper>
    );
  }
}
