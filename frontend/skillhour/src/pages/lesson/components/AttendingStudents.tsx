interface AttendingStudentsProps {
    studentIds: number[];
}

const AttendingStudents = ({ studentIds }: AttendingStudentsProps) => {
    return (
        <div className="bg-surface/30 backdrop-blur-md rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Attending Students</h2>
            <div className="space-y-3">
                {studentIds.length === 0 ? (
                    <p className="text-text/60">No students enrolled yet</p>
                ) : (
                    studentIds.map((id) => (
                        <div 
                            key={id}
                            className="flex items-center gap-3 p-3 rounded-lg bg-surface/50"
                        >
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                {id}
                            </div>
                            <span>Student #{id}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AttendingStudents;
