"use client";

import { SquarePen } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export function TableInfosUser() {
  const { data: session } = useSession();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 p-4 text-white">Mon Compte</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700 bg-black">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"></th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Modifier
              </th>
            </tr>
          </thead>
          <tbody className="bg-black divide-y divide-gray-700">
            <tr className="hover:bg-gray-800">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {session?.user?.image && (
                  <Image
                    className="rounded-full"
                    width={30}
                    height={30}
                    alt="User Avatar"
                    src={session?.user?.image || ""}
                  />
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {session?.user?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {session?.user?.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 hover:text-white">
                <SquarePen className="h-6 w-6 text-gray-300 ml-4" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
