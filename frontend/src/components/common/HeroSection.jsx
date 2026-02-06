const HeroSection = ({
  badge,
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  backgroundImage
}) => {
  return (
    <div
      className="relative h-[380px] flex items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
        {badge && (
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {badge}
          </span>
        )}

        <h1 className="text-4xl font-bold mb-3">{title}</h1>
        <p className="text-lg text-gray-200 max-w-2xl mb-6">{subtitle}</p>

        <div className="flex gap-4">
          {primaryAction}
          {secondaryAction}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
