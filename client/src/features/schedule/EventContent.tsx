import type { EventContentArg } from "@fullcalendar/core";
import type { CustomExtendedProps } from "../../types/eventTypes";

interface EventContentProps {
  eventInfo: EventContentArg;
}

function EventContent({ eventInfo }: EventContentProps) {
  const { event } = eventInfo;
  const extendedProps = event.extendedProps as CustomExtendedProps;

  return (
    <div className="flex flex-col items-start justify-start gap-1 overflow-auto p-1">
      <p className="text-primary-foreground/90 mb-1 text-xs font-bold">
        {extendedProps.pairLabel}
      </p>

      <p className="text-primary-foreground mb-1 truncate text-xs font-semibold">
        {event.title}
      </p>

      <p className="text-primary-foreground/80 mb-1 truncate text-xs">
        {extendedProps.course}
      </p>

      <p className="text-primary-foreground/70 mb-1 truncate text-xs">
        {extendedProps.teacher}
      </p>

      <p className="text-primary-foreground/70 truncate text-xs">
        Група: {extendedProps.group}
      </p>
    </div>
  );
}

export default EventContent;
