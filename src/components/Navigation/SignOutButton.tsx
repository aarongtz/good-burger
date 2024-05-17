'use client';
import { signOut } from "next-auth/react";
import { useMemo, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";

export default function SignOutButton() {
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleSignOut = () => {
        setIsSigningOut(true);
        signOut({ callbackUrl: '/sign-in' });
    };

    const renderSignOutButton = useMemo(() => {
        return (
            <button onClick={handleSignOut} disabled={isSigningOut} type="button" className={`disabled:opacity-40 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white`}>
                {
                    isSigningOut ? <AiOutlineLoading size={20} className="inline animate-spin" /> : <FaSignOutAlt size={20} className="inline" />
                }
                Sign Out
            </button>
        )
    }, [isSigningOut])

    return (
        <>
            {renderSignOutButton}
        </>
    )
}
