import { useEffect } from 'react';

const useTitle = title => {
    useEffect(() => {
        document.title = `Task 1 ${title}`;
    }, [title]);
};

export default useTitle;