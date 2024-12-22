import prisma from "../../db";
import { PopCreateUser } from "../UserComponents/PopCreateUser";
import { PopUpdateUser } from "../UserComponents/PopUpdateUser";
import DeleteUserButton from "./DeleteUserButton";

import { Spacing } from "../Spacing";

export async function TableUsers() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <div className="flex mb-1 p-4 gap-2">
        <h1 className="text-2xl font-bold text-white">Utilisateurs</h1>
        <PopCreateUser />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700 bg-black">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Modifier
              </th>
            </tr>
          </thead>
          <tbody className="bg-black divide-y divide-gray-700">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-800 transition duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.email}
                </td>
                <td className="px-6 py-4  text-sm text-gray-300 flex gap-3">
                  <DeleteUserButton
                    userId={user.id}
                    className="text-red-500 hover:text-red-400"
                  />
                  <PopUpdateUser />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Spacing size="md" />

        <Spacing size="md" />
      </div>
    </div>
  );
}
