import LessonGrid from './components/LessonGrid';

const SkillsHub = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Available Lessons</h1>
            <LessonGrid />
        </div>
    );
};

export default SkillsHub;