import TeacherProfilePage from '@/components/pages/TeacherProfilePage';
import React from 'react';

// In Next.js 15+, params is a Promise that needs to be awaited
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  
  return (
    <div>
      <TeacherProfilePage teacherId={id} />
    </div>
  );
};

export default Page;