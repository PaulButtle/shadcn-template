/**
 * Users Page
 * 
 * User management page with full data table.
 * 
 * @component
 */

import type { Metadata } from "next";
import { UsersTable } from "@/components/dashboard/users-table";
import { MOCK_USERS } from "@/lib/mock-data";

/** Page metadata */
export const metadata: Metadata = {
  title: "Users",
  description: "Manage your users and their permissions.",
};

/**
 * Users management page component
 */
export default function UsersPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">
          Manage your team members and their account permissions.
        </p>
      </div>

      {/* Users Table */}
      <UsersTable data={MOCK_USERS} />
    </div>
  );
}

