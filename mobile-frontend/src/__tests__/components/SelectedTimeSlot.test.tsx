import SelectedTimeSlot from "@/src/components/SelectedTimeSlot";
import { render, screen, userEvent } from "@testing-library/react-native";

jest.mock('@react-navigation/native', () => {
  return {
    useTheme: () => ({
      dark: false,
      colors: {
        primary: 'blue',
        background: 'white',
        card: 'gray',
        text: 'black',
        border: 'green',
        error: 'red',
        success: 'green'
      },
    }),
  };
});

describe('SelectedTimeSlot Component', () => {
  

  it('renders the value if provided', async () => {
    const {findByText} = render(
      <SelectedTimeSlot color="green" value="10:00"/>
    )

    expect(await findByText("10:00")).toBeDefined()
  });

  it('does not render the value if not provided', () => {
    const {queryByText} = render(
      <SelectedTimeSlot color="green"/>
    )

    expect(queryByText("10:00")).toBeNull()
  });


  it('renders booking title when displayBookingTitle is true', async () => {
    const {findByText} = render(
      <SelectedTimeSlot color="green" bookingInfo={{title: 'Booking Title', user: 'Anna Smith'}} displayBookingTitle={true}/>
    )

    expect(await findByText("Booking Title")).toBeDefined()
  });

  it('does not render booking title when displayBookingTitle is false', () => {
    const {queryByText} = render(
      <SelectedTimeSlot color="green" bookingInfo={{title: 'Booking Title', user: 'Anna Smith'}} displayBookingTitle={false}/>
    )

    expect(queryByText("Booking Title")).toBeNull()
  });

  it('renders user name when displayBookingUser is true', async () => {
    const {findByText} = render(
      <SelectedTimeSlot color="green" bookingInfo={{title: 'Booking Title', user: 'Anna Smith'}} displayBookingUser={true}/>
    )

    expect(await findByText("Anna Smith")).toBeDefined()
  });

  it('does not render user name when displayBookingUser is false', () => {
    const {queryByText} = render(
      <SelectedTimeSlot color="green" bookingInfo={{title: 'Booking Title', user: 'Anna Smith'}} displayBookingUser={false}/>
    )

    expect( queryByText("Anna Smith")).toBeNull()
  });

  it('applies the correct bg color based on color prop', async () => {
    const {findByTestId} = render(
      <SelectedTimeSlot color="green"/>
    )

    expect(await findByTestId("selected_time_slot")).toHaveStyle({backgroundColor: 'green'})
  });

});