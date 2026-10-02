'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FBF6EA] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-[#0B4A3A] flex items-center justify-center text-white shadow-md animate-pulse mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8V6C8 4.34315 9.34315 3 11 3H13C14.6569 3 16 4.34315 16 6V8" stroke="#F4B63F" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M4.5 8.5H19.5L18 20.5H6L4.5 8.5Z" fill="#0B4A3A" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M9 13L10.5 17" stroke="#E8683A" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 11.5L12 17" stroke="#F4B63F" strokeWidth="2" strokeLinecap="round"/>
            <path d="M15 13L13.5 17" stroke="#34D399" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <p className="text-xs font-bold text-[#0B4A3A] tracking-wider uppercase">
          Verifying Google Authentication...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
