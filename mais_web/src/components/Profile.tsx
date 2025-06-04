import React from 'react';
import { useParams } from 'react-router-dom';
import Awards from './Awards';
import Subjects from './Subjects';
import Bio from './Bio';
import SocialLinks from './SocialLinks';
import { getStudentById } from '../data/students';
import { Navigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const student = getStudentById(Number(id));

  if (!student) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-8 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[350px,1fr] gap-6">
        {/* Left Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          {/* Profile Image */}
          <div className="relative w-full aspect-square mb-6">
            <div className="w-full h-full rounded-full border-2 border-dashed border-[#48b095] p-2">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src={student.imageUrl}
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Name and Title */}
          <h1 className="text-2xl font-bold text-center mb-2">{student.name}</h1>
          <p className="text-gray-600 text-center mb-8">{student.grade}</p>

          {/* Achievements Title */}
          <h2 className="text-2xl font-bold mb-6">Achievements</h2>
          <div className="-mx-4">
            <Awards achievements={student.achievements} />
          </div>
          {/* Social Links */}
          <SocialLinks links={student.socialLinks} />
        </div>

        {/* Right Content */}
        <div className="space-y-6">
          {/* Bio Section */}
          <Bio 
            name={student.name}
            grade={student.grade}
            school={student.school}
            bio={student.bio}
            currentStudy={student.currentStudy}
          />

          {/* Subjects Section */}
          <Subjects subjects={student.subjects} />
        </div>
      </div>
    </div>
  );
};

export default Profile; 