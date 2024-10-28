import React, { useState } from 'react';

const Team = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Frontend Developer',
      description: 'Specializes in building responsive and dynamic web interfaces.',
      photo: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Backend Developer',
      description: 'Expert in server-side logic and database management.',
      photo: 'https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'UI/UX Designer',
      description: 'Focused on crafting user-friendly designs and smooth user experiences.',
      photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      role: 'Project Manager',
      description: 'Ensures project delivery on time and within scope.',
      photo: 'https://plus.unsplash.com/premium_photo-1683133252845-5a40baada008?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  const handleImageClick = (photo) => {
    setSelectedImage(photo);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Meet Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-start space-x-4 p-4 border rounded-lg shadow-lg">
            <div className="w-24 h-24 flex-shrink-0 cursor-pointer" onClick={() => handleImageClick(member.photo)}>
              <img src={member.photo} alt={member.name} className="w-full h-full object-cover rounded-full" />
            </div>

            <div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
              <p className="mt-2 text-gray-700">{member.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for image pop-out */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative p-4 bg-white rounded-lg">
            <button onClick={closeModal} className="absolute top-0 right-1  text-gray-900 hover:text-gray-800">
              ✕
            </button>
            <img src={selectedImage} alt="Team member" className="max-w-full max-h-[80vh] rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
