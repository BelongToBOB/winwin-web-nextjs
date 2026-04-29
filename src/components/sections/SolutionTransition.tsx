interface Props {
  text: string;
  highlight: string;
}

export default function SolutionTransition({ text, highlight }: Props) {
  return (
    <div className="border-l-4 border-yellow-500 pl-6 py-2">
      <p className="text-lg md:text-xl text-gray-300 italic mb-2">{text}</p>
      <p className="text-xl md:text-2xl font-bold text-yellow-400">{highlight}</p>
    </div>
  );
}
