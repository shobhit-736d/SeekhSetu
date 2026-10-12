import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodingProblemList } from './CodingProblemList';
import { CodingWorkspace } from './CodingWorkspace';
import { CodingQuestion } from '../../types/placement';
import { codingQuestionsList } from '../../data/codingQuestionsData';
import { useStudy } from '../../context/StudyContext';

export const CodingArenaView: React.FC = () => {
  const { selectedCodingQuestionId, setSelectedCodingQuestionId } = useStudy();
  const [activeProblem, setActiveProblem] = useState<CodingQuestion | null>(null);

  useEffect(() => {
    if (selectedCodingQuestionId) {
      const found = codingQuestionsList.find(q => q.id === selectedCodingQuestionId);
      if (found) setActiveProblem(found);
    }
  }, [selectedCodingQuestionId]);

  const handleSelect = (q: CodingQuestion) => {
    setActiveProblem(q);
    setSelectedCodingQuestionId(q.id);
  };

  const handleBack = () => {
    setActiveProblem(null);
    setSelectedCodingQuestionId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22 }}
      className="w-full"
    >
      <AnimatePresence mode="wait">
        {activeProblem ? (
          <motion.div
            key="workspace"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.2 }}
          >
            <CodingWorkspace
              question={activeProblem}
              onBack={handleBack}
            />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CodingProblemList onSelectProblem={handleSelect} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
