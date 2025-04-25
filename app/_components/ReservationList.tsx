"use client";

import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../_lib/actions";

import { useOptimistic } from "react";
import { IBooking } from "../_lib/data-service";

function ReservationList({ bookings }: { bookings: IBooking[] }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: number, cabinId: number) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId, cabinId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
