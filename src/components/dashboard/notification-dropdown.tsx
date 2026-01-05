"use client";

/**
 * Notification Dropdown Component
 * 
 * A dropdown menu displaying user notifications with:
 * - Unread count badge
 * - Notification list with icons
 * - Mark all as read action
 * - View all link
 * 
 * @component
 * @example
 * ```tsx
 * <NotificationDropdown />
 * ```
 */

import { useState } from "react";
import Link from "next/link";
import { Bell, CheckCheck, Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MOCK_NOTIFICATIONS } from "@/lib/mock-data";
import type { Notification, NotificationType } from "@/types";

// ============================================================================
// Types
// ============================================================================

/** Icon configuration for notification types */
const notificationIcons: Record<NotificationType, {
  icon: typeof Info;
  className: string;
}> = {
  info: { icon: Info, className: "text-blue-500" },
  success: { icon: CheckCircle, className: "text-green-500" },
  warning: { icon: AlertTriangle, className: "text-yellow-500" },
  error: { icon: XCircle, className: "text-destructive" },
};

// ============================================================================
// Component
// ============================================================================

/**
 * Notification dropdown with bell icon trigger
 */
export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  /**
   * Marks all notifications as read
   */
  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true }))
    );
  };

  /**
   * Marks a single notification as read
   * @param id - Notification ID
   */
  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          <span className="sr-only">
            {unreadCount} unread notifications
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {/* Header */}
        <DropdownMenuLabel className="flex items-center justify-between">
          <span className="font-semibold">Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto py-1 px-2 text-xs"
              onClick={handleMarkAllRead}
            >
              <CheckCheck className="mr-1 h-3 w-3" />
              Mark all read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Notification List */}
        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-8 w-8 text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">
                No notifications yet
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {notifications.map((notification) => {
                const { icon: Icon, className } = notificationIcons[notification.type];
                
                return (
                  <DropdownMenuItem
                    key={notification.id}
                    className={cn(
                      "flex items-start gap-3 p-3 cursor-pointer",
                      !notification.isRead && "bg-accent/50"
                    )}
                    onClick={() => handleMarkRead(notification.id)}
                  >
                    {/* Icon */}
                    <div className={cn("mt-0.5 flex-shrink-0", className)}>
                      <Icon className="h-4 w-4" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-1 overflow-hidden">
                      <p className="text-sm font-medium leading-tight">
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground/60">
                        {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                      </p>
                    </div>

                    {/* Unread indicator */}
                    {!notification.isRead && (
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    )}
                  </DropdownMenuItem>
                );
              })}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button variant="ghost" className="w-full justify-center" size="sm" asChild>
                <Link href="/notifications">View all notifications</Link>
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

