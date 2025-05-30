import React from 'react';
import { useInView } from 'react-intersection-observer';

interface InfiniteScrollTriggerProps {
  onVisible: () => void;
  loading: boolean;
}

const InfiniteScrollTrigger: React.FC<InfiniteScrollTriggerProps> = ({ onVisible, loading }) => {
  const { ref, inView } = useInView({ triggerOnce: false });

  React.useEffect(() => {
    if (inView && !loading) {
      onVisible();
    }
  }, [inView, loading, onVisible]);

  return (
    <div ref={ref} className="flex justify-center py-8">
      {loading ? (
        <div className="w-8 h-8 border-4 border-neutral-300 border-t-accent-500 rounded-full animate-spin" />
      ) : (
        <span className="text-neutral-400 text-sm">Loading more photos...</span>
      )}
    </div>
  );
};

export default InfiniteScrollTrigger; 