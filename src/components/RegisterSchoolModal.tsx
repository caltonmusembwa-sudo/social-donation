import React, { useState } from 'react';
import { SchoolRegistrationRequest } from '../types/interactClub';
import { X, School, Check, Sparkles, Building2, User, Mail, Phone, Users } from 'lucide-react';

interface RegisterSchoolModalProps {
  onClose: () => void;
  onRegistered: (req: SchoolRegistrationRequest) => void;
}

export const RegisterSchoolModal: React.FC<RegisterSchoolModalProps> = ({
  onClose,
  onRegistered,
}) => {
  const [schoolName, setSchoolName] = useState('');
  const [level, setLevel] = useState<'Primary' | 'Junior / Middle' | 'High School'>('Primary');
  const [location, setLocation] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactRole, setContactRole] = useState('PTA Chairperson');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [estimatedStudents, setEstimatedStudents] = useState('150');
  const [primaryNeed, setPrimaryNeed] = useState('Scholastic Materials & Backpacks');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolName.trim() || !contactPerson.trim() || !email.trim()) {
      setError('Please fill in the school name, contact person, and email.');
      return;
    }

    const newRequest: SchoolRegistrationRequest = {
      id: 'reg-' + Date.now(),
      schoolName: schoolName.trim(),
      level,
      location: location.trim() || 'Local District',
      contactPerson: contactPerson.trim(),
      contactRole,
      email: email.trim(),
      phone: phone.trim() || 'N/A',
      estimatedStudents: parseInt(estimatedStudents, 10) || 100,
      primaryNeed,
      timestamp: new Date().toISOString(),
    };

    onRegistered(newRequest);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-amber-50/70">
          <div className="flex items-center gap-2">
            <School className="w-5 h-5 text-amber-700" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                School Zone Enrollment
              </span>
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Register Your Child’s School or PTA
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs text-stone-700">
          {error && (
            <div className="p-2.5 bg-red-50 text-red-700 rounded-lg border border-red-200 font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block font-bold text-stone-900 mb-1">School Name *</label>
            <input
              type="text"
              required
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="e.g. Hilltop Community Primary School"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-900 mb-1">School Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
              >
                <option value="Primary">Primary (Elementary)</option>
                <option value="Junior / Middle">Junior / Middle School</option>
                <option value="High School">High School / Secondary</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-stone-900 mb-1">Location / Division</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. South Parish"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-900 mb-1">Contact Person *</label>
              <input
                type="text"
                required
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="e.g. Patricia Namubiru"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-bold text-stone-900 mb-1">Role / Designation</label>
              <select
                value={contactRole}
                onChange={(e) => setContactRole(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
              >
                <option value="PTA Chairperson">PTA Chairperson</option>
                <option value="Head Teacher / Principal">Head Teacher / Principal</option>
                <option value="Class Teacher / Coach">Class Teacher / Coach</option>
                <option value="Concerned Parent">Concerned Parent</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-900 mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@school.org"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-bold text-stone-900 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0770 000 000"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-900 mb-1">Students in Need</label>
              <input
                type="number"
                value={estimatedStudents}
                onChange={(e) => setEstimatedStudents(e.target.value)}
                placeholder="150"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-bold text-stone-900 mb-1">Top Critical Need</label>
              <select
                value={primaryNeed}
                onChange={(e) => setPrimaryNeed(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
              >
                <option value="Scholastic Materials & Backpacks">Scholastic Backpacks &amp; Pens</option>
                <option value="Classroom Lunch & Porridge Fund">Classroom Mid-day Lunch Fund</option>
                <option value="Uniforms & Athletic Running Shoes">Uniforms &amp; Sturdy Shoes</option>
                <option value="Science Kits & Geometry Sets">Science Kits &amp; Books</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl text-[11px] text-amber-900 leading-normal border border-amber-200">
            <strong>O&amp;U Interact Verification:</strong> Once submitted, our student liaison team and teacher patron will reach out within 48 hours to inspect student records and add your school drive to the community leaderboard.
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-200 rounded-lg text-stone-600 hover:bg-stone-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold transition-all shadow-xs"
            >
              Submit School Registration
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
