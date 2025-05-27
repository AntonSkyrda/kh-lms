import type { EventContentArg } from "@fullcalendar/core";
import type { CustomExtendedProps } from "../../types/eventTypes";

interface EventContentProps {
  eventInfo: EventContentArg;
}

function EventContent({ eventInfo }: EventContentProps) {
  const { event } = eventInfo;
  const extendedProps = event.extendedProps as CustomExtendedProps;

  return (
    <div className="h-full overflow-hidden p-1">
      <div className="text-primary-foreground/90 mb-1 text-xs font-bold">
        {extendedProps.pairLabel}
      </div>

      <div className="text-primary-foreground mb-1 truncate text-xs font-semibold">
        {event.title}
      </div>

      <div className="text-primary-foreground/80 mb-1 truncate text-xs">
        {extendedProps.course}
      </div>

      <div className="text-primary-foreground/70 mb-1 truncate text-xs">
        {extendedProps.teacher}
      </div>

      <div className="text-primary-foreground/70 truncate text-xs">
        Група: {extendedProps.group}
      </div>
    </div>
  );
}

export default EventContent;
