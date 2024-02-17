import { signOut } from 'next-auth/react';
import Link from 'next/link'; // Import Link from next/link
import React from 'react';

import useCurrentUser from '@/hooks/useCurrentUser';

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: currentUser } = useCurrentUser();

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-white rounded-md border border-gray-200 shadow-lg w-96 absolute top-16 right-4 p-2 flex flex-col">
      <Link href="/userProfile">
        <div className="flex items-center mb-2 cursor-pointer">
          <img className="w-16 h-16 rounded-full" src="/images/avtar.png" alt="User Avatar" />
          <div className="ml-6">
            <p className="text-xl font-semibold text-gray-800">{currentUser?.name}</p>
            <p className="text-sm text-gray-600">{currentUser?.email}</p>
          </div>
        </div>
      </Link>
      <hr className="border-t border-gray-200 mb-2" />
      
      <div
        onClick={() => signOut()}
        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 cursor-pointer rounded-md transition-colors duration-300 hover:bg-gray-100 hover:text-red-700"
      >
        Sign out
      </div>
    </div>
  );
};

export default AccountMenu;
