import { motion } from 'framer-motion';
import TrendingCommunities from './components/TrendingCommunities';

const Communities = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-8 py-6"
    >
      <h1 className="text-3xl font-bold mb-6">Communities</h1>
      <TrendingCommunities />
    </motion.div>
  );
};

export default Communities;
