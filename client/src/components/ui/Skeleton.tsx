interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
}

/**
 * A reusable skeleton component for loading states
 * @param variant - The shape variant of the skeleton
 * @param width - The width of the skeleton
 * @param height - The height of the skeleton
 * @param className - Additional CSS classes
 */
const Skeleton = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
}: SkeletonProps) => {
  const baseClasses = 'animate-pulse bg-gray-200';
  const variantClasses = {
    text: 'rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        width: width,
        height: height,
      }}
    />
  );
};

export default Skeleton; 