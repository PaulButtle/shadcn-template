/**
 * Recent Activity Component
 * 
 * Displays a list of recent user activity items.
 * Shows avatar, action description, and timestamp.
 * 
 * Memoised with React.memo for performance optimisation.
 * 
 * @component
 * @example
 * ```tsx
 * <RecentActivity />
 * ```
 */

import { memo } from "react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MOCK_RECENT_ACTIVITY } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

/** Props for the RecentActivity component */
interface RecentActivityProps {
  /** Maximum number of items to show */
  limit?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Card showing recent user activity
 * Memoised to prevent unnecessary re-renders
 * @param props - Component configuration
 */
export const RecentActivity = memo(function RecentActivity({ limit = 5, className }: RecentActivityProps) {
  // Get limited activity items based on the limit prop
  const activities = MOCK_RECENT_ACTIVITY.slice(0, limit);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          <div className="space-y-0">
            {activities.map((activity, index) => {
              // Get initials for avatar fallback from user name
              const initials = activity.user
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase();

              return (
                <div
                  key={activity.id}
                  className={cn(
                    "flex items-center gap-4 px-6 py-4",
                    index !== activities.length - 1 && "border-b border-border"
                  )}
                >
                  {/* Avatar with fallback initials */}
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={activity.avatarUrl} alt={activity.user} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  {/* Activity content with user name and action */}
                  <div className="flex-1 space-y-1 overflow-hidden">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
});

// Display name for React DevTools
RecentActivity.displayName = "RecentActivity";

