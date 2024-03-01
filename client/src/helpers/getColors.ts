const textColorClasses = [
  "text-red-600",
  "text-sky-400",
  "text-green-600",
  "text-yellow-400",
  "text-violet-600",
  "text-pink-600",
  "text-orange-500",
  "text-lime-500",
  "text-teal-400",
  "text-emerald-400",
];

export const getRandomColorClass = () => {
  return textColorClasses[Math.floor(Math.random() * textColorClasses.length)];
};
