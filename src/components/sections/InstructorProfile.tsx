interface Props {
  name: string;
  role: string;
  bio: string;
}

export default function InstructorProfile({ name, role, bio }: Props) {
  return (
    <div className="flex items-start sm:items-center space-x-4 sm:space-x-6 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
      <div>
        <h4 className="text-lg md:text-xl font-bold text-white leading-tight">
          พบกับ {name}
        </h4>
        <p className="text-sm md:text-base text-gray-400 mt-2 leading-relaxed">
          {role}
        </p>
        <p className="text-sm md:text-base text-gray-300 mt-1 leading-relaxed">
          {bio}
        </p>
      </div>
    </div>
  );
}
